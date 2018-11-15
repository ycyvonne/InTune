import React, { Component } from "react";
import "./Concert.scss";

class Concert extends Component {
  constructor(props) {
    console.log("concert component");
    super(props);
    this.props = props;
    console.log(props);
  }
  render() {
    return (
      <div className="concert-wrapper">
        {/* {this.props.name} */}
        <div className="image-wrapper">
          <img src="/img/concert-default.png" />
        </div>
        <div className="details-wrapper">
          <div className="location">{this.props.location}</div>
          <div className="title">{this.props.name}</div>
          <div className="description">{this.props.artist}</div>
        </div>
      </div>
    );
  }
}

export default Concert;
