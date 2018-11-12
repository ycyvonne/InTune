import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <div>{this.props.title}</div>
        <input
          id={this.props.customId}
          type={this.props.customType}
          onChange={e => this.props.customOnChange(e)}
        />
      </div>
    );
  }
}

export default Input;
