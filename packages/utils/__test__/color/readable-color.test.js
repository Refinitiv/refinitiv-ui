import { expect } from '@refinitiv-ui/test-helpers';
import { readableColor } from '@refinitiv-ui/utils/color.js';

describe('Readable color', () => {
  
    it('Should defalut as Black color when color value is undefined', async () => {
      expect(readableColor().name).to.equal('black');
    }); 
    it('Should have hues primary color', async () => {
      expect(readableColor('#ff0001').main).to.equal('RED');
      expect(readableColor('#ffff01').main).to.equal('YELLOW');
      expect(readableColor('#00ff01').main).to.equal('GREEN');
      expect(readableColor('#01ffff').main).to.equal('CYAN');
      expect(readableColor('#0100ff').main).to.equal('BLUE');
      expect(readableColor('#ff01ff').main).to.equal('MAGENTA');
    }); 
    it('Should have mixed color', async () => {
      expect(readableColor('#ff1900').main).to.equal('RED');
      expect(readableColor('#ff1900').mixed).to.equal('YELLOW');
      expect(readableColor('#ff1900').percent).to.equal(10);
      
      expect(readableColor('#ffe500').main).to.equal('YELLOW');
      expect(readableColor('#ffe500').mixed).to.equal('RED');
      expect(readableColor('#ffe500').percent).to.equal(10);
    }); 
    it('Should have color tones', async () => {
      expect(readableColor('#ff9999').tone).to.equal('VERY_LIGHT');
      expect(readableColor('#ff4d4d').tone).to.equal('LIGHT');
      expect(readableColor('#b30000').tone).to.equal('DARK');
      expect(readableColor('#330000').tone).to.equal('VERY_DARK');
    }); 
    it('Should have color name when color value match with css color name', async () => {
      expect(readableColor('#f0f8ff').name).to.equal('aliceblue');
      expect(readableColor('#ff00ff').name).to.equal('fuchsia');
      expect(readableColor('#5f9ea0').name).to.equal('cadetblue');
      expect(readableColor('#ff1493').name).to.equal('deeppink');
    }); 
    it('Should have color mixed and tones', async () => {
      expect(readableColor('#2a9d8f').main).to.equal('CYAN');
      expect(readableColor('#2a9d8f').mixed).to.equal('GREEN');
      expect(readableColor('#2a9d8f').percent).to.equal(12);
      expect(readableColor('#2a9d8f').tone).to.equal('DARK');
      
      expect(readableColor('#c5d86d').main).to.equal('YELLOW');
      expect(readableColor('#c5d86d').mixed).to.equal('GREEN');
      expect(readableColor('#c5d86d').percent).to.equal(18);
      expect(readableColor('#c5d86d').tone).to.equal('');
      
      expect(readableColor('#e9c46a').main).to.equal('YELLOW');
      expect(readableColor('#e9c46a').mixed).to.equal('RED');
      expect(readableColor('#e9c46a').percent).to.equal(28);
      expect(readableColor('#e9c46a').tone).to.equal('LIGHT');
      
      expect(readableColor('#3bceac').main).to.equal('CYAN');
      expect(readableColor('#3bceac').mixed).to.equal('GREEN');
      expect(readableColor('#3bceac').percent).to.equal(23);
      expect(readableColor('#3bceac').tone).to.equal('');
      
      expect(readableColor('#0ead69').main).to.equal('CYAN');
      expect(readableColor('#0ead69').mixed).to.equal('GREEN');
      expect(readableColor('#0ead69').percent).to.equal(43);
      expect(readableColor('#0ead69').tone).to.equal('DARK');
    })
    ; 
    it('Should have gray scale', async () => {
      expect(readableColor('#bfbfbf').main).to.equal('WHITE');
      expect(readableColor('#bfbfbf').mixed).to.equal('BLACK');
      expect(readableColor('#bfbfbf').percent).to.equal(25);
      expect(readableColor('#bfbfbf').tone).to.equal('');

      expect(readableColor('#404040').main).to.equal('BLACK');
      expect(readableColor('#404040').mixed).to.equal('WHITE');
      expect(readableColor('#404040').percent).to.equal(25);
      expect(readableColor('#404040').tone).to.equal('');
    }); 
});

