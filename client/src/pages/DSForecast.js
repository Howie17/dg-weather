import React from 'react';
import '../Forecast.css';

class DSForecast extends React.Component {
    render() {
        return (
            <div className="container">
                <ul></ul>
            </div>
        );
    }
}

var myList = document.querySelector('ul');

var myRequest = new Request('api/course/Carter Park.json');


fetch(myRequest)
    .then(function(response) { return response.json(); })
    .then(function(json) {
        var i = 0;
        for (i = 0; i < json.minutely.data.length; i++) {
            var listItem = document.createElement('li');
            listItem.innerHTML = 'The precipitation at <strong>' + json.minutely.data[i].time + '</strong> will be <strong>' + json.minutely.data[i].precipIntensity + '</strong>';
            myList.appendChild(listItem);
        }
});

export default DSForecast;






