import React, { Component } from "react";
import { Icon } from "../../";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";
import { faMusic, faEnvelope } from "@fortawesome/free-solid-svg-icons";

class ProfileMatchView extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
    this.capitalize = this.capitalize.bind(this);
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  render() {
    var typeClass = "type";
    if (this.props.match.type == "artist") {
      typeClass += " artist-type";
    } else {
      typeClass += " concert-type";
    }
    console.log("match plez");
    console.log(this.props.match);
    return (
      <div className="profile-main-view">
        <ProfilePicture
          imageUrl={this.props.match.data.img}
          customSize="match-picture-size"
          isCircle={true}
        />
        <div className="match-details">
          <div className="match-detail">
            <p className="name">{this.props.match.data.name}</p>
            <p className={typeClass}>
              {this.capitalize(this.props.match.type)}
            </p>
          </div>
          <div className="match-detail">
            <p>
              <Icon icon={faEnvelope} />
              {this.props.match.data.email}
            </p>
            <p>
              <Icon icon={faMusic} />
              {this.props.match.data.spotifyUrl}
            </p>
            <p>
              <Icon icon={faMusic} />
              {this.props.match.data.spotifyUrl}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileMatchView;
