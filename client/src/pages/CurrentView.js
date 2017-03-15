import React from 'react';

//import { getCourse } from '../lib/api';

import '../Forecast.css';

class WeeklyView extends React.Component {  
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            value: '',
            forecast: []
        };
    }

    render(){

        return(
            <div>
                <h1>Welcome! See below for Today's forecast of your saved courses!</h1>
            </div>
        );
    }
}

export default WeeklyView;