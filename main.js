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
  var Stirrup = function(library, config) {
    if(typeof library !== 'object' && typeof library !== 'function') {
      throw 'You must provide Stirrup with a promise library';
    }
    var isNative = (typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1);
    var exposed;
    if(isNative) {
      exposed = Promise;
    } else {
      exposed = library;
    }
    buildDefer(exposed, config, isNative);
    /*
    libName: 'all',
        nativeName: 'all',
        aliases
        */
  
    var staticFunc;
    
      
      if(isNative && Promise['all']) {
        staticFunc = Promise['all'];
      } else if(library['all') { //If the function doesn't exist natively, use the library
        staticFunc = library['all'];
      }
  
  
      
        
          exposed['all'] = staticFunc;
        
          exposed['when'] = staticFunc;
        
      
    
      if(library['spread') { //If the function doesn't exist natively, use the library
        staticFunc = library['spread'];
      }
  
  
      
        exposed['spread'] = staticFunc;
      
    
      if(library['settle') { //If the function doesn't exist natively, use the library
        staticFunc = library['settle'];
      }
  
  
      
        exposed['settle'] = staticFunc;
      
    
      if(library['resolve') { //If the function doesn't exist natively, use the library
        staticFunc = library['resolve'];
      }
  
  
      
        exposed['resolve'] = staticFunc;
      
    
      if(library['reject') { //If the function doesn't exist natively, use the library
        staticFunc = library['reject'];
      }
  
  
      
        exposed['reject'] = staticFunc;
      
    
    return exposed;
  }
  

module.exports = Stirrup;