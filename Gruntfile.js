module.exports = function(grunt) {

  var ouptutDir = 'dist/';

  grunt.initConfig({
    broccoli_build: {
      assets: {
        dest: ouptutDir
      }
    },
    clean: [ouptutDir, 'main.js']
  });

  grunt.loadNpmTasks('grunt-broccoli-build');
  grunt.loadNpmTasks('grunt-contrib-clean');

  /*
  TODO

  - Run tests
    - In node
    - In different browsers with grunt-open
  */

  grunt.registerTask('default', 'Build artifacts', [
    'clean',
    'broccoli_build'
  ]);
};



