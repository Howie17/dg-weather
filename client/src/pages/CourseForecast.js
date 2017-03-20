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

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
  day: {
      p: {
          color: "DimGray",
      },
  },
  table: {
      width: "80%",
      margin: "auto",
  },
  tableRowColumn: {
      width: "225px",
  },
};

class CourseForecast extends React.Component {  
    constructor(props) {
        super(props);
        this.setState = this.setState.bind(this);
        this.state = {
            value: '',
            forecast: [],
            showCheckboxes: false,
        };
    }

    componentWillReceiveProps(){     
        let textValue = this.props.routeParams.courseName;
        getCourse(textValue).then(forecast => this.setState({ forecast }));
        //todo: onError display error msg "Course not found."
    }

    render(){

        return(
            <div>
                <h3>Course Forecast for: {this.props.name}</h3><h4>City, State</h4>                     {/* todo: Convert City, State to data pull */}
                {/* Weekly Forecast Table */}
                <Table selectable={false} multiSelectable={false} style={styles.table}>
                    <TableHeader adjustForCheckbox={this.state.showCheckboxes} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Day</TableHeaderColumn>
                            <TableHeaderColumn style={styles.tableRowColumn}>Summary</TableHeaderColumn>
                            <TableHeaderColumn>Temp</TableHeaderColumn>
                            <TableHeaderColumn>Wind</TableHeaderColumn>
                            <TableHeaderColumn>Precip</TableHeaderColumn>
                            <TableHeaderColumn>Alerts</TableHeaderColumn>
                            {/*<TableHeaderColumn>Rainfall (inches)</TableHeaderColumn>}
                            <TableHeaderColumn>Humidity</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>
                    <DSWeekly name={this.props.routeParams.courseName} forecast={this.state.forecast}/>
                </Table>
                
                {/* Hourly Forecast Table */}
                <h3>Hourly Forecast for next 168 hours.</h3>
                <Table selectable={false} multiSelectable={false} style={styles.table}>
                    <TableHeader adjustForCheckbox={this.state.showCheckboxes} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn>Time</TableHeaderColumn>
                            <TableHeaderColumn>Summary</TableHeaderColumn>
                            <TableHeaderColumn>Temp</TableHeaderColumn>
                            <TableHeaderColumn>Feels</TableHeaderColumn>
                            <TableHeaderColumn>Wind</TableHeaderColumn>
                            <TableHeaderColumn>Precip</TableHeaderColumn>
                            {/*<TableHeaderColumn>Rainfall (inches)</TableHeaderColumn>*/}
                            {/*<TableHeaderColumn>Humidity</TableHeaderColumn>*/}
                        </TableRow>
                    </TableHeader>
                    <DSHourly forecast={this.state.forecast}/>
                </Table>  
            </div>
        );
    }
}

function getDayOfTheWeek(day) {
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

class DSWeekly extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,
        };
    }
    static muiName = 'TableBody';                                                       //Work-around for known bug with Material-UI Tables
    render() {
        let vDaily = this.props.forecast.daily;

        return(
            <TableBody className="container">
                {vDaily && vDaily.data.map((day, index)=> (
                    <Tile
                        key={index}                                                         // Needed when returning a list of components in a loop
                        heading={index === 0 ? "Today" : getDayOfTheWeek(day)}
                        attr1={Math.round(day.temperatureMax)}
                        attr2={Math.round(day.temperatureMin)}
                        attr3={Math.round(day.windSpeed)}
                        attr4={Math.round(day.precipProbability*100)}
                        attr5="None"
                        attr6={day.summary}
                    />
                ))}                        
            </TableBody>
        );
    }
}

function Tile(props) {
  return (
    <TableRow>
        <TableRowColumn>
            {props.heading}
            {/*<br />
             <p style={styles.day.p}>{getDayOfTheWeek(day)}</p>                  todo: add date of month ie. Mar 19*/}
        </TableRowColumn>
        <TableRowColumn style={styles.tableRowColumn}>{props.attr6}</TableRowColumn>
        <TableRowColumn>{props.attr1} / {props.attr2} &#x2109;</TableRowColumn>     {/* &#x2109; = symbol for degrees Fahnrenheit*/}
        <TableRowColumn>{props.attr3} mph</TableRowColumn>
        <TableRowColumn>{props.attr4}% </TableRowColumn>
        <TableRowColumn></TableRowColumn>
        {/*<TableRowColumn>{props.attr5} (in)</TableRowColumn>*/}
        {/*<TableRowColumn>{Math.round(props.attr7*100)}</TableRowColumn>*/}
    </TableRow>

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
    static muiName = 'TableBody';                                                           //Work-around for known bug with Material-UI Tables
    render() {
        let vHourly = this.props.forecast.hourly;
        
        return(
            <TableBody className="container">
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
                        attr9={ (new Date(hour.time * 1000)).getHours() <= 11 ? "AM" : "PM"}
                        attr10={hour}
                    />
                    
                ))}
            </TableBody>
        );
    }
}

function Row(props) {
    let day = props.attr10;

    return (
            <TableRow>
                <TableRowColumn>
                    {props.attr1}:00 {props.attr9}
                    <br />
                    <p style={styles.day.p}>{getDayOfTheWeek(day)}</p>
                </TableRowColumn>
                <TableRowColumn>{props.attr8}</TableRowColumn>
                <TableRowColumn>{props.attr2} &#x2109;</TableRowColumn>
                <TableRowColumn>{props.attr3} &#x2109;</TableRowColumn>
                <TableRowColumn>{props.attr4} mph</TableRowColumn>
                <TableRowColumn>{props.attr5 }%</TableRowColumn>
                {/*<TableRowColumn>{props.attr6} (in)</TableRowColumn>*/}
                {/*<TableRowColumn>{Math.round(props.attr7*100)}</TableRowColumn>*/}
            </TableRow>
    );
}

export default CourseForecast;

