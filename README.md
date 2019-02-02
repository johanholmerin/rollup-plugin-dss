# rollup-plugin-dss

Rollup plugin for [DSS](https://dss-lang.com)

## Installation

```sh
yarn add -D git+https://github.com/johanholmerin/rollup-plugin-dss#semver:^0.1.0-beta.0
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
      fileName: 'index.css' // required, relative to output location
    })
  ]
};
```
