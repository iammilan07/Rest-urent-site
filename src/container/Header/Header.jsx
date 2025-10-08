import React from 'react';

import { SubHeading } from '../../components';
import { images } from '../../constants';
import './Header.css';

const Header = () => (
  <div className="app__header app__wrapper section__padding" id="home">
    <div className="app__wrapper_info">
      <SubHeading title="Follow the Flavor Trail" />
      <h1 className="app__header-h1">Where Every Bite Tells a Story</h1>
      <p className="p__opensans" style={{ margin: '2rem 0' }}>Savor the art of fine dining. A perfect harmony of flavor, texture, and aroma in every dish.. </p>
      <button type="button" className="custom__button">Explore Menu</button>
    </div>

    <div className="app__wrapper_img">
      <img src={images.welcome} alt="header_img" />
    </div>
  </div>
);

export default Header;
