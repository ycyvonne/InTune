import React, { Component } from "react";
import "./Splash.scss";

class Splash extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className={`splash-wrapper ${this.props.customClass}`}>
        <div className="text-overlay">
          <div className="splash-subheading">{this.props.subheading}</div>
          <div className="splash-heading">{this.props.heading}</div>
          <div className="splash-subtitle">{this.props.subtitle}</div>
        </div>
      </div>
    );
  }
}

export default Splash;
