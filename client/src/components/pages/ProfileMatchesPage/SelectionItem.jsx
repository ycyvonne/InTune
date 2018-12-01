import React, { Component } from "react";

class ProfileMatchesPage extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    return (
        <div className="selection-item" onClick={this.props.onClick}>
            {this.props.name}
        </div>
    );
  }
}

export default ProfileMatchesPage;
