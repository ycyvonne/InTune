import React, { Component } from "react";
import {
  Header,
  ProfilePicture,
  ProfileDetails,
  FavoriteList,
  Button,
  Icon
} from "../../";
import SelectionItem from "./SelectionItem";
import ProfileMatchView from "./ProfileMatchView";

import "./ProfileMatchesPage.scss";

class ProfileMatchesPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      initMatches: false,
      currentSelection: null,
      matches: []
    };

    this.initMatches = this.initMatches.bind(this);

    this.selectionClick = this.selectionClick.bind(this);
    if (!this.props.user.matchesData || !this.props.user.matchesData.fetched) {
      this.props.getMatches(this.initMatches);
    }
  }

  initMatches() {
    if (!this.props.user.matchesData) {
      this.setState({ matches: [] });
    } else {
      var data = Object.values(this.props.user.matchesData);
      this.setState({
        initMatches: true,
        matches: data,
        currentSelection: data[0].id
      });
    }
  }

  selectionClick(id) {
    this.setState({ currentSelection: id });
  }

  render() {
    var isValid = true;
    if (!this.props.user.matchesData) {
      isValid = false;
    }

    return (
      isValid && (
        <div className="profile-matches-wrapper">
          <div className="profile-matches-content">
            <div className="selections">
              {this.state.matches.map((match, i) => {
                return (
                  <SelectionItem
                    id={match.id}
                    name={match.data.profile.name}
                    img="https://robertzalog.com/me.jpg"
                    onClick={this.selectionClick}
                    currentSelection={this.state.currentSelection}
                  />
                );
              })}
            </div>
            {this.state.matches.map((match, i) => {
              if (match.id == this.state.currentSelection) {
                return <ProfileMatchView match={match} />;
              }
            })}
          </div>
        </div>
      )
    );
  }
}

export default ProfileMatchesPage;
