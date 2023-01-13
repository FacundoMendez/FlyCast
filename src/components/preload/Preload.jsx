import React , { useEffect, useState }from 'react'
import { NavLink } from 'react-router-dom'
import videoSmoke from "../home/HomeSceneMap/assets/smoke.mp4"
import "./preload.css"
import buttonPreload from "./src/buttonPreload.png"
import gsap from 'gsap'

const Preload = () => {

  const [porcentaje , setPorcentaje] = useState(0)      //cantidad en %
  const [style, setStyle] = useState()


  useEffect(() => {

    const newStyle = {
      width: `${porcentaje}%`,
      backgroundColor: "rgb(255, 217, 161)",
      transition: " transition: all 1s ease-in-out"
    }
    setStyle(newStyle);


    const interval = setInterval(() => {
      setPorcentaje(prevPorcentaje => {
        if (prevPorcentaje >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevPorcentaje + 1;
      });
    }, 100);



    const animate = () => {
      if(porcentaje === 100){
          
        const tl = gsap.timeline({
          duration: 1.5 
        })
  
        tl.to(".boxPreload", {
          opacity:0 ,
          zIndex: -1,
          visibility:"hidden",
        })
  
        tl.to(".preload",{
          opacity: 2,
          duration: 2.5,
        })
      }
    }

    animate()


    return () => {
      animate()

    }

  },[porcentaje, setPorcentaje])




  return (
  <div className="containerPreload">

      <div className="boxPreload">
        <div className="boxLoading">
          <div className="loadigMap" style={style}></div>
        </div>
      </div>


      <div className="preload">

            <video className='smokePreload' src={videoSmoke} autoPlay loop muted type="video/mp4"></video>
            
            <h1 className='titlePreload' data-heading="Fly High" >Fly High</h1>
            
            <NavLink to="/home">
              <div className="buttonLinkHome">
                <img className='buttonPreload' src={buttonPreload} alt="buttonPreload" />
                <h2 className='enter'>Enter</h2>
              </div>
            </NavLink>
        </div>

    </div>
  )
}

export default Preload