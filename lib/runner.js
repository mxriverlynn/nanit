// Nanit Runner
// ------------

function Runner(initializers){
  this.initializers = [].concat(initializers);
}

// Runner API
// ----------

Runner.prototype.run = function(arg, done){
  this._runInitializers(this.initializers, arg, done);
};

// Private API
// -----------

Runner.prototype._runInitializers = function(initializers, arg, done){

  function runInit(initializers, arg, done){
    if (!initializers || initializers.length === 0) {
      return done();
    }

    var initializer = initializers.shift();
    function next(){
      runInit(initializers, arg, done);
    }

    initializer(arg, (err) => {
      if (err) { return done(err); }
      next();
    });
  }

  runInit(initializers, arg, done);
};
// exports
// -------

module.exports = Runner;
