import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./componensts/Home";
import SignIn from "./componensts/SignIn";
import Signup from "./componensts/Signup";
import About from "./componensts/About";
import Profile from "./componensts/Profile";
import Header from "./componensts/Header";
import Private from "./componensts/Private";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route element={<Private />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
