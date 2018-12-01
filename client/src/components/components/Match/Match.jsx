import React, { Component } from "react";
import { faPlusCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { ProfilePicture, Button, Icon } from "../../";
import "./Match.scss";

import loading from "../../../assets/icons/loading.gif";

class Match extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      id: this.props.id,
      isLoading: false,
      isToggled: false
    };
    this.makeMatch = this.makeMatch.bind(this);
  }

  makeMatch() {
    if (!this.state.isToggled) {
      this.setState({
        isToggled: true,
        sLoading: true
      });

      this.props.matchUser(this.state.id, () => {
        this.setState({ isLoading: false });
        if (this.props.matchState.isMatch) {
          this.props.showMatch("person you matched with");
        }
      });
    }
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
      <div className={`match-wrapper type-${this.props.type}`}>
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
        <div className="name">{this.props.name}</div>
      </div>
    );
  }
}

export default Match;
