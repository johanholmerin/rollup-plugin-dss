const assert = require('assert');
const bundle = require('./bundle.js');

describe('name', function() {

  it('throws when name conflicts with bundle', () => {
    return assert.rejects(bundle('./samples/basic/index.js', {
      fileName: 'index.js'
    }));
  });

});
