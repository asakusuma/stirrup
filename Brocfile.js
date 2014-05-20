var fs = require('fs');
var replace = require('broccoli-replace');
var broccoli = require('broccoli');
var uglify = require('broccoli-uglify-js');
var mergeTrees = require('broccoli-merge-trees');
var moveFile = require('broccoli-file-mover');
var compile = require('broccoli-static-compiler');
var stringify = require('stringify-object');

var build = function() {
  var library = process.env['BROCCOLI_LIBRARY'] || 'bluebird';
  var config = 'var config = ' + stringify(require('./config/' + library + '.js')).replace(/\n/g, '\n    ');
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

  //Create /min directory for minified artifacts
  var prod = uglify(compile(dev, {
    srcDir: '/',
    destDir: '/min'
  }));

  return mergeTrees([dev, main, prod], {
    overwrite: true
  });
};

module.exports = build(broccoli);
