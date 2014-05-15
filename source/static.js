
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