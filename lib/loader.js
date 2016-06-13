var fs = require("fs");

// Load files / finalizers alphabetically from a folder
// ------------------

var Loader = {
  load: function(folder){
    var files = [];
    folder = fixFolderName(folder);

    fs.readdirSync(folder).sort().forEach(function(file){
      if (!isJSFile(file)){ return; }

      var script = require(folder + file);
      files.push(script);
    });

    return files;
  }
};

// Private API
// -----------

function fixFolderName(folder){
  var index = folder.lastIndexOf("/");
  var length = folder.length;

  if (index !== length){
    folder = folder + "/";
  }

  return folder;
}

function isJSFile(file){
  var index = file.indexOf(".js");
  var location = file.length - 3;
  return (index === location);
}

// exports
// -------

module.exports = Loader;
