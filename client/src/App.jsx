import { BrowserRouter,Routes,Route } from 'react-router-dom';
import React from 'react'
import Home from "./assets/componensts/Home";
import SignIn from "./assets/componensts/SignIn";
import Signup from "./assets/componensts/Signup";
import About from "./assets/componensts/About";
import Profile from  "./assets/componensts/Profile";
import Header from './assets/componensts/Header';
const App = () => {
  return (
    <BrowserRouter>
       <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path="/sign-up" element={<Signup/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App