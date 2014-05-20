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
    var config = {
    	constructor: null,
    	defer: 'defer',
    	staticFuncs: [
    		{
    			libName: 'all',
    			nativeName: 'all',
    			aliases: [
    				'all',
    				'when'
    			]
    		},
    		{
    			libName: 'spread'
    		},
    		{
    			libName: 'settle'
    		},
    		{
    			libName: 'fulfill',
    			aliases: [
    				'fulfilled'
    			]
    		},
    		{
    			libName: 'reject',
    			aliases: [
    				'rejected'
    			]
    		}
    	]
    }
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
  

  Stirrup.prototype.buildStaticFunctions = function(constructor) {
    var staticFuncs = this.getConfig().staticFuncs;
    for(var i = 0, len = staticFuncs.length; i < len; i++) {
      var def = staticFuncs[i];
      var staticFunc = null;
  
      //If using native promises, and native promises implements
      //the given function, save
      if(this.isNative && Promise[def.nativeName]) {
        staticFunc = Promise[def.nativeName];
      }
  
      //If the function doesn't exist natively, use the library
      if(!staticFunc) {
        staticFunc = this.library[def.libName];
      }
  
      if(def.aliases) {
        //Attach function to aliases
        var fLen = def.aliases.length;
        for(var f = 0; f < fLen; f++) {
          constructor[def.aliases[f]] = staticFunc;
        }
      }
    }
  };
  

module.exports = Stirrup;