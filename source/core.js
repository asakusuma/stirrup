var Stirrup = function(library, config) {
  if(typeof library !== 'object' && typeof library !== 'function') {
    throw 'You must provide Stirrup with a promise library';
  }
  this.config = config;
  this.library = library;
  this.isNative = (typeof Promise === 'function' && Promise.toString().indexOf('[native code]') > -1);

  var constructor = this.getConstructor();
  buildDefer(constructor, this.config, this.isNative);
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