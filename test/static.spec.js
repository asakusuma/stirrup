/**
 * @venus-include ../source/static.js
 * @venus-include ../lib/bluebird.js
 * @venus-include ../test-helpers.js
 */

/*
 *  static.spec.js
 *  --------------
 *  Tests the functionality that takes the config and creates
 *  static functions on the created Stirrup instance.
 */

var Library = Promise.noConflict();
Stirrup.prototype.getConfig = sinon.stub().returns({
  constructor: null
});
Stirrup.prototype.buildStaticFunctions = sinon.stub();

describe('Stirrup Static Functions', function() {

  var instance;

  describe('all', function() {
    it('should resolve when and only when all promises have resolved', function(done) {
      instance = new Stirrup(Library);

      var fulfilled = sinon.spy();
      var rejected = sinon.spy();

      var promise1 = new instance.Promise(function(r) { r(); });
      var d = instance.defer();
      var promise2 = d.promise;

      instance.all([promise1, promise2]).then(function() {
        expect(rejected.called).to.be(false);
        done();
      }, rejected).then(null, done);

      expect(fulfilled.called).to.be(false);

      d.fulfill();
    });
  });
});
