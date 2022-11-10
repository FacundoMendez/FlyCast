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
        const count = 4000

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
            size: 0.07,
            sizeAttenuation: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            color: new THREE.Color("#ffc0ff"),
        })

        const particles = new THREE.Points(starsGeometry, particlesMaterial)
        particlesMaterial.alphaTest = 0.5
        /* particlesMaterial.vertexColors = true */

        scene.add(particles)





        /* aureola  */


        const parameters = {}
            parameters.count = 8000
            parameters.size = 0.02
            parameters.radius = 5
            parameters.branches = 3
            parameters.spin = 1
            parameters.randomness = 0.2
            parameters.randomnessPower = 3
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
                positionsAureola[i3 + 1] = randomY
                positionsAureola[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

                colorsAureola[i3    ] = 1
                colorsAureola[i3 + 1] = .49
                colorsAureola[i3 + 2] = 1

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







        /* fonts */


        let loader = new FontLoader()
        let font = loader.parse(typefaceFont);

        const textGeometry2 = new TextGeometry(
            'Pixel  Perfectionist',
            {
                font: font,
                size: 0.2,
                height: .04,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: .04,
                bevelSize: 0.008,
                bevelOffset: 0,
                bevelSegments: 10
            }
        )

        const textGeometry= new TextGeometry(
            'Creative  Developer',
            {
                font: font,
                size: 0.3,
                height: .04,
                curveSegments: 10,
                bevelEnabled: true,
                bevelThickness: .04,
                bevelSize: 0.008,
                bevelOffset: 0,
                bevelSegments: 10
            }
        )
        
        const textMaterial = new THREE.MeshNormalMaterial() /* 0xa44dff   0x00dd55*/
      /*   textMaterial.metalness = 0.58
        textMaterial.roughness = .1 */


        const text2 = new THREE.Mesh(textGeometry2, textMaterial) /* pixel perfect */
        text2.position.set(.5 ,0, 2.2)
        text2.rotation.x= .15

        const text = new THREE.Mesh(textGeometry, textMaterial) /* creative dev */
        text.position.set(15.9 , -.2, .2)
        text.rotation.y= .6
        text.rotation.x= .15

   
        scene.add(text, text2)
    

        textGeometry.computeBoundingBox()
        textGeometry.translate(
            - (textGeometry.boundingBox.max.x - 0.02) * 0.5, 
            - (textGeometry.boundingBox.max.y - 0.02) * 0.5, 
            - (textGeometry.boundingBox.max.z - 0.03) * 0.5  
        )
        textGeometry.center()



           // ambient light
           const ambientlight = new THREE.AmbientLight(0xffffff,2);
           scene.add(ambientlight);
           
           // point light
           const pointLight = new THREE.PointLight(0xffcc66, 1.3)
           pointLight.position.set(10, 22, 20);
           scene.add(pointLight);
           






        /* pruebas */

        

        const transitionHeader = () =>{
            gsap.registerPlugin(ScrollTrigger);

                gsap.to(camera.position,{
                    y : 22,
                    duration:1,
                    scrollTrigger:{
                        trigger: ".webGlScene",
                        start: "top 600px",
                        pin: true,
                        scrub: 5,
                        end: "+= 100%"
                    }
                })

                gsap.to(camera.position,{
                    x: 19.5,
                    delay:5,
                    duration:5,
                    scrollTrigger:{
                        trigger: ".webGlScene",
                        start: "top top",
                        pin: true,
                        scrub: 5,
                    }
                })

                gsap.to(camera.rotation,{
                    y: .7,
                    delay:10,
                    duration:5,
                    scrollTrigger:{
                        trigger: ".webGlScene",
                        start: "top top",
                        pin: true,
                        scrub: 5,
                    }
                })
                
        }

        transitionHeader()
      
        const animate = () =>{

            particles.rotation.y -= 0.001

            pointsAureolaMesh.rotation.y -= 0.004


            renderer.render(scene,camera)
            window.requestAnimationFrame(animate)
            renderer.autoClear = true
        }
        
        animate()
        
        renderer.render(scene,camera)
        
}

export default sceneSpace;