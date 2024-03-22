import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import About from './components/About';

import Logout from './components/Logout';
import EditProfile from './components/EditProfile';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
       
        <Route path='/' element={<Logout/>}></Route>
        <Route path='/editprofile' element={<EditProfile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
