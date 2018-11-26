import React, { Component } from "react";
import { Input } from "../";
import "./ImageCard.scss";

class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    var htmlForTarget, overlay, input, pointerClass;
    if (this.props.isInputFile) {
      htmlForTarget = "image-input";
      input = <Input customId="image-input" customType="file" />;
      overlay = (
        <div id="overlay">
          <div>Upload!</div>
        </div>
      );
      pointerClass = "pointer";
    }
    return (
      <div className={`image-card ${this.props.customClass}`}>
        <label className="image-container" htmlFor={htmlForTarget}>
          <img
            className={`image-picture ${pointerClass} ${
              this.props.dimensionClass
            }`}
            src={this.props.imgUrl}
          />
          {overlay}
        </label>
        {input}
      </div>
    );
  }
}

export default ImageCard;
