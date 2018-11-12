import React, { Component } from "react";
import "./ProfileColumn2.css";

class ProfileColumn2 extends Component {
  render() {
    return (

      // <div className="profile-column2-wrapper">Profile Column2 here</div>
      <div className="profile-title">FULL NAME
      <form id="text-field">
          <input type="text" />
        </form><p></p>
        <div className="profile-title">USERNAME
        <form id="text-field">
            <input type="text" />
          </form><p></p>
          <div className="profile-title">SPOTIFY ACCOUNT
      <form id="text-field">
              <input type="text" />
            </form><p></p>
            <div className="profile-title">FAVOURITE ARTIST
      <form id="text-field">
                <input type="text" />
              </form><p></p>
              <div className="profile-col-2">
                <div className="profile-title">EMAIL
                <form id="text-field">
                    <input type="text" />
                  </form><p></p>
                </div>
                <div className="profile-title">PASSWORD
                <form id="text-field">
                    <input type="text" />
                  </form><p></p>
                </div>
                <div className="profile-title">LOCATION
                <form id="text-field">
                    <input type="text" />
                  </form><p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      // <div className="profile-title"></div>




    );

  }
}

export default ProfileColumn2;
