import React, { Component } from "react";
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Icon } from "..";
import "./MatchPage.scss";
import "../ProfilePicture/ProfilePicture.scss";
import MatchingCard from "../MatchingCard/MatchingCard";

class MatchPage extends Component {
    render() {
        return (
            <div className="title-text">
                <div>Friends match your music taste!</div>
                {/* <a class="icon-cog" >
                    <i class="icon-cog" ></i>
                    <Icon icon={faCheckCircle} />
                </a> */}
                <div className="mask">
                    <div className="matchCards-container">
                        <MatchingCard
                            imgUrl="/img/concerts-card.png"
                            text="Match you with concerts"
                        />
                        <MatchingCard
                            imgUrl="/img/friends-card.png"
                            text="Friends with same music taste"
                        />
                        <MatchingCard
                            imgUrl="/img/artists-card.png"
                            text="Meet your favorite artist"
                        />
                    </div>


                </div>













            </div >


        )
    }
}

export default MatchPage;