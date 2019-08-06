const assert = require('assert');
const bundle = require('./bundle.js');

describe('exports', function() {

  it('has named and default exports', () => {
    return bundle('./samples/reexport/index.js', {
      fileName: 'index.css'
    }).then(([output]) => {
      assert.deepEqual(output.exports, ['bar', 'default', 'foo']);
    });
  });

});
