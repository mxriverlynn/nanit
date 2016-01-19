var Runner = require("../lib/runner");

describe("runner", function(){

  describe("when running an array of functions with no errors", function(){
    var arg, args, init1Run, init2Run, completed;

    beforeEach(function(){
      completed = false;
      init1Run = false;
      init2Run = false;
      arg = {};
      args = [];

      function init1(arg, next){ 
        args.push(arg);
        init1Run = true;
        next();
      }
      function init2(arg, next){ 
        args.push(arg);
        init2Run = true;
        next(); 
      }

      var initializers = [init1, init2];

      var runner = new Runner(initializers);
      runner.run(arg, function(err){
        completed = true;
      });
    });

    it("should pass the arg as the first parameter to all functions", function(){
      expect(args[0]).toBe(arg);
      expect(args[1]).toBe(arg);
    });

    it("should complete the functions", function(){
      expect(init1Run).toBe(true);
      expect(init2Run).toBe(true);
    });

    it("should complete process", function(){
      expect(completed).toBe(true);
    });
  });

  describe("when a function fails", function(){
    var init2Run, actualError, expectedError;

    beforeEach(function(){
      expectedError = new Error("some error");
      actualError = undefined;
      init2Run = false;

      function init1(arg, next){ 
        next(expectedError);
      }

      function init2(arg, next){ 
        init2Run = true;
        next(); 
      }

      var initializers = [init1, init2];

      var runner = new Runner(initializers);
      runner.run({}, function(err){
        actualError = err;
      });
    });


    it("should return the error from the runner", function(){
      expect(actualError).toBe(expectedError);
    });

    it("should not run anymore functions", function(){
      expect(init2Run).toBe(false);
    });
  });

  describe("when running with no arg for the runner", function(){
    var args, init1Run, init2Run, completed;

    beforeEach(function(){
      completed = false;
      init1Run = false;
      init2Run = false;
      args = [];

      function init1(arg, next){ 
        args.push(arg);
        init1Run = true;
        next();
      }
      function init2(arg, next){ 
        args.push(arg);
        init2Run = true;
        next(); 
      }

      var initializers = [init1, init2];

      var runner = new Runner(initializers);
      runner.run(function(err){
        completed = true;
      });
    });

    it("should not pass an arg as the first parameter to all functions", function(){
      expect(args[0]).toBe(undefined);
      expect(args[1]).toBe(undefined);
    });

    it("should complete the functions", function(){
      expect(init1Run).toBe(true);
      expect(init2Run).toBe(true);
    });

    it("should complete process", function(){
      expect(completed).toBe(true);
    });
  });

  describe("when running with no arg", function(){
    var arg, args, init1Run, init2Run, completed;

    beforeEach(function(){
      completed = false;
      init1Run = false;
      init2Run = false;
      arg = {};
      args = [];

      function init1(next){ 
        init1Run = true;
        next();
      }
      function init2(arg, next){ 
        args.push(2);
        args.push(arg);
        init2Run = true;
        next(); 
      }

      var initializers = [init1, init2];

      var runner = new Runner(initializers);
      runner.run(arg, function(err){
        completed = true;
      });
    });

    it("should pass the arg as the first parameter to any function that accepts it", function(){
      expect(args[0]).toBe(2);
      expect(args[1]).toBe(arg);
    });

    it("should complete the functions", function(){
      expect(init1Run).toBe(true);
      expect(init2Run).toBe(true);
    });

    it("should complete the process", function(){
      expect(completed).toBe(true);
    });
  });

});
