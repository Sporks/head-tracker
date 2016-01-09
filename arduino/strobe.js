var five = require("johnny-five"),
    board = new five.Board();



board.on("ready", function() {
    var led = new five.Led(12);
  var rgb = new five.Led.RGB([6, 5, 3]);
  var index = 0;


  this.loop(10, function() {
    //   led.toggle();
    if (index === 16777215) {
      index = 0;
    }
    rgb.color(index.toString(16));
    index++;
  });

});

    // var led = new five.Led(13);
    // led.blink(5);
