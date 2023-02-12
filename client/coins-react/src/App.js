import { Link, Route, Routes } from 'react-router-dom';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/adminpanel/AdminPanel';
import Description from './components/description/Description';
import Home from './components/home/Home';
import Listofcoins from './components/list/List0fcoins';
import PaginatedItems from './PaginatedItems';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/list/:category/:query' element={<Listofcoins />}></Route>
        <Route path='/description/:name/:backlist/:category' element={<Description />}></Route>
        <Route path='/admin' element={<AdminLogin />}></Route>
        <Route path='/adminpanel' element={<AdminPanel />}></Route>
      </Routes>
    </div>
  );
}

export default App;
