import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup }from './pages/signup';
import { Login } from './pages/login';
import Navbar from './pages/Navbar';

function App() {

 return (
    <div>
     <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App

console.log();

