var express = require('express');
var app = express();
var path = require('path');
var port = process.env.PORT || 3001; //set our port
var fs = require('fs');
var request = require('request');
var router = express.Router();

router.use(function(req, res, next){
    console.log('Something is happening.');
    next();
});

router.route('/course/:coursename')
    
    .get(function(req, res) {
        fetchForecast(req, res);                                                                   //Create conditional: 
    })

function courseGpsCords(req, res) {
    //let couresList = JSON.parse(__dirname, "courselist.json");
    //console.log(courseList);
    //gpsCords = courseList.courses + "." + req.params.coursename + 
}


function fetchForecast(req, res) {                                                                 //Pull new forecast for the request
    let apiKey = "9d007da7fea4783f30a871a05b48c74f";
    let gpsCords = "41.368457,-83.6244568";                                                        //Carter Park hardcoded
    courseGpsCords();                                                        
    let myRequest = "https://api.darksky.net/forecast/" + apiKey + "/" + gpsCords;
    let courseName = req.params.coursename;

    request(myRequest, function(error, response, body){
        if (error) {
            console.log('error:', error)
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        } else {
            fs.writeFile(__dirname + "/courses/" + courseName + ".json", body, function(err) {
                if(err) {
                    return console.log(err);
                }
                res.sendFile(path.normalize(__dirname + '/courses/' + req.params.coursename + '.json'));
                console.log("A forecast was saved for " + courseName + "!");
            })
        }
    })
    };
/*
    fetch(myRequest)
        .then(response => response.json())
        .then((json)=> {
            console.log("Writing course forecast to " + req.params + "file.");
            fs.writeFile("/courses/" + req.params + ".json", json, function(err) {          //Save json forecast once received.
                if(err) {
                    return console.log(err);
                }
                console.log("The forecast was saved!");
            })
            
            //Create logfile to timestamp most recent forecast received for each course?
                //Create condition for fetching based on when last fetched ~5 min?
        })
*/

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
