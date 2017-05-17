import React from 'react';
//import request from 'request';
//import {Tabs, Tab} from 'material-ui/Tabs';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
//import {hashHistory} from 'react-router';
import '../Forecast.css';


const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  form: {
    p: {
          backgroundcolor: "#303030",
          color: "#FFFFFF",
          width: "80%",
          margin: "auto"
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
        };
    }
    
    handleCourseNameChange(e) {
        this.setState({CourseName: e.target.value});
        console.log(this.state.CourseName);
    }

    handleAltCourseNameChange(e) {
        this.setState({AltCourseName: e.target.value});
    }

    handleLatGpsCoordsChange(e) {
        this.setState({LatGpsCoords: e.target.value});
        console.log("handleLatGpsCoordsChange triggered.");
        this.setState({GpsCoords: e.target.value + ", " + this.state.LonGpsCoords})
        console.log(this.state.LatGpsCoords);
    }

    handleLonGpsCoordsChange(e) {
        this.setState({LonGpsCoords: e.target.value});
        console.log("handleLonGpsCoordsChange triggered.");
        this.setState({GpsCoords: this.state.LatGpsCoords + ", " + e.target.value})
        console.log(this.state.LonGpsCoords);
    }

    handleGpsCoordsChange(e) {
        console.log("handleGpsCoordsChange triggered.");
        let latLength = e.target.value.indexOf(",");
        let latCoord = e.target.value.substring(0,latLength);
        let lonCoord = e.target.value.substring(latLength+2);
        this.setState({GpsCoords: e.target.value});
        this.setState({LatGpsCoords: latCoord});
        this.setState({LonGpsCoords: lonCoord});
        console.log("GpsCoords: " + this.state.GpsCoords);
        console.log("LatGpsCoords: " + this.state.LatGpsCoords);
        console.log("LonGpsCoords: " + this.state.LonGpsCoords);
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
        let validateForm = function validateForm(){
            console.log("Validate Form function triggered.");
            var x = document.getElementById("addcourse").coursename.value;
            if (x === "") {
                alert("Course name must be filled out");
                return false;
            }
            x = document.getElementById("latgpscoords").value;
            if (x === "") {
                alert("Latitude coordinate must be filled out");
                return false;
            }
            x = document.getElementById("longpscoords").value;
            if (x === "") {
                alert("Longitude coordinate must be filled out");
                return false;
            }
            x = document.getElementById("city").value;
            if (x === "") {
                alert("City must be filled out");
                return false;
            }
            x = document.getElementById("state").value;
            if (x === "") {
                alert("State must be filled out");
                return false;
            }
            x = document.getElementById("timezone").value;
            if (x === "") {
                alert("Timezone must be selected from the dropdown");
                return false;
            }
        }
        return(
            <div>
                <h1>Add Course</h1>
                    <div style={styles.form.p}>
                        <form name="addcourse" action="http://localhost:3001/api/addcourse" onSubmit={validateForm} method="post">
                            <p>Course Name: <input type="text" value={this.state.CourseName} onChange={this.handleCourseNameChange} name="coursename"/></p>
                            <p>Alternate Course Name: <input type="text" value={this.state.AltCourseName} onChange={this.handleAltCourseNameChange} name="altcoursename"/></p>
                            <p>
                                Latitutde GPS Coordinate: <input type="text" value={this.state.LatGpsCoords} onChange={this.handleLatGpsCoordsChange} name="latgpscoords"/>
                                Longitude GPS Coordinate: <input type="text" value={this.state.LonGpsCoords} onChange={this.handleLonGpsCoordsChange} name="longpscoords"/>
                                GPS Coords: <input type="text" value={this.state.GpsCoords} onChange={this.handleGpsCoordsChange} name="gpscoords"/>
                            </p>
                            <p>City: <input type="text" value={this.state.City} onChange={this.handleCityChange} name="city"/></p>
                            <p>State: <input type="text" value={this.state.State} onChange={this.handleStateChange} name="state"/></p>
                                <DropDownMenu value={this.state.value} onChange={this.handleTimezoneChange}>
                                    <MenuItem value={1} label="Eastern" primaryText="America/New_York" />
                                    <MenuItem value={2} label="Central" primaryText="America/Chicago" />
                                    <MenuItem value={3} label="Mountain" primaryText="America/Phoenix" />
                                    <MenuItem value={4} label="Pacific" primaryText="America/Los_Angeles" />
                                </DropDownMenu>
                            <br />
                            <FlatButton type="submit" label="Submit" primary={true} />
                        </form>
                    </div>
            </div>
        );
    }
}

export default AddCourse;