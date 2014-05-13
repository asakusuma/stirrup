var isPromise = function(obj) {
  var assertion = typeof obj === 'object' && typeof obj.then === 'function';
  expect(assertion).to.be(true);
};