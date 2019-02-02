const assert = require('assert');
const bundle = require('./bundle.js');

describe('files', function() {

  it('includes css', () => {
    return bundle('./samples/basic/index.js', {
      fileName: 'index.css'
    }).then(([, css]) => {
      assert('index.css' === css.fileName);
      assert(css.isAsset);
      assert(css.source);
      assert(css.source.includes('color:red'));
    });
  });

  it('multi', () => {
    return bundle('./samples/multi/index.js').then(([, css]) => {
      assert(css.source.includes('color:red'));
      assert(css.source.includes('color:blue'));
    });
  });

});
