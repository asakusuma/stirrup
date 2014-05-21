/**
 * @venus-include ../source/static.js
 * @venus-include ../lib/bluebird.js
 * @venus-include ../lib/rsvp.js
 * @venus-include ../test-helpers.js
 */

/*
 *  static.spec.js
 *  --------------
 *  Tests the functionality that takes the config and creates
 *  static functions on the created Stirrup instance.
 */

var Library = RSVP;
var NativeMock = Promise.noConflict();
var Promise = null;
var instance;

Library.myIdenticalFunction = function() {};

var stubNative = function() {
  Promise = NativeMock;
  Promise.toString = sinon.stub().returns('[native code]');
};

var unStubNative = function() {
  Promise = null;
  Library.myIdenticalFunction = function() {}
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
    },
    {
      libName: 'myIdenticalFunction'
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

      var originalFunc = Library.myNativeFunction;

      expect(instance.someAlias).to.be(originalFunc);
      expect(instance.someOtherAlias).to.be(originalFunc);
    });

    it('should proxy library function to same name if no alias', function() {
      instance = new Stirrup(Library);

      var originalFunc = Library.myIdenticalFunction;

      expect(instance.myIdenticalFunction).to.be(originalFunc);
    });
  });

  describe('when native promises available', function() {

    //If our environment doesn't have native promises, we need to stub them
    if(!(typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1)) {
      stubNative();
    }

    it('should proxy native function to aliases', function() {
      instance = new Stirrup(Library);

      var originalFunc = Promise.myLibFunction;

      expect(instance.someAlias).to.be(originalFunc);
      expect(instance.someOtherAlias).to.be(originalFunc);
    });

    it('should proxy library function to same name if no alias and no native function', function() {
      instance = new Stirrup(Library);
      var originalFunc = Library.myIdenticalFunction;

      expect(instance.myIdenticalFunction).to.be(originalFunc);
    });
  });
});
