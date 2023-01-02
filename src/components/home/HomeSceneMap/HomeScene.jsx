import React, { useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import homeMap from './homeMap'
import "./homeMap.css"
import gsap from 'gsap'

const HomeScene = () => {

  const sceneRef = useRef(null);
  
  useEffect(() => {

    gsap.to(".loadigMap", {
      width: "20%",
      duration: 1,
      backgroundColor: "rgb(255, 225, 171)"
    })

    homeMap()
    
    const currentScene = sceneRef.current;

    return () => {

      // Desactivar o eliminar la escena cuando el componente se desmonte
      if (currentScene) {
        currentScene.remove();
      }
    }

  },[])

  return (
    <div className="containerSceneHome">
      
      {/* <div className="preloadMap">
        <div className="loadigMap"></div>
      </div> */}
      
      <canvas className='homeSceneCanvas'></canvas>
      
      <NavLink to="/world"> 
        <div className="buttonScene"> active Scene  </div>
      </NavLink>

    </div> 
  )
}

export default HomeScene