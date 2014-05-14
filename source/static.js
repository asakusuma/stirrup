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