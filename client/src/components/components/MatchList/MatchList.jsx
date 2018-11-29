import React, { Component } from "react";
import { Match } from "../../";
import "./MatchList.scss";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    var matches = this.props.user.matchesData;
    return (
      <div className="match-list-wrapper">
        {this.props.user.matchesData.map(match => {
          // TODO: add key prop when these are real matches
          return (
            <div className="tile">
              <Match name={match.name} img={match.img} />
            </div>
          );
        })}
      </div>
    );
  }
}

export default MatchList;
