import React, { useRef, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import homeMap from './homeMap'
import "./homeMap.css"

const HomeScene = () => {

  const sceneRef = useRef(null);
  
  useEffect(() => {
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
      
      <canvas className='homeSceneCanvas'></canvas>
      
      <NavLink to="/world"> 
        <div className="buttonScene"> active Scene  </div>
      </NavLink>

    </div> 
  )
}

export default HomeScene