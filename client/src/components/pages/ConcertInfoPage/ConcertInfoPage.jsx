import React, { Component } from "react";
import { Loader, Icon, ConcertImage, ConcertPerformanceItem } from "../../";
import moment from 'moment';
import { faCalendarAlt, faMap } from "@fortawesome/free-solid-svg-icons";

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
                {
                    isValid && 
                    <div>  
                        <div className="concert-main-wrapper">
                            <ConcertImage
                                artistId={this.state.concert.performance[0].artist.id}
                                width='500px'
                                height='auto'
                            />
                            <div className="concert-detail-side">
                                <h1 className="concert-title">Beach Bums and Bedroom with El Chisme at The Roxy Theatre</h1>
                                <div className="blurb-icon"><Icon icon={faCalendarAlt}/>{this.getDateString(this.state.concert.start.datetime)}</div>
                            </div>
                        </div>
                        <div className="concert-performance-wrapper">
                            {this.state.concert.performance.map((performanceData, i) => {
                                return (<ConcertPerformanceItem
                                    key={i}
                                    link={performanceData.artist.uri}
                                    artistId={performanceData.artist.id}
                                    name={performanceData.artist.displayName}
                                />)
                            })}
                        </div>
                        <div className="concert-location-wrapper">
                            
                        </div>
                    </div>
                }
            </div>
        )
    }
    
}

export default ConcertInfoPage;
