import React, { Component } from 'react';

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {};
        this.props.getUsername();
        
        this.authorize = this.authorize.bind(this);

        if (!this.props.user.access_token && !this.props.user.refresh_token) {
            this.authorize();
        }
    }

    authorize() {
        var code = RegExp(/code=([^&]*)/).exec(window.location.href)[1];
        this.props.authorize(code);
    }

    render() {
        var isValid = true;
        if (this.props.user.error == 'invalid_token') {
            isValid = false;
        }

        // TODO: if isValid render profile component
        //       else redirect to main
        return (
            <div>
                {isValid && <div>
                    <h3>User logged in</h3>
                    <div>Name: {this.props.user.display_name}</div>  
                    <div>Email: {this.props.user.email}</div>
                    <code>
                        {JSON.stringify(this.props.user)}
                    </code>
                </div>}
            </div>
        )
    }
}

export default MyComponent;
