import React from 'react';
import '../Nav.css';
import {hashHistory} from 'react-router';
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
    constructor(props) {
        super(props);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.setState = this.setState.bind(this);
        this.state = {
            value: '',
        };
        
    }
    handleTextChange(event) {
        this.setState({value: event.target.value});
    }
    handleSearchClick(e) {
        let textValue = this.state.value;                                                                  //todo: onError display error msg "Course not found." 
        if (textValue === "") {
            console.log("Error: Course does not exist.")
        } else {
            hashHistory.push('weekly/' + textValue);
        }
        e.preventDefault();
    }

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
            <form onSubmit={this.handleSearchClick}>
                <TextField 
                    className="searchField" 
                    hintText="Search" 
                    hintStyle={styles.hintStyle}
                    floatingLabelStyle={styles.floatingLabelStyle}
                    inputStyle={styles.textField}
                    underlineStyle={styles.underlineStyle} 
                    underlineFocusStyle={styles.underlineFocusStyle}
                    value={this.state.value}
                    onChange={this.handleTextChange}
                    fullWidth={true}
                />
            </form>
        );
    }
}

class TitleBar extends React.Component {
    render() {
        const styles = {
            titleBar: {
                background: limeA400,
            },
            search: {
                width: "30%",
            },
        };
        return (
            <div>
                <AppBar title="dg-weather" style={styles.titleBar} iconStyleRight={styles.search} iconElementRight={<SearchField/>}/>
            </div>
        );
    }
}   

export default Nav;
