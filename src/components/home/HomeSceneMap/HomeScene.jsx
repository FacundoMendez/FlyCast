import React, { useState } from 'react'
import { useEffect } from 'react'
import Preload from '../../preload/Preload'
import SceneGetMap from '../../scene/SceneGetMap'
import homeMap from './homeMap'
import "./homeMap.css"

const HomeScene = () => {

  const [activeScene , setActiveScene] = useState(false)

  const handlerScene = () => {
    setActiveScene(!activeScene)
  }
  
  useEffect(() => {
    homeMap()
  },[])

  return (
    <div className="containerSceneHome">
      
      
      {
        activeScene ? 
          <div className="homeBox">
            <div className="buttonScene"  onClick={() => handlerScene()}>
              desactive Scene
            </div>
            <SceneGetMap /> 

          </div>
        : 
          <div className="homeBox">
              <div className="buttonActiveScene"  onClick={() => handlerScene()}>
                active Scene
              </div>
            <canvas className='homeSceneCanvas'></canvas>

          </div>

      }


    </div> 
  )
}

export default HomeScene