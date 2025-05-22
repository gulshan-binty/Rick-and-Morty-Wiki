
import './App.css'
import Banner from './components/Banner';
import CastSection from './components/CastSection';

import Episodes from './components/Episodes'


function App() {

  return (
    <div className="background-img relative z-10">
      <Banner/>
      <CastSection />
      <Episodes />
    </div>
  );
}

export default App
