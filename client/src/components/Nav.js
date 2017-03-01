import React from 'react';
import '../Nav.css';
import { Link } from 'react-router';

class Nav extends React.Component {
    render() {

        return (
            <div className="navBar">
                Display Modes:
                {/*
                <Link to="PlayableByDay"><button className="button">Playable Courses by Day</button></Link> | 
                */}
                <Link to="CourseSearchForecast"><button className="button">Course Search Forecast</button></Link> | 
                {/*
                <Link to="/"><button className="button">Playable Forecast</button></Link> | 
                <Link to="/Preferences"><button className="button">Preferences</button></Link> 
                */}
                <Link to="/DSForecast"><button className="button">dsForecast</button></Link>                
            </div>
        );
    }
}

export default Nav;
