import React, { Component } from "react";
import "./TitleList.css";
import Item from "./Item";

class TitleList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mounted: false,
      titles: [],
      movieTitle: "name"
    };
  }

  trimText = text => {
    var trimedText = text.substring(0, 150) + "...";
    return trimedText;
  };

  loadContent = () => {
    var requestUrl =
      "https://api.themoviedb.org/3/" +
      this.props.url +
      "&api_key=" +
      this.props.apiKey;

    console.log("loadContent function activated.");

    fetch(requestUrl)
      .then(response => response.json())
      .then(data => {
        var data = data.results;
        var dataLength = data.length;

        data.splice(5, dataLength - 5);
        // re-calculate length of data now that it's been spliced
        dataLength = data.length;

        // create a title key/value pair for tv shows
        for (var i = 0; i < dataLength; i++) {
          if (this.props.type == "tv") {
            data[i].title = data[i].name;
          }

          // // check if it has a backdrop image. If not use poster
          if (data[i].backdrop_path == null) {
            data[i].backdrop_path = data[i].poster_path;
          }
        }

        this.setState({ titles: data });
        console.log("data:", data);
      })
      .catch(err => console.log("error:", err));
  };

  componentDidMount() {
    if (this.props.url !== "") {
      this.loadContent();
      this.setState({ mounted: true });
    }
  }

  componentDidUpdate() {
    console.log("-----");
    console.log("TitleList component received updated props");
    console.log("this.props.url:", this.props.url);
    console.log("-----");
  }

  render() {
    return (
      <div>
        <h1 className="category-title">{this.props.title}</h1>
        <div className="movie-container">
          {this.state.titles.map(movie => (
            <div
              className="movie-section"
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
}

export default TitleList;
