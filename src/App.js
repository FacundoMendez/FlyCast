import './App.css';
import Home from './components/home/Home';
import React, {useState} from 'react'
import Context from "./components/context/Context"
import WaveAudio from './components/assets/waveAudio/WaveAudio';
import HomeScene from './components/home/HomeSceneMap/HomeScene';


function App() {

  const [audioActive, setAudioActive] = useState(true)

  const changeAudio = () => {
    setAudioActive(!audioActive)
  }


  return (
    <Context.Provider value={{audioActive, setAudioActive , changeAudio }}>
      <div className="App" id='app'>
   
        {/* <Home/> */}
        <HomeScene/>
        <div className="audioChange" onClick={() => changeAudio()}>
          <WaveAudio/>
        </div>
      </div>
    </Context.Provider>
  );
}

export default App;
