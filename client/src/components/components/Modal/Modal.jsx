import React, { Component } from "react";
import "./Modal.scss";

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
                {this.props.children}
            </div>
        </div>
    )
  }
}

export default Modal;
