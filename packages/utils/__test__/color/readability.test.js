import { expect } from '@refinitiv-ui/test-helpers';
import { ReadabilityColor } from '@refinitiv-ui/utils/color.js';

const colorString = (color) => {
  return new ReadabilityColor(color).toString();
}
const colorLocalized = (color) => {
  return new ReadabilityColor(color).toLocalized();
}
describe('Accessibility color', () => {
  
  describe('Color description', () => {
    it('Should defalut as Black color when color value is undefined', async () => {
      expect(colorString()).to.equal('Black');
    }); 
    it('Should have hues primary color', async () => {
      expect(colorString('#ff0001')).to.equal('Red');
      expect(colorString('#ffff01')).to.equal('Yellow');
      expect(colorString('#00ff01')).to.equal('Green');
      expect(colorString('#01ffff')).to.equal('Cyan');
      expect(colorString('#0100ff')).to.equal('Blue');
      expect(colorString('#ff01ff')).to.equal('Magenta');
    }); 
    it('Should have mixed color', async () => {
      expect(colorString('#ff1900')).to.equal('Red with 10% Yellow');
      expect(colorString('#ffe500')).to.equal('Yellow with 10% Red', 'sort main color when mixed percentage > 50');
    }); 
    it('Should have color tones', async () => {
      expect(colorString('#ff9999')).to.equal('[Very Light] Red');
      expect(colorString('#ff4d4d')).to.equal('[Light] Red');
      expect(colorString('#b30000')).to.equal('[Dark] Red');
      expect(colorString('#330000')).to.equal('[Very Dark] Red');
    }); 
    it('Should have color mixed and tones', async () => {
      expect(colorString('#2a9d8f')).to.equal('[Dark] Cyan with 12% Green');
      expect(colorString('#c5d86d')).to.equal('Yellow with 18% Green');
      expect(colorString('#e9c46a')).to.equal('[Light] Yellow with 28% Red');
      expect(colorString('#3bceac')).to.equal('Cyan with 23% Green');
      expect(colorString('#0ead69')).to.equal('[Dark] Cyan with 43% Green');
    }); 
    it('Should have color name when color value match with css color name', async () => {
      expect(colorString('#f0f8ff')).to.equal('Aliceblue');
      expect(colorString('#ff00ff')).to.equal('Fuchsia');
      expect(colorString('#5f9ea0')).to.equal('Cadetblue');
      expect(colorString('#ff1493')).to.equal('Deeppink');
    }); 
    it('Should have gray scale', async () => {
      expect(colorString('#bfbfbf')).to.equal('White with 25% Black');
      expect(colorString('#404040')).to.equal('Black with 25% White', 'sort main color when mixed percentage > 50');
    }); 
    it('Should have gray scale', async () => {
      expect(colorString('#bfbfbf')).to.equal('White with 25% Black');
      expect(colorString('#404040')).to.equal('Black with 25% White', 'sort main color when mixed percentage > 50');
    }); 
  });

  describe('Color localized', () => {
    it('Should defalut as Black color when color value is undefined', async () => {
      expect(colorLocalized().name).to.equal('black');
    }); 
    it('Should have hues primary color', async () => {
      expect(colorLocalized('#ff0001').main).to.equal('RED');
      expect(colorLocalized('#ffff01').main).to.equal('YELLOW');
      expect(colorLocalized('#00ff01').main).to.equal('GREEN');
      expect(colorLocalized('#01ffff').main).to.equal('CYAN');
      expect(colorLocalized('#0100ff').main).to.equal('BLUE');
      expect(colorLocalized('#ff01ff').main).to.equal('MAGENTA');
    }); 
    it('Should have mixed color', async () => {
      // Red with 10% Yellow
      expect(colorLocalized('#ff1900').main).to.equal('RED');
      expect(colorLocalized('#ff1900').mixed).to.equal('YELLOW');
      expect(colorLocalized('#ff1900').percent).to.equal(10);
      
      // Yellow with 10% Red
      expect(colorLocalized('#ffe500').main).to.equal('YELLOW');
      expect(colorLocalized('#ffe500').mixed).to.equal('RED');
      expect(colorLocalized('#ffe500').percent).to.equal(10);
    }); 
    it('Should have color tones', async () => {
      expect(colorLocalized('#ff9999').tone).to.equal('VERY_LIGHT');
      expect(colorLocalized('#ff4d4d').tone).to.equal('LIGHT');
      expect(colorLocalized('#b30000').tone).to.equal('DARK');
      expect(colorLocalized('#330000').tone).to.equal('VERY_DARK');
    }); 
    it('Should have color name when color value match with css color name', async () => {
      expect(colorLocalized('#f0f8ff').name).to.equal('aliceblue');
      expect(colorLocalized('#ff00ff').name).to.equal('fuchsia');
      expect(colorLocalized('#5f9ea0').name).to.equal('cadetblue');
      expect(colorLocalized('#ff1493').name).to.equal('deeppink');
    }); 
  });
});

