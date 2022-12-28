import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import map from "./assets/map.jpg"

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
    camera.position.z = 10
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

    const plane = new THREE.PlaneBufferGeometry(32,20)
    const materialPlane = new THREE.MeshBasicMaterial({color:"gray" , map:mapp , side: THREE.DoubleSide})
    const meshPlane = new THREE.Mesh(plane , materialPlane)

    meshPlane.position.set(0,0,0)
    scene.add(meshPlane)


    const controls = new OrbitControls(camera, mapCanvas)
    controls.enableDamping= true
    controls.enableRotate = false
    controls.enablePan = false

    const animate = () => {
        controls.update()
        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
    }

    animate()

    renderer.render(scene,camera)


}

export default homeMap;