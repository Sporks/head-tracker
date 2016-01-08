

var processData = {
    print: function(position){
        console.log("The position is at ", position);
    },
    showSocket: function(req, res, socket){
        var x = simpleStringify(socket);
        console.log(socket)
        res.send(x)
    }
};
function simpleStringify (object){
    var simpleObject = {};
    for (var prop in object ){
        if (!object.hasOwnProperty(prop)){
            continue;
        }
        if (typeof(object[prop]) == 'object'){
            continue;
        }
        if (typeof(object[prop]) == 'function'){
            continue;
        }
        simpleObject[prop] = object[prop];
    }
    return JSON.stringify(simpleObject); // returns cleaned up JSON
};

module.exports = processData;
