var path = require("path");
var Nanit = require("../lib");

describe("file finalizers", function(){
  var finalizerFolder = path.resolve(process.cwd(), "specs", "finalizers");

  describe("when loading finalizers from files", function(){
    var completed;

    beforeEach(function(){
      completed = false;
      global.fins = [];
      global.fin1 = false;
      global.fin2 = false;

      var nanit = new Nanit({finalizerFolder: finalizerFolder});
      nanit.finalize(function(err){
        completed = true;
      });
    });

    it("should run all the finalizers", function(){
      expect(global.fin1).toBe(true);
      expect(global.fin2).toBe(true);
    });

    it("should run the finalizers in sorted alphabetical order", function () {
      expect(global.fins[0]).toEqual('fin1')
      expect(global.fins[1]).toEqual('fin2')
    });

    it("should complete finalizer process", function(){
      expect(completed).toBe(true);
    });

  });
});
