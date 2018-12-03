import React, { Component } from "react";
import SelectionItem from "./SelectionItem";
import EmptyBox from "./EmptyBox";
import ProfileMatchView from "./ProfileMatchView";
import { Loader } from "../../";

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
    if (!this.props.user.concerts) {
      this.setState({ concerts: []})
    }
    else {
      this.setState({
        // TODO remove .slice() after removing stubbing
        concerts: this.props.user.concerts.slice(0, 8)
      })
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
            {
              this.state.people && this.state.people.length == 0 && 
              <EmptyBox
                header="No matches yet to view."
                text="Head on over to our matches page to find other people to match with!"
                buttonText="Go to Matches"
                buttonTo="/matches"
                />
            }
            {
              this.state.people && this.state.people.length != 0 &&
              <div className="selections">
              {
                this.state.people.map((person, i) => {
                  return (
                    <SelectionItem
                      id={person.id}
                      name={person.name}
                      img={person.img}
                      onClick={this.selectionClick}
                      currentSelection={this.state.currentSelection}
                    />
                  );
                })
              }
              </div>
            }
            {
              this.state.people && this.state.people.map((person, i) => {
                if (person.id == this.state.currentSelection) {
                  return <ProfileMatchView person={person} />;
                }
              })
            }
          </div>
          <div className="profile-concerts-content">
            {
              this.state.concerts && this.state.concerts.length == 0 && 
              <EmptyBox
                header="No interested concerts yet."
                text="Head on over to our concerts page to find exciting concerts near you!"
                buttonText="Go to Concerts"
                buttonTo="/concerts"
                />
            }
            {
              this.state.concerts && this.state.concerts.length != 0 && 
              this.state.concerts.map((concert, i) => {
                console.log('concert', concert)
                return <div>Concert</div>
              })
            }
          </div>
        </div>
      )
    );
  }
}

export default ProfileMatchesPage;
