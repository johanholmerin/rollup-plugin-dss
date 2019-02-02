const rollup = require('rollup');
const plugin = require('../index.js');

async function bundle(input, {
  fileName = 'index.css',
  ...pluginOptions
} = {}) {
  const bundle = await rollup.rollup({
    input: require.resolve(input),
    plugins: [
      plugin({
        fileName,
        ...pluginOptions
      })
    ]
  });
  const { output } = await bundle.generate({ format: 'es' });
  return output;
}

module.exports = bundle;
