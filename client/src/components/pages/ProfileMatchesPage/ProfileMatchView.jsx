import React, { Component } from "react";
import { Icon } from "../../";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { faMusic, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './ProfileMatchView.scss'

class ProfileMatchView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var type = "Person";
    var typeClass = "type";
    return (
      <div className="profile-main-view">
        <div className="details">
          <ProfilePicture
            imageUrl={this.props.person.img}
            customSize="match-picture-size"
            isCircle={true}
          />
          <div className="detail">
            <h1 className="name">{this.props.person.name}</h1>
            <div>
              <Icon icon={faEnvelope} />
              {this.props.person.email}
            </div>
            <div>
              <Icon icon={faMusic} />
              {this.props.person.spotifyUrl}
            </div>
          </div>
        </div>
        <div className="details details-body">
          <div className="detail-section">
            <h1>{this.props.person.name.split(' ')[0]}'s Top Artists</h1>
            <div className="carousel">
              <div className="carousel-inner">
                {this.props.person.artists.map((item, i) => {
                  var artist = JSON.parse(item);
                  return (<div className="carousel-item" key={i}>
                    <a href="#">
                      <div className="thumbnail" style={{background: `url(https://t2.genius.com/unsafe/220x220/https%3A%2F%2Fimages.genius.com%2F2761436d8e81c60c2e2350e0893a2455.600x600x1.jpg)`}}/>
                    </a>
                    <h3>{artist.name}</h3>
                  </div>);
                })}
              </div>
            </div>
          </div>
          <div className="section-divider"/>
          <div className="detail-section">
            <h1>{this.props.person.name.split(' ')[0]}'s Top Tracks</h1>
            <div className="tracks-grid">
              {this.props.person.tracks.map((track, i) => {
                var track = JSON.parse(track);
                return <div className="track-item">
                  <div className="track-thumbnail"
                    style={{background: `url(${track.img[2].url})`}}>
                  </div>
                  <div className="track-side">
                    <h3>{track.name}</h3>
                    <p>{track.album}</p>
                  </div>
                </div>;
              })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileMatchView;
