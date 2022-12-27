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
        {preloadTerrain & preloadModel ? <canvas className="webGlScene"></canvas> : <div className='cargando'>cargando</div> }
        
        </>
  )
}

export default SceneGetMap