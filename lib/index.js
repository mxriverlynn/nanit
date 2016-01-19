var path = require("path");
var Nanit = require("./nanit");

// vars
// ----

const initializerFolder = path.resolve(process.cwd(), "initializers");
const finalizerFolder = path.resolve(process.cwd(), "finalizers");

// Nanit API
// ---------

Nanit.initialize = function(arg, done){
  var nanit = new Nanit({
    folder: initializerFolder
  });

  return nanit.initialize(arg, done);
};

Nanit.finalize = function(arg, done){
  var nanit = new Nanit({
    finalizerFolder: finalizerFolder
  });

  return nanit.finalize(arg, done);
};

// exports
// -------

module.exports = Nanit;
