var fs = require('fs');
var replace = require('broccoli-replace');
var broccoli = require('broccoli');
var uglify = require('broccoli-uglify-js');
var mergeTrees = require('broccoli-merge-trees');
var moveFile = require('broccoli-file-mover');

var build = function(broccoli) {
  var source = fs.readFileSync('./source.js', 'utf8').replace(/\n/g, '\n  ');

  var dev = replace('artifact-templates', {
    files: [
      '**/*.js'
    ],
    patterns: [
      {
        match: 'include',
        replacement: source
      }
    ]
  });

/*
  //Attempting to create /prod directory for minified artifacts
  var prod = uglify(moveFile(dev, {
    srcFile: '/',
    destFile: 'prod',
    copy: true
  }));

  return mergeTrees([dev, prod], {
    overwrite: true
  });
*/
  return dev;
};

module.exports = build(broccoli);