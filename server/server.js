var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var processData = require('./utils/processData');
var fs = require('fs');
//set up static route
app.use(express.static(path.join(__dirname, './../client')));
app.use(bodyParser.urlencoded({ extended: false }));
var temp;
// app.post('/data', processData.print)
io.on('connection', function(socket){
    console.log("Connected");
    socket.on('position', function(pos){
        temp = socket;
        // console.log("User at : ", pos);
        processData.print(pos)
    })
    socket.on('disconnect', function(){
        console.log("disconnected")
    })
})

app.get('/data', function(req, res){
    processData.showSocket(req, res, temp)
})

http.listen(3000, function(){
    console.log("Listening on port 3000")
});

module.exports = app;
