import React from 'react';
import '../Nav.css';
//import { Link } from 'react-router';
//import { getCourse } from '../lib/api';

//material-ui imports
import AppBar from 'material-ui/AppBar';
//import FontIcon from 'material-ui/FontIcon';
//import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';
import {deepOrangeA400, grey600, grey800, limeA400} from 'material-ui/styles/colors';

class Nav extends React.Component {
    render() {
    
        return (
            <div className="navBar">
                {/*
                <Link to="PlayableByDay"><button className="button">Playable Courses by Day</button></Link> | 
                
                <Link to="CourseSearchForecast"><button className="button">Course Search Forecast</button></Link> | 
                {/*
                <Link to="/"><button className="button">Playable Forecast</button></Link> | 
                <Link to="/Preferences"><button className="button">Preferences</button></Link> 
                <Link to="/DSForecast"></Link> 
                */}
                
                  <TitleBar />
            </div>
        );
    }
}

class SearchField extends React.Component {

    render() {
        const styles = {
            errorStyle: {
                color: deepOrangeA400,
            },
            floatingLabelStyle: {
                color: grey800,
            },
            hintStyle: {
                color: grey600,
            },
            textField: {
                color: grey800,
            },
            underlineStyle: {
               borderColor: grey800,
            },
            underlineFocusStyle: {
               borderColor: grey800,
            }
        };
            
        return (
            <TextField 
                className="searchField" 
                hintText="Search" 
                hintStyle={styles.hintStyle}
                floatingLabelStyle={styles.floatingLabelStyle}
                inputStyle={styles.textField}
                underlineStyle={styles.underlineStyle} 
                underlineFocusStyle={styles.underlineFocusStyle}
            />
        );
    }
}

class TitleBar extends React.Component {
    render() {
        const styles = {
            titleBar: {
                background: limeA400,
            },
        };
        return (
            <div>
                <AppBar title="dg-weather" style={styles.titleBar} iconElementRight={<SearchField/>}/>
            </div>
        );
    }
}   

export default Nav;
