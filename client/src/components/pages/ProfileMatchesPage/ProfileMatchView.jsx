import React, { Component } from "react";
import { Icon } from "../../";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { faMusic, faEnvelope } from "@fortawesome/free-solid-svg-icons";

class ProfileMatchView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
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
            <p>
              <Icon icon={faEnvelope} />
              {this.props.person.email}
            </p>
            <p>
              <Icon icon={faMusic} />
              {this.props.person.spotifyUrl}
            </p>
          </div>
          <ProfilePicture
            imageUrl={this.props.person.img}
            customSize="match-picture-size"
            isCircle={true}
          />
        </div>
        <div className="details">
          <div className="match-artists">
            <div className="subtitle">Top Artists</div>
            {this.props.person.artists.map(artist => {
              return <div>{JSON.parse(artist).name}</div>;
            })}
          </div>
          <div className="match-tracks">
            <div className="subtitle">Top Tracks</div>
            {this.props.person.tracks.map(track => {
              return <div>{JSON.parse(track).name}</div>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileMatchView;
