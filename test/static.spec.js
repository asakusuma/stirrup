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
var Promise = null;
var instance;

var stubNative = function() {
  Promise = Library;
  Promise.toString = sinon.stub().returns('[native code]');
};

var unStubNative = function() {
  Promise = null;
};

Stirrup.prototype.getConfig = sinon.stub().returns({
  constructor: null,
  staticFuncs: [
    {
      libName: 'myLibFunction',
      nativeName: 'myNativeFunction',
      aliases: [
        'someAlias',
        'someOtherAlias'
      ]
    }
  ]
});

describe('constructor', function() {
  describe('when native promises not available', function() {

    //If our environment has native promises, we need to remove them
    if(typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1) {
      unStubNative();
    }

    it('should proxy library function to aliases', function() {
      instance = new Stirrup(Library);

      var originalFunc = Promise.myNativeFunction;

      expect(instance.someAlias).to.be(originalFunc);
      expect(instance.someOtherAlias).to.be(originalFunc);
    });
  });

  describe('when native promises available', function() {

    //If our environment doesn't have native promises, we need to stub them
    if(!(typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1)) {
      stubNative();
    }

    it('should proxy native function to aliases', function() {
      instance = new Stirrup(Library);

      var originalFunc = Library.myLibFunction;

      expect(instance.someAlias).to.be(originalFunc);
      expect(instance.someOtherAlias).to.be(originalFunc);
    });
  });
});