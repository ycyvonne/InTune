import React, { Component } from "react";
import "./Modal.scss";
import dancingMusic from '../../../assets/img/dancing_music.gif';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
        <div className={`modal-wrapper ${!this.props.active ? 'modal-inactive' : ''}`}>
            <div className="overlay"></div>
            <div className="modal-main">
                <img src={dancingMusic} className="modal-image"/>
                <div className="modal-content">{this.props.children}</div>
            </div>
        </div>
    )
  }
}

export default Modal;
