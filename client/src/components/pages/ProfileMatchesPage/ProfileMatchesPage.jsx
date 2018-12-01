import React, { Component } from "react";
import {
  Header,
  ProfilePicture,
  ProfileDetails,
  FavoriteList,
  Button
} from "../../";
import "./ProfileMatchesPage.scss";

class ProfileMatchesPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }

  render() {
    var isValid = true;
    if (
      !this.props.user.spotifyData ||
      this.props.user.spotifyData.error == "invalid_token"
    ) {
      isValid = false;
    } else {
      console.log(this.props);
      var spotifyData = this.props.user.spotifyData;
      var subheading = "Hi " + spotifyData.name.split(" ")[0] + "!";
    }

    return (
      isValid && (
        <div className="profile-wrapper">
          <Header subtitle="INTUNE" heading="Profile" subheading={subheading} />
        </div>
      )
    );
  }
}

export default ProfileMatchesPage;
