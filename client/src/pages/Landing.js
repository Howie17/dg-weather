import React from 'react';

import '../Forecast.css';

class Landing extends React.Component {  
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            
        };
    }
    render(){
        return(
            <h1>Landing Page! Please login.</h1>

        );
    }
}