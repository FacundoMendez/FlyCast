import React from 'react'
import "./nav.css"

const Nav = () => {
  return (
    <div className="nav">
        <div className="lineNav"></div>
        <ul className='listNav'>
            <li>Trabajos</li>
            <li>Resumen</li>
            <li>Contacto</li>
        </ul>
    </div>
  )
}

export default Nav