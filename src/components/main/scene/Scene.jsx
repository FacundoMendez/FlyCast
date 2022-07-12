import React,{useEffect} from 'react'
import sceneSpace from './sceneSpace'
import "./scene.css"
import sceneScroll from './sceneScroll'

const Scene = () => {
    useEffect(() => {
        sceneSpace()
        sceneScroll()
    },[])
  return (
    <div id='containerScene' className='containerScene'>
        <canvas className="webGlScene"></canvas>
    </div>
  )
}

export default Scene;