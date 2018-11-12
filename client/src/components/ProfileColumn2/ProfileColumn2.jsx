import React, { Component } from "react";
import "./ProfileColumn2.scss";

class ProfileColumn2 extends Component {
  render() {
    return (

      <div className="profile-wrapper">

        <div className="column">
          <div>
            <div className="profile-title">FULL NAME </div>
            <input type="text" />
          </div>
          <div>
            <div className="profile-title">USERNAME </div>
            <input type="text" />
          </div>
          <div>
            <div className="profile-title">SPOTIFY ACCOUNT </div>
            <input type="text" />
          </div>
          <div>
            <div className="profile-title">FAVOURITE ARTIST </div>
            <input type="text" />
          </div>
        </div>
        <div className="column">
          <div>
            <div className="profile-title">EMAIL </div>
            <input type="text" />
          </div>
          <div>
            <div className="profile-title">PASSWORD </div>
            <input type="text" />
          </div>
          <div>
            <div className="profile-title">LOCATION </div>
            <input type="text" />
          </div>
        </div>
      </div>
    );

  }
}

export default ProfileColumn2;
