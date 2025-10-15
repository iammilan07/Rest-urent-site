import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import images from '../../constants/images';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const [toggleMenu, setToggleMenu] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   setIsLoggedIn(!!token);
  // }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setShowLogoutModal(false);
    navigate('/'); // redirect
  };


  const handleBookTableClick = () => {
  if (isLoggedIn) {
    navigate('/booktable'); // Go to Book Table page
  } else {
    setShowLoginPrompt(true); // Show modal if not logged in
  }
};



  return (
    <nav className="app__navbar">
      <div className="app__navbar-logo">
        
        <li className="p__opensans"><Link to="/">
        <img src={images.paradise} alt="app__logo" /></Link></li>
      </div>

      <ul className="app__navbar-links">
        <li className="p__opensans"><Link to="/">Home</Link></li>
        <li className="p__opensans"><a href="#about">About</a></li>
        <li className="p__opensans"><a href="#menu">Menu</a></li>
        <li className="p__opensans"><a href="#awards">Awards</a></li>
        <li className="p__opensans"><a href="#contact">Contact</a></li>
      </ul>

      <div className="app__navbar-login">
  {isLoggedIn ? (
    <FiLogOut
      style={{ cursor: 'pointer', fontSize: '20px', color: 'white' }}
      title="Logout"
      onClick={() => setShowLogoutModal(true)}
    />
  ) : (
    <Link to="/login" className="p__opensans">Log In / Registration</Link>
  )}
  <div />
  <span
    className="p__opensans"
    style={{ cursor: 'pointer' }}
    onClick={handleBookTableClick}
  >
    Book Table
  </span>
</div>


      <div className="app__navbar-smallscreen">
        <GiHamburgerMenu color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
        {toggleMenu && (
          <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
            <MdOutlineRestaurantMenu
              fontSize={27}
              className="overlay__close"
              onClick={() => setToggleMenu(false)}
            />
            <ul className="app__navbar-smallscreen_links">
              <li><Link to="/" onClick={() => setToggleMenu(false)}>Home</Link></li>
              <li><a href="#about" onClick={() => setToggleMenu(false)}>About</a></li>
              <li><a href="#menu" onClick={() => setToggleMenu(false)}>Menu</a></li>
              <li><a href="#awards" onClick={() => setToggleMenu(false)}>Awards</a></li>
              <li><a href="#contact" onClick={() => setToggleMenu(false)}>Contact</a></li>
              <li>
                {isLoggedIn ? (
                  <FiLogOut
                    style={{ cursor: 'pointer', fontSize: '20px', color: 'white' }}
                    title="Logout"
                    onClick={() => {
                      setShowLogoutModal(true);
                      setToggleMenu(false);
                    }}
                  />
                ) : (
                  <Link to="/login" onClick={() => setToggleMenu(false)}>Log In / Registration</Link>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>Are you sure you want to logout?</h3>
            <div className="logout-buttons">
              <button className="yes-btn" onClick={handleLogout}>Yes</button>
              <button className="no-btn" onClick={() => setShowLogoutModal(false)}>No</button>
            </div>
          </div>
        </div>
      )}

      {/* Login Prompt Modal */}
      {showLoginPrompt && (
        <div className="logout-modal-overlay">
          <div className="logout-modal">
            <h3>You are not logged in!</h3>
            <p>Please login or sign up to access Book Table</p>
            <div className="logout-buttons">
              <button className="yes-btn" onClick={() => { setShowLoginPrompt(false); navigate('/login'); }}>Login</button>
              <button className="no-btn" onClick={() => { setShowLoginPrompt(false); navigate('/register'); }}>Sign Up</button>
              <button className="no-btn" onClick={() => setShowLoginPrompt(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

    </nav>
  );
};

export default Navbar;
