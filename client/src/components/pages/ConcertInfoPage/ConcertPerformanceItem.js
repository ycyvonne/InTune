import React, { Component } from "react";
import { ConcertImage } from "../../";
import './ConcertInfoPage.scss'

class ConcertPerformanceItem extends Component {
    render() {
        return (
        <a
            href={this.props.link}
            className="concert-performance-wrapper"
            target="_blank"
        >
            <div className="performance-item">
                <ConcertImage
                    artistId={this.props.artistId}
                    width='90px'
                    height='90px'/>
                <p>{this.props.name}</p>
            </div>
        </a>);
    }
    
}

export default ConcertPerformanceItem;
