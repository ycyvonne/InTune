import React, { Component } from "react";
import { ImageCard } from "../../";
import barcode from "../../../assets/img/barcode.png";
import "./Concert.scss";

class Concert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <a className="concert-wrapper" href={"/concert/" + this.props.id}>
        <div className="details-wrapper">
          <div className="title">{this.props.name}</div>
          <div className="location">Venue: {this.props.location}</div>
        </div>
        <div className="ticket-side">
          <img src={barcode} />
        </div>
      </a>
    );
  }
}

export default Concert;
