import './App.css';
import Home from './components/home/Home';
import React, {useEffect, useState} from 'react'
import Context from "./components/context/Context"
import WaveAudio from './components/assets/waveAudio/WaveAudio';


function App() {

  const [audioActive, setAudioActive] = useState(true)

  const changeAudio = () => {
    setAudioActive(!audioActive)
  }


  useEffect(() => {
    const cursor = document.querySelector('.cursor')

    cursor.style.visibility = 'hidden'
    
    document.addEventListener('mousemove', (event) => {
      cursor.setAttribute(`style`, `top: ${event.clientY - 6}px; left: ${event.clientX - 6}px`)
    })

    
  },[])

  return (
    <Context.Provider value={{audioActive, setAudioActive , changeAudio }}>
      <div className="App" id='app'>
   
        <Home/>
        <div className="audioChange" onClick={() => changeAudio()}>
          <WaveAudio/>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
