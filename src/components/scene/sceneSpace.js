import * as THREE from 'three';
import pisoTextura from "./src/textureFloor.png"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

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

       
      const animate = () =>{

          renderer.render(scene,camera)
          window.requestAnimationFrame(animate)
          renderer.autoClear = true
      }
      
      animate()
      
      renderer.render(scene,camera)
        
}

export default sceneSpace;