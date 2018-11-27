import React, { Component } from "react";
import "./Input.scss";

class Input extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <div id="title">{this.props.title}</div>
        <input
          id={this.props.customId}
          className={this.props.customClass}
          type={this.props.customType}
          onChange={e => this.props.customOnChange(e)}
          value={this.props.defaultInput}
        />
      </div>
    );
  }
}

export default Input;
