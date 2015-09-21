var nanit = require("../lib");

describe("run initializers", function(){

  describe("when running an array of initializers with no errors", function(){
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

      var runner = new nanit.Runner(initializers);
      runner.run(arg, function(err){
        completed = true;
      });
    });

    it("should pass the arg as the first parameter to all initializers", function(){
      expect(args[0]).toBe(arg);
      expect(args[1]).toBe(arg);
    });

    it("should complete the initializers", function(){
      expect(init1Run).toBe(true);
      expect(init2Run).toBe(true);
    });

    it("should complete initialization process", function(){
      expect(completed).toBe(true);
    });
  });

  describe("when an initializer fails", function(){
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

      var runner = new nanit.Runner(initializers);
      runner.run({}, function(err){
        actualError = err;
      });
    });


    it("should return the error from the runner", function(){
      expect(actualError).toBe(expectedError);
    });

    it("should not run anymore initialzers", function(){
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

      var runner = new nanit.Runner(initializers);
      runner.run(function(err){
        completed = true;
      });
    });

    it("should not pass an arg as the first parameter to all initializers", function(){
      expect(args[0]).toBe(undefined);
      expect(args[1]).toBe(undefined);
    });

    it("should complete the initializers", function(){
      expect(init1Run).toBe(true);
      expect(init2Run).toBe(true);
    });

    it("should complete initialization process", function(){
      expect(completed).toBe(true);
    });
  });

  describe("when running with no arg for an initializer", function(){
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

      var runner = new nanit.Runner(initializers);
      runner.run(arg, function(err){
        completed = true;
      });
    });

    it("should pass the arg as the first parameter to any initializers that accepts it", function(){
      expect(args[0]).toBe(2);
      expect(args[1]).toBe(arg);
    });

    it("should complete the initializers", function(){
      expect(init1Run).toBe(true);
      expect(init2Run).toBe(true);
    });

    it("should complete initialization process", function(){
      expect(completed).toBe(true);
    });
  });

});
