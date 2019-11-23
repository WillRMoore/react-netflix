import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import TitleList from "./components/TitleList";
import HeroImage from "./components/HeroImage";
import Header from "./components/Header";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPlus, faCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import SearchResults from "./components/SearchResults";

library.add(faPlus, faCheck, faSpinner);

class App extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: "",
      searchUrl: "",
      apiKey: "9571b0e51727bd1e22349cf7840c5840"
    };
  }

  updateSearchUrl = url => {
    this.setState({ searchUrl: url });
    console.log("updateSearchUrl activated");
  };

  render() {
    return (
      <div className="App">
        <Header
          apiKey={this.state.apiKey}
          updateSearchUrl={this.updateSearchUrl}
        />

        <HeroImage />

        <SearchResults
          title="Search Results"
          searchUrl={this.state.searchUrl}
          apiKey={this.state.apiKey}
        />

        <TitleList
          title="Top TV picks for Jack"
          url="discover/tv?sort_by=popularity.desc&page=1"
          apiKey={this.state.apiKey}
          type="tv"
        />
        <TitleList
          title="Trending Now"
          url="discover/movie?sort_by=popularity.desc&page=1"
          apiKey={this.state.apiKey}
        />
        <TitleList
          title="Most Watched in Horror"
          url="genre/27/movies?sort_by=popularity.desc&page=1"
          apiKey={this.state.apiKey}
        />
        <TitleList
          title="Sci-fi Greats"
          url="genre/878/movies?sort_by=popularity.desc&page=1"
          apiKey={this.state.apiKey}
        />
        <TitleList
          title="Comedy Magic"
          url="genre/35/movies?sort_by=popularity.desc&page=1"
          apiKey={this.state.apiKey}
        />
      </div>
    );
  }
}

export default App;
