import gsap from "gsap";

const preloadScroll = () => {

    /* preload */
    gsap.to(".loading",{
        opacity:0,
        duration:1,
        delay:2.8,
    })

    /* nav */
 

    gsap.to(".lineNav",{
        opacity:1,
        duration:1.5,
        delay:4,
        width:"50%"
    })
    
    gsap.to(".listNav",{
        opacity:1,
        duration:2,
        delay:6,
    })

    /* present */

    gsap.to(".containerPresent",{
        opacity:1,
        duration:2,
        delay:4.8,
    })

    
    gsap.to("#section03",{
        opacity:1,
        duration:2,
        delay:6.5,
    })


    /* scene */
    gsap.to(".containerScene",{
        opacity:5,
        delay:6.5,
    })

        
/*     const buttonExplore = document.querySelector(".explorarButton")
#section03
    buttonExplore.addEventListener("click", function(){
        gsap.to(".containerScene",{
            
        })
        console.log("hola")
    }) */
}

export default preloadScroll;
