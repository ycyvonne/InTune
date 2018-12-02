import React, { Component } from "react";
import { Icon } from "../../";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { faMusic, faEnvelope } from "@fortawesome/free-solid-svg-icons";

class ProfileMatchView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var type;
    var typeClass = "type";
    if (this.props.person.isArtist == "artist") {
      typeClass += " artist-type";
      type = "Artist";
    } else {
      typeClass += " concert-type";
      type = "Concert";
    }
    return (
      <div className="profile-main-view">
        <ProfilePicture
          imageUrl={this.props.person.img}
          customSize="match-picture-size"
          isCircle={true}
        />
        <div className="match-details">
          <div className="match-detail">
            <p className="name">{this.props.person.name}</p>
            <p className={typeClass}>{type}</p>
          </div>
          <div className="match-detail">
            <p>
              <Icon icon={faEnvelope} />
              {this.props.person.email}
            </p>
            <p>
              <Icon icon={faMusic} />
              {this.props.person.spotifyUrl}
            </p>
            <p>
              <Icon icon={faMusic} />
              {this.props.person.spotifyUrl}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileMatchView;
