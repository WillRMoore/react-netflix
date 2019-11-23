import React, { Component } from "react";
import "./SearchResults.css";
import Item from "./Item";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [],
      searchResultAmount: 0,
      isFetching: false
    };
  }

  loadContent = () => {
    this.setState({ isFetching: true });

    var requestUrl =
      "https://api.themoviedb.org/3/" +
      this.props.searchUrl +
      "&api_key=" +
      this.props.apiKey;

    console.log("loadContent function activated in SearchResults.js");
    console.log("requestUrl:", requestUrl);
    console.log("searchResultAmount:", this.state.searchResultAmount);

    fetch(requestUrl)
      .then(response => {
        return response.json();
      })
      .then(data => {
        var data = data.results;
        var dataLength = data.length;

        // create a title key/value pair for tv shows
        for (var i = 0; i < dataLength; i++) {
          if (this.props.type == "tv") {
            data[i].title = data[i].name;
          }

          // // check if it has a backdrop image. If not use poster
          if (data[i].backdrop_path == null) {
            data[i].backdrop_path = data[i].poster_path;
          }

          // // check if it has a title. If not use name
          if (data[i].title == null) {
            data[i].title = data[i].name;
          }
        }

        this.setState({ titles: data });
        this.setState({ isFetching: false });
        this.setState({ searchResultAmount: dataLength });

        console.log("data:", data);
        console.log("searchResultAmount:", this.state.searchResultAmount);
      })
      .catch(err => console.log("error:", err));
  };

  componentDidMount() {
    if (this.props.searchUrl !== "") {
      this.loadContent();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchUrl !== this.props.searchUrl) {
      console.log("-----");
      console.log("SearchResults component received updated props");
      console.log("this.props.searchUrl:", this.props.searchUrl);
      console.log("-----");
      this.loadContent();
    }
  }

  render() {
    if (this.props.searchUrl !== "" && this.state.titles !== []) {
      if (this.state.isFetching == false) {
        if (this.state.searchResultAmount == 0) {
          return (
            <div>
              <h1 className="category-title">{this.props.title}</h1>
              <h3>Sorry...there were no results matching your search.</h3>
            </div>
          );
        } else {
          return (
            <div>
              <h1 className="category-title">{this.props.title}</h1>
              <div className="search-results-container">
                {this.state.titles.map(movie => (
                  <div
                    className="search-result-item"
                    key={movie.id}
                    style={{
                      backgroundImage:
                        "url(http://image.tmdb.org/t/p/original" +
                        movie.backdrop_path +
                        ")",
                      backgroundSize: "cover"
                    }}
                  >
                    <Item
                      title={movie.title}
                      vote_average={movie.vote_average}
                      overview={movie.overview}
                      id={movie.id}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        }
      } else {
        return (
          <div>
            <h1 className="category-title">{this.props.title}</h1>
            <div className="loading-bar">
              <FontAwesomeIcon
                className="loading-spinner rotating"
                icon="spinner"
              />
              <h3>Loading...</h3>
            </div>
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  }
}

export default SearchResults;
