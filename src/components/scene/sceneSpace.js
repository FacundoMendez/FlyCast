import * as THREE from 'three';
/* import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import Mountains from "./src/Mountains.glb"
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Elastic } from 'gsap';


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
 /*       renderer.outputEncoding = THREE.sRGBEncoding */



/*         const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.enablePan = false
        controls.minDistance = 0
        controls.maxDistance =1
        controls.minPolarAngle = .8;
        controls.maxPolarAngle = 2; */



        const cursor = {
            x: 0,
            y: 0
        }
    
        window.addEventListener("mousemove", ( e ) => {
            cursor.x = e.x / size.width * 0.5
            cursor.y = - (e.y / size.height * 0.5)
        } )
    



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


        /* lights */
        
        const pointLight = new THREE.PointLight( 0xAf76FF, 38 );
        pointLight.position.set(0,-.7,0)
        scene.add( pointLight );

                

     
        let setLight2 = false
        let setLight3 = false



        /* animate */

        const movementScroll = () => {
            gsap.registerPlugin(ScrollTrigger);

            const link_button1 = document.querySelector(".link_button1")
            const link_button2 = document.querySelector(".link_button2")
            const link_button3 = document.querySelector(".link_button3")


            link_button1.addEventListener("click", () => {
                gsap.to(camera.position , {
                    z:1,
                    duration: 1.2,
                    ease: Elastic

                })
            })

            link_button2.addEventListener("click", () => {
                gsap.to(camera.position , {
                    z: -3,
                    duration: 1.6,
                    ease: Elastic
                })

                if ( setLight2 === false){
                    const pointLight2 = new THREE.PointLight( 0xAf76FF, 40 );
                    pointLight2.position.set(0,-.2,-7)
                    scene.add( pointLight2 );
                    setLight2 = true
                }

        
            })

            link_button3.addEventListener("click", () => {
                gsap.to(camera.position , {
                    z: -10,
                    duration: 1.2,
                    ease: Elastic
                })

                if ( setLight3 === false){
                    const pointLight3 = new THREE.PointLight( 0xAf76FF, 38 );
                    pointLight3.position.set(1,-.5,-12)
                    scene.add( pointLight3 );
                    setLight3 = true
                }
        
            })
        
    
      
        }
    
        movementScroll()





    const clock = new THREE.Clock()

    const animate = () =>{

      const time = clock.getElapsedTime()
        const ghost1Angle = time 

        renderer.render(scene,camera)
        window.requestAnimationFrame(animate)
        renderer.autoClear = true
        /* controls.update() */

        camera.position.y = cursor.y * .3
        camera.position.x = cursor.x * .3

     /*    pointLight2.position.x = -Math.sin(ghost1Angle ) *1 */
        pointLight.position.x = Math.cos(ghost1Angle ) -3
/*         pointLight3.position.x = Math.sin(ghost1Angle )  */

    }
    
    animate()
    
    renderer.render(scene,camera)
        
}

export default sceneSpace;