import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import mapPlane from "./assets/mapPlane3.jpg"
import cloud from "./assets/cloud2.png"
import gsap from "gsap";

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
    camera.position.z = 60

    scene.add(camera)

    
    const renderer = new THREE.WebGLRenderer({
        canvas: mapCanvas,
        antialias : true,
        alpha:true
    })

    renderer.setSize(size.width , size.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


  /* Orbit Controls */
    const controls = new OrbitControls(camera, mapCanvas)
    controls.enableDamping= true
    controls.enablePan = false
    // Desactiva la rotación y el desplazamiento en el eje Z
    controls.enableRotate = false;





    /* textures */

    const textureLoader = new THREE.TextureLoader()
    const mappPlane = textureLoader.load(mapPlane)
    const cloudTexture = textureLoader.load(cloud)


    /* light */

    const ambientLight = new THREE.AmbientLight(0xffffff ,1)
    scene.add(ambientLight)



 

    /* map */

    const plane = new THREE.PlaneBufferGeometry(100,50)
    const materialPlane = new THREE.MeshPhysicalMaterial({
        map:mappPlane , 
    })
    const meshPlane = new THREE.Mesh(plane , materialPlane)

    scene.add(meshPlane)






    /* sections map */
    const section1map = new THREE.OctahedronGeometry( 1 );
    const materialS1 = new THREE.MeshBasicMaterial({
      color:"#F5D0A9",
      side: THREE.DoubleSide 
    })
    const meshS1 = new THREE.Mesh(section1map , materialS1)
    scene.add(meshS1)


  
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


  

    /* clouds */

    const cloudGeometry = new THREE.PlaneBufferGeometry(6, 4);
    const cloudMaterialIz = new THREE.MeshBasicMaterial({
      map: cloudTexture,
      transparent: true,
      opacity:.9
    });
    const meshCloud = new THREE.Mesh(cloudGeometry, cloudMaterialIz);
    
    meshCloud.position.set(0, 0 , 18.5 );
    scene.add(meshCloud);


    const cloudGeometryDer = new THREE.PlaneBufferGeometry(9,6);
    const meshCloudDer = new THREE.Mesh(cloudGeometryDer, cloudMaterialIz);
    
    meshCloudDer.position.set(0, 0 , 17);
    scene.add(meshCloudDer);

    

  // Crea una variable para almacenar la posición actual del plano
    let currentPosition = {
      x: 0,
      y: 0
  };

  const planeWidth = 100;
  const planeHeight = 50;

  const minX = -planeWidth / 2;
  const maxX = planeWidth / 2;
  const minY = -planeHeight / 2;
  const maxY = planeHeight / 2;

  
      
    // Mueve la cámara en el eje X y Y utilizando el movimiento del mouse
    function updateCamera() {
        const velocidadDeMov = 0.09;

        currentPosition.x += (cursor.x - currentPosition.x) * velocidadDeMov;
        currentPosition.y += (cursor.y - currentPosition.y) * velocidadDeMov;

          // Limita la posición del plano entre   en el eje X y en el eje Y
        currentPosition.x = Math.max(minX, Math.min(currentPosition.x, maxX));
        currentPosition.y = Math.max(minY, Math.min(currentPosition.y, maxY));
            
        // Aplica la posición interpolada al plano
        meshPlane.position.x = currentPosition.x -1;
        meshPlane.position.y = currentPosition.y -2;

        meshCloud.position.x = currentPosition.x -6 ;
        meshCloud.position.y = currentPosition.y -3  ;

        meshCloudDer.position.x = currentPosition.x + 10 ;
        meshCloudDer.position.y = currentPosition.y + 2 ;
        
        meshS1.position.x = currentPosition.x - 15 ;
        meshS1.position.y = currentPosition.y +2 ;

    }



    
    const introMovement = () =>{


          /* cloud */
          let meshCloud = null
          const numClouds = 35;
          const cloudGeometry = new THREE.PlaneBufferGeometry(30, 20);
      
          let cloudMaterial = new THREE.MeshBasicMaterial({
            map: cloudTexture,
            transparent: true,
            opacity: .8
          });
      
          for (let i = 0; i < numClouds; i++) {
          
              meshCloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
              meshCloud.position.set(
                -13 + Math.random() * 25,
                -25 + Math.random() * planeHeight,
                22.6 + Math.random() * 18
              );
              scene.add(meshCloud);
          }
      


          const cielo = new THREE.BoxBufferGeometry(180, 100, 40)
          const cielomaterial = new THREE.MeshBasicMaterial({
            color: "#5c8291",
            transparent: true,
            side: THREE.DoubleSide
          })
          const meshCielo = new THREE.Mesh(cielo, cielomaterial)
          meshCielo.position.set(0 , 0 , -10)

          if(meshCloud !== null ){
            scene.add(meshCielo)
          }

        
          const updateZoomControls = () => {
            controls.maxDistance= 23
            controls.minDistance= 19
          }

          
          gsap.to(camera.position, {
            z: 23,
            duration: 2.5,
            onComplete:updateZoomControls
          })
          gsap.to(cielomaterial, {
            opacity: .9,
            delay: 1
          })
          gsap.to(cielomaterial, {
            opacity: 0,
            delay: 1.5
          })
          gsap.to(cloudMaterial, {
            opacity: 0,
            delay: 1.5,
          })

    }



    introMovement()


    const animate = () => {
   
        controls.update()
        updateCamera()
        meshS1.rotation.z += 0.05
        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
    }

    animate()

    renderer.render(scene,camera)


}

export default homeMap;