import React, { Component } from "react";

import "./ProfileMatchesPage.scss";

class EmptyBox extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.handleBtnClick = this.handleBtnClick.bind(this);
  }

  handleBtnClick() {
      if (this.props.buttonTo) {
        window.location.href = this.props.buttonTo;
      }
  }

  render() {
    return (
        <div className="no-people">
            <h1>{this.props.header}</h1>
            <p>{this.props.text}</p>
            {this.props.buttonText &&
                <button
                    onClick={this.handleBtnClick}>
                    {this.props.buttonText}
                </button>
            }
        </div>
    );
  }
}

export default EmptyBox;
