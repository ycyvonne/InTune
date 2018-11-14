import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="header-wrapper">
        <div className="subtitle">
          <span>------</span> {this.props.subtitle}
        </div>
        <div className="heading">{this.props.heading}</div>
        <div className="subheading">{this.props.subheading}</div>
      </div>
    );
  }
}

export default Header;
