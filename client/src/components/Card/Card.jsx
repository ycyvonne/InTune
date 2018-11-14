import React, { Component } from "react";
import "./Card.scss";

class Card extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="card-wrapper">
        <img src={this.props.imgUrl} />
        <div className="text-overlay">{this.props.text}</div>
      </div>
    );
  }
}

export default Card;
