import React from 'react';
import '../Forecast.css';


class PlayableForecast extends React.Component {
    render() {
        return (
            <div className="container">
            <h2>Playable Forecast</h2>
            <h3>Home Courses </h3>              
                <Tile heading="Woodlands Park" attr1="75 degrees" attr2="5-10 mph winds" attr3="20% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Carter Park" attr1="77 degrees" attr2="10-14 mph winds" attr3="15% chance of rain" attr4="Course Condition: Partially Flooded" />
                <Tile heading="Ottawa Park" attr1="79 degrees" attr2="3-8 mph winds" attr3="25% chance of rain" attr4="Course Condition: Muddy" />
            <h3>Drivable Courses</h3>
                <Tile heading="Vienna Park" attr1="75 degrees" attr2="5-10 mph winds" attr3="20% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="The Ponds at Lakeshore" attr1="77 degrees" attr2="10-14 mph winds" attr3="15% chance of rain" attr4="Course Condition: Partially Flooded" />
                <Tile heading="Rolling Hills" attr1="79 degrees" attr2="3-8 mph winds" attr3="25% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Hudson Mills" attr1="77 degrees" attr2="6-12 mph winds" attr3="40% chance of rain" attr4="Course Condition: Muddy" />
            <h3>Recent Searches</h3>
                <Tile heading="Brent Hambrick Memorial DGC" attr1="75 degrees" attr2="5-10 mph winds" attr3="20% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Glacier Ridge" attr1="77 degrees" attr2="10-14 mph winds" attr3="15% chance of rain" attr4="Course Condition: Partially Flooded" />
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


export default PlayableForecast;