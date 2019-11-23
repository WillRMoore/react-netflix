import React, { Component } from "react";
import "./HeroButton.css";

class HeroButton extends Component {
  render() {
    return (
      <button className="hero-button" primary={this.props.primary}>
        {this.props.value}
      </button>
    );
  }
}

export default HeroButton;
