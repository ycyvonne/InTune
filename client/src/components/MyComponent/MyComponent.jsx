import React, { Component } from 'react';

class MyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        props.getUsername();
    }

    render() {
        return (
            <div>
                <h3>MyComponent</h3>
                <div>{this.props.user.name}</div>                
            </div>
        )
    }
}

export default MyComponent;
