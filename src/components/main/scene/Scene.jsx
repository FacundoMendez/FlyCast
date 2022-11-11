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


        <div className="box box2" id="box2">
          <div className="container_text container1_text">Container1</div>
        </div>
        <div className="box box3">
          <div className="container_text container2_text">Container2</div>
        </div>
        <div className="box box4">
          <div className="container_text container3_text">Container3</div>
        </div>
        <div className="box box5">
          <div className="container_text container4_text">Container4</div>
        </div>
  
        <div className="box box6">
        </div>
    </div>
  )
}

export default Scene;