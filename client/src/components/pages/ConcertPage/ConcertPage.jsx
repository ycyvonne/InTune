import React, { Component } from "react";
import { ConcertList, Header, Loader } from "../../";
import "./ConcertPage.scss";
import ConcertTemplate from './ConcertTemplate';

class ConcertPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      initConcerts: false,
      pageNumber: 0,
      maxPages: 0,
      CONCERTS_PER_PAGE: 9,
      concerts: Array.apply(null, Array(20)).map(() => ConcertTemplate)
    };

    this.initConcerts = this.initConcerts.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
    this.goToPrevPage = this.goToPrevPage.bind(this);
    this.nextIsValid = this.nextIsValid.bind(this);
    this.prevIsValid = this.prevIsValid.bind(this);

    // if (
    //   !this.props.concerts.concertsData ||
    //   !this.props.concerts.concertsData.fetched
    // ) {
    //   this.props.getConcerts(this.initConcerts);
    // }
  }

  initConcerts() {
    if (!this.props.concerts.concertsData) {
      this.setState({
        concerts: []
      });
    } else {
      var data = Object.values(this.props.concerts.concertsData);
      data.pop();
      this.setState({
        initConcerts: true,
        concerts: [data],
        maxPages: Math.ceil(data.length / this.state.CONCERTS_PER_PAGE) - 1
      });
    }
  }

  getCurrentConcertsOnThisPage() {
    return this.state.concerts.slice(
      this.state.pageNumber * this.state.CONCERTS_PER_PAGE,
      (this.state.pageNumber + 1) * this.state.CONCERTS_PER_PAGE
    );
  }

  goToNextPage() {
    if (this.nextIsValid()) {
      this.setState({
        pageNumber: this.state.pageNumber + 1
      });
    }
  }

  goToPrevPage() {
    if (this.prevIsValid()) {
      this.setState({
        pageNumber: this.state.pageNumber - 1
      });
    }
  }

  nextIsValid() {
    return this.state.pageNumber < this.state.maxPages;
  }

  prevIsValid() {
    return this.state.pageNumber > 0;
  }

  render() {
    var isValid = true;
    if (!this.props.concerts.concertsData) {
      isValid = false;
    }
    return (
      <div className="concerts-page-wrapper">
        <button onClick={this.goToPrevPage} disabled={!this.prevIsValid()}>
          Prev
        </button>
        <button onClick={this.goToNextPage} disabled={!this.nextIsValid()}>
          Next
        </button>
        <Header heading="Concert Discovery" customClass="header" />
        {!isValid && <Loader type="Bars" color="#005AA8" />}
        {isValid && (
          <ConcertList concerts={this.getCurrentConcertsOnThisPage()} />
        )}
      </div>
    );
  }
}

export default ConcertPage;
