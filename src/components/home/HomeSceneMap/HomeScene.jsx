import React, { useRef, useEffect, useState} from 'react'
import { NavLink } from 'react-router-dom'
import homeMap from './homeMap'
import "./homeMap.css"
import gsap from 'gsap'
import Loading from '../../loading/Loading'


const HomeScene = () => {

  const sceneRef = useRef(null);

  const [porcentaje , setPorcentaje] = useState(0)      //cantidad en %

  
  useEffect(() => {

      if(porcentaje === 100){
        
        const tl = gsap.timeline({
          duration: 1.5 
        })

        tl.to(".preloadMap", {
          opacity:0 ,
          zIndex: -1,
          visibility:"hidden",
          onComplete: homeMap   //ejectuta la scena
        })

        tl.to(".homeSceneCanvas",{
          opacity: 2,
          duration: 2.5,
        })
      }
 
    
    const currentScene = sceneRef.current;
    return () => {
      // Desactivar o eliminar la escena cuando el componente se desmonte
      if (currentScene) {
        currentScene.remove();
      }
    }

  },[porcentaje])





  return (
    <div className="containerSceneHome">

        <Loading porcentaje={porcentaje} setPorcentaje={setPorcentaje} /> 
      
        <canvas className='homeSceneCanvas'></canvas>
        
        <NavLink to="/world"> 
          <div className="buttonScene"> active Scene  </div>
        </NavLink>

    </div> 
  )
}

export default HomeScene