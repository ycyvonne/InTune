import React, { Component } from "react";
import { Input } from "../../";

class FavoriteList extends Component {
  constructor(props) {
    super(props);
    this.props = props;
    var maxCount = this.props.maxCount ? this.props.maxCount : 10;
    var inputCount = this.props.data ? this.props.data.length : 0;
    this.state = { maxCount: maxCount, inputCount: inputCount };
  }
  render() {
    var remainderInputs = [];
    var defaultInputs;
    for (var i = 0; i < this.state.maxCount - this.state.inputCou; i++) {
      remainderInputs.push(<Input customType="text" />);
    }
    if (this.state.inputCount) {
      defaultInputs = this.props.data
        .slice(0, this.state.maxCount)
        .map((val, i) => {
          return (
            <Input customType="text" defaultInput={JSON.parse(val).name} />
          );
        });
    }
    return (
      <div>
        <div className="profile-picture-heading">TOP {this.props.topic}</div>
        {defaultInputs}
        {remainderInputs}
      </div>
    );
  }
}

export default FavoriteList;
