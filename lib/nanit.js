var Runner = require("./runner");
var Loader = require("./loader");

// Nanit
// -----

function Nanit(options){
  this.options = options;
}

// Methods
// -------

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

Nanit.prototype.finalize = function(arg, done){
  if (!done){
    done = arg;
    arg = undefined;
  }
  
  var folder = this.options.finalizerFolder;
  var finalizers = Loader.load(folder);
  var runner = new Runner(finalizers);

  runner.run(arg, done);
};

// exports
// -------

module.exports = Nanit;
