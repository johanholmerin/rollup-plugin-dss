const dss = require('dss-compiler');
const assert = require('assert');
const { createFilter } = require('rollup-pluginutils');
const { optimizer } = require('dss-compiler/processor');

module.exports = function dssPlugin({
  include = '**/*.css',
  exclude,
  fileName
} = {}) {
  assert(fileName, 'fileName is required');
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

      if (fileName in bundles) {
        this.error(`${fileName} already exists in bundle`);
      }

      this.emitAsset(fileName, optimizer(css).css);
    }
  };
};
