
<p align="center">
  <h1  align="center">v-promise</h1>
</p>

<p align="center">
  Help you simplify <code>promise</code> operation and provide solve <code>async</code> <code>await</code> wrapper function for easy error handling without try-catch!
</p>

## 📎 Installation
```sh
$ npm i v-promise
```

<p align="center">
  <a href="https://www.npmjs.com/package/v-promise">
    <img align="middle" src="https://img.shields.io/npm/v/v-promise/latest">
  </a>
  <a href="https://github.com/murongg/v-promise/blob/main/LICENSE">
    <img align="middle" src="https://img.shields.io/github/license/murongg/v-promise">
  <a/>
   <img align="middle" src="https://img.shields.io/bundlephobia/min/v-promise" />
  <img align="middle" src="https://img.shields.io/github/languages/top/murongg/v-promise">
</p>

## Usage

[![Edit Vue Hooks Examples](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/hopeful-moon-gquxl3?file=/src/App.vue)
```js
import { useAwaitPromise, usePromise } from 'v-promise'
const { loading, data, error, promise } = usePromise(youPromiseFunction, { immediate: true })
const { loading, data, error, promise } = await useAwaitPromise(youPromiseFunction)
```
Use more to view with [CodeSandBox](https://codesandbox.io/s/hopeful-moon-gquxl3?file=/src/App.vue)

## 💗 Thanks

- [aiven715/promise-hook](https://github.com/aiven715/promise-hook)
- [scopsy/await-to-js](https://github.com/scopsy/await-to-js)
