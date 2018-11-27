import React, { Component } from "react";
import "./Icon.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Icon extends Component {
  render() {
    return (
      <div className="icon-wrapper" onClick={this.props.onClick}>
        <FontAwesomeIcon
          icon={this.props.icon}
          color={this.props.color}
          size={this.props.size}
        />
      </div>
    );
  }
}

export default Icon;
