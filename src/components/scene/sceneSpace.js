import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import pajaro from "./src/vuelo.glb"
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


const sceneSpace = () => {

    const canvas = document.querySelector('.webGlScene')
    
    // scene setup
    const scene = new THREE.Scene();
    
    
    const size = {
        width :  window.innerWidth,
        height : window.innerHeight
    }
    
    window.addEventListener ('resize', () => {
        size.width = window.innerWidth
        size.height = window.innerHeight
    
        camera.aspect = size.width / size.height
        camera.updateProjectionMatrix()

        renderer.setSize(size.width, size.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })







    // Base camera
    const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
    camera.position.z = 1
    camera.position.y = 1

    scene.add(camera)






    // renderer setup
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
        /* alpha:true */
    });
    
    renderer.setSize(size.width, size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.physicallyCorrectLights = true;
   /*     renderer.outputEncoding = THREE.sRGBEncoding */





    const ambientLight = new THREE.AmbientLight(0xffffff ,5)
    scene.add(ambientLight);


    const floor = new THREE.PlaneGeometry(100, 100)
    const materialFloor = new THREE.MeshBasicMaterial({color:"grey"})
    const meshFloor = new THREE.Mesh(floor, materialFloor)
    meshFloor.position.set(0, -3.5,0)
    meshFloor.rotation.x = -Math.PI/2
    scene.add(meshFloor)


    const box1 = new THREE.BoxGeometry( 1 , 10 ,1)
    const box1M = new THREE.MeshBasicMaterial({color:"red"})
    const box1Mesh = new THREE.Mesh(box1, box1M)
    box1Mesh.position.z = -50

    scene.add(box1Mesh)


    const box2 = new THREE.BoxGeometry( 1 , 10 ,1)
    const box2M = new THREE.MeshBasicMaterial({color:"blue"})
    const box2Mesh = new THREE.Mesh(box2, box2M)
    box2Mesh.position.z = 50

    scene.add(box2Mesh)


    const box3 = new THREE.BoxGeometry( 1 , 10 ,1)
    const box3M = new THREE.MeshBasicMaterial({color:"violet"})
    const box3Mesh = new THREE.Mesh(box3, box3M)
    box3Mesh.position.z = -0
    box3Mesh.position.x = +50

    scene.add(box3Mesh)


    const box4 = new THREE.BoxGeometry( 1 , 10 ,1)
    const box4M = new THREE.MeshBasicMaterial({color:"yellow"})
    const box4Mesh = new THREE.Mesh(box4, box4M)
    box4Mesh.position.z = -0
    box4Mesh.position.x = -50

    scene.add(box4Mesh)




    
    /* scene gltf */

    let mixer = null
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    let PajaroVuelo = null

    gltfLoader.load(
        pajaro,
        (modelVuelo) =>
        {
            PajaroVuelo= modelVuelo.scene
            scene.add(PajaroVuelo)
            PajaroVuelo.position.set(0, -.4, -.5)
            PajaroVuelo.scale.set(.3,.3,.3)


            mixer = new THREE.AnimationMixer(modelVuelo.scene)
            const action = mixer.clipAction(modelVuelo.animations[1])
            action.setEffectiveTimeScale(.5);
            action.play()
        }
    )


 
    const cursor = {
        x: 0,
        y: 0
    }

    window.addEventListener("mousemove", ( e ) => {
        e.preventDefault();
        cursor.x = (e.x / size.width * 2- 1) ;
        cursor.y = -(e.y / size.height * 2 -1);

    } )

    window.addEventListener("touchmove", (event) => {
        // Prevenir el comportamiento por defecto del evento (desplazamiento de la página)
        event.preventDefault();
      
        // Obtener la posición del dedo en la pantalla
        const touchX = event.touches[0].clientX;
        const touchY = event.touches[0].clientY;
      
        // Calcular la posición normalizada del cursor
        cursor.x = (touchX / size.width * 2 - 1);
        cursor.y = -(touchY / size.height * 2 - 1);
      });

       
    // center position
    const centerX = size.width / 2;
    const centerY = size.height / 2;

    // distance from cursor to center
    const distanceX = cursor.x - centerX;
    const distanceY = cursor.y - centerY;


    
    
  
    // Función para actualizar la posición y rotación de la cámara
    const updateCamera = () => {

        // Calcular la posición por encima del aguila
        const targetPosition = PajaroVuelo.position.clone();
        targetPosition.y += 1.3; // Añadir una unidad a la altura del aguila

        camera.lookAt(PajaroVuelo.position)

        // Mover la cámara suavemente hacia la posición del aguila
        camera.position.lerp(targetPosition, 0.04);

    }



    const clock = new THREE.Clock()

    const animate = () =>{

        const time =clock.getDelta();
        renderer.autoClear = true

        /* vuelo del pajaro, configuracion de movimiento */
        if (PajaroVuelo !== null) {
          
            const scaleFactorX = distanceX / centerX * 0.6;
            const scaleFactorY = distanceY / centerY * 0.5;

            // Calcula el ángulo de rotación en el eje Y en función de la posición del cursor
            // El límite de rotación es de 720 grados (2 vueltas completas)
            const rotationY = (cursor.x * 5) % 180;
            
            // Rotación del modelo en el eje Y en función del ángulo calculado
            PajaroVuelo.rotation.y = rotationY * scaleFactorX;
            
            // Calcula el ángulo de rotación en el eje X en función de la posición del cursor
            // El límite de rotación es de 720 grados (2 vueltas completas)
            const rotationX = -(cursor.y * 1) % 180;
            
            // Rotación del modelo en el eje X en función del ángulo calculado
            PajaroVuelo.rotation.x = rotationX * scaleFactorY;

            PajaroVuelo.translateZ(-0.08);

            updateCamera()
        }


        if(mixer)
        {
            mixer.update(time)
        }
        
        renderer.render(scene,camera)
        window.requestAnimationFrame(animate)
    }
    
    animate()
    
    renderer.render(scene,camera)
        
}

export default sceneSpace;