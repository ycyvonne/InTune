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
          var name;
          var location;
          var artist;
          var link;
          var id;
          var artistId;

          if (!this.props.format) {
            name = concert.displayName;
            location = concert.venue.displayName;
            artist = concert.performance[0].displayName;
            link = concert.uri;
            id = concert.id;
            artistId = concert.performance[0].artist.id;
          }
          else {
            name = concert.name;
            location = concert.location;
            artist = concert.artist;
            link = concert.url;
            id = concert.id;
            artistId = concert.artist_id;
          }
          return (
            <Concert
              key={i}
              name={name}
              location={location}
              artist={artist}
              link={link}
              id={id}
              artistId={artistId}
            />
          );
        })}
      </div>
    );
  }
}
export default ConcertList;
