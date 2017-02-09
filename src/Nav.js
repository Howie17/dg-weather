import React from 'react';
import './Nav.css';
import DisplayMode from './DisplayMode';


class Nav extends React.Component {
    render() {

        return (
            <div className="navBar">
                Display Modes: 
                <button onClick={<DisplayMode mode="PlayableForecast" />} className="button">Playable Forecast</button> |
                <button onClick={<DisplayMode mode="CourseSearchForecast" />} className="button">Course Search Forecast</button> |
                <button onClick={<DisplayMode mode="PlayableByDay" />} className="button">Playable Courses by Day</button>
            </div>
        );
    }
}

export default Nav;
