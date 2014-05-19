var Stirrup = function(library) {
  if(typeof library !== 'object' && typeof library !== 'function') {
    throw 'You must provide Stirrup with a promise library';
  }
  this.library = library;
  this.isNative = (typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1);

  this.buildDefer();
  this.buildStaticFunctions();
  return this.getConstructor();
};

Stirrup.prototype.getConfig = function() {
  //@@config
  return config;
};

Stirrup.prototype.getConstructor = function() {
  if(!this.isNative) {
    return this.getConfig().constructor ? this.library[this.getConfig().constructor] : this.library;
  } else {
    return this.library;
  }
};

Stirrup.prototype.buildDefer = function() {
  if(this.isNative) {
    //TODO: Promise inspection capability
    //https://github.com/petkaantonov/bluebird/blob/master/API.md#inspect---promiseinspection
    this.defer = function() {
      var fulfill, reject;
      var promise = new Promise(function(f, r) {
        fulfill = f;
        reject = r;
      });
      return {
        fulfill: fulfill,
        reject: reject,
        promise: promise
      }
    }
  } else {
    this.defer = this.library.defer;
  }
};