import './App.css';
import Calcular from './componentes/Calcular';

function App() {
  return (
    <>
    <div className="App">
      <h2>Conversor divisas con <a href="https://www.frankfurter.app/">FrankFurter API</a>.</h2>
      <Calcular />
    </div>
    <h2 className='creador'>Creado y codificado por <a href="https://oscaromargn.github.io/portafolio">Oscar Garcia</a>.</h2>
    </>
  );
}

export default App;
