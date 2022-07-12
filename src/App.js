import './App.css';
import Nav from './components/header/nav/Nav';
import Preload from './components/header/preload/Preload';
import Present from './components/header/present/Present';
import Resumen from './components/main/resumen/Resumen';
import Scene from './components/main/scene/Scene';

function App() {
  return (
    <div className="App">
      <Preload />
      <Nav/>
      <Present /> 
      <Scene />
      <Resumen />
    </div>
  );
}

export default App;
