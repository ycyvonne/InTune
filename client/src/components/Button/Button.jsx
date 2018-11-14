import React, { Component } from "react";

class Button extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <button className={this.props.customClass} type={this.props.customType}>
        {this.props.text}
      </button>
    );
  }
}

export default Button;
