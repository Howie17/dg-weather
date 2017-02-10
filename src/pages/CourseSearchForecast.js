import React from 'react';
import '../Forecast.css';


class CourseSearchForecast extends React.Component {
    render() {
        return (
            <div className="container">
                <h3>Course Search Forecast: Carter Park</h3>
                <Tile heading="Today" attr1="75 degrees" attr2="5-10 mph winds" attr3="20% chance of rain" attr4="Course Condition: Muddy" />
                <Tile heading="Saturday" attr1="77 degrees" attr2="10-14 mph winds" attr3="15% chance of rain" attr4="Course Condition: Partially Flooded" />
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


export default CourseSearchForecast;