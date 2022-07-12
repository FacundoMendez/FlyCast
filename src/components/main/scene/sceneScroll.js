import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

const sceneScroll = () => {
    gsap.registerPlugin(ScrollTrigger);

    let tl = gsap.timeline({duration: 3,})
    
       tl.to(".description",{
           opacity:3,
           scale:1,
           scrollTrigger:{
               trigger: ".containerResumen",
               start: "top 400px",
               scrub: 2,
           }
       })

           
   
}

export default sceneScroll