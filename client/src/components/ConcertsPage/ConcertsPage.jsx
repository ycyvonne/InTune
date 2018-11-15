import React, { Component } from "react";
import { Concert } from "../";
import "./ConcertsPage.scss";

class ConcertsPage extends Component {
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
    if (
      !this.props.concerts.concertsData ||
      !this.props.concerts.concertsData.fetched
    ) {
      isValid = false;
    } else {
      console.log(this.props.concerts.concertsData);
      // data = Array.from(this.props.concerts.concertsData);
      data = Object.values(this.props.concerts.concertsData);
      data.pop();
      console.log(data);
      // console.log(this.props.concerts.concertsData[0].displayName);
    }
    return (
      isValid && (
        <div className="concert-discovery-wrapper">
          <div className="header">Concert Discovery</div>
          <div className="concert-list-wrapper">
            {/* <Concert {...this.props} /> */}
            {data.map(concert => {
              return (
                <Concert
                  key={concert.id}
                  name={concert.displayName}
                  location={concert.venue.displayName}
                  artist={concert.performance[0].displayName}
                />
              );
            })}
          </div>
        </div>
      )
    );
  }
}

export default ConcertsPage;
