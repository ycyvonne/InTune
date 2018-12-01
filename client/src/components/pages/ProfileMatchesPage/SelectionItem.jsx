import React, { Component } from "react";
import "./SelectionItem.scss";

class SelectionItem extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      id: this.props.id
    };
  }

  render() {
    var className = "tab-list-item";
    if (this.props.currentSelection == this.props.id) {
      className += " tab-list-active";
    }

    return (
      <div
        className={className}
        onClick={() => this.props.onClick(this.state.id)}
      >
        {this.props.name}
      </div>
    );
  }
}

export default SelectionItem;
