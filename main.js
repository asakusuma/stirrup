var Stirrup = function(library) {
    if(typeof library !== 'object' && typeof library !== 'function') {
      throw 'You must provide Stirrup with a promise library';
    }
    this.library = library;
    this.isNative = (typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1);
  
    this.buildDefer();
    this.buildConstructor();
    this.buildStaticFunctions();
  };
  
  Stirrup.prototype.getConfig = function() {
    var config = {
    	constructor: null,
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
    return config;
  };
  
  Stirrup.prototype.buildConstructor = function() {
    if(!this.isNative) {
      this.Promise = this.getConfig().constructor ? this.library[this.getConfig().constructor] : this.library;
    } else {
      this.Promise = this.library;
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

  Stirrup.prototype.buildStaticFunctions = function() {
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
  
      //Attach function to aliases
      var fLen = def.aliases.length;
      for(var f = 0; f < fLen; f++) {
        this[def.aliases[f]] = staticFunc;
      }
    }
  };

module.exports = Stirrup;