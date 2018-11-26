import React, { Component } from "react";
import {
  Header,
  ProfilePicture,
  ProfileDetails,
  FavoriteList,
  Button
} from "../../";
import "./Profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
    this.loginUser = this.loginUser.bind(this);
    if (!this.props.user.spotifyData || !this.props.user.spotifyData.fetched) {
      this.loginUser();
    }
  }

  loginUser() {
    var regex = RegExp(/code=([^&]*)/).exec(window.location.href);
    if (regex) {
      var code = regex[1];
      this.props.loginUser(code);
    }
  }

  render() {
    var isValid = true;
    if (
      !this.props.user.spotifyData ||
      this.props.user.spotifyData.error == "invalid_token"
    ) {
      isValid = false;
    } else {
      var spotifyData = this.props.user.spotifyData;
      var subheading = "Hi " + spotifyData.name.split(" ")[0] + "!";
    }

    return (
      isValid && (
        <div className="profile-wrapper">
          <Header subtitle="INTUNE" heading="Profile" subheading={subheading} />
          <div className="profile-content-wrapper">
            <ProfilePicture
              heading="PROFILE PICTURE"
              imageUrl={this.props.user.spotifyData.img}
              customSize="profile-picture-size"
              isInput={true}
            />
            <ProfileDetails {...this.props} />
            <FavoriteList topic="ARTISTS" />
            <FavoriteList topic="GENRES" />
          </div>
          <Button customClass="save-button" text="SAVE" />
        </div>
      )
    );
  }
}

export default Profile;
