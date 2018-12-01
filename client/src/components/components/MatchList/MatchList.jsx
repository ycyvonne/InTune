import React, { Component } from "react";
import { Match } from "../../";
import "./MatchList.scss";

class MatchList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      marginLeft: 0,
      matchesWindowWidth: 0,
      matchListWidth: 0,
      marginMax: 0
    };
    this.hoverLeft = this.hoverLeft.bind(this);
    this.hoverRight = this.hoverRight.bind(this);
  }

  componentDidMount() {
    this.setState({
      matchesWindowWidth: this.matchesWindow.offsetWidth,
      matchListWidth: this.matchList.offsetWidth,
      marginMax: this.matchList.offsetWidth - this.matchesWindow.offsetWidth
    });
  }

  hoverLeft() {
    if (this.state.marginLeft != 0) {
      this.setState({ marginLeft: this.state.marginLeft + 100 });
    }
  }

  hoverRight() {
    if (Math.abs(this.state.marginLeft) < this.state.marginMax) {
      this.setState({ marginLeft: this.state.marginLeft - 100 });
    }
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
        <div className="left-bar" onMouseEnter={this.hoverLeft} />
        <div className="right-bar" onMouseEnter={this.hoverRight} />
        <div
          style={{
            marginLeft: this.state.marginLeft + "pt"
          }}
          ref={matchList => {
            this.matchList = matchList;
          }}
          className="match-list-wrapper"
        >
          {matches.map(match => {
            // TODO: add key prop when these are real matches
            return (
              <div className="tile">
                <Match name={match.name} img={match.img} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MatchList;
