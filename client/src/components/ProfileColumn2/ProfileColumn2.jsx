import React, { Component } from "react";
import "./ProfileColumn2.css";

class ProfileColumn2 extends Component {
  render() {
    return (

      <div className="profile-column2-wrapper">


        <div>
          <div className="profile-title">FULL NAME </div>
          <form id="text-field">
            <input type="text" />
          </form>
        </div>
        <div>
          <div className="profile-title">USERNAME </div>
          <form id="text-field">
            <input type="text" />
          </form>
        </div>
        <div>
          <div className="profile-title">SPOTIFY ACCOUNT </div>
          <form id="text-field">
            <input type="text" />
          </form></div>
        <div>
          <div className="profile-title">FAVOURITE ARTIST </div>
          <form id="text-field">
            <input type="text" />
          </form>
        </div>

        <div className="profile-col-2">

          <div>
            <div className="profile-title">EMAIL </div>
            <form id="text-field">
              <input type="text" />
            </form>
          </div>

          <div>
            <div className="profile-title">PASSWORD </div>
            <form id="text-field">
              <input type="text" />
            </form>
          </div>

          <div>
            <div className="profile-title">LOCATION </div>
            <form id="text-field">
              <input type="text" />
            </form>
          </div>


        </div>
      </div>
    );

  }
}

export default ProfileColumn2;
