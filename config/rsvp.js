module.exports = {
  constructor: 'Promise',
  defer: 'defer',
  deferredFuncs: {
    fulfill: 'resolve'
  },
  staticFuncs: [
    {
      libName: 'all',
      nativeName: 'all',
      aliases: [
        'all',
        'when'
      ]
    }
  ]
};
