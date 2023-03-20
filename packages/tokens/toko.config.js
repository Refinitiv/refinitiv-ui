import { css } from 'toko/formats.js';

export default [
  {
    inputs: ['./src/schemes/dark.tokens.json', './src/default.tokens.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  },
  {
    inputs: ['./src/schemes/dark.tokens.json', './src/default.tokens.json', './src/densities/mobile.tokens.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  },
  {
    inputs: ['./src/schemes/dark.tokens.json', './src/default.tokens.json', './src/densities/comfort.tokens.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  },
  {
    inputs: ['./src/schemes/dark.tokens.json', './src/default.tokens.json', './src/densities/dense.tokens.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  },
  {
    inputs: ['./src/schemes/dark.tokens.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  },
  {
    inputs: ['./src/schemes/light.tokens.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  }
];
