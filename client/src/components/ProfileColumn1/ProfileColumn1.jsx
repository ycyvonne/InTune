import React, { Component } from "react";
import "./ProfileColumn1.scss";

class ProfileColumn1 extends Component {
  // constructor(props) {
  //   super(props);
  //   console.log("ProfileColumn1");
  //   console.log(props);
  //   this.props = props;
  //   // console.log(this.props.user.spotifyData);
  //   this.state = { selectedProfileImage: "/img/default-profile-picture.png" };
  //   this.handleFileChange = this.handleFileChange.bind(this);
  // }
  handleFileChange(event) {
    this.setState({
      selectedProfileImage: URL.createObjectURL(event.target.files[0])
    });
  }
  render() {
    var profilePictureSrc = this.props.user.spotifyData.images[0].url;
    console.log(profilePictureSrc);
    return (
      <div className="profile-column1-wrapper">
        <div className="intune-subtitle">
          <span>------</span> INTUNE
          {/* {JSON.stringify(this.props.user.spotifyData)} */}
        </div>
        <div className="profile-heading">Profile</div>
        <div className="profile-subheading">
          We will match you with concerts and friends based on your info.
        </div>
        <div className="profile-details-wrapper">
          <div className="profile-picture-wrapper">
            <div className="profile-picture-heading">PROFILE PICTURE</div>
            <div className="person-card">
              <label htmlFor="profile-image-input">
                <img className="profile-picture" src={profilePictureSrc} />
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
