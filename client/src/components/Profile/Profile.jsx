import React, { Component } from "react";
import { ProfileColumn1, ProfileColumn2 } from "../";
import "./Profile.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};

    this.authorize = this.authorize.bind(this);
    if (!this.props.user.spotifyData || !this.props.user.spotifyData.fetched) {
      this.authorize();
    }
  }

  authorize() {
    var regex = RegExp(/code=([^&]*)/).exec(window.location.href);
    if (regex) {
      var code = regex[1];
      this.props.authorize(code);
    }
  }

  render() {
    var isValid = true;
    if (
      !this.props.user.spotifyData ||
      this.props.user.spotifyData.error == "invalid_token"
    ) {
      isValid = false;
    }
    return (
      isValid && (
        <div className="profile-wrapper">
          <ProfileColumn1 {...this.props} />
          <ProfileColumn2 {...this.props} />
        </div>
      )
    );
  }
}

{
  /* <div>
{isValid && <div>
    <h3>User logged in</h3>
    <div>Name: {this.props.user.spotifyData.display_name}</div>  
    <div>Email: {this.props.user.spotifyData.email}</div>
    <code>
        {JSON.stringify(this.props.user.spotifyData)}
    </code>
</div>}
</div> */
}

export default Profile;
