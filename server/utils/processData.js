
//LETS ADD JOHNNY-FIVE
var five = require("johnny-five"),
    board = new five.Board(),
    servo, redLed, yellowLed, rgbLed;
var index = 0;
var rainbows = ["FF0000", "FF7F00", "FFFF00", "00FF00", "0000FF", "4B0082", "8F00FF"];
board.on("ready", function(){
    servo =     new five.Servo(9);
    redLed =    new five.Led(8);
    yellowLed = new five.Led(12);
    rgbLed = new five.Led.RGB([3, 5, 6]);
});
var oldPos = 0;

var processData = {
    moveServo: function(position){
        if(index + 1 === rainbows.length){
            index = 0;
        }
        rgbLed.color(rainbows[index++]);
        if(oldPos > position){
            //going left light up green led
            yellowLed.on();
            redLed.off();
            oldPos = position;
        }
        else if(oldPos < position){
            //light up red led
            redLed.toggle();
            yellowLed.toggle();
            // redLed.on();
            // yellowLed.off();
            oldPos = position;
        }
        else{
            //light up both leds
            redLed.on();
            yellowLed.off();
            oldPos = position;
        }
        // console.log("The position is at ", position);
        servo.to(position);
    }
};

module.exports = processData;
