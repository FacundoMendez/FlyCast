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
        <div className="box box1"></div>
        <div className="box box2" id="box2"></div>
        <div className="box box3"></div>
        <div className="box box4"></div>
        <div className="box box5"></div>
        <div className="box box6"></div>
    </div>
  )
}

export default Scene;