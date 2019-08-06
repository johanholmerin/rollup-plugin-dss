const dss = require('dss-compiler');
const { createFilter } = require('rollup-pluginutils');
const { optimizer } = require('dss-compiler/processor');

module.exports = function dssPlugin({
  include = '**/*.css',
  exclude,
  fileName,
  name
} = {}) {
  // Default name required to ensure extension
  if (!fileName && !name) name = 'index.css';

  const filter = createFilter(include, exclude);
  const styles = Object.create(null);

  return {
    name: 'dss',
    async transform(code, id) {
      if (!filter(id)) return;

      const { locals, flush } = await dss(code);
      styles[id] = flush();

      const exports = Object.keys(locals).map(key => {
        return `export const ${key} = ${JSON.stringify(locals[key])};`;
      });

      return {
        code: [
          ...exports,
          `export default { ${Object.keys(locals).join(', ')} };`
        ].join('\n'),
        map: { mappings: '' }
      };
    },
    generateBundle(options, bundles) {
      let css = '';
      // Collect css from files that are included in this build
      for (const bundle in bundles) {
        for (const id in bundles[bundle].modules) {
          if (id in styles) {
            css += styles[id];
          }
        }
      }

      this.emitFile({
        type: 'asset',
        source: optimizer(css).css,
        fileName, name
      });
    }
  };
};
