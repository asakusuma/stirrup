var Stirrup = function(library) {
    if(typeof library !== 'object' && typeof library !== 'function') {
      throw 'You must provide Stirrup with a promise library';
    }
    this.library = library;
    this.isNative = (typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1);
  
    this.config = {
      constructor: null,
      staticFuncs: {
        all: {
          nativeName: 'all',
          aliases: [
            'all',
            'when'
          ]
        }
      }
    };
  
    this.buildDefer();
    this.buildConstructor();
  
  /*
    if(typeof config === 'object') {
      for(var key in funcNameMap) {
        staticFuncNameMap[key] = funcNameMap[key];
      }
    }
    
    this.buildStaticFunctions(this.config.staticFuncs);
    */
  };
  
  Stirrup.prototype.buildConstructor = function() {
    if(!this.isNative) {
      this.Promise = this.config.constructor ? this.library[this.config.constructor] : this.library;
    } else {
      this.Promise = this.library;
    }
  }
  
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

module.exports = Stirrup;