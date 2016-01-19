module.exports = function(grunt){

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      },

      nanit: ["lib/**/*.js"]
    },

    jasmine_nodejs: {
      options: {
        specNameSuffix: ".specs.js",
        stopOnFailure: false
      },

      nanit: {
        specs: ["specs/**"]
      }
    },

    watch: {
      nanit: {
        files: ["lib/**/*.js", "specs/**/*.js"],
        tasks: ["jshint", "jasmine_nodejs"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("specs", ["jshint", "jasmine_nodejs"]);
};
