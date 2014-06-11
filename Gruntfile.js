module.exports = function(grunt) {

  var library = grunt.option('lib') || 'bluebird';
  var buildType = grunt.option('type') || 'dynamic';

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
      },
      browsertest: {
        command: 'venus run -t test/',
        options: {
          stdout: true
        }
      }
    },
    env: {
      all: {
        BROCCOLI_LIBRARY: library,
        BROCCOLI_BUILD_TYPE: buildType
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

  var buildTasks = [
    'env:all',
    'broccoli:artifacts:build'
  ];

  if(buildType !== 'static') {
    buildTasks.unshift('clean');
  }

  grunt.registerTask('default', 'Build artifacts', buildTasks);

  grunt.registerTask('test', 'Run unit tests', [
    'shell:test'
  ]);

  grunt.registerTask('browsertest', 'Run unit tests', [
    'shell:browsertest'
  ]);
};
