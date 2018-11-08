import React, { Component } from 'react';
import { Nav, TempProfile, SpotifyLoginBtn } from '../'
import { Route, Switch } from 'react-router-dom';

class Main extends Component {
   render() {
      return (
         <div>
            <Nav />
            {/*Alternate pages beneath navbar, based on current route*/}
            <Switch>
               <Route exact path='/' render={() => <SpotifyLoginBtn {...this.props} />} />
               <Route path='/callback' render={() => <TempProfile {...this.props} />} />
            </Switch>
         </div>
      )
   }
}

export default Main;
