import { css } from 'toko/formats.js';

export default [
  {
    inputs: ['./src/variants/dark.palette.json', './src/base.tokens.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  },
  {
    inputs: ['./src/variants/dark.palette.json', './src/base.tokens.json', './src/mobile.tokens.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  },
  {
    inputs: ['./src/variants/dark.palette.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  },
  {
    inputs: ['./src/variants/light.palette.json'],
    outputs: [
      css({
        prefix: 'ds'
      })
    ]
  }
];
