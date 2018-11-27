import React, { Component } from "react";
import { MatchList } from "../../";
import "./MatchPage.scss";

class MatchPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
    if (!this.props.user.matchesData || !this.props.user.matchesData.fetched) {
      this.props.getMatches();
    }
  }
  render() {
    var isValid = true;
    if (!this.props.user.matchesData) {
      isValid = false;
    }
    return isValid && <MatchList {...this.props} />;
  }
}

export default MatchPage;
