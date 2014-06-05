var buildDefer = function(constructor, config, isNative) {
  if(!isNative && config.defer) {
    var defer = this.library[config.defer];
    if(config.deferredFuncs) { //If we need to remap deferred functions
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