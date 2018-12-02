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
      people: [],
      concerts: []
    };

    this.initPeople = this.initPeople.bind(this);
    this.initConcerts = this.initConcerts.bind(this);

    this.selectionClick = this.selectionClick.bind(this);
    if (!this.props.user.peopleData || !this.props.user.peopleData.fetched) {
      this.props.getPeople(this.initPeople);
    }
    if (!this.props.user.concerts) {
      this.props.getUserConcerts(this.initConcerts);
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

  initConcerts() {
    this.setState({
      concerts: this.props.user.concerts
    })
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
            {this.state.people.length == 0 && <div className="no-people">
                <h1>No matches yet to view.</h1>
                <p>Head on over to our matches page to find other people to match with!</p>
                <button onClick={() => window.location.href = '/matches'}>Go to Matches</button>
              </div>}
            {this.state.people.length != 0 && <div className="selections">
              {this.state.people.map((person, i) => {
                return (
                  <SelectionItem
                    id={person.id}
                    name={person.name}
                    img={person.img}
                    onClick={this.selectionClick}
                    currentSelection={this.state.currentSelection}
                  />
                );
              })}
            </div>}
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
