var path = require("path");
var Nanit = require("./nanit");

// vars
// ----

const initializerFolder = path.resolve(process.cwd(), "initializers");

// Nanit API
// ---------

Nanit.initialize = function(arg, done){
  var nanit = new Nanit({
    folder: initializerFolder
  });

  return nanit.initialize(arg, done);
};

// exports
// -------

module.exports = Nanit;
