import React, { Component } from "react";
import { Concert } from "../../";
import "./ConcertList.scss";
class ConcertList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    var defaultPerRow = 5;
    return (
      <div className="concert-list-wrapper" style={{
        'gridTemplateColumns': `repeat(${this.props.numPerRow ? this.props.numPerRow : defaultPerRow}, 1fr)`
      }}>
        {this.props.concerts.map((concert, i) => {
          return (
            <Concert
              key={i}
              name={concert.displayName}
              location={concert.venue.displayName}
              artist={concert.performance[0].displayName}
              link={concert.uri}
              id={concert.id}
              artistId={concert.performance[0].artist.id}
            />
          );
        })}
      </div>
    );
  }
}
export default ConcertList;
