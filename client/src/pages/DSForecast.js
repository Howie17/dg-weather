import React from 'react';
import '../Forecast.css';

class DSForecast extends React.Component {
    render() {
        return (
            <div className="container">
                
                <button onClick={minutely}>Update Minutely</button>
                
                <ul className="minutely">
                    <li>Minutely</li>
                    <minutely />
                </ul>
            </div>
        );
    }
}

function minutely() {
    var myRequest = new Request('/api/course/Carter%20Park');
    var hourForecast = "";
    
    fetch(myRequest)
        .then(function(response) { return response.json(); })
        .then(function(json) {
            var i = 0;
            for (i = 0; i < json.minutely.data.length; i++) {
                var listItem = '<li>The precipitation at <strong>' + json.minutely.data[i].time + '</strong> will be <strong>' + json.minutely.data[i].precipIntensity + '</strong></li>';
                hourForecast += listItem;
                console.log(hourForecast);
            }
        })

    return(
        <div className="minutely">
            <ul className="data">
                {hourForecast}
            </ul>
        </div>
    );
}
export default DSForecast;
