import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Signup }from './pages/signup';
import { Login } from './pages/login';
import Navbar from './pages/Navbar';
import { Home } from './pages/Home';
import { AllNetwork } from './components/AllNetwork';
import { NotFound } from './components/NotFound';

function App() {

 return (
    <div>
     <BrowserRouter>
     <Navbar/>
     <Routes>
     <Route path='/signup' element={<Signup/>}/>
     <Route path='/login' element={<Login/>}/>
     

     <Route path='/'element={<Home/>}/>
     <Route path='/myNetwork' element={<AllNetwork/>}/>
     <Route path='*' element={<NotFound/>}/>
      </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App

console.log();

