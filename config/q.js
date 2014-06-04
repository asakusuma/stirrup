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
      libName: 'allSettled',
      aliases: [
        'settle',
        'allSettled'
      ]
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
};
