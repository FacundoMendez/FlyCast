import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import pajaro from "./src/Aguila.glb"
import terrain from "./mapNieve2.glb"
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'


const sceneSpace = (setPreloadModel, setPreloadTerrain) => {

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



    let camera;

    function setCamera(){

        camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
        camera.position.z = 1

        scene.add(camera)
    }

    setCamera()



    let renderer;

    function setRender(){
        renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            /* alpha:true */
        });
        
        renderer.setSize(size.width, size.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        renderer.physicallyCorrectLights = true;
       /*     renderer.outputEncoding = THREE.sRGBEncoding */
    }

    setRender()




    function setLights(){
        const ambientLight = new THREE.AmbientLight(0xffffff ,5)
        scene.add(ambientLight);
    }


    setLights()



    //fog(niebla)

    const fog = new THREE.Fog("#000000", 1, 90)

    scene.fog = fog





  /* ----------------------------------------- Model eagle fly -------------------------------------------------------------- */
    
    /* scene gltf */

    let speedScale = 1;
    let PajaroVuelo = null
    let mixer = null



    const cursor = {
        x: 0,
        y: 0
    }


    // center position
    const centerX = size.width / 2;
    const centerY = size.height / 2;

    // distance from cursor to center
    const distanceX = cursor.x - centerX;
    const distanceY = cursor.y - centerY;






    function modelFly(){
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')
    
        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)
    
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
                setPreloadModel(true)
            }
        )
    
    }

  


    function setCursorMovement(){

        /* desktop */
        canvas.addEventListener("mousemove", ( e ) => {
            e.preventDefault();
            cursor.x = (e.x / size.width * 2- 1) ;
            cursor.y = -(e.y / size.height * 2 -1);

        } )
    

        /* movile */
        canvas.addEventListener("touchmove", (event) => {

            // Prevenir el comportamiento por defecto del evento (desplazamiento de la página)
            event.preventDefault();
        
            // Obtener la posición del dedo en la pantalla
            const touchX = event.touches[0].clientX;
            const touchY = event.touches[0].clientY;
        
            // Calcular la posición normalizada del cursor
            cursor.x = (touchX / size.width * 2 - 1);
            cursor.y = -(touchY / size.height * 2 - 1);

        });

    }



    function setKeysEvents(){

        window.addEventListener("keydown", (event) => {
            if (event.keyCode === 16) {
                speedScale = 2;
            }
        });

        window.addEventListener("keyup", (event) => {
            if (event.keyCode === 16) {
                speedScale = 1;
            }
        });

    }


  
    // Función para actualizar la posición y rotación de la cámara
    const updateCamera = () => {

        // Calcular la posición por encima del aguila
        const targetPosition = PajaroVuelo.position.clone();
        targetPosition.y += 1.3; // Añadir una unidad a la altura del aguila


        camera.lookAt(PajaroVuelo.position)

        // Mover la cámara suavemente hacia la posición del aguila
        camera.position.lerp(targetPosition, .053);

    }

    

    const configFlyEagle = () => {
        // Límite inferior del área de vuelo (en unidades del eje Y)
        const minHeight = 15;
        const maxHeight = 55;

        const scaleFactorX = distanceX / centerX * 0.4;
        const scaleFactorY = distanceY / centerY * 0.7;
        

        // Calcula el ángulo de rotación en el eje Y en función de la posición del cursor
        const rotationY = (cursor.x * 3) % 360;

        // Calcula el ángulo de rotación en el eje X en función de la posición del cursor
        const rotationX = -(cursor.y * 1)  ;
        

        // Rotación del modelo en el eje Y en función del ángulo calculado
        PajaroVuelo.rotation.y += ((rotationY *4.3) * scaleFactorX - PajaroVuelo.rotation.y) * 0.015;
        
        // Suavizar la rotación en el eje X con una tasa de suavizado de 0.1
        PajaroVuelo.rotation.x += (rotationX * scaleFactorY - PajaroVuelo.rotation.x) * 0.7;


        /*velocidad de vuelo del aguila  */
        PajaroVuelo.translateZ(-0.11 * speedScale);


        // Si la posición actual es menor que el límite, evitar que el pájaro baje más o evita que el pajaro suba mas
        const currentPosition = PajaroVuelo.position.clone();

        if (currentPosition.y < minHeight) {
            currentPosition.y = minHeight;
        }else{
            if (currentPosition.y > maxHeight) {
                currentPosition.y = maxHeight;
            }
        }

       

        // Establecer la nueva posición del pájaro
        PajaroVuelo.position.copy(currentPosition);

    }




    modelFly()
    setCursorMovement()
    setKeysEvents()



 /* ------------------------------------------------------TERRAIN-------------------------------------------------------------- */



 let terrainForest = null

 function modelTerrain(){
     const dracoLoader = new DRACOLoader()
     dracoLoader.setDecoderPath('/draco/')
 
     const gltfLoader = new GLTFLoader()
     gltfLoader.setDRACOLoader(dracoLoader)
 
     gltfLoader.load(
         terrain,
         (modelTerrainGltf) =>
         {
             terrainForest= modelTerrainGltf.scene
             scene.add(terrainForest)
             terrainForest.position.set(0, -5.4, -.5)
             terrainForest.scale.set(1.7,1.7,1.7)
             setPreloadTerrain(true)
         }
     )
 
 }

 modelTerrain()





 /* ------------------------------------------------------------------------------------------------------------------- */



    const clock = new THREE.Clock()

    const animate = () =>{

        const time =clock.getDelta();
        renderer.autoClear = true


        /* vuelo del pajaro, configuracion de movimiento */
        if (PajaroVuelo !== null) {
          
            configFlyEagle()
            updateCamera()
        }

        if(mixer){
            mixer.update(time)
        }
        
        renderer.render(scene,camera)
        window.requestAnimationFrame(animate)
    }
    
    animate()
    
    renderer.render(scene,camera)
        
}

export default sceneSpace;