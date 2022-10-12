import { expect } from '@refinitiv-ui/test-helpers';
import { ReadableColor } from '@refinitiv-ui/utils/color.js';

describe('Readable color', () => {
  
    it('Should defalut as Black color when color value is undefined', async () => {
      expect(ReadableColor().name).to.equal('black');
    }); 
    it('Should have hues primary color', async () => {
      expect(ReadableColor('#ff0001').main).to.equal('RED');
      expect(ReadableColor('#ffff01').main).to.equal('YELLOW');
      expect(ReadableColor('#00ff01').main).to.equal('GREEN');
      expect(ReadableColor('#01ffff').main).to.equal('CYAN');
      expect(ReadableColor('#0100ff').main).to.equal('BLUE');
      expect(ReadableColor('#ff01ff').main).to.equal('MAGENTA');
    }); 
    it('Should have mixed color', async () => {
      // Red with 10% Yellow
      expect(ReadableColor('#ff1900').main).to.equal('RED');
      expect(ReadableColor('#ff1900').mixed).to.equal('YELLOW');
      expect(ReadableColor('#ff1900').percent).to.equal(10);
      
      // Yellow with 10% Red
      expect(ReadableColor('#ffe500').main).to.equal('YELLOW');
      expect(ReadableColor('#ffe500').mixed).to.equal('RED');
      expect(ReadableColor('#ffe500').percent).to.equal(10);
    }); 
    it('Should have color tones', async () => {
      expect(ReadableColor('#ff9999').tone).to.equal('VERY_LIGHT');
      expect(ReadableColor('#ff4d4d').tone).to.equal('LIGHT');
      expect(ReadableColor('#b30000').tone).to.equal('DARK');
      expect(ReadableColor('#330000').tone).to.equal('VERY_DARK');
    }); 
    it('Should have color name when color value match with css color name', async () => {
      expect(ReadableColor('#f0f8ff').name).to.equal('aliceblue');
      expect(ReadableColor('#ff00ff').name).to.equal('fuchsia');
      expect(ReadableColor('#5f9ea0').name).to.equal('cadetblue');
      expect(ReadableColor('#ff1493').name).to.equal('deeppink');
    }); 
    it('Should have color mixed and tones', async () => {
      expect(ReadableColor('#2a9d8f').main).to.equal('CYAN');
      expect(ReadableColor('#2a9d8f').mixed).to.equal('GREEN');
      expect(ReadableColor('#2a9d8f').percent).to.equal(12);
      expect(ReadableColor('#2a9d8f').tone).to.equal('DARK');
      
      expect(ReadableColor('#c5d86d').main).to.equal('YELLOW');
      expect(ReadableColor('#c5d86d').mixed).to.equal('GREEN');
      expect(ReadableColor('#c5d86d').percent).to.equal(18);
      expect(ReadableColor('#c5d86d').tone).to.equal('');
      
      expect(ReadableColor('#e9c46a').main).to.equal('YELLOW');
      expect(ReadableColor('#e9c46a').mixed).to.equal('RED');
      expect(ReadableColor('#e9c46a').percent).to.equal(28);
      expect(ReadableColor('#e9c46a').tone).to.equal('LIGHT');
      
      expect(ReadableColor('#3bceac').main).to.equal('CYAN');
      expect(ReadableColor('#3bceac').mixed).to.equal('GREEN');
      expect(ReadableColor('#3bceac').percent).to.equal(23);
      expect(ReadableColor('#3bceac').tone).to.equal('');
      
      expect(ReadableColor('#0ead69').main).to.equal('CYAN');
      expect(ReadableColor('#0ead69').mixed).to.equal('GREEN');
      expect(ReadableColor('#0ead69').percent).to.equal(43);
      expect(ReadableColor('#0ead69').tone).to.equal('DARK');
    })
    ; 
    it('Should have gray scale', async () => {
      expect(ReadableColor('#bfbfbf').main).to.equal('WHITE');
      expect(ReadableColor('#bfbfbf').mixed).to.equal('BLACK');
      expect(ReadableColor('#bfbfbf').percent).to.equal(25);
      expect(ReadableColor('#bfbfbf').tone).to.equal('');

      expect(ReadableColor('#404040').main).to.equal('BLACK');
      expect(ReadableColor('#404040').mixed).to.equal('WHITE');
      expect(ReadableColor('#404040').percent).to.equal(25);
      expect(ReadableColor('#404040').tone).to.equal('');
    }); 
});

