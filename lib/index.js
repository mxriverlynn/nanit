var path = require("path");
var process = require("process");

var Runner = require("./runner");
var Loader = require("./loader");

// vars
// ----

const initializerFolder = path.resolve(process.cwd(), "initializers");

// Nanit API
// ---------

var nanit = {
  Runner: Runner,

  initialize: function(folder, arg, done){
    if (!done){
      done = arg;
      arg = folder;
      folder = initializerFolder;
    }

    var initializers = Loader.load(folder);
    var runner = new Runner(initializers);

    runner.run(arg, done);
  }
};

// exports
// -------

module.exports = nanit;
