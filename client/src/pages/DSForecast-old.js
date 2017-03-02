import React from 'react';
import '../Forecast.css';

class DSForecast extends React.Component {
    render() {
        return (
            <div className="container">
                <ol className="minutelyData">
                </ol>
                <button onClick={minutely}>Update Minutely</button>
            </div>
        );
    }
}

function minutely() {
    var myRequest = new Request('/api/course/Carter%20Park');
    var forecast = '';

    fetch(myRequest)
        .then(function(response) { return response.json(); })
        .then(function(json) {

            forecast = json;
            console.log(forecast);
            var update = '';
            var output = '';  
            update = document.getElementById('minutelyData');                                                              
            for (var i = 0; i <= forecast.minutely.data.length; i++) {                              // Guide: https://www.youtube.com/watch?v=HWdLisBrlV8 array at 13:30
                for (var key in forecast.minutely.data[i]) {
                    if (forecast.minutely.data[i].hasOwnProperty(key)) {
                        output += '<li>' + forecast.minutely.data[i][key] + '</li>';
                    }   // hasOwnProperty check
                }       //for each object
            }           //for each array element

            console.log(update)
            update.innerHTML = output
        })
    
    
    /*
    var output = '';                                                                // Guide: https://www.youtube.com/watch?v=HWdLisBrlV8 array at 13:30

    for (var i = 0; i <= forecast.minutely.data.length; i++) {
        for (key in forecast.minutely.data[i]) {
            if (forecast.minutely.data[i].hasOwnProperty(key)) {
                output += '<li>' + forecast.minutely.data[i][key] + '</li>';
            }   // hasOwnProperty check
        }       //for each object
    }           //for each array element

    var update = document.getElementById('minutelyData');
    update.innerHTML = output;
   
    return(
        <div className="minutely">
            <ol className="minutelyData">

            </ol>
        </div>
    );
     */

    /*
    var i = 0;
    for (i = 0; i < json.minutely.data.length; i++) {
        var listItem = '<li>The precipitation at <strong>' + json.minutely.data[i].time + '</strong> will be <strong>' + json.minutely.data[i].precipIntensity + '</strong></li>';
        hourForecast += listItem;
        
    }
    var stringForecast = JSON.stringify(hourForecast);
    console.log(stringForecast);
    */
}
export default DSForecast;
