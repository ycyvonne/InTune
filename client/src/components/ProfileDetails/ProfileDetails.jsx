import React, { Component } from "react";
import { Input } from "../";

class ProfileDetails extends Component {
  render() {
    var spotifyData = this.props.user.spotifyData;
    return (
      <div className="profile-music-type-wrapper">
        <Input
          title="FULL NAME"
          customClass="profile-title"
          type="text"
          defaultInput={spotifyData.display_name}
        />
        <Input
          title="SPOTIFY ACCOUNT"
          customClass="profile-title"
          type="text"
          defaultInput={spotifyData.href}
        />
        <Input
          title="EMAIL"
          customClass="profile-title"
          type="text"
          defaultInput={spotifyData.email}
        />
        <Input
          title="LOCATION"
          customClass="profile-title"
          type="text"
          defaultInput={spotifyData.country}
        />
      </div>
    );
  }
}

export default ProfileDetails;
