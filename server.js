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

router.get('/', function(req, res) {
    res.json({message: 'Hooray! Welcome to our api!'});
});

router.route('/course/Carter%20Park')

    .get(function(req, res) {
        res.sendFile(path.normalize(__dirname + '/courses/carter park.json'));
    })

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
