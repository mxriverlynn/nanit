var path = require("path");
var process = require("process");

var nanit = require("../lib");


describe("nanit", function(){
  var initializerFolder = path.resolve(process.cwd(), "specs", "initializers");
  
  describe("when loading initializers from files", function(){
    var completed;

    beforeEach(function(){
      completed = false;
      global.init1 = false;
      global.init2 = false;

      nanit.initialize(initializerFolder, {},function(err){
        completed = true;
      });
    });

    it("should run all the initializers", function(){
      expect(global.init1).toBe(true);
      expect(global.init2).toBe(true);
    });

    it("should complete initialization process", function(){
      expect(completed).toBe(true);
    });

  });
});
