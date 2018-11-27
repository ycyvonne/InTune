import React, { Component } from "react";
import { Match } from "../../";
import "./MatchList.scss";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="match-list-wrapper">
        {this.props.user.matchesData.map(match => {
          // TODO: add key prop when these are real matches
          return <Match name={match.name} img={match.img} />;
        })}
      </div>
    );
  }
}

export default MatchList;
