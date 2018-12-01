import React, { Component } from "react";
import "./Card.scss";

class Card extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="card-wrapper" style={{'backgroundImage': `url(${this.props.imgUrl})`}}>
        <div className="card-overlay-dark"></div>
        <div className="card-text-overlay text-overlay">{this.props.text}</div>
      </div>
    );
  }
}

export default Card;
