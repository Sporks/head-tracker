//Initialize headtrackr
var videoInput = document.getElementById('inputVideo');
var canvasInput = document.getElementById('inputCanvas');
// var debugOverlay = document.getElementById('debug');
//Initialize headtrackr

//flip canvas so it right is also right on the screen

var htracker = new headtrackr.Tracker();
htracker.init(videoInput, canvasInput);
htracker.start();
//tell if started or not
var htracking = true;


// Add start and stop functionality
$("#start").click(function(){
    if(!htracking){
        htracker.start();
        htracking = true;
    }
});
$("#stop").click(function(){
    if(htracking){
        htracker.stop();
        htracking = false;
    }
})

var ready = false;
var xPos = 0;
//initialize oldxpos to a diff number to allow initial compare
var xPosOld = -Infinity;
//Initialize a socket connection
var socket = io();
//start an event listener to know when the tracking is fully set up so we can
//call a new event listener
document.addEventListener('headtrackrStatus',
    function(event) {
        console.log(event.status)
        if (event.status == "found") {
            //set state so rest of app knows camera is ready
            ready = true;
            cameraReady();
        }
        if (event.status == "lost"){
            console.log("LOST");
        }
    }
);
//camera is ready set up event listener for face detection
function cameraReady() {
    setInterval(startTracking, 100);
    document.addEventListener('facetrackingEvent',
        function(event) {
            xPos = 179-Math.floor(event.x/640*180)
        }
    );
}

function startTracking(){
    //Prevent sending the same data over and over by only sending when changed
    if(xPos !== xPosOld){
        xPosOld = xPos;
        // return the value in percent of screen center is in (maybe round it?)
        socket.emit('position', xPos);
    }

}
