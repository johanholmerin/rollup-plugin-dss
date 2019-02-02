const assert = require('assert');
const rollup = require('rollup');
const plugin = require('../index.js');

const rollupOptions = {
  input: require.resolve('./samples/multi/index.js'),
  plugins: [
    plugin({
      fileName: 'index.css'
    })
  ]
};

describe('watch', function() {

  it('only includes current styles', async () => {
    const bundle = await rollup.rollup(rollupOptions);
    const { output } = await bundle.generate({ format: 'es' });
    assert(output[1].source.includes('color:blue'));

    // remove comp.js from cache
    bundle.cache.modules = bundle.cache.modules.filter(module => {
      return !module.id.endsWith('comp.js');
    });

    const bundle2 = await rollup.rollup({
      ...rollupOptions,
      plugins: [
        {
          load(id) {
            if (id.endsWith('comp.js')) {
              return 'export default function () {}';
            }
          }
        },
        ...rollupOptions.plugins
      ],
      cache: bundle.cache
    });
    const { output: output2 } = await bundle2.generate({ format: 'es' });
    assert(!output2[1].source.includes('color:blue'));
  });

});
