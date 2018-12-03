import React, { Component } from "react";
import {
  faPlusCircle,
  faCircle,
  faCalendarAlt,
  faMap,
  faMusic
} from "@fortawesome/free-solid-svg-icons";
import { ProfilePicture, Button, Icon } from "../../";
import "./Match.scss";
import moment from "moment";

import loading from "../../../assets/icons/loading.gif";

class Match extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    console.log(this.props);
    var artists = [];
    var tracks = [];
    for (var i = 0; i < this.props.topArtists.length; i++) {
      artists.push(JSON.parse(this.props.topArtists[i]));
    }
    for (var i = 0; i < this.props.topTracks.length; i++) {
      tracks.push(JSON.parse(this.props.topTracks[i]));
    }
    this.state = {
      id: this.props.id,
      isLoading: false,
      isToggled: false,
      isMatched: false,
      isSquash: false,
      doneDisappear: false,
      artists: artists,
      tracks: tracks
    };
    console.log(this.state);
    this.makeMatch = this.makeMatch.bind(this);
    this.trimLength = this.trimLength.bind(this);
    this.getDateString = this.getDateString.bind(this);
    this.makeFade = this.makeFade.bind(this);
  }

  makeMatch() {
    if (!this.state.isToggled) {
      this.setState({
        isToggled: true,
        sLoading: true
      });

      if (this.props.type != "concert") {
        this.props.matchUser(this.state.id, () => {
          this.setState({ isLoading: false });
          if (this.props.matchState.isMatch) {
            this.makeFade();
            var name;
            if (this.props.type == "user") {
              name = this.props.name.split(" ")[0];
            } else {
              name = this.props.name;
            }
            this.props.showMatch(name);
          }
        });
      } else {
        this.props.matchUserWithConcert(this.state.id, () => {
          this.setState({ isLoading: false });
          if (this.props.matchState.isMatch) {
            this.makeFade();
            var name = this.trimLength(this.props.name, 60);
            this.props.showMatch(name);
          }
        });
      }
    }
  }

  makeFade() {
    if (!this.isMatched) {
      setTimeout(() => {
        this.setState({ isMatched: true });
        setTimeout(() => {
          this.setState({ isSquash: true });
          setTimeout(() => {
            this.setState({ doneDisappear: true });
          }, 1000);
        }, 500);
      }, 3000);
    }
  }

  trimLength(str, len) {
    if (str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  }

  getDateString(datetime) {
    var d = moment(datetime);
    var month = moment.monthsShort(d.month());
    var day = d.date();
    var year = d.year();
    if (!month || !day || !year) {
      console.log("datetime error", datetime);
      return "";
    }
    return `${month} ${d.date()}, ${d.year()}`;
  }

  render() {
    var iconStack;
    if (!this.state.isLoading) {
      iconStack = (
        <span className="fa-layers fa-fw">
          <Icon icon={faCircle} color="white" size="lg" />
          <Icon
            icon={faPlusCircle}
            color={this.state.isToggled ? "#ff5151" : "rgb(237, 182, 189)"}
          />
        </span>
      );
    } else {
      iconStack = (
        <span className="fa-layers fa-fw">
          <Icon icon={faCircle} color="white" size="lg" />
          <img className="loading" src={loading} />
        </span>
      );
    }

    return (
      <div
        className={`match-wrapper type-${this.props.type} ${
          this.state.isMatched ? "disappear" : ""
        } ${this.state.isSquash ? "squash" : ""} ${
          this.state.doneDisappear ? "hide" : ""
        }`}
      >
        {this.props.type != "user" && (
          <div className="banner">{this.props.type}</div>
        )}
        <div className="image-wrap">
          <ProfilePicture
            imageUrl={this.props.img}
            customSize="match-picture-size"
            isCircle={true}
          />
          <Button
            customClass="add-button"
            text={iconStack}
            onClick={this.makeMatch}
          />
        </div>
        <div className="name">{this.trimLength(this.props.name, 60)}</div>
        {this.props.type == "user" && (
          <div className="match-details">
            <div className="top-artists">
              {this.state.artists.slice(0, 1).map((artist, i) => {
                return (
                  <div className="match-item" key={i}>
                    <a href="#">
                      <div
                        className="match-thumbnail"
                        style={{
                          background: artist.img ? `url(${artist.img}` : ""
                        }}
                      />
                      <div>
                        <h3>{artist.name}</h3>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
            <div className="top-tracks">
              {this.state.tracks.slice(0, 1).map(track => {
                console.log(track);
                return (
                  <div className="match-item">
                    <a href="#">
                      <div className="match-icon-wrapper">
                        <Icon icon={faMusic} />
                      </div>
                      <div className="track-details">
                        <h3>{track.name}</h3>
                        <p>{track.artist}</p>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {this.props.type == "concert" && (
          <div className="bio">
            <div className="concert-calendar">
              <Icon icon={faCalendarAlt} />{" "}
              {this.getDateString(this.props.date)}
            </div>
            <div className="concert-location">
              <Icon icon={faMap} />
              {this.props.artist}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Match;
