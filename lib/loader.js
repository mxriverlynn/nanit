var fs = require("fs");

// Initializer Loader
// ------------------

var Loader = {
  load: function(folder){
    var initializers = [];
    folder = fixFolderName(folder);

    fs.readdirSync(folder).forEach(function(file){
      if (!isJSFile(file)){ return; }

      var init = require(folder + file);
      initializers.push(init);
    });

    return initializers;
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
