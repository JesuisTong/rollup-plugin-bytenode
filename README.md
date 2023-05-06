# @tongzag/rollup-plugin-bytenode
A Simple Rollup plugin compile your code use [bytenode](https://github.com/bytenode/bytenode)

## Install

```sh
# npm
npm install --save-dev @tongzag/rollup-plugin-bytenode

# yarn
yarn add -D @tongzag/rollup-plugin-bytenode

# pnpm
pnpm add -D @tongzag/rollup-plugin-bytenode
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import bytenode from '@tongzag/rollup-plugin-bytenode';

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'cjs'
  },
  plugins: [bytenode()]
};
```

> ensure that this plugin is added to the `plugins` array **after all**

## Options

### `compileAsModule`

Type: `boolean`<br>
Default: `false`

If true, the output will be a commonjs module.

### `electron`

Type: `boolean`<br>
Default: `false`

If true, the output will be a compiled through Electrong. Default: false.


### `includes`

Type: `Regexp`<br>
Default: `/[^\.]+(\.jsc)\..+/`

Plugin will match all files then transform to `bytenode file`

## Caution
1. Because of [bytenode issue](https://github.com/bytenode/bytenode/issues/157), i use `@babel/plugin-transform-arrow-functions` to compile `arrow function`
2. Compile `bytenode file` to `commonjs` even if you determine `output.format = 'esm'`

## Meta

[LICENSE (MIT)](/LICENSE)
