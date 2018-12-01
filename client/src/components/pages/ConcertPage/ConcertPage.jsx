import React, { Component } from "react";
import { ConcertList, Header, Loader, Pagination } from "../../";
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
      concerts: []
    };

    this.initConcerts = this.initConcerts.bind(this);
    this.setPageNumber = this.setPageNumber.bind(this);
  }

  componentDidMount() {
    if (
      !this.props.concerts.concertsData ||
      !this.props.concerts.concertsData.fetched
    ) {
      this.props.getConcerts(this.initConcerts);
    }
  }

  initConcerts() {
    // if (!this.props.concerts.concertsData) {
    //   this.setState({
    //     concerts: []
    //   });
    // } else {
      // var data = Object.values(this.props.concerts.concertsData);
      // data.pop();
      this.setState({
        initConcerts: true,
        // concerts: [data],
        maxPages: Math.ceil(this.state.concerts.length / this.state.CONCERTS_PER_PAGE) - 1
      });
    // }
    
  }

  getCurrentConcertsOnThisPage() {
    return this.state.concerts.slice(
      this.state.pageNumber * this.state.CONCERTS_PER_PAGE,
      (this.state.pageNumber + 1) * this.state.CONCERTS_PER_PAGE
    );
  }

  setPageNumber(pageNum) {
    this.setState({ pageNumber: pageNum })
  }
  

  render() {
    var isValid = true;
    if (!this.props.concerts.concertsData) {
      isValid = false;
    }
    return (
      <div className="concerts-page-wrapper">
        <Header heading="Concert Discovery" customClass="header" />
        {!isValid && <Loader type="Bars" color="#005AA8" />}
        {isValid && (
          <ConcertList concerts={this.getCurrentConcertsOnThisPage()} />
        )}
        {isValid && <Pagination 
          maxPages={this.state.maxPages}
          setPageNumber={this.setPageNumber}
        />}
      </div>
    );
  }
}

export default ConcertPage;
