import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

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
        const camera = new THREE.PerspectiveCamera(35, size.width / size.height, 0.1, 100)
        camera.position.z = 20
        camera.position.y = 1
        camera.position.x = -4
        cameraGroup.add(camera)
        

        // renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha:true
        });
        
        renderer.setSize(size.width, size.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))





            const movement = () => {
                gsap.registerPlugin(ScrollTrigger)

                const link_button1 = document.querySelector(".link_button1")

                const tl = gsap.timeline({
                    duration:3
                })

                link_button1.addEventListener("click", () => {
                    tl.to(camera.position, {
                        duration:1,
                        z: 2,
                        x:1,
                    })
                })
      

            }

            movement()


            const move = {
                x: 0,
                y: 0
            }

            window.addEventListener("mousemove", (e) => {
                move.x = e.x / size.width * 0.5
                move.y = -(e.y / size.height * 0.5) 
            })


         
        const animate = () =>{

            renderer.render(scene,camera)
            camera.position.x = move.x * .4
            camera.position.y = move.y * .4

            window.requestAnimationFrame(animate)
            renderer.autoClear = true
        }
        
        animate()
        
        renderer.render(scene,camera)
        
}

export default sceneSpace;