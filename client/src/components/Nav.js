import React from 'react';
import '../Nav.css';
import {hashHistory} from 'react-router';
import AppBar from 'material-ui/AppBar';
import AutoComplete from 'material-ui/AutoComplete';
import {deepOrangeA400, grey600, grey800, blue500} from 'material-ui/styles/colors';
let courseList=require('../storage/courses.json');


class Nav extends React.Component {
    render() {
    
        return (
            <div className="navBar">              
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
        this.setState({value: event});
    }
    handleSearchClick(e) {
        let textValue = this.state.value;                                                                  //todo: onError display error msg "Course not found." 
        let len = courseList.length;
        let title = "", match = false;

        for (let i = 0; i < len; i++){
            title = courseList[i];
            if (textValue === title){
                match = true;
            }
        } 

        if (textValue === "") {
            console.log("Error: No input provided.");                    //Doesn't ever execute
        } else if ( match === false) {
            console.log("Error: Course does not match.");
            this.setState({errors: "Course does not match, please check spelling and try again."});
        } else if (match === true) {
            hashHistory.push('weekly/' + textValue);
            this.setState({errors: ""});
        }

        //e.preventDefault();
    }

    render() {
        const styles = {
            color: grey600,
            errorStyle: {
                color: deepOrangeA400,
            },
            hintStyle: {
                color: grey600,
            },
            inputStyle: {
                color: grey800,
            },
            underlineStyle: {
               borderColor: grey800,
               color: grey800,
            },
            underlineFocusStyle: {
               borderColor: grey800,
            }
        };
        
        //let courseList=require('../storage/courses.json');
        
        return (
                <AutoComplete
                    hintText="Search"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={courseList}
                    maxSearchResults={8}
                    onUpdateInput={this.handleTextChange}
                    value={this.state.value}
                    onNewRequest={this.handleSearchClick}
                    hintStyle={styles}
                    underlineStyle={styles.underlineStyle}
                    underlineFocusStyle={styles.underlineFocusStyle}
                    inputStyle={styles.inputStyle}
                    id="search"
                    errorText={this.state.errors}
                />
        );
    }
}

class TitleBar extends React.Component {
    render() {
        const styles = {
            titleBar: {
                background: blue500,
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
