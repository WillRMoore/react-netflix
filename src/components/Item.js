import React, { Component } from "react";
import "./Item.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchList: false
    };
  }

  trimText = text => {
    var trimedText = text.substring(0, 138) + "...";
    return trimedText;
  };

  addToWatchList = () => {
    var button = document.querySelector(".button" + this.props.id);
    var buttonWrapper = document.querySelector(".item" + this.props.id);

    button.classList.toggle("added");
    buttonWrapper.classList.toggle("added-outer-wrapper");
  };

  render() {
    return (
      <div className="title-list-overlay">
        <div className="title-button-section">
          <h3 className="title">{this.props.title}</h3>
          <p className="placeholder">+1</p>
          <div
            className={"watch-list-button-section " + "item" + this.props.id}
            onClick={this.addToWatchList}
          >
            <div className={"watch-list-button " + "button" + this.props.id}>
              <span>
                <FontAwesomeIcon icon="plus" />
              </span>
              <span>
                <FontAwesomeIcon icon="check" />
              </span>
            </div>
          </div>
        </div>

        <p className="rating">{this.props.vote_average}/10</p>
        <p className="plot">{this.trimText(this.props.overview)}</p>
      </div>
    );
  }
}

export default Item;
