import React, { Component } from "react";
import { ImageCard } from "../../";
import "./Concert.scss";

class Concert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <a className="concert-wrapper" href={"/concert/" + this.props.id}>
        <ImageCard
          customClass="image-wrapper"
          imgUrl="/img/concert-default.png"
          dimensionClass=""
        />
        <div className="details-wrapper">
          <div className="title">{this.props.name}</div>
          <div className="location">Venue: {this.props.location}</div>
        </div>
      </a>
    );
  }
}

export default Concert;
