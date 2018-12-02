import React, { Component } from "react";
import {
  Header,
  ProfilePicture,
  ProfileDetails,
  FavoriteList,
  Button,
  Loader
} from "../../";
import "./ProfilePage.scss";

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
      console.log(this.props);
      var spotifyData = this.props.user.spotifyData;
      var subheading = "Hi " + spotifyData.name.split(" ")[0] + "!";
    }

    return (
      <div>
        {!isValid && <div className="profile-loader"><Loader type="Bars" color="#005AA8" /></div>}
        {isValid && 
          <div className="profile-wrapper">
            <Header subtitle="INTUNE" heading="" subheading={subheading} />
            <div className="profile-content-wrapper">
              <ProfilePicture
                heading="PROFILE PICTURE"
                imageUrl={this.props.user.spotifyData.img}
                customSize="profile-picture-size"
                isInput={true}
              />
              <ProfileDetails {...this.props} />
              <FavoriteList
                topic="ARTISTS"
                data={this.props.user.spotifyData.artists}
              />
              <FavoriteList
                topic="TRACKS"
                data={this.props.user.spotifyData.tracks}
              />
            </div>
            <Button customClass="save-button" text="SAVE" />
          </div>}
        </div>
    );
  }
}

export default Profile;
