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
    it('should create a new promise with a then() function', function() {
      instance = new Stirrup(Library);

      var promise = new instance.Promise(function() {});

      isPromise(promise);
    });

    it('should create a new fulfillable promise', function(done) {
      var value = {};
      instance = new Stirrup(Library);

      var promise = new instance.Promise(function(f) { f(value); });

      promise.then(function(v) {
        expect(v).to.be(value);
        done();
      }).then(null, done);
    });

    it('should create a new rejectable promise', function(done) {
      var value = {};
      instance = new Stirrup(Library);

      var promise = new instance.Promise(function(f, r) { r(value); });

      promise.then(null, function(v) {
        expect(v).to.be(value);
        done();
      }).then(null, done);
    });
  });

  describe('defer()', function() {
    it('should create a new deferred with a promise promise property with a then() function', function() {
      instance = new Stirrup(Library);

      var deferred = instance.defer();

      isPromise(deferred.promise);
    });

    it('should create a new fulfillable deferred', function(done) {
      var value = {};
      instance = new Stirrup(Library);

      var deferred = instance.defer();
      deferred.fulfill(value);

      deferred.promise.then(function(v) {
        expect(v).to.be(value);
        done();
      }).then(null, done);
    });

    it('should create a new rejectable deferred', function(done) {
      var value = {};
      instance = new Stirrup(Library);

      var deferred = instance.defer();
      deferred.reject(value);

      deferred.promise.then(null, function(v) {
        expect(v).to.be(value);
        done();
      }).then(null, done);
    });
  });
});