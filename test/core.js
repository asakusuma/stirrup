/**
 * @venus-include ../lib/bluebird.js
 * @venus-include ../test-helpers.js
 */

var Library = Promise.noConflict();
describe('Stirrup Core', function() {

  var instance;

  describe('constructor', function() {
    it('should throw an error if no promise library supplied', function() {
      var error = '';
      try {
        instance = new Stirrup();
      } catch (e) {
        error = e;
      }

      expect(error).to.be('You must provide Stirrup with a promise library');
    });
  });

  describe('Promise()', function() {
    it('should create a new promise', function() {
      instance = new Stirrup(Library);

      var promise = new instance.Promise(function() {});

      isPromise(promise);
    });
  });
});