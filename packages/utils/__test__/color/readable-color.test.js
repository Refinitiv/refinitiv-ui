import { expect } from '@refinitiv-ui/test-helpers';
import { readableColor } from '@refinitiv-ui/utils/color.js';

describe('Readable color', () => {
  it('Should return black color when color is undefined or invalid', async () => {
    expect(readableColor()).to.deep.equal({
      "main": "BLACK",
      "mixed": "WHITE",
      "name": "black",
      "percent": 0,
      "tone": ""
    });
    expect(readableColor('hello')).to.deep.equal({
      "main": "BLACK",
      "mixed": "WHITE",
      "name": "black",
      "percent": 0,
      "tone": ""
    });
  });

  it('Should return color name when matches with css color name', async () => {
    expect(readableColor('#f0f8ff').name).to.equal('aliceblue');
    expect(readableColor('#ff00ff').name).to.equal('fuchsia');
    expect(readableColor('#5f9ea0').name).to.equal('cadetblue');
    expect(readableColor('#ff1493').name).to.equal('deeppink');
  });

  it('Should return main color correctly', async () => {
    expect(readableColor('#ff0001').main).to.equal('RED');
    expect(readableColor('#ffff01').main).to.equal('YELLOW');
    expect(readableColor('#00ff01').main).to.equal('GREEN');
    expect(readableColor('#01ffff').main).to.equal('CYAN');
    expect(readableColor('#0100ff').main).to.equal('BLUE');
    expect(readableColor('#ff01ff').main).to.equal('MAGENTA');
    expect(readableColor('#000000').main).to.equal('BLACK');
    expect(readableColor('#ffffff').main).to.equal('WHITE');
  });

  it('Should return color details correctly', async () => {
    expect(readableColor('#ff1900')).to.deep.equal({
      "main": "RED",
      "mixed": "YELLOW",
      "name": undefined,
      "percent": 10,
      "tone": ""
    });
    expect(readableColor('#ffe500')).to.deep.equal({
      "main": "YELLOW",
      "mixed": "RED",
      "name": undefined,
      "percent": 10,
      "tone": ""
    });
    expect(readableColor('#bfbfbf')).to.deep.equal({
      "main": "WHITE",
      "mixed": "BLACK",
      "name": undefined,
      "percent": 25,
      "tone": ""
    });
    expect(readableColor('#404040')).to.deep.equal({
      "main": "BLACK",
      "mixed": "WHITE",
      "name": undefined,
      "percent": 25,
      "tone": ""
    });
    expect(readableColor('#2a9d8f')).to.deep.equal({
      "main": "CYAN",
      "mixed": "GREEN",
      "name": undefined,
      "percent": 12,
      "tone": "DARK"
    });
  });

  it('Should return color tones correctly', async () => {
    expect(readableColor('#ff9999').tone).to.equal('VERY_LIGHT');
    expect(readableColor('#ff4d4d').tone).to.equal('LIGHT');
    expect(readableColor('#b30000').tone).to.equal('DARK');
    expect(readableColor('#330000').tone).to.equal('VERY_DARK');
  });
});