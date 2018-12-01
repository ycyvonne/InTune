import React, { Component } from "react";
import {
  Header,
  ProfilePicture,
  ProfileDetails,
  FavoriteList,
  Button
} from "../../";
import SelectionItem from "./SelectionItem";
import "./ProfileMatchesPage.scss";

class ProfileMatchesPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      currentSelection: null
    };
  }

  selectionClick() {
    // TODO: set current selection
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
    }

    return (
      isValid && (
        <div className="profile-wrapper">
          <div className="profile-matches-content">
            <div className="selections">
              <SelectionItem
                name="John Doe 0"
                img="https://robertzalog.com/me.jpg"
                onClick={this.selectionClick}
              />
              <SelectionItem
                name="John Doe 1"
                img="https://robertzalog.com/me.jpg"
                onClick={this.selectionClick}
              />
            </div>
            <div className="profile-main-view">
              <h1>John Doe xxx</h1>
              <p>Description</p>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default ProfileMatchesPage;
