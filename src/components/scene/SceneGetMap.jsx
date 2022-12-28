import React, { useEffect, useState, useRef }  from 'react'
import { NavLink } from 'react-router-dom'
import sceneSpace from './sceneSpace'
import "./scene.css"

const SceneGetMap = () => {

    const [preloadTerrain , setPreloadTerrain] = useState(false)
    const [preloadModel , setPreloadModel] = useState(false)

    const sceneRef = useRef(null);


    useEffect(() => {

        sceneSpace(setPreloadModel, setPreloadTerrain)

        // Copiar el valor de la ref a una variable y utilizar esa variable en la función de limpieza
        const currentScene = sceneRef.current;

        return () => {
            
          if (currentScene) {
            currentScene.remove();
          }
        };

      },[])

    return (
        <>
            <div>
                <div className={preloadTerrain & preloadModel ? 'cargandoActive ' : "cargando "}>
                    <p className={preloadTerrain & preloadModel ? 'loadActive ' : "load "}>cargando...</p> 
                </div>
                <canvas className="webGlScene"></canvas> 
                
                <NavLink to="/home"> 
                    <div className="buttonScene"  >
                        desactive Scene
                    </div>
                </NavLink>
            </div>
        
        </>
  )
}

export default SceneGetMap