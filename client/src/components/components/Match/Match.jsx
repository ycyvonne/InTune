import React, { Component } from "react";
import { faPlusCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { ProfilePicture, Button, Icon } from "../../";
import "./Match.scss";

class Match extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    var iconStack = (
      <span className="fa-layers fa-fw">
        <Icon icon={faCircle} color="white" size="lg" />
        <Icon icon={faPlusCircle} color="rgb(237, 182, 189)" />
      </span>
    );
    return (
      <div className="match-wrapper">
        <div className="image-wrap">
          <ProfilePicture
            imageUrl={this.props.img}
            customSize="match-picture-size"
            isCircle={true}
          />
          <Button customClass="add-button" text={iconStack} />
        </div>
        <div className="name">{this.props.name}</div>
        <div className="bio">
          As a DJ, I play 80s. As myself, I listen to a little more.
        </div>
      </div>
    );
  }
}

export default Match;
