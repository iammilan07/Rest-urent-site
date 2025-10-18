import React from 'react';

import { images } from '../../constants';
import './AboutUs.css';

const AboutUs = () => (
  <div className="app__aboutus app__bg flex__center section__padding" id="about">
    <div className="app__aboutus-overlay flex__center">
      <img src={images.G} alt="G_overlay" />
    </div>

    <div className="app__aboutus-content flex__center">
      <div className="app__aboutus-content_about">
        <h1 className="headtext__cormorant">About Us</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">Our story begins with a love for great food and good company. We bring people together through dishes that celebrate flavor, culture, and community.</p>
        <button type="button" className="custom__button">
          <ul className="app__navbar-links">
          <a href="#menu">Know More</a>
        
        </ul>
          
          
          </button>
      </div>

      <div className="app__aboutus-content_knife flex__center">
        <img src={images.knife} alt="about_knife" />
      </div>

      <div className="app__aboutus-content_history">
        <h1 className="headtext__cormorant">Our History</h1>
        <img src={images.spoon} alt="about_spoon" className="spoon__img" />
        <p className="p__opensans">Our journey began with a simple vision — to share the art of fine dining with every guest. What started as a passion for flavor has grown into a legacy of taste, craftsmanship, and hospitality.</p>
        <button type="button" className="custom__button"><ul className="app__navbar-links">
          <a href="#menu">Know More</a>
        
        </ul></button>
      </div>
    </div>
  </div>
);

export default AboutUs;
