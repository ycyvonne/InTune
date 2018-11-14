import React, { Component } from "react";
import "./Concert.scss";

class Concert extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {};
  }
  render() {
    return <div className="concert-wrapper">Concert item</div>;
  }
}

export default Concert;
