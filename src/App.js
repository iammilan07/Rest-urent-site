import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AboutUs, Chef, FindUs, Footer, Gallery, Header, Intro, Laurels, SpecialMenu } from './container';
import { Navbar } from './components';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Welcome from './components/Welcome/welcome';
import './App.css';
import { ToastContainer, Slide } from "react-toastify";
import BookTable from './components/Booktable/bookTable';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

      <Routes>
        <Route path="/" element={
          <>
            {isLoggedIn && <Welcome />}
            <Header />
            <AboutUs />
            <SpecialMenu />
            <Chef />
            <Intro />
            <Laurels />
            <Gallery />
            <FindUs />
            <Footer />
          </>
        } />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booktable" element={<BookTable />} />

      </Routes>

      <ToastContainer
        position="bottom-right"
        autoClose={2000}       // <-- 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover={false}
        draggable={false}
        theme="dark"
        transition={Slide}
        limit={1}
      />

    </Router>
  );
};

export default App;
