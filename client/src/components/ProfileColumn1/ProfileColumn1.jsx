import React, { Component } from "react";
import "./ProfileColumn1.css";

class ProfileColumn1 extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { selectedProfileImage: null };
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.uploadHandler = this.uploadHandler.bind(this);
  }

  fileChangedHandler(event) {
    this.setState({ selectedProfileImage: event.target.files[0] });
  }
  uploadHandler() {
    console.log("uploadHandler");
    console.log(this.state.selectedProfileImage);
  }
  render() {
    const hasProfilePicture = this.props.hasProfilePicture;
    let profilePicture;
    if (hasProfilePicture) {
      profilePicture = (
        <img className="profile-picture" src={this.props.profilePicture} />
      );
    } else {
      profilePicture = (
        <img
          className="profile-picture"
          src="/img/default-profile-picture.png"
        />
      );
    }
    return (
      <div className="profile-column1-wrapper">
        <div className="intune-subtitle"> ------ INTUNE</div>
        <div className="profile-heading">Profile</div>
        <div className="profile-subheading">
          We will match you with concerts and friends based on your info.
        </div>
        <div className="profile-details-wrapper">
          <div className="profile-picture-wrapper">
            <div className="profile-picture-heading">PROFILE PICTURE</div>
            <div className="person-card">{profilePicture}</div>
            <input type="file" onChange={this.fileChangedHandler} />
            <button onClick={this.uploadHandler}>Upload!</button>
          </div>
          <div className="profile-music-type-wrapper">
            <div className="profile-picture-heading">
              PICK YOUR FAVORITE MUSIC TYPE
            </div>
            <form>
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
              <input type="text" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileColumn1;
