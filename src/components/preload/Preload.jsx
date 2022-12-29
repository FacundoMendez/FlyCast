import React from 'react'
import { NavLink } from 'react-router-dom'
import videoSmoke from "../home/HomeSceneMap/assets/smoke.mp4"
import "./preload.css"
import buttonPreload from "./src/buttonPreload.png"

const Preload = () => {
  return (
    <div className="preload">
        <video className='smokePreload' src={videoSmoke} autoPlay loop muted type="video/mp4"></video>
       
        <h1 className='titlePreload' data-heading="Fly High" >Fly High</h1>
        
        <NavLink to="/home">
          <div className="buttonLinkHome">
            <img className='buttonPreload' src={buttonPreload} alt="buttonPreload" />
            <h2 className='enter'>Enter</h2>
          </div>
        </NavLink>
    </div>
  )
}

export default Preload