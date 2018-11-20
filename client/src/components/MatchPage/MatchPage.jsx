import React, { Component } from "react";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Icon } from "..";
import "./MatchPage.scss";
import "../ProfilePicture/ProfilePicture.scss";

class MatchPage extends Component {
    render() {
        return (
            <div className="title-text">
                <div>Friends match your music taste!</div>
                <a class="icon-cog" >
                    <i class="icon-cog" ></i>
                    <Icon icon={faCheckCircle} />
                </a>










            </div >


        )
    }
}

export default MatchPage;