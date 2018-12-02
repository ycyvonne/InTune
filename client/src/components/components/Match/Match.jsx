import React, { Component } from "react";
import {
  faPlusCircle,
  faCircle,
  faCalendarAlt,
  faMap
} from "@fortawesome/free-solid-svg-icons";
import { ProfilePicture, Button, Icon } from "../../";
import "./Match.scss";
import moment from "moment";

import loading from "../../../assets/icons/loading.gif";

class Match extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      id: this.props.id,
      isLoading: false,
      isToggled: false,
      isMatched: false,
      isSquash: false,
      doneDisappear: false
    };
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

      this.props.matchUser(this.state.id, () => {
        this.setState({isLoading: false });
        if (this.props.matchState.isMatch) {
          
          this.makeFade();
          var name;
          if (this.props.type == 'user') {
            name = this.props.name.split(' ')[0]
          }
          else if (this.props.type == 'artist'){
            name = this.props.name
          }
          else {
            name = this.trimLength(this.props.name, 60)
          }
          this.props.showMatch(name);
        }
      });
    }
  }

  makeFade() {
    if (!this.isMatched) {
      setTimeout(() => {
        this.setState({isMatched: true});
        setTimeout(() => {
          this.setState({isSquash: true})
          setTimeout(() => {
            this.setState({doneDisappear: true});
          }, 1000)
        }, 500)
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
      <div className={
        `match-wrapper type-${this.props.type} ${this.state.isMatched ? 'disappear' : ''} ${this.state.isSquash ? 'squash' : ''} ${this.state.doneDisappear ? 'hide' : ''}`}>
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
          <div className="bio">
            As a DJ, I play 80s. As myself, I listen to a little more.
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
