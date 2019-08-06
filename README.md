# rollup-plugin-dss

Rollup plugin for [DSS](https://dss-lang.com)

**Rollup version 1.19.0 or higher is required**

## Installation

```sh
yarn add -D git+https://github.com/johanholmerin/rollup-plugin-dss#semver:^0.1.0-beta.1
```

## Usage

**rollup.config.js**

```javascript
import dss from 'rollup-plugin-dss';

export default {
  input: 'main.js',
  output: {
    dir: 'build',
    format: 'es'
  },
  plugins: [
    dss({
      // Optional options
      // fileName: unique name to for output file
      // name: name to use for output.assetFileNames pattern
    })
  ]
};
```
