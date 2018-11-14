import React, { Component } from "react";
import { Input } from "../";

class FavoriteList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <div>
        <div className="profile-picture-heading">TOP {this.props.topic}</div>
        <Input customType="text" />
        <Input customType="text" />
        <Input customType="text" />
        <Input customType="text" />
        <Input customType="text" />
      </div>
    );
  }
}

export default FavoriteList;
