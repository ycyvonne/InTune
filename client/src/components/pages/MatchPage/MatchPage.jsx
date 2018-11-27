import React, { Component } from "react";
import "./MatchPage.scss";

class MatchPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
    console.log(this.props.user);
    if (!this.props.user.matchesData || !this.props.user.matchesData.fetched) {
      this.props.getMatches();
    }
  }
  render() {
    return <div>Match Page</div>;
  }
}

export default MatchPage;
