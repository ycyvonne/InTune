import React, { Component } from "react";
import "./ConcertImage.scss";
import ConcertDefault from '../../../assets/img/concert_default.jpg';


class ConcertImage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="thumbnail" style={{
          width: this.props.width ? `${this.props.width}` : '100%',
          height: this.props.height ? `${this.props.height}` : '200px',
      }}>
        <div className="img default-under" style={{backgroundImage: `url(${ConcertDefault})`}} />
        <div className="img custom" style={{backgroundImage: `url('http://images.sk-static.com/images/media/profile_images/artists/${this.props.artistId}/huge_avatar')`}} />
      </div>
    );
  }
}

export default ConcertImage;
