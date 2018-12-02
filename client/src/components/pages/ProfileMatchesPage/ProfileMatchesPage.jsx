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
      initPeople: false,
      currentSelection: null,
      people: []
    };

    this.initPeople = this.initPeople.bind(this);

    this.selectionClick = this.selectionClick.bind(this);
    if (!this.props.user.peopleData || !this.props.user.peopleData.fetched) {
      this.props.getPeople(this.initPeople);
    }
  }

  initPeople() {
    if (!this.props.user.peopleData) {
      this.setState({ people: [] });
    } else {
      var data = Object.values(this.props.user.peopleData);
      this.setState({
        initPeople: true,
        people: data,
        currentSelection: data[0].id
      });
    }
  }

  selectionClick(id) {
    this.setState({ currentSelection: id });
  }

  render() {
    var isValid = true;
    if (!this.props.user.peopleData) {
      isValid = false;
    }

    return (
      isValid && (
        <div className="profile-matches-wrapper">
          <div className="profile-matches-content">
            <div className="selections">
              {this.state.people.map((person, i) => {
                return (
                  <SelectionItem
                    id={person.id}
                    name={person.name}
                    img="https://robertzalog.com/me.jpg"
                    onClick={this.selectionClick}
                    currentSelection={this.state.currentSelection}
                  />
                );
              })}
            </div>
            {this.state.people.map((person, i) => {
              if (person.id == this.state.currentSelection) {
                return <ProfileMatchView person={person} />;
              }
            })}
          </div>
        </div>
      )
    );
  }
}

export default ProfileMatchesPage;
