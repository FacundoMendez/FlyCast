import * as THREE from "three"


const homeMap = () => {
    const mapCanvas = document.querySelector(".homeSceneCanvas")

    const scene = new THREE.Scene()

    const size = {
        width : window.innerWidth,
        heigth: window.innerHeight
    }

    document.addEventListener("resize", () => {
        size.width = window.innerWidth
        size.heigth = window.innerHeight

        camera.updateProjectionMatrix()
        camera.aspect = size.width/ size.heigth

        renderer.setPixelRatio( Math.min(window.devicePixelRatio ,2))
        renderer.setSize(size.width , size.heigth)


    })


    const camera = new THREE.PerspectiveCamera(75 , size.width/size.heigth , 0.1 , 1000)
    camera.position.z = 3
    scene.add(camera)

    
    const renderer = new THREE.WebGLRenderer({
        canvas: mapCanvas,
        antialias : true
    })

    renderer.setSize(size.width , size.heigth)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))











    const animate = () => {

        renderer.render(scene, camera)
        window.requestAnimationFrame(animate)
    }

    animate()

    renderer.render(scene,camera)


}

export default homeMap;