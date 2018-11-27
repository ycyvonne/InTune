import React, { Component } from "react";
import ReactLoader from "react-loader-spinner";
import "./Loader.scss";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div className="loader-wrapper">
        <ReactLoader
          type={this.props.type}
          color={this.props.color}
          height="150"
          width="150"
        />
      </div>
    );
  }
}

export default Loader;
