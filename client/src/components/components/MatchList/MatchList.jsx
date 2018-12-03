import React, { Component } from "react";
import { Match, Icon, Modal } from "../../";
import "./MatchList.scss";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      marginLeft: 0,
      matchesWindowWidth: 0,
      matchListWidth: 0,
      marginMax: 0,
      isHoveringLeft: false,
      isHoveringRight: false,
      currentInterval: null,
      showingMatch: false,
      matchMessage: ""
    };
    this.setMoveInterval = this.setMoveInterval.bind(this);
    this.hoverLeft = this.hoverLeft.bind(this);
    this.stopHoverLeft = this.stopHoverLeft.bind(this);
    this.hoverRight = this.hoverRight.bind(this);
    this.stopHoverRight = this.stopHoverRight.bind(this);
    this.showMatch = this.showMatch.bind(this);
  }

  componentDidMount() {
    this.setState({
      matchesWindowWidth: this.matchesWindow.offsetWidth,
      matchListWidth: this.matchList.offsetWidth,
      marginMax: this.matchList.offsetWidth - this.matchesWindow.offsetWidth
    });
  }

  setMoveInterval(moveAmount) {
    return setInterval(() => {
      if (moveAmount > 0) {
        // moving left
        if (this.state.marginLeft <= 0) {
          this.setState({ marginLeft: this.state.marginLeft + moveAmount });
        }
      } else {
        // moving right
        if (Math.abs(this.state.marginLeft) < this.state.marginMax) {
          this.setState({ marginLeft: this.state.marginLeft + moveAmount });
        }
      }
    }, 1);
  }

  hoverLeft(amt) {
    if (this.state.marginLeft <= 0) {
      var interval = this.setMoveInterval(amt);
      this.setState({
        isHoveringLeft: true,
        currentInterval: interval
      });
    }
  }

  stopHoverLeft() {
    if (this.state.isHoveringLeft) {
      clearInterval(this.state.currentInterval);
      this.setState({
        isHoveringLeft: false,
        currentInterval: null
      });
    }
  }

  hoverRight(amt) {
    if (Math.abs(this.state.marginLeft) < this.state.marginMax) {
      var interval = this.setMoveInterval(-1 * amt);
      this.setState({
        isHoveringRight: true,
        currentInterval: interval
      });
    }
  }

  stopHoverRight() {
    if (this.state.isHoveringRight) {
      clearInterval(this.state.currentInterval);
      this.setState({
        isHoveringRight: false,
        currentInterval: null
      });
    }
  }

  showMatch(personMatchedWith) {
    this.setState({
      showingMatch: true,
      matchMessage: `Congrats! You and ${personMatchedWith} have matched.`
    });
    setTimeout(() => {
      this.setState({
        showingMatch: false,
        matchMessage: ""
      });
    }, 2500);
  }

  render() {
    var matches = this.props.user.matchesData;
    return (
      <div
        className="matches-window"
        ref={matchesWindow => {
          this.matchesWindow = matchesWindow;
        }}
      >
        <Modal active={this.state.showingMatch}>
          {this.state.matchMessage}
        </Modal>
        <div
          className="left-bar"
          onMouseEnter={() => this.hoverLeft(4)}
          onMouseLeave={this.stopHoverLeft}
        >
          <Icon icon={faArrowLeft} />
        </div>
        <div
          className="left-bar-fast"
          onMouseEnter={() => this.hoverLeft(10)}
          onMouseLeave={this.stopHoverLeft}
        />
        <div
          className="right-bar"
          onMouseEnter={() => this.hoverRight(4)}
          onMouseLeave={this.stopHoverRight}
        >
          <Icon icon={faArrowRight} />
        </div>
        <div
          className="right-bar-fast"
          onMouseEnter={() => this.hoverRight(10)}
          onMouseLeave={this.stopHoverRight}
        />
        <div
          style={{
            marginLeft: this.state.marginLeft + "pt"
          }}
          ref={matchList => {
            this.matchList = matchList;
          }}
          className="match-list-wrapper"
        >
          {matches.map((match, i) => {
            if (match.type == "user" || match.type == "artist")
              return (
                <div className="tile" key={i}>
                  <Match
                    matchUser={this.props.matchUser}
                    matchUserWithConcert={this.props.matchUserWithConcert}
                    matchState={this.props.user.matchResults}
                    showMatch={this.showMatch}
                    id={match.id}
                    type={match.type}
                    name={match.data.name}
                    img={match.data.img}
                    topArtists={match.data.artists}
                    topTracks={match.data.tracks}
                    key={i}
                  />
                </div>
              );
            else {
              return (
                <div className="tile" key={i}>
                  <Match
                    matchUser={this.props.matchUser}
                    matchUserWithConcert={this.props.matchUserWithConcert}
                    matchState={this.props.user.matchResults}
                    showMatch={this.showMatch}
                    id={match.id}
                    type={match.type}
                    name={match.data.name}
                    img={`http://images.sk-static.com/images/media/profile_images/artists/${
                      match.data.artist_id
                    }/huge_avatar`}
                    artist={match.data.artist}
                    date={match.data.date}
                    key={`concert-${i}`}
                  />
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default MatchList;
