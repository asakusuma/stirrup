/**
 * @venus-include ../lib/bluebird.js
 */

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
});