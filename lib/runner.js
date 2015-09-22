// Nanit Runner
// ------------

function Runner(initializers){
  this.initializers = [].concat(initializers);
}

// Runner API
// ----------

Runner.prototype.run = function(arg, done){
  if (!done){
    done = arg;
    arg = undefined;
  }

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

    // handle 1 or 2 params for the initializer
    // allowing optional "arg" as first param
    var params = [];
    var paramCount = initializer.length;
    if (paramCount === 2){
      params.push(arg);
    }

    params.push(function(err){
      if (err) { return done(err); }
      runInit(initializers, arg, done);
    });

    initializer.apply(undefined, params);
  }

  runInit(initializers, arg, done);
};
// exports
// -------

module.exports = Runner;
