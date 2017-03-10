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
        checkLastUpdate(req, res); 
    })

function checkLastUpdate(req, res){
    let courseList = '';
    fs.readFile('courselist.json', function(err,data){
        if(err){
            console.log('Error checking last update.', err)
            return;
        }
        courseList = JSON.parse(data);
        courseName = req.params.coursename.toLowerCase();
        if (courseList.hasOwnProperty(courseName)){
            let reqCourse = courseList[courseName];
            console.log("current time: " + (new Date().getTime() / 1000));                          //converting current time from miliseconds to seconds
            console.log("Last update was: " + reqCourse.lastupdate);
            console.log("Time difference = " + (((new Date().getTime() / 1000) - reqCourse.lastupdate) / 60) + " minutes.");
            if ((new Date().getTime() / 18000) > (reqCourse.lastupdate + 10)){                               //if request received within 18000s (5 hours) of last, dont fetch new forecast
                //Most recent forecast is outdated, fetch new forecast
                fetchForecast(req, res);
            } else {
                console.log("No new forecast for requested course.");
            }
        } else {
            console.log("*Course does not exist. Please check spelling and try again.");             //todo: Output this to the client's screen below textbox (font=red).
        }
        
    })
}

function courseGpsCords(req, gpsCords) {
    let courseList = JSON.parse(fs.readFileSync("courselist.json"));
    /*
    console.log(courseList[req.params.coursename]);
    console.log(courseList[req.params.coursename].latitude);
    console.log(courseList[req.params.coursename].longitude);
    console.log(courseList[req.params.coursename].latitude + ", " + courseList[req.params.coursename].longitude);
    */
    gpsCords = courseList[req.params.coursename].latitude + ", " + courseList[req.params.coursename].longitude;
    
    console.log(gpsCords);
    //console.log(courseList);
    //gpsCords = courseList.courses + "." + req.params.coursename + 
    //fetchForecast(req, res);
}

//Pull new forecast for the request
function fetchForecast(req, res) {                                                                 
    let apiKey = "9d007da7fea4783f30a871a05b48c74f";
    let gpsCords = "";
    // courseGpsCords(req, res);
    let courseList = JSON.parse(fs.readFileSync("courselist.json"));
    gpsCords = courseList[req.params.coursename].latitude + ", " + courseList[req.params.coursename].longitude;
    let myRequest = "https://api.darksky.net/forecast/" + apiKey + "/" + gpsCords;
    let courseName = req.params.coursename;
    console.log(myRequest);

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
                
                //Now update the lastupdate timestamp for the requested course
                const store = JSON.parse(fs.readFileSync("courselist.json"));
                store[req.params.coursename].lastupdate = (Math.round(new Date().getTime() / 1000));
                fs.writeFileSync("courselist.json", JSON.stringify(store,null,2));
                //console.log("lastupdate timestamp for " + courseName + " was updated within courselist.json.");
            })
        }
    })
};

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
