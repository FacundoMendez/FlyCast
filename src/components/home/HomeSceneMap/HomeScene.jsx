import React, { useState } from 'react'
import SceneGetMap from '../../scene/SceneGetMap'
import "./homeMap.css"

const HomeScene = () => {

  const [activeScene , setActiveScene] = useState(false)





  const handlerScene = () => {
    setActiveScene(!activeScene)
  }

  return (
    <div className='containerSceneHome'>
      {/* <canvas className='homeSceneCanvas'></canvas> */}

      <div className="buttonActiveScene" onClick={() => handlerScene()}>
        active Scene
     
      </div>

      {activeScene && <SceneGetMap /> }
      
    </div> 
  )
}

export default HomeScene