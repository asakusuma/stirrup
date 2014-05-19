var fs = require('fs');
var replace = require('broccoli-replace');
var broccoli = require('broccoli');
var uglify = require('broccoli-uglify-js');
var mergeTrees = require('broccoli-merge-trees');
var moveFile = require('broccoli-file-mover');
var stringify = require('stringify-object');

var build = function() {

  var config = 'var config = ' + stringify(require('./config/bluebird.js')).replace(/\n/g, '\n    ');
  var core = fs.readFileSync('./source/core.js', 'utf8').replace(/\n/g, '\n  ').replace('//@@config', config);
  var statik = fs.readFileSync('./source/static.js', 'utf8').replace(/\n/g, '\n  ');

  var source = core + '\n' + statik;

  var dev = replace('templates', {
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

  var main = moveFile(dev, {
    srcFile: 'common.js',
    destFile: '../../main.js',
    copy: true
  })


  /*
  //Attempting to create /prod directory for minified artifacts
  var prod = uglify(moveFile(dev, {
    files: {
      '': '/prod'
    },
    copy: true
  }));
  //https://github.com/rjackson/broccoli-file-mover/issues/6
  */

  return mergeTrees([dev, main], {
    overwrite: true
  });
};

module.exports = build(broccoli);