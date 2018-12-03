import React, { Component } from "react";
import {
  Header,
  ProfilePicture,
  ProfileDetails,
  FavoriteList,
  Button,
  Loader,
  ProfileMainView
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
    console.log('meeee', this.props.user)
    return (
      <div>
        {!isValid && <div className="profile-loader"><Loader type="Bars" color="#005AA8" /></div>}
        {isValid && 
          <div className="profile-wrapper">
            <ProfileMainView 
              person={this.props.user.spotifyData}
              type="person"
              isMe={true}/>
          </div>
          }
        </div>
    );
  }
}

export default Profile;
