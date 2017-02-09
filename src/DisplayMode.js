import React from 'react';
import './Forecast.css';
/* import CourseSearchForecast from './CourseSearchForecast'; */
import PlayableByDay from './PlayableByDay'; 
/* import PlayableForecast from './PlayableForecast'; */

function DisplayMode(props) {
    /* const display = this.props.mode;
    var mode = "";
    console.log(display);
    if (display === "CourseSearchForecast") {
        mode = <CourseSearchForecast />
    }else if(display === "PlayableByDay") {
        mode = <PlayableByDay />
    }else{
        mode = <PlayableForecast />
    }
    return mode;   
} */

return <PlayableByDay />;
}


export default DisplayMode;
