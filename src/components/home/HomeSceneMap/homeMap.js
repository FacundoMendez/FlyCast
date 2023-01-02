import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import map from "./assets/map11.png"
import cloud from "./assets/cloud2.png"


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
    const cloudTexture = textureLoader.load(cloud)


    const plane = new THREE.PlaneBufferGeometry(46,25)
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

    const planeWidth = 46;
    const planeHeight = 25;

    const minX = -planeWidth / 2;
    const maxX = planeWidth / 2;
    const minY = -planeHeight / 2;
    const maxY = planeHeight / 2;


    

    /* cloud */
    const numClouds = 10;
    let meshCloud;
    const clouds = [];

    for (let i = 0; i < numClouds; i++) {
        const cloudGeometry = new THREE.PlaneBufferGeometry(6, 3);
        const cloudMaterial = new THREE.MeshBasicMaterial({
          map: cloudTexture,
          transparent: true,
        });
        meshCloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        meshCloud.position.set(
            minX + Math.random() * planeWidth,
            minY + Math.random() * planeHeight,
            -5 + Math.random() * 20
          );
        clouds.push(meshCloud);
        scene.add(meshCloud);
      }

      
      const prevPosition = {
        x: currentPosition.x,
        y: currentPosition.y,
      };

    // Mueve la cámara en el eje X y Y utilizando el movimiento del mouse
    function updateCamera() {
        const velocidadDeMov = 0.05;

        currentPosition.x += (cursor.x - currentPosition.x) * velocidadDeMov;
        currentPosition.y += (cursor.y - currentPosition.y) * velocidadDeMov;

          // Limita la posición del plano entre   en el eje X y en el eje Y
        currentPosition.x = Math.max(minX, Math.min(currentPosition.x, maxX));
        currentPosition.y = Math.max(minY, Math.min(currentPosition.y, maxY));
            
        // Aplica la posición interpolada al plano
        meshPlane.position.x = currentPosition.x;
        meshPlane.position.y = currentPosition.y;

      /*   for (const cloud of clouds) {
            cloud.position.x =  prevPosition.x;
            cloud.position.y =  prevPosition.y;
          } */
          
    }





    const animate = () => {
        const time = Date.now();
   
        controls.update()
        updateCamera()

        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
    }

    animate()

    renderer.render(scene,camera)


}

export default homeMap;