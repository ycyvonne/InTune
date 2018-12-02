import React, { Component } from "react";
import { Header, Loader, ImageCard } from "../../";
import moment from 'moment';

import './ConcertInfoPage.scss'

class ConcertInfoPage extends Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            initConcerts : false,
            concert: []
        };
        
        this.initConcert = this.initConcert.bind(this);

        if (
            !this.props.concerts.concertsData ||
            !this.props.concerts.concertsData.fetched
          ) {
            this.props.getConcerts(this.initConcert);
        }
        
    }

    initConcert() {
        if (!this.props.concerts.concertsData) {
          this.setState({
            concert: []
          });
        } else {
          var data = Object.values(this.props.concerts.concertsData);
          data.pop();
          var concertData = [data.find(obj => obj.id == this.props.concertId) ];
          this.setState({
            initConcerts: true,
            concert : concertData[0],
          });
        }
      }

      getDateString (datetime){
          var d = moment(datetime);
          var dateString = moment.monthsShort(d.month()) + ", " + d.date() + " " + d.year();
          return dateString;
      }

      redirectToConcertsPage() {
        window.location.href = "/concerts";
      }

      redirectToConcertUri(uri){
        window.location.href = uri;
      }

    render() {
        var isValid = true;
        if (this.state.concert.length == 0) {
          isValid = false;
        }
        console.log(this.state.concert)
        return (
            <div className ="concert-info-wrapper">
                {!isValid && <Loader type="Bars" color="#005AA8" />}
                {isValid && 
                <div className="concert-main-wrapper">
                    <img src={`http://images.sk-static.com/images/media/profile_images/artists/${this.state.concert.performance[0].artist.id}/huge_avatar`} />
                    <h1 className="concert-title">Beach Bums and Bedroom with El Chisme at The Roxy Theatre</h1>
                </div>}
            </div>
        )
    }
    
}

export default ConcertInfoPage;
