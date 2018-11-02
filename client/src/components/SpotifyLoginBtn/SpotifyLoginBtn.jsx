import React, { Component } from 'react';
import { getAuthenticationURL } from '../../utils/loginCallback';

class SpotifyLoginBtn extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        window.location.href = getAuthenticationURL();
    }

    render() {
        return (
            <div className="container">
                <div id="login">
                    <h1>This is an example of the Authorization Code flow</h1>
                    <button onClick={this.handleLogin}>Log in with Spotify</button>
                </div>
            </div>
        )
    }
}

export default SpotifyLoginBtn;
