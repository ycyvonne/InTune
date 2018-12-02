import React, { Component } from "react";
import { ImageCard } from "../../";
import ConcertDefault from '../../../assets/img/concert_default.jpg';
import "./Concert.scss";

class Concert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    console.log('this.props', this.props)
    return (
      <a className="concert-wrapper" href={'/concert/' + this.props.id}>
        <div className="thumbnail">
          <div className="img default-under" style={{backgroundImage: `url(${ConcertDefault})`}} />
          <div className="img custom" style={{backgroundImage: `url('http://images.sk-static.com/images/media/profile_images/artists/${this.props.artistId}/huge_avatar')`}} />
        </div>
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
