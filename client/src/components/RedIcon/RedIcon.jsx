import React, { Component } from 'react';
import './RedIcon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class RedIcon extends Component {
  render() {
    return (
      <div className="icon-wrapper" onClick={this.props.onClick}>
        <FontAwesomeIcon RedIcon={this.props.icon} />
      </div>
    )
  }
}

export default RedIcon;