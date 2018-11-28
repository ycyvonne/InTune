import React, { Component } from "react";
import { Concert } from "../../";
import "./ConcertList.scss";
class ConcertList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
      <div className="concert-list-wrapper">
        {this.props.concerts.map(concert => {
          return (
            <Concert
              key={concert.id}
              name={concert.displayName}
              location={concert.venue.displayName}
              artist={concert.performance[0].displayName}
              link={concert.uri}
              id={concert.id}
            />
          );
        })}
      </div>
    );
  }
}
export default ConcertList;
