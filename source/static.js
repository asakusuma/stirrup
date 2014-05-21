
Stirrup.prototype.buildStaticFunctions = function(constructor) {
  var staticFuncs = this.getConfig().staticFuncs;
  for(var i = 0, len = staticFuncs.length; i < len; i++) {
    var def = staticFuncs[i];
    var staticFunc = null;

    //If using native promises, and native promises implements
    //the given function, save
    if(this.isNative && Promise[def.nativeName]) {
      staticFunc = Promise[def.nativeName];
    } else if(this.library[def.libName]) { //If the function doesn't exist natively, use the library
      staticFunc = this.library[def.libName];
    } else {
      console.error('Bad config. Could not find native or library function for "' + def.libName + '"');
      return;
    }

    if(def.aliases) {
      //Attach function to aliases
      var fLen = def.aliases.length;
      for(var f = 0; f < fLen; f++) {
        constructor[def.aliases[f]] = staticFunc;
      }
    } else {
      constructor[def.libName] = staticFunc;
    }
  }
};
