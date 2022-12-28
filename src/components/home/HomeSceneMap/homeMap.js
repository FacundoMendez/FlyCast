import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import map from "./assets/map10.jpg"

const homeMap = () => {
    const mapCanvas = document.querySelector(".homeSceneCanvas")
    

    const scene = new THREE.Scene()
    

    
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



    const camera = new THREE.PerspectiveCamera(75 , size.width/size.height , 0.1 , 1000)
    camera.position.z = 12

    scene.add(camera)

    
    const renderer = new THREE.WebGLRenderer({
        canvas: mapCanvas,
        antialias : true,
        alpha:true
    })

    renderer.setSize(size.width , size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const textureLoader = new THREE.TextureLoader()
    const mapp = textureLoader.load(map)


    const plane = new THREE.PlaneBufferGeometry(40,24)
    const materialPlane = new THREE.MeshPhysicalMaterial({
        map:mapp , 
    })
    const meshPlane = new THREE.Mesh(plane , materialPlane)

    scene.add(meshPlane)


    const ambientLight = new THREE.AmbientLight(0xffffff ,1)
    scene.add(ambientLight)

    

    const controls = new OrbitControls(camera, mapCanvas)
    controls.enableDamping= true
    controls.enablePan = false
    // Desactiva la rotación y el desplazamiento en el eje Z
    controls.enableRotate = false;
    controls.minDistance = 8;
    controls.maxDistance = 12;





    // Obtiene la posición actual del mouse

    const cursor = {
        x: 0,
        y: 0
    }


    // Actualiza la posición del mouse cada vez que se mueve
    document.addEventListener('mousemove', (e) => {
        cursor.x = -(e.x / size.width * 3) ;
        cursor.y = (e.y / size.height * 3 );
    });

    document.addEventListener('touchmove', (e) => {
        // Obtiene la posición del primer dedo en la pantalla
        const touch = e.touches[0];
      
        // Actualiza la posición del cursor utilizando la posición del dedo
        cursor.x = -(touch.clientX / size.width * 3);
        cursor.y = (touch.clientY / size.height * 3);
      });


    // Crea una variable para almacenar la posición actual del plano
    let currentPosition = {
        x: 0,
        y: 0
    };
    

    // Mueve la cámara en el eje X y Y utilizando el movimiento del mouse
    function updateCamera() {
        const velocidadDeMov = 0.05;

        currentPosition.x += (cursor.x - currentPosition.x) * velocidadDeMov;
        currentPosition.y += (cursor.y - currentPosition.y) * velocidadDeMov;

          // Limita la posición del plano entre   en el eje X y en el eje Y
        currentPosition.x = Math.max(-1, Math.min(currentPosition.x,1));
        currentPosition.y = Math.max(-6.5, Math.min(currentPosition.y, 2.5));
            
        // Aplica la posición interpolada al plano
        meshPlane.position.x = currentPosition.x;
        meshPlane.position.y = currentPosition.y;
    }





    const animate = () => {
        controls.update()
        updateCamera()

        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
    }

    animate()

    renderer.render(scene,camera)


}

export default homeMap;