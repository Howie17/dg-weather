import React from 'react';

import { getCourse } from '../lib/api';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
/*
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
*/
import '../Forecast.css';

class CourseForecast extends React.Component {  
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            value: '',
            forecast: []
        };
    }

    componentWillReceiveProps(){     
        let textValue = this.props.routeParams.courseName;
        getCourse(textValue).then(forecast => this.setState({ forecast }));
        console.log("Forecast received.");
        //todo: onError display error msg "Course not found."
    }

    render(){

        return(
            <div>
                <DSWeekly name={this.state.value} forecast={this.state.forecast}/>          {/*todo: name should equal the json id returned*/}
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>Time</TableHeaderColumn>
                            <TableHeaderColumn>Summary</TableHeaderColumn>
                            <TableHeaderColumn>Temperature</TableHeaderColumn>
                            <TableHeaderColumn>Feels</TableHeaderColumn>
                            <TableHeaderColumn>Wind</TableHeaderColumn>
                            <TableHeaderColumn>Chance of Rain</TableHeaderColumn>
                            <TableHeaderColumn>Humidity</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <DSHourly forecast={this.state.forecast}/>
                </Table>  
            </div>
        );
    }
}

class DSWeekly extends React.Component {

    getDayOfTheWeek(day) {
        switch((new Date(day.time * 1000)).getDay()){
            case 0: 
                return "Sunday";
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            default:
                return "Today";
        }
    }
    render() {
        let vDaily = this.props.forecast.daily;
        //console.log(vDaily);
        return(
            <div className="container">
                <h3>Course Forecast for: {this.props.name}</h3><h4>City, State</h4>         {/* todo: this.props.name shouldn't update based on text input, but what is returned via json */}
                {vDaily && vDaily.data.map((day, index)=> (                                 
                    <Tile
                        key={index}                                                         // Needed when returning a list of components in a loop
                        heading={index === 0 ? "Today" : this.getDayOfTheWeek(day)}
                        attr1={Math.round(day.temperatureMax)}
                        attr2={Math.round(day.temperatureMin)}
                        attr3={Math.round(day.windSpeed)}
                        attr4={Math.round(day.precipProbability*100)}
                        attr5="None"
                    />
                ))}
            </div>
        );
    }
}

function Tile(props) {
  return (
        <div className="tile">                                  
            <h3>{props.heading}</h3>                                                {/* tile heading: for dg-weather = course name in playable forecast, otherwise blank as the course name is displayed elsewhere (parent usually) */}
            <p>High: {props.attr1}&#x2109; Low: {props.attr2}&#x2109;</p>           {/* Attribute 1 & 2: for dg-weather = Hi/Low temperature */}
            <p>{props.attr3} mph</p>                                                {/* Attribute 3: for dg-weather = wind */}
            <p>{props.attr4}% chance of rain</p>                                    {/* Attribute 4: for dg-weather = % chance of rain for the day */}
            <p>Alerts: {props.attr5}</p>                                            {/* Attribute 5: for dg-weather = any community generated alerts for that course, ie. holes are flooded, course is muddy/snow covered, etc. */}
        </div>
  );
}

class DSHourly extends React.Component {

    get12Hour(hour){
        switch((new Date(hour.time * 1000)).getHours()){
            case 0:
                return "12";
            case 13: 
                return "1";
            case 14:
                return "2";
            case 15:
                return "3";
            case 16:
                return "4";
            case 17:
                return "5";
            case 18:
                return "6";
            case 19:
                return "7";
            case 20:
                return "8";
            case 21:
                return "9";
            case 22:
                return "10";
            case 23:
                return "11";
            case 24:
                return "12";
            default:
                return "";
        }
    }
static muiName = 'TableBody';
    render() {
        let vHourly = this.props.forecast.hourly;
        
        return(
            <TableBody>
                {vHourly && vHourly.data.map((hour, index)=> (           
                    <Row
                        key={index}                                                         // Needed when returning a list of components in a loop
                        attr1={ (new Date(hour.time * 1000).getHours()) <= 12 && (new Date(hour.time * 1000).getHours()) !== 0 ? (new Date(hour.time * 1000).getHours()) : this.get12Hour(hour)}
                        attr2={Math.round(hour.temperature)}                             
                        attr3={Math.round(hour.apparentTemperature)}
                        attr4={Math.round(hour.windSpeed)}
                        attr5={Math.round(hour.precipProbability*100)}
                        attr6={Math.round(hour.precipIntensity)}
                        attr7={hour.humidity}
                        attr8={hour.summary}
                        attr9={ (new Date(hour.time * 1000)).getHours() <= 12 ? "AM" : "PM"}
                    />
                ))}
            </TableBody>
        );
    }
}

function Row(props) {

    return (
            <TableRow>
                <TableRowColumn>{props.attr1}:00 {props.attr9}</TableRowColumn>
                <TableRowColumn>{props.attr8}</TableRowColumn>
                <TableRowColumn>{props.attr2} &#x2109;</TableRowColumn>
                <TableRowColumn>{props.attr3} &#x2109;</TableRowColumn>
                <TableRowColumn>{props.attr4} mph</TableRowColumn>
                <TableRowColumn>{props.attr5 }%</TableRowColumn>
                <TableRowColumn>{props.attr6} (in)</TableRowColumn>
                <TableRowColumn>{Math.round(props.attr7*100)}</TableRowColumn>
            </TableRow>
    );
}

export default CourseForecast;

