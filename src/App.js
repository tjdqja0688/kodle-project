import { ImLab } from 'react-icons/im';
import { FiSettings, FiHelpCircle } from 'react-icons/fi';
import { HiOutlineChartBar } from 'react-icons/hi';

import Answer from './components/Answer';
import Keypad from './components/Keypad';

import './App.css';

function App() {
  return (
    <main>
      <section className='kodle-section' tabIndex='0'>
          <header className='row'>
              <div className='title'><h2>꼬들 - 한국어</h2></div>
              <div className='options'>
                  <button><ImLab /></button>
                  <button><FiSettings /></button>
                  <button><FiHelpCircle /></button>
                  <button><HiOutlineChartBar /></button>
              </div>
          </header>
          {[0, 1, 2, 3, 4, 5].map(id => <Answer key={id}/>)}
          <Keypad/>
      </section>
    </main>
  );
}

export default App;
