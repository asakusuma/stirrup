module.exports = function(grunt) {

  var ouptutDir = 'dist/';

  grunt.initConfig({
    broccoli_build: {
      assets: {
        dest: ouptutDir
      }
    },
    clean: [ouptutDir, 'main.js'],
    shell: {
      test: {
        command: 'venus run -t test/ -n',
        options: {
          stdout: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-broccoli-build');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

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

  grunt.registerTask('test', 'Run unit tests', [
    'shell:test'
  ]);
};
