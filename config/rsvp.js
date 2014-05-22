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
    },
    {
      libName: 'allSettled',
      aliases: [
        'settle'
      ]
    },
    {
      libName: 'resolve',
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
};
