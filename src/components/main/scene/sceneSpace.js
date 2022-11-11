import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import typefaceFont from '../../fonts/LLPixel_Regular.json'
import { Power1 } from 'gsap';

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
        camera.position.z = 6
        camera.position.y = 19
        cameraGroup.add(camera)
        





        // renderer setup
        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            antialias: true,
            alpha:true
        });
        
        renderer.setSize(size.width, size.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))





        // Stars 


        const starsGeometry =new THREE.BufferGeometry()
        const count = 2000

        const colors = new Float32Array(count * 3)
        const positions = new Float32Array(count * 3) 
        let geometry = null
        let material = null
        let points = null

        

        for(let i = 0; i < count * 3; i++) {

            if(points !== null)
            {
                geometry.dispose()
                material.dispose()
                scene.remove(points)
            }

            positions[i] = (Math.random() - 0.5) * 45
            colors[i] = Math.random()
        }


        starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        


        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.0,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            color: new THREE.Color("#55FF9D"),
        })

        const particles = new THREE.Points(starsGeometry, particlesMaterial)
        particlesMaterial.alphaTest = .4
        /* particlesMaterial.vertexColors = true */

        scene.add(particles)





        /* aureola  */


        const parameters = {}
            parameters.count = 9000
            parameters.size = 0.01
            parameters.radius = 6
            parameters.branches = 3
            parameters.spin = 1
            parameters.randomness =1
            parameters.randomnessPower = 5
            parameters.insideColor = '#ff6030'
            parameters.outsideColor = '#1b3984'

            let geometryAureola = null
            let materialAureola = null
            let pointsAureola = null
        

            let geometryAureolaStars = new THREE.BufferGeometry()

            const positionsAureola = new Float32Array(parameters.count * 3)
            const colorsAureola  = new Float32Array(parameters.count * 3)

         
        
            for(let i = 0; i < parameters.count; i++)
            {

                if(pointsAureola !== null)
                {
                    geometryAureola.dispose()
                    materialAureola.dispose()
                    scene.remove(pointsAureola)
                }
    
         

                const i3 = i * 3

                const radius = Math.random() * parameters.radius
        
                const spinAngle = radius * parameters.spin
                const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2
                
                const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
                const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius
                const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * parameters.randomness * radius

                const colorInside = new THREE.Color(parameters.insideColor)
                const colorOutside = new THREE.Color(parameters.outsideColor)

                const mixedColor = colorInside.clone()
                mixedColor.lerp(colorOutside, radius / parameters.radius)


                positionsAureola[i3    ] = Math.cos(branchAngle + spinAngle) * radius + randomX
                positionsAureola[i3 + 4] = randomY
                positionsAureola[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

                colorsAureola[i3    ] = .2
                colorsAureola[i3 + 1] = .59 /* intensiti */
                colorsAureola[i3 + 2] = .4 

            }
        
            geometryAureolaStars.setAttribute('position', new THREE.BufferAttribute(positionsAureola , 3))
            geometryAureolaStars.setAttribute('color', new THREE.BufferAttribute(colorsAureola, 3))

            const materialAureolaStars = new THREE.PointsMaterial({
                size: parameters.size,
                sizeAttenuation: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending,
                vertexColors: true
            })

            const pointsAureolaMesh  = new THREE.Points(geometryAureolaStars, materialAureolaStars)

            pointsAureolaMesh .position.set(7, 2, -15)
            pointsAureolaMesh .rotation.x = .4
            scene.add(pointsAureolaMesh )






           // ambient light
           const ambientlight = new THREE.AmbientLight(0xffffff,2);
           scene.add(ambientlight);
           
           // point light
           const pointLight = new THREE.PointLight(0xffcc66, 1.3)
           pointLight.position.set(10, 22, 20);
           scene.add(pointLight);
           


        const transitionHeader = () =>{


            gsap.registerPlugin(ScrollTrigger);
            //set camera position
            camera.position.y = 19;
            camera.position.z = 6;
            camera.position.x = 0;

            
            const tl = gsap.timeline({
                default: {
                    ease: Power1,
                    duration:5,
                }
            });
        
                tl.to(camera.position,{
                    y :0,
                    z: 7,
                    x: 0,
                    duration:5,
                    scrollTrigger: {
                        trigger: ".box1",
                        start: "top top",
                        end:"bottom bottom",
                        scrub: 5,
                    }
                })

                tl.from(".container1_text",{
                    xPercent: "-= 300",
                    opacity: -3,
                    scale: -3,
                    scrollTrigger: {
                        trigger: ".box2",
                        start: "top 800px",
                        end:"bottom bottom",
                        scrub: 5,
                    }
                })

                tl.to(camera.position,{
                    x: 21,
                    scrollTrigger: {
                        trigger: ".box2",
                        start: "top top",
                        scrub: 5,
                    }
                })


                tl.from(".container2_text",{
                    xPercent: "-= 300",
                    opacity: -3,
                    scale: -3,
                    scrollTrigger: {
                        trigger: ".box3",
                        start: "top 800px",
                        end:"bottom bottom",
                        scrub: 5,
                    }
                })


                tl.to(camera.rotation,{
                    y:.7,
                    scrollTrigger: {
                        trigger: ".box3",
                        start: "top top",
                        scrub: 5,
                    }
                })


                tl.from(".container3_text",{
                    xPercent: "-= 300",
                    opacity: -3,
                    scale: -3,
                    scrollTrigger: {
                        trigger: ".box4",
                        start: "top 800px",
                        end:"bottom bottom",
                        scrub: 5,
                    }
                })

                 

                tl.to(camera.position,{
                    z: -10,
                    scrollTrigger: {
                        trigger: ".box4",
                        start: "top top",
                        scrub: 5,
                    }
                })

                tl.from(".container4_text",{
                    xPercent: "-= 300",
                    opacity: -3,
                    scale: -3,
                    scrollTrigger: {
                        trigger: ".box5",
                        start: "top 800px",
                        end:"bottom bottom",
                        scrub: 5,
                    }
                })


                tl.to(pointsAureolaMesh.position,{
                    x:19,
                    y: .3,
                    scrollTrigger: {
                        trigger: ".box6",
                        start: "top 800px",
                        end:"bottom bottom",
                        scrub: 5,
                    }
                })

                
                tl.to(pointsAureolaMesh.rotation,{
                    yPercent:"-=3",
                    scrollTrigger: {
                        trigger: ".box6",
                        start: "top 800px",
                        end:"bottom bottom",
                        scrub: 5,
                    }
                })


                           
                tl.to(pointsAureolaMesh.rotation,{
                    xPercent:"-=26",
                    scrollTrigger: {
                        trigger: ".box6",
                        start: "top 300px",
                        end:"bottom bottom",
                        scrub: 5,
                    }
                })
       
        }

        transitionHeader()
      
        const animate = () =>{

            particles.rotation.y -= 0.001
            pointsAureolaMesh.rotation.y -= 0.005

            renderer.render(scene,camera)
            window.requestAnimationFrame(animate)
            renderer.autoClear = true
        }
        
        animate()
        
        renderer.render(scene,camera)
        
}

export default sceneSpace;