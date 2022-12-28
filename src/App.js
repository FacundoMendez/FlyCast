import './App.css';
import React from 'react'
import Context from "./components/context/Context"
import HomeScene from './components/home/HomeSceneMap/HomeScene';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Preload from './components/preload/Preload';
import SceneGetMap from "./components/scene/SceneGetMap"


function App() {


  return (
    <BrowserRouter>
      <div className="App" id='app'>
        <Routes>
          <Route exact path='/home' element = {<HomeScene/>} />
          <Route exact path='/world' element = {<SceneGetMap/>} />
          <Route exact path='/' element = {<Preload/>} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
