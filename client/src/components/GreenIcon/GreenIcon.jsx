import React, { Component } from 'react';
import './GreenIcon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class GreenIcon extends Component {
  render() {
    return (
      <div className="icon-wrapper" onClick={this.props.onClick}>
        <FontAwesomeIcon icon={this.props.icon} />
      </div>
    )
  }
}

export default GreenIcon;