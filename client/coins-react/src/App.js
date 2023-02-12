//import logo from './logo.svg';
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Description from './Description';
import Homepage1 from './Homepage1';
import Homepage2 from './Homepage2';
import Listofcoins from './List0fcoins';
import Listofcoins2 from './List0fcoins';
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Routes>
        <Route path='/home' element={<Homepage1 />}></Route>
        <Route path='/search' element={<Homepage2 />}></Route>
        <Route path='/list/:type' element={<Listofcoins />}></Route>
        <Route path='/list' element={<Listofcoins2 />}></Route>
        {/* <Route path='/list/Bullion' element={<Listofcoins list="Bullion" />}></Route> */}
        <Route path='/description' element={<Description />}></Route>
      </Routes>
    </div>
  );
}

export default App;
