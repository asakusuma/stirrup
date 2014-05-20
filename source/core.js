var Stirrup = function(library, config) {
  if(typeof library !== 'object' && typeof library !== 'function') {
    throw 'You must provide Stirrup with a promise library';
  }
  this.config = config;
  this.library = library;
  this.isNative = (typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1);

  var constructor = this.getConstructor();
  this.buildDefer(constructor);
  this.buildStaticFunctions(constructor);
  return constructor;
};

Stirrup.prototype.getConfig = function() {
  //@@config
  return this.config || config;
};

Stirrup.prototype.getConstructor = function() {
  if(!this.isNative) {
    return this.getConfig().constructor ? this.library[this.getConfig().constructor] : this.library;
  } else {
    return Promise;
  }
};

Stirrup.prototype.buildDefer = function(constructor) {
  var config = this.getConfig();
  if(!this.isNative && config.defer) {
    var defer = this.library[config.defer];
    if(config.deferredFuncs) {
      constructor.defer = function() {
        var deferred = defer();
        if(config.deferredFuncs.fulfill) {
          deferred.fulfill = deferred[config.deferredFuncs.fulfill];
        }
        if(config.deferredFuncs.reject) {
          deferred.reject = deferred[config.deferredFuncs.reject];
        }
        return deferred;
      }
    } else {
      constructor.defer = defer;
    }
  } else {
    //TODO: Promise inspection capability
    //https://github.com/petkaantonov/bluebird/blob/master/API.md#inspect---promiseinspection
    var defer = function() {
      var fulfill, reject;
      var promise = new constructor(function(f, r) {
        fulfill = f;
        reject = r;
      });
      return {
        fulfill: fulfill,
        reject: reject,
        promise: promise
      }
    };
    constructor.defer = defer;
  }
};
