module.exports = function(grunt) {

  var library = grunt.option('lib') || 'bluebird';

  var outputDir = 'dist/';

  grunt.initConfig({
    broccoli: {
      artifacts: {
        dest: outputDir,
        config: 'Brocfile.js',
      }
    },
    clean: [outputDir, 'main.js'],
    shell: {
      test: {
        command: 'venus run -t test/ -n',
        options: {
          stdout: true
        }
      }
    },
    env: {
      all: {
        BROCCOLI_LIBRARY: library
      }
    }
  });

  grunt.loadNpmTasks('grunt-broccoli');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-env');

  /*
  TODO

  - Run tests
    - In node
    - In different browsers with grunt-open
  */

  grunt.registerTask('default', 'Build artifacts', [
    'env:all',
    'clean',
    'broccoli:artifacts:build'
  ]);

  grunt.registerTask('test', 'Run unit tests', [
    'shell:test'
  ]);
};
