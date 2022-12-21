import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Mountains from "./src/Mountains.glb"
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


        const cameraGroup = new THREE.Group()
        scene.add(cameraGroup)

        // Base camera
        const camera = new THREE.PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
        camera.position.z = 3
        cameraGroup.add(camera)
        

        // renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha:true
        });
        
        renderer.setSize(size.width, size.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
       renderer.physicallyCorrectLights = true;
 /*       renderer.outputEncoding = THREE.sRGBEncoding */

        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.enablePan = false
        controls.minDistance = 0
        controls.maxDistance =1
        controls.minPolarAngle = .8;
        controls.maxPolarAngle = 2;



        /* scene gltf */
        let sceneMountains

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')

        const gltfLoader = new GLTFLoader()
        gltfLoader.setDRACOLoader(dracoLoader)
        gltfLoader.load(
            Mountains,
            (gltf) =>
            {
                sceneMountains= gltf.scene
                scene.add(sceneMountains)
                sceneMountains.position.set(0,-1,0)
                sceneMountains.scale.set(.3,.3,.3)
            }
        )

        
        const pointLight = new THREE.PointLight( 0xC776FF, 35 );
        pointLight.position.set(0,0,0)
        scene.add( pointLight );


                
        const pointLight2 = new THREE.PointLight( 0xC776FF, 35 );
        pointLight2.position.set(0,0,-7)
        scene.add( pointLight2 );

     


       
      const animate = () =>{

          renderer.render(scene,camera)
          window.requestAnimationFrame(animate)
          renderer.autoClear = true
          controls.update()
      }
      
      animate()
      
      renderer.render(scene,camera)
        
}

export default sceneSpace;