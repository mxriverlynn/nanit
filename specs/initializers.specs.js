var path = require("path");
var Nanit = require("../lib");

describe("file initializers", function(){
  var initializerFolder = path.resolve(process.cwd(), "specs", "initializers");

  describe("when loading initializers from files", function(){
    var completed;

    beforeEach(function(){
      completed = false;
      global.inits = [];
      global.init1 = false;
      global.init2 = false;

      var nanit = new Nanit({folder: initializerFolder});
      nanit.initialize(function(err){
        completed = true;
      });
    });

    it("should run all the initializers", function(){
      expect(global.init1).toBe(true);
      expect(global.init2).toBe(true);
    });

    it("should run the initializers in sorted alphabetical order", function () {
      expect(global.inits.length).toEqual(2);
      expect(global.inits[0]).toEqual('init1')
      expect(global.inits[1]).toEqual('init2')
    });

    it("should complete initialization process", function(){
      expect(completed).toBe(true);
    });

  });
});
