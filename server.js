var express = require('express'),
    app = express(),
    path = require('path'),
    port = process.env.PORT || 3001, //set our port
    fs = require('fs'),
    request = require('request'),
    compression = require('compression'),
    router = express.Router(),
    jwt = require('jsonwebtoken')          //used to create, sign and verify tokens
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

router.use(function(req, res, next){
    console.log('Something is happening.');
    next();
});

router.post('/register', function(req,res,next){
    console.log('Writing new user to userDB.json');
    const store = JSON.parse(fs.readFileSync("/users/userDB.json"));
    store[req.params.userName] = req.body.username;
    store[req.params.userName].password = req.body.password;
    store[req.params.userName].firstName = req.body.firstname;
    store[req.params.userName].lastName = req.body.lastname;
    store[req.params.userName].email = req.body.email;
    store[req.params.userName].email = req.body.email;
    fs.writeFileSync("/users/userDB.json", JSON.stringify(store,null,2));
});

router.post('/login', function(request, res, next) {
    console.log('Authenticating user.');
    let userName = request.body.username.toLowerCase();
    fs.readFile(__dirname + '/users/userDB.json', function(err, data){
        if(err){
            console.log('Error reading userDB.json');
            console.log(err);
            return;
        }
        userDB = JSON.parse(data);
        if(userDB.hasOwnProperty(userName)){
            let reqUser = userDB[userName];
            if(reqUser.password == request.body.password){
                console.log('User authenticated.');
               // res.redirect('/dashboard');
            } else {
                console.log('User password is incorrect');
            }
        } else {
            console.log('User does not exist.');
        }
    })
});


//Handling course forecast requests
router.route('/course/:coursename')
    .get(function(req, res) {
        checkLastUpdate(req, res); 
    })

//Checking whether the course forecast is recent enough to use or request a new forecast from Darksky
function checkLastUpdate(req, res){
    let courseList = '';
    fs.readFile('courselist.json', function(err,data){
        if(err){
            console.log('Error checking last update.', err);
            return;
        }
        courseList = JSON.parse(data);
        courseName = req.params.coursename.toLowerCase();
        if (courseList.hasOwnProperty(courseName)){
            let reqCourse = courseList[courseName];
            console.log("current time: " + (new Date().getTime() / 1000));                          //converting current time from miliseconds to seconds for comparison to darksky api timestamp (seconds)
            console.log("Last update was: " + reqCourse.lastupdate);
            console.log("Time difference = " + (((new Date().getTime() / 1000) - reqCourse.lastupdate) / 60) + " minutes.");
            if ((new Date().getTime() / 1000) > (reqCourse.lastupdate + 18000)){                      //if request received within 18000s (5 hours) of last, dont fetch new forecast
                //Most recent forecast is outdated, fetch new forecast
                fetchForecast(req, res);
            } else {
                console.log("No new forecast for requested course.");
                res.sendFile(path.normalize(__dirname + '/courses/' + req.params.coursename + '.json'));
                console.log("Most recent forecast sent for the requested course.");
            }
        } else {
            console.log("*Course does not exist. Please check spelling and try again.");            //todo: Output this to the client's screen below textbox (font=red). +add autocomplete to textbox
        }
        
    })
}

//Pull new forecast from Darksky for the request
function fetchForecast(req, res) {                                                                 
    let apiKey = "9d007da7fea4783f30a871a05b48c74f";
    let gpsCords = "";
    let courseList = JSON.parse(fs.readFileSync("courselist.json"));
    gpsCords = courseList[req.params.coursename].latitude + "," + courseList[req.params.coursename].longitude;
    let myRequest = "https://api.darksky.net/forecast/" + apiKey + "/" + gpsCords + "?extend=hourly";
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
            })
        }
    })
};

// Register routes
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Magic happens on port ' + port);
