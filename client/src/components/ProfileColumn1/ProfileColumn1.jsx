import React, { Component } from "react";
import "./ProfileColumn1.css";

class ProfileColumn1 extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { selectedProfileImage: "/img/default-profile-picture.png" };
    this.handleFileChange = this.handleFileChange.bind(this);
  }
  handleFileChange(event) {
    this.setState({
      selectedProfileImage: URL.createObjectURL(event.target.files[0])
    });
  }
  render() {
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
            <div className="person-card">
              <label htmlFor="profile-image-input">
                <img
                  className="profile-picture"
                  src={this.state.selectedProfileImage}
                />
              </label>
              <input
                id="profile-image-input"
                type="file"
                onChange={this.handleFileChange}
              />
            </div>
          </div>
          <div className="profile-music-type-wrapper">
            <div className="profile-picture-heading">
              PICK YOUR FAVORITE MUSIC TYPE
            </div>
            <form id="profile-music-form">
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
