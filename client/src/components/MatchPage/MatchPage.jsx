import React, { Component } from "react";
import {
    Header,
    ProfilePicture,
    ProfileDetails,
    FavoriteList,
    Button
} from "..";
import "./MatchPage.scss";
import "../ProfilePicture/ProfilePicture.scss";

class MatchPage extends Component {
    render() {
        return (
            <div className="title-text">
                <div>Friends match your music taste!</div>
            </div>

        )
    }
}

export default MatchPage;