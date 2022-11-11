import React from 'react'
import "./present.css"
import effectTransition from './effectTransition'
/* import efectVideo from "./src/smoke.mp4" */

const Present = () => {
  return (
    <div className="containerPresent">
            <h1 className='titlePresent'>
                <span>Facundo</span>
                <span>Mendez</span> <br />
                <span id='frontend'>Frontend</span>
                <span>Developer.</span> 
            </h1>
              <section id="section03" className="demo">
                <a href="#box2" onClick={() => effectTransition()}><span></span></a>  
              </section>
    </div>
  )
}

export default Present