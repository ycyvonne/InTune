import React, { Component } from "react";
import {
  Header,
  ProfilePicture,
  ProfileDetails,
  FavoriteList,
  Button
} from "../../";
import "./ProfilePage.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
    this.loginUser = this.loginUser.bind(this);
    if (!this.props.user.spotifyData || !this.props.user.spotifyData.fetched) {
      console.log("calls loginUser");
      this.loginUser();
    }
    if (
      !this.props.user.topArtistsData ||
      !this.props.user.topArtistsData.fetched
    ) {
      this.props.getTopArtists();
    }
  }

  loginUser() {
    console.log("attempts to login from profile page");
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
      this.props.user.spotifyData.error == "invalid_token" ||
      !this.props.user.topArtistsData
    ) {
      console.log("invalid token of render");
      isValid = false;
    } else {
      console.log("else of render");
      console.log(this.props);
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
