import React, { Component } from 'react';
import { getAuthenticationURL } from '../../utils/loginCallback';
import './SpotifyLoginBtn.scss'

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
                    <button onClick={this.handleLogin} className="btn-dark">Log in with Spotify</button>
                </div>
            </div>
        )
    }
}

export default SpotifyLoginBtn;
