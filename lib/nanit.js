var Runner = require("./runner");
var Loader = require("./loader");

// Nanit
// -----

function Nanit(options){
  this.options = options;
}

Nanit.prototype.initialize = function(arg, done){
  if (!done){
    done = arg;
    arg = undefined;
  }
  
  var folder = this.options.folder;
  var initializers = Loader.load(folder);
  var runner = new Runner(initializers);

  runner.run(arg, done);
};

// exports
// -------

module.exports = Nanit;
