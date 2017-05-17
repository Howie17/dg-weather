import React from 'react';
//import request from 'request';
//import {Tabs, Tab} from 'material-ui/Tabs';
import DropDownMenu from 'material-ui/DropDownMenu';
import FlatButton from 'material-ui/FlatButton';
import {hashHistory} from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
//import {hashHistory} from 'react-router';
import '../Forecast.css';
let courseList=require('../storage/courses.json');


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  form: {
    p: {
          "background-color": "#303030",
          color: "#FFFFFF",
          width: "80%",
          padding: "2%",
          margin: "auto",
          marginTop: "2%"
      },
    textfield: {
        margin: "10px",
    },
  },
};

class AddCourse extends React.Component {  
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.handleSubmitClick = this.handleSubmitClick.bind(this);
        this.handleCourseNameChange = this.handleCourseNameChange.bind(this);
        this.handleAltCourseNameChange = this.handleAltCourseNameChange.bind(this);
        this.handleLatGpsCoordsChange = this.handleLatGpsCoordsChange.bind(this);
        this.handleLonGpsCoordsChange = this.handleLonGpsCoordsChange.bind(this);
        this.handleGpsCoordsChange = this.handleGpsCoordsChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleTimezoneChange = this.handleTimezoneChange.bind(this);
        this.state = {
            CourseName: "",
            AltCourseName: "",
            LatGpsCoords: "",
            LonGpsCoords: "",
            GpsCoords: "",
            City: "",
            State: "",
            //Timezone: "",
            //Offset: "",
            value: 1,
            submit: true,
            errors: "",
        };
    }
    
    handleCourseNameChange(e) {
        this.setState({CourseName: e.target.value});
        console.log(this.state.CourseName);
        //Check to see if course already exists
        let textValue = this.state.CourseName;                    //todo: onError display error msg "Course not found." 
        let len = courseList.length;
        let title = "", match = false;

        for (let i = 0; i < len; i++){
            title = courseList[i];
            if (textValue === title){
                match = true;
            }
        } 

        if (textValue === "") {
            console.log("Error: No input provided.");
        } else if ( match === false) {
            this.setState({errors: ""});
            this.setState({submit: false});
        } else if (match === true) {
            this.setState({errors: "Course name found, please double-check that this is a unique course. Once confirmed, provide a unique name (ie. add the two letter state code in parenthesis to the course name)."});
            this.setState({submit: true});
            console.log("errors:" + this.state.errors);
        }
    }

    handleAltCourseNameChange(e) {
        this.setState({AltCourseName: e.target.value});

        let textValue = this.state.AltCourseName;                    //todo: onError display error msg "Course not found." 
        let len = courseList.length;
        let title = "", match = false;

        for (let i = 0; i < len; i++){
            title = courseList[i];
            if (textValue === title){
                match = true;
            }
        } 

        if (textValue === "") {
            console.log("Error: No input provided.");
        } else if ( match === false) {
            this.setState({errors: ""});
            this.setState({submit: false});
        } else if (match === true) {
            this.setState({errors: "Course name found, please double-check that this is a unique course. Once confirmed, provide a unique name (ie. add the two letter state code in parenthesis to the course name)."});
            this.setState({submit: true});
            console.log("errors:" + this.state.errors);
        }
    }

    handleLatGpsCoordsChange(e) {
        this.setState({LatGpsCoords: e.target.value});
        this.setState({GpsCoords: e.target.value + ", " + this.state.LonGpsCoords})
    }

    handleLonGpsCoordsChange(e) {
        this.setState({LonGpsCoords: e.target.value});
        this.setState({GpsCoords: this.state.LatGpsCoords + ", " + e.target.value})
    }

    handleGpsCoordsChange(e) {
        let latLength = e.target.value.indexOf(",");
        let latCoord = e.target.value.substring(0,latLength);
        let lonCoord = e.target.value.substring(latLength+2);
        this.setState({GpsCoords: e.target.value});
        this.setState({LatGpsCoords: latCoord});
        this.setState({LonGpsCoords: lonCoord});
    }

    handleCityChange(e) {
        this.setState({City: e.target.value});
    }

    handleStateChange(e) {
        this.setState({State: e.target.value});
    }
    
    handleTimezoneChange = (e, index, value) => this.setState({value})

    handleSubmitClick(e) {
        //Write course addition to courselist.json and courses.json
        console.log("GpsCoords: " + this.state.GpsCoords);
        console.log("LatGpsCoords: " + this.state.LatGpsCoords);
        console.log("LonGpsCoords: " + this.state.LonGpsCoords);
        e.preventDefault();
    }

    render(){
        let validateForm = function validateForm() {
            let textValue = this.state.CourseName;
            hashHistory.push('addcourse/' + textValue);
        }
        return(
            <div style={styles.form.p}>
                <h1>Add Course</h1>
                    <div>
                        <form name="addcourse" onSubmit={validateForm} action="http://localhost:3001/api/addcourse" method="post">
                            <TextField style={styles.form.textfield}
                                id="coursename"
                                hintText="Course Name"
                                value={this.state.CourseName}
                                onChange={this.handleCourseNameChange}
                                errorText={this.state.errors}
                            />
                            <TextField style={styles.form.textfield}
                                id="altcoursename"
                                hintText="Alternate Course Name"
                                value={this.state.AltCourseName}
                                onChange={this.handleAltCourseNameChange}
                            />
                            <br />
                                <TextField style={styles.form.textfield}
                                    id="latgpscoords"
                                    hintText="Latitude Coordinate"
                                    value={this.state.LatGpsCoords}
                                    onChange={this.handleLatGpsCoordsChange}
                                />
                                <TextField style={styles.form.textfield}
                                    id="longpscoords"
                                    hintText="Longitude Coordinate"
                                    value={this.state.LonGpsCoords}
                                    onChange={this.handleLonGpsCoordsChange}
                                />
                                <TextField style={styles.form.textfield}
                                    id="gpscoords"
                                    hintText="GPS Coordinates"
                                    value={this.state.GpsCoords}
                                    onChange={this.handleGpsCoordsChange}
                                />
                            <br />
                                <TextField style={styles.form.textfield}
                                    id="city"
                                    hintText="City"
                                    value={this.state.City}
                                    onChange={this.handleCityChange}
                                />
                            <br />
                                <TextField style={styles.form.textfield}
                                    id="state"
                                    hintText="State"
                                    value={this.state.State}
                                    onChange={this.handleStateChange}
                                />
                            <DropDownMenu value={this.state.value} onChange={this.handleTimezoneChange}>
                                <MenuItem value={1} label="Eastern" primaryText="America/New_York" />
                                <MenuItem value={2} label="Central" primaryText="America/Chicago" />
                                <MenuItem value={3} label="Mountain" primaryText="America/Phoenix" />
                                <MenuItem value={4} label="Pacific" primaryText="America/Los_Angeles" />
                            </DropDownMenu>
                            <br />
                            <FlatButton type="submit" label="Submit" primary={true} disabled={this.state.submit}/>
                        </form>
                    </div>
            </div>
        );
    }
}

export default AddCourse;