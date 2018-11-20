import React, { Component } from "react";
import "./MatchingCard.scss";
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { Icon, GreenIcon, RedIcon } from "..";
// import RedIcon from "../RedIcon/RedIcon";
// import GreenIcon from "../GreenIcon/GreenIcon";

class MatchingCard extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div className="card-wrapper">
                <div className="card-container">
                    <div className="card-frame">
                        {/* <img className="photoBox" src="https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fgojoebruin.com%2Fwp-content%2Fuploads%2Fgetty-images%2F2017%2F09%2F514616054-ucla-v-usc.jpg.jpg&w=850&h=560&c=sc" alt="joe bruins"></img> */}
                        <img className="photoBox" src={this.props.imgUrl} alt="PhotoBox"></img>
                        <div className="descriptionBox ftb-inner-margin">
                            <div className="name">{this.props.text} </div>
                            <div className="descriptionText"> {this.props.text} </div>
                        </div>
                        <div className="selectionBox">

                            {/* <i class="fa faCheckCircle" style="color:green"> <Icon icon={faCheckCircle} /></i> */}
                            <Icon icon={faCheckCircle} />
                            <Icon icon={faTimesCircle} />
                            {/* <div className="descriptionText"> Here is the description.</div> */}
                        </div>



                    </div>
                </div>

                {/* <img src={this.props.imgUrl} />
                <div className="text-overlay">{this.props.text}</div> */}
            </div >

        );
    }
}


export default MatchingCard;