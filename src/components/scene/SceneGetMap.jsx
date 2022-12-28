import React, { useEffect, useState }  from 'react'
import sceneSpace from './sceneSpace'

const SceneGetMap = () => {

    const [preloadTerrain , setPreloadTerrain] = useState(false)
    const [preloadModel , setPreloadModel] = useState(false)

    useEffect(() => {
        sceneSpace(setPreloadModel, setPreloadTerrain)
    },[setPreloadModel, setPreloadTerrain])

    return (
        <>
            <div>
                <div className={preloadTerrain & preloadModel ? 'cargandoActive ' : "cargando "}>
                    <p className={preloadTerrain & preloadModel ? 'loadActive ' : "load "}>cargando...</p> 
                </div>
                <canvas className="webGlScene"></canvas> 
              
            </div>
        
        </>
  )
}

export default SceneGetMap