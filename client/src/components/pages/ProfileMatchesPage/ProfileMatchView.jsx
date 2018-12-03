import React, { Component } from "react";
import { Icon } from "../../";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { faMusic, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import './ProfileMatchView.scss'

class ProfileMatchView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log('artists', this.props.person.artists);
    console.log('tracks', this.props.person.tracks)
  }

  render() {
    var type = "Person";
    var typeClass = "type";
    return (
      <div className="profile-main-view">
        <div className="details">
          <div className="detail">
            <p className="name">{this.props.person.name}</p>
            {this.props.type == 'artist' && <p className={this.props.type}>{this.props.type}</p>}
            <div>
              <Icon icon={faEnvelope} />
              {this.props.person.email}
            </div>
            <div>
              <Icon icon={faMusic} />
              {this.props.person.spotifyUrl}
            </div>
          </div>
          <ProfilePicture
            imageUrl={this.props.person.img}
            customSize="match-picture-size"
            isCircle={true}
          />
        </div>
        <div className="details details-body">
          <div className="detail-section">
            <h1>Top Artists</h1>
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
          <div className="match-tracks">
            <div className="subtitle">Top Tracks</div>
            {this.props.person.tracks.map((track, i) => {
              console.log('track', JSON.parse(track))
              return <div key={i}>{JSON.parse(track).name}</div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileMatchView;
