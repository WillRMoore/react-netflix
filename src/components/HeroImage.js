import React, { Component } from "react";
import "./HeroImage.css";
import HeroButton from "./HeroButton";

class HeroImage extends Component {
  render() {
    return (
      <div className="HeroImage">
        <div className="hero-content">
          <img
            src="http://www.returndates.com/backgrounds/narcos.logo.png"
            alt="Narcos Background"
            className="hero-title-image"
          />
          <h2>Season 2 now available</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque
            id quam sapiente unde voluptatum alias vero debitis, magnam quis
            quod.
          </p>
          <HeroButton primary="true" value="WATCH NOW" />
          <HeroButton primary="false" value="+ MY LIST" />
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}

export default HeroImage;
