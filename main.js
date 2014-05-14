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
    		},
    		spread: {},
    		settle: {},
    		fulfill: {
    			aliases: [
    				'fulfilled'
    			]
    		},
    		reject: {
    			aliases: [
    				'rejected'
    			]
    		}
    	}
    }
  
    this.buildDefer();
    this.buildConstructor();
  
    if(this.buildStaticFunctions && this.config) {
      this.buildStaticFunctions(this.config.staticFuncs);
    }
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
Stirrup.prototype.buildStaticFunctions = function(map) {
    for(var libName in map) {
      var def = map[libName];
      var staticFunc = null;
  
      //If using native promises, and native promises implements
      //the given function, save
      if(this.isNative && Promise[def.nativeName]) {
        staticFunc = Promise[def.nativeName];
      }
  
      //If the function doesn't exist natively, use the library
      if(!staticFunc) {
        staticFunc = this.library[libName];
      }
  
      //Attach function to aliases
      var fLen = def.aliases.length;
      for(var f = 0; f < fLen; f++) {
        this[def.aliases[f]] = staticFunc;
      }
    }
  };

module.exports = Stirrup;