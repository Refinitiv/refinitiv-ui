import { css } from 'toko/formats.js';

export default [
  {
    inputs: ['./src/palettes/colors.tokens.json','./src/schemes/light.tokens.json', './src/default.tokens.json'],
    outputs: [
      css({
        selector: '&',
      })
    ]
  },
  {
    inputs: ['./src/palettes/colors.tokens.json', './src/schemes/light.tokens.json', './src/default.tokens.json', './src/densities/mobile.tokens.json'],
    outputs: [
      css({
        selector: '&',
      })
    ]
  },
  {
    inputs: ['./src/palettes/colors.tokens.json', './src/schemes/light.tokens.json', './src/default.tokens.json', './src/densities/comfort.tokens.json'],
    outputs: [
      css({
        selector: '&',
      })
    ]
  },
  {
    inputs: ['./src/palettes/colors.tokens.json', './src/schemes/light.tokens.json', './src/default.tokens.json', './src/densities/dense.tokens.json'],
    outputs: [
      css({
        selector: '&',
      })
    ]
  },
  {
    inputs: ['./src/palettes/colors.tokens.json', './src/schemes/dark.tokens.json'],
    outputs: [
      css({
        selector: '&',
      })
    ]
  },
  {
    inputs: ['./src/palettes/colors.tokens.json', './src/schemes/light.tokens.json'],
    outputs: [
      css({
        selector: '&',
      })
    ]
  },
  {
    inputs: ['./src/palettes/colors.tokens.json'],
    outputs: [
      css({
        selector: '&',
      })
    ]
  }
];
