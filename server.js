/*
const express = require('express');
const fs = require('fs');

const app = express();

app.set('port', (process.env.PORT || 3001));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}
*/

var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3001; //set our port

var router = express.Router();

router.use(function(req, res, next){
    console.log('Something is happening.');
    next();
});

router.route('/course/Carter%20Park')

    .get(function(req, res) {
        res.sendFile(path.normalize(__dirname + '/courses/carter park.json'));
    })

function fetchForecast(gpsCords, res) {
    var apiKey = "";
    var gpsCords = "41.368457,-83.6244568"      //Hardcoded Carter Park, Bowling Green
    var myRequest = "https://api.darksky.net/forecast/" + apiKey + gpsCords
    
    fetch(myRequest)
                .then(response => response.json())
                .then((json)=> {
                    //Save json forecast once received.
                    //Create logfile to timestamp most recent forecast received for each course?
                        //Create condition for fetching based on when last fetched ~5 min?
                })
}

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
