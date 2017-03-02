import React from 'react';
import '../Forecast.css';

class DSForecast extends React.Component {  
    render(){
        function reqForecast() {
        var textValue = "Carter Park"; //todo
        var myRequest = new Request('/api/course/' + textValue);
        var forecast = '';
        var output = '';
        fetch(myRequest)
            .then(function(response) { return response.json(); })
            .then(function(json) {

                forecast = json;
                console.log(forecast);                                                              
                for (var i = 0; i <= forecast.minutely.data.length; i++) {                              // Guide: https://www.youtube.com/watch?v=HWdLisBrlV8 array at 13:30
                    for (var key in forecast.minutely.data[i]) {
                        if (forecast.minutely.data[i].hasOwnProperty(key)) {
                            output += '<li>' + forecast.minutely.data[i][key] + '</li>';
                        }   // hasOwnProperty check
                    }       //for each object
                }           //for each array element
            })
            console.log(output);
        }
        return(
            <div>
                <input type="text" /> <button className="reqForecast" onClick={reqForecast}></button>
                <ol className="minutelyData">

                </ol>
            </div>
        );
    }
}

export default DSForecast;