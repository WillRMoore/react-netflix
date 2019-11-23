import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      searchUrl: ""
    };
  }

  componentDidMount() {
    var prevScrollPos = window.pageYOffset;

    window.onscroll = function() {
      var currentScrollPos = window.pageYOffset;
      var header = document.querySelector(".header");

      // console.log("prevScrollPos", prevScrollPos);
      // console.log("currentScrollPos", currentScrollPos);

      if (prevScrollPos > currentScrollPos) {
        header.style.top = "0";
      } else {
        header.style.top = "-5rem";
      }
      prevScrollPos = currentScrollPos;
    };
  }

  handleChange = e => {
    this.setState({ searchTerm: e.target.value });
  };

  getSearchResults = url => {
    //
  };

  handleKeyUp = e => {
    if (e.key === "Enter" && this.state.searchTerm !== "") {
      var searchUrl = "search/multi?query=" + this.state.searchTerm;

      this.setState({ searchUrl });

      console.log("handleKeyUp activated: Serching for", e.target.value);
      // update searchUrl in App.js
      this.props.updateSearchUrl(searchUrl);
    }
  };

  scrollFunction = () => {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      document.querySelector(".header").style.position = "static";
    } else {
      document.querySelector(".header").style.position = "fixed";
    }
  };

  render() {
    return (
      <div className="header">
        <h1 className="app-title">REACTFLIX</h1>
        <p>Browse</p>
        <p>My List</p>
        <p>Top Picks</p>
        <p>Recent</p>
        <input
          type="search"
          placeholder="Look for a title..."
          value={this.state.searchTerm}
          onChange={this.handleChange}
          onKeyUp={this.handleKeyUp}
        />
      </div>
    );
  }
}

export default Header;
