var _ = require('underscore');
var template = fs.readFileSync('./static/static.tmpl', 'utf8');

module.exports = function(config) {
  console.log(template);
  return config;
}