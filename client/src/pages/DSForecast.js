import React from 'react';

import { getCourse } from '../lib/api';

import '../Forecast.css';

class DSForecast extends React.Component {  
    render(){        
        return(
            <div>
                <DSSearch />
            </div>
        );
    }
}

class DSSearch extends React.Component {  
    constructor(props) {
        super(props);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.setState = this.setState.bind(this);
        this.state = {
            isSearchClick: false,
            value: '',
            forecast: []
        };
        
    }

    handleTextChange(event) {
        this.setState({value: event.target.value});
    }

    handleSearchClick(e) {
        this.setState({isSearchClick: true});
        let textValue = this.state.value;                                                                  //todo: onError display error msg "Course not found." 
        if (textValue === "") {
            console.log("Error: Course does not exist.")
        } else {
            getCourse(textValue).then(forecast => this.setState({ forecast }));
        }
        e.preventDefault();
    }
    render(){
        let displayWeekly = '',
            displayHourly = '';
        if (this.state.isSearchClick) {
            displayWeekly = <DSWeekly name={this.state.value} forecast={this.state.forecast}/>;         //todo: name should equal the json id returned
            displayHourly = <DSHourly forecast={this.state.forecast}/>;                                 
        } else {
            displayWeekly = '';
            displayHourly = '';
        }
        
        return (
            <div>
                <form onSubmit={this.handleSearchClick}>
                    <input type="text" placeholder="Course Search..." value={this.state.value} onChange={this.handleTextChange} />
                    <button className="reqForecast">Search</button>
                </form>
                <div className="Weekly">
                    {displayWeekly}
                    {displayHourly}
                </div>
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
        
        return(
            <div className="container">
                <h3>Course Forecast for: {this.props.name}</h3><h4>City, State</h4>         {/* todo: this.props.name shouldn't update based on text input, but what is returned via json */}
                {vDaily && vDaily.data.map((day, index)=> (                                           /* todo: benign error, this line is called before forecast is populated, throwing an uncaught undefined error. */
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
            <p>High: {props.attr1}&#x2109; Low: {props.attr2}&#x2109;</p>         {/* Attribute 1 & 2: for dg-weather = Hi/Low temperature */}
            <p>{props.attr3} mph</p>                                                {/* Attribute 3: for dg-weather = wind */}
            <p>{props.attr4}% chance of rain</p>                                    {/* Attribute 4: for dg-weather = % chance of rain for the day */}
            <p>Alerts: {props.attr5}</p>                                            {/* Attribute 5: for dg-weather = any community generated alerts for that course, ie. holes are flooded, course is muddy/snow covered, etc. */}
        </div>
  );
}

class DSHourly extends React.Component {

    /*
    getMornNight(hour) {
        switch((new Date(hour.time * 1000)).getHours()){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12: 
                return "AM";
            default:
                return "PM";
        }
    }
    */
    render() {
        let vHourly = this.props.forecast.hourly;
        return(
            <div className="container">
                <h3>Hourly Forecast for: {this.props.name}</h3><h4>City, State</h4>         {/* todo: this.props.name shouldn't update based on text input, but what is returned via json */}
                {vHourly && vHourly.data.map((hour, index)=> (                                           // todo: benign error, this line is called before forecast is populated, throwing an uncaught undefined error.
                    <Row
                        key={index}                                                         // Needed when returning a list of components in a loop
                        attr1={hour.time}                                                   //todo: convert unix time to hour
                        attr2={Math.round(hour.temperature)}                             
                        attr3={Math.round(hour.apparentTemperature)}
                        attr4={Math.round(hour.windSpeed)}
                        attr5={Math.round(hour.precipProbability*100)}
                        attr6={Math.round(hour.precipIntensity)}
                        attr7={hour.humidity}
                        attr8={hour.summary}
                    />
                ))}
            </div>
        );
    }
}

function Row(props) {
    return (
        <div className="row">                                  
            <h3>{props.attr1}</h3>
            <p> 
                {props.attr1}(AM/PM) | 
                {props.attr8} | 
                Temp:{props.attr2} &#x2109; | 
                Feels: {props.attr3} &#x2109; | 
                Wind: {props.attr4} mph | 
                {props.attr5 }% chance of rain | 
                {props.attr6} rainfall(in) | 
                {Math.round(props.attr7*100)}
            </p>
        </div>
    );
}

export default DSForecast;

