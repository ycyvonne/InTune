import React, { Component } from "react";
import { Input } from "../../";
import "./ProfilePicture.scss";
import * as $ from 'jquery';

// TODO: After profile page is reconnected to backend
// Refactor <div className="person-card" /> to use <ImageCard />

class ProfilePicture extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    if (this.props.hasMenu) {
      this.getWindowClicks();
    }
  }

  getWindowClicks() {
    $(window).click(() => {
      this.setState({show: false})
    });
  }

  profileClicked = (event) => {
    if (this.props.hasMenu) {
      event.stopPropagation();
      this.setState({show: !this.state.show});
    }
  }


  render() {

    var personCard;

    var imgClasses = `profile-picture ${this.props.customSize}`
    if (this.props.isCircle) {
      imgClasses += ' profile-picture-circle';
    }

    if (this.props.isInput) {
      personCard = (
        <div className="person-card">
          <label className="profile-container" htmlFor="profile-image-input">
            <img
              className={imgClasses}
              src={this.props.imageUrl}
            />
            <div id="overlay">
              <div>Upload!</div>
            </div>
          </label>
          <Input customId="profile-image-input" customType="file" />
        </div>
      );
    } else {
      personCard = (
        <div className="person-card">
          <label className="profile-container">
            <img
              className={imgClasses}
              src={this.props.imageUrl}
            />
          </label>
        </div>
      );
    }
    return (
      <div className="profile-picture-wrapper" onClick={this.profileClicked}>
        <div className="profile-picture-heading">{this.props.heading}</div>
        {personCard}
        {this.state.show && <div className="profile-dropdown">
          <div className="tooltip"></div>
          <div className="tooltip-block"></div>
          <div className="profile-main">
            <a className="profile-link" href="/profile">My Profile</a>
            <a className="profile-link" href="/profile-matches">My Matches</a>
          </div>
        </div>}
      </div>
    );
  }
}

export default ProfilePicture;
