import React, { Component } from "react";
import { ConcertImage } from "../../";
import "./Concert.scss";

class Concert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <a className="concert-wrapper" href={'/concert/' + this.props.id}>
        <ConcertImage artistId={this.props.artistId} />
        <div className="concert-inner-wrapper">
          <div className="details-wrapper">
            <div className="title">{this.props.name}</div>
            <div className="location">Venue: {this.props.location}</div>
          </div>
        </div>
        <div className="ticket-bottom">
            Read More
        </div>
      </a>
    );
  }
}

export default Concert;
