module.exports = {
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
