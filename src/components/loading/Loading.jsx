import React, {useState} from 'react'
import { useEffect } from 'react';
import "./loading.css"

const Loading = ({porcentaje, setPorcentaje}) => {   //recive 2 parametros, uno que controla el porcentaje y otro que lo modifica

    const [style, setStyle] = useState()


    useEffect(() => {

        const newStyle = {
            width: `${porcentaje}%`,
            backgroundColor: "rgb(255, 217, 161)",
            transition: " transition: all 1s ease-in-out"
        }
        setStyle(newStyle);



        const interval = setInterval(() => {
          setPorcentaje(prevPorcentaje => {
            if (prevPorcentaje >= 100) {
              clearInterval(interval);
              return 100;
            }
            return prevPorcentaje + 1;
          });
        }, 500);

    },[porcentaje, setPorcentaje])




  return (
    <div className="preloadMap">
        <div className="boxLoading">
          <div className="loadingLoad">
            <p className="titleLoading"> Loading </p>
            <span class="loader"></span>
          </div>

          <div className="loadigMap" style={style}></div>
        </div>
    </div>
  )
}

export default Loading