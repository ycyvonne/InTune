import React, { Component } from "react";
import ProfilePicture from "../../components/ProfilePicture/ProfilePicture";

class SelectionItem extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      id: this.props.id
    };
  }

  render() {
    var className = "selection-item";
    if (this.props.currentSelection == this.props.id) {
      className += " active-item";
    }

    return (
      <div
        className={className}
        onClick={() => this.props.onClick(this.state.id)}
      >
        <ProfilePicture
          imageUrl={this.props.img}
          customSize="nav-picture-size"
          isCircle={true}
        />
        {this.props.name}
      </div>
    );
  }
}

export default SelectionItem;
