import React from 'react';
//import ReactDOM from 'react';
import '../Forecast.css';

class DSForecast extends React.Component {  
    render(){        
        return(
            <div>
                <DSSearch />
                <ol className="minutelyData">

                </ol>
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

    handleSearchClick() {
        this.setState({isSearchClick: true});
        var textValue = this.state.value;                                                                  //todo: onError display error msg "Course not found." 
        var myRequest = new Request('/api/course/' + textValue);
        //var output = '';
        var FORECAST = [];
        fetch(myRequest)
            .then(response => response.json())
            .then((json)=> {
                FORECAST = json;
                this.setState({forecast: FORECAST});
                /*
                for (var i = 0; i <= FORECAST.minutely.data.length; i++) {                              // Guide: https://www.youtube.com/watch?v=HWdLisBrlV8 array at 13:30
                    for (var key in FORECAST.minutely.data[i]) {
                        if (FORECAST.minutely.data[i].hasOwnProperty(key)) {
                            output += '<li>' + FORECAST.minutely.data[i][key] + '</li>';
                        }   // hasOwnProperty check
                    }       //for each object
                }           //for each array element
                console.log(output);
                */
                
            })
    }
    render(){
        var displayWeekly = '';
        if (this.state.isSearchClick) {
            displayWeekly = <DSWeekly name={this.state.value} forecast={this.state.forecast}/>;
        } else {
            displayWeekly = '';
        }
        
        return (
            <div>
                <form>
                    <input type="text" placeholder="Course Search..." value={this.state.value} onChange={this.handleTextChange} />
                    <button className="reqForecast" onClick={this.handleSearchClick}>Search</button>
                </form>
                <div className="Weekly">
                    {displayWeekly}
                </div>
            </div>
        );
    }
}

class DSWeekly extends React.Component {
        /*
        constructor(props) {
            super(props);
            
        };
    */
    render(){
        var dotw = "";

        switch(new Date(this.props.forecast.daily.data[1].time*1000).getDay()){
                    case 0: 
                        dotw = "Sunday";
                        break;
                    case 1:
                        dotw = "Monday";
                        break;
                    case 2:
                        dotw = "Tuesday";
                        break;
                    case 3:
                        dotw = "Wednesday";
                        break;
                    case 4:
                        dotw = "Thursday";
                        break;
                    case 5:
                        dotw = "Friday";
                        break;
                    case 6:
                        dotw = "Saturday";
                        break;
                    default:
                        dotw = this.props.forecast.daily.data[1].time;
                        break;
                }
        return(
            <div className="container">
                <h3>Course Forecast for: {this.props.name}</h3><h4>Bowling Green, OH</h4>
                <Tile heading="Today" attr1="75 degrees" attr2="5-10 mph winds" attr3="20% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading={dotw} attr1="77 degrees" attr2="10-14 mph winds" attr3="15% chance of rain" attr4="Course Condition: Partially Flooded" />
                <Tile heading="Sunday" attr1="79 degrees" attr2="3-8 mph winds" attr3="25% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Monday" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Tuesday" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Wednesday" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Thursday" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
            </div>
        );
    }
}

function Tile(props) {
  return (
    <div className="tile">         {/* Cleanup Steps: could convert the attributes into a loop */}
        <h3>{props.heading}</h3>    {/* tile heading: for dg-weather = course name in playable forecast, otherwise blank as the course name is displayed elsewhere (parent usually) */}
        <p>{props.attr1}</p>        {/* Attribute 1: for dg-weather = temperature */}
        <p>{props.attr2}</p>        {/* Attribute 2: for dg-weather = wind */}
        <p>{props.attr3}</p>        {/* Attribute 3: for dg-weather = % chance of rain for the day */}
        <p>{props.attr4}</p>        {/* Attribute 4: for dg-weather = any community generated alerts for that course, ie. holes are flooded, course is muddy/snow covered, etc. */}
    </div>
  );
}

/*
ReactDOM.render(
    <DSForecast />,
    document.getElementById('root')
);
*/

export default DSForecast;
