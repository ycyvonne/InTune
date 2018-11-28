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
            concert : concertData,
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
        
        return (
            <div className ="concert-info-wrapper">
                {!isValid && <Loader type="Bars" color="#005AA8" />}
                {isValid && (
                    <div>
                        <div className = "button-wrapper">
                            <button className="back-button" onClick={ () => {this.redirectToConcertsPage()}}>
                                Back
                            </button>
                        </div>
                        <div className = "concert-details-wrapper">
                            <Header heading={this.state.concert[0].displayName}  />
                            <ImageCard
                                imgUrl="https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/07/28/104618086-6ED1-REQ-TicketScamsAG-072817.1910x1000.jpg"
                                dimensionClass="concert-image-wrapper"
                            />
                            <div className = "concert-details">
                                <div className="section">Date & Time: 
                                    <div className="section-content">
                                        {moment(this.state.concert[0].start.datetime).format('hh:mm A')}  
                                    </div>
                                    <div className="section-content">
                                        {moment(this.state.concert[0].start.datetime).format('MMM DD, YYYY')}  
                                    </div>

                                </div>
                                <div className="section"> Line Up: 
                                    {this.state.concert[0].performance.map(performance => 
                                    <div key={performance.id} className="section-content"> 
                                    {performance.billing.replace(/^\w/, c => c.toUpperCase())}: <a href={performance.artist.uri}> 
                                    {performance.displayName} </a></div>
                                    ) } 
                                    </div>
                                <div className="section"> 
                                    Venue: 
                                    <div className="section-content">
                                        {this.state.concert[0].venue.displayName}
                                    </div>
                                    <div className="section-content">
                                        {this.state.concert[0].location.city}
                                    </div>
                                </div>
                            </div>
                            <div className="info-wrapper"> 
                                        <button className="info-button" onClick = {() => this.redirectToConcertUri(this.state.concert[0].uri)}>
                                            More Info & Tickets
                                        </button>
                            </div>
                        </div>
                    </div> 
                )}
            </div>
        )
    }
    
}

export default ConcertInfoPage;
