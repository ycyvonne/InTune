import React, { Component } from "react";
import { ConcertList, Header, Loader } from "../";
import "./ConcertPage.scss";

class ConcertPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
    this.getConcerts = this.getConcerts.bind(this);
    if (
      !this.props.concerts.concertsData ||
      !this.props.concerts.concertsData.fetched
    ) {
      this.getConcerts();
    }
  }
  getConcerts() {
    this.props.getConcerts();
  }
  render() {
    var isValid = true;
    var data;
    if (!this.props.concerts.concertsData) {
      isValid = false;
    } else {
      data = Object.values(this.props.concerts.concertsData);
      // Remove final `fetch element. How do I not have to do this?
      data.pop();
    }
    return (
      <div className="concerts-page-wrapper">
        <Header heading="Concert Discovery" customClass="header" />
        {!isValid && <Loader type="Bars" color="#005AA8" />}
        {isValid && <ConcertList concerts={data} />}
      </div>
    );
  }
}

export default ConcertPage;
