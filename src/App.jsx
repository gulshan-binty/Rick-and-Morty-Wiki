
import './App.css'
import CastSection from './components/CastSection';
import Header from './components/header';
import Episodes from './components/Episodes'
function App() {

  return (

      <div className="background-img relative z-10">
       <Header/> 
      <CastSection/>
      <Episodes/>
      </div>

  );
}

export default App
