var express = require('express'); //express is imported
var app = express(); //creates express app (just a variable)
var path = require('path');//path is a module for working with path strings
var port = 5000; 
var bodyparser = require('body-parser'); //imports body-parser for grabbing specific data
//from object being sent to server (a module)

function randomNumberGen(max) {
    var randomNumb = Math.floor(Math.random() * max);
    return randomNumb;
} //generates a random number between 0 and max

// middleware
app.use(express.static('public')); //filter layer that points client to public folder
//for static file requests
app.use(bodyparser.urlencoded({
    extended: true
})); //another filter takes the request body and looks inside and extracts the data oject

app.listen(port, function () {
    console.log('listening on port', port);
}) //starts the server on some port

//base url
app.get('/', function (req, res) {

    res.sendFile(path.join(__dirname, './public/views/index.html'));
    console.log('inside app.get');
}) // this function sends index.html when browswer gets base url typed in

app.post('/maxNumber', function (req, res) {    // response to ajax post req
    var maxNumbObj = req.body;                  // body parser parses into an object (maxNumbObj)
    var maximus = maxNumbObj.max;               // defining max prop (level val) of maxNumbObj with var maximus
    var maxPrime = randomNumberGen(maximus);    // creating random number with level val (maximus)
    console.log("maxPrime -->", maxPrime);
    res.send({
        returnedNumb: maxPrime                    // returning and sending random number
    });
});                 //  