var fs = require('fs');
var replace = require('broccoli-replace');
var broccoli = require('broccoli');
var uglify = require('broccoli-uglify-js');
var mergeTrees = require('broccoli-merge-trees');
var moveFile = require('broccoli-file-mover');
var compile = require('broccoli-static-compiler');
var stringify = require('stringify-object');
var handlebars = require('handlebars');

var dynamic = function(config) {
  var core = fs.readFileSync('./source/core.js', 'utf8').replace(/\n/g, '\n  ').replace('//@@config', 'var config = ' + stringify(config).replace(/\n/g, '\n    '));
  var statik = fs.readFileSync('./source/static.js', 'utf8').replace(/\n/g, '\n  ');
  return buildDefer + '\n' + core + '\n' + statik;
};

var statik = function(config) {
  var template = handlebars.compile(fs.readFileSync('./static/static.hbs', 'utf8'));

  return template(config).replace(/\n/g, '\n  ');
};

var build = function() {
  var library = process.env['BROCCOLI_LIBRARY'] || 'bluebird';
  var buildType = process.env['BROCCOLI_BUILD_TYPE'] || 'dynamic';

  var config = require('./config/' + library + '.js');

  var source = (fs.readFileSync('./source/buildDefer.js', 'utf8') + '\n').replace(/\n/g, '\n  ');

  if (buildType === 'static') {
    source += statik(config);
  } else {
    source += dynamic(config);
  }

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
