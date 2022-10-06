import { expect } from '@refinitiv-ui/test-helpers';
import { AccessibilityColor } from '@refinitiv-ui/utils/color.js';

const colorDesc = (color) => {
  return new AccessibilityColor(color).description;
}
const colorLocalized = (color) => {
  return new AccessibilityColor(color).toLocalized();
}
describe('Accessibility color', () => {
  
  describe('Color description', () => {
    it('Should defalut as Black color when color value is undefined', async () => {
      expect(colorDesc()).to.equal('Black');
    }); 
    it('Should have hues primary color', async () => {
      expect(colorDesc('#ff0001')).to.equal('Red');
      expect(colorDesc('#ffff01')).to.equal('Yellow');
      expect(colorDesc('#00ff01')).to.equal('Green');
      expect(colorDesc('#01ffff')).to.equal('Cyan');
      expect(colorDesc('#0100ff')).to.equal('Blue');
      expect(colorDesc('#ff01ff')).to.equal('Magenta');
    }); 
    it('Should have mixed color', async () => {
      expect(colorDesc('#ff1900')).to.equal('Red with 10% Yellow');
      expect(colorDesc('#ffe500')).to.equal('Yellow with 10% Red', 'sort main color when mixed percentage > 50');
    }); 
    it('Should have color tones', async () => {
      expect(colorDesc('#ff9999')).to.equal('[Very Light] Red');
      expect(colorDesc('#ff4d4d')).to.equal('[Light] Red');
      expect(colorDesc('#b30000')).to.equal('[Dark] Red');
      expect(colorDesc('#330000')).to.equal('[Very Dark] Red');
    }); 
    it('Should have color mixed and tones', async () => {
      expect(colorDesc('#2a9d8f')).to.equal('[Dark] Cyan with 12% Green');
      expect(colorDesc('#c5d86d')).to.equal('Yellow with 18% Green');
      expect(colorDesc('#e9c46a')).to.equal('[Light] Yellow with 28% Red');
      expect(colorDesc('#3bceac')).to.equal('Cyan with 23% Green');
      expect(colorDesc('#0ead69')).to.equal('[Dark] Cyan with 43% Green');
    }); 
    it('Should have color name when color value match with css color name', async () => {
      expect(colorDesc('#f0f8ff')).to.equal('Aliceblue');
      expect(colorDesc('#ff00ff')).to.equal('Fuchsia');
      expect(colorDesc('#5f9ea0')).to.equal('Cadetblue');
      expect(colorDesc('#ff1493')).to.equal('Deeppink');
    }); 
    it('Should have gray scale', async () => {
      expect(colorDesc('#bfbfbf')).to.equal('White with 25% Black');
      expect(colorDesc('#404040')).to.equal('Black with 25% White', 'sort main color when mixed percentage > 50');
    }); 
    it('Should have gray scale', async () => {
      expect(colorDesc('#bfbfbf')).to.equal('White with 25% Black');
      expect(colorDesc('#404040')).to.equal('Black with 25% White', 'sort main color when mixed percentage > 50');
    }); 
  });

  describe('Color localized', () => {
    it('Should defalut as Black color when color value is undefined', async () => {
      expect(colorLocalized().name).to.equal('black');
    }); 
    it('Should have hues primary color', async () => {
      expect(colorLocalized('#ff0001').colorName).to.equal('RED');
      expect(colorLocalized('#ffff01').colorName).to.equal('YELLOW');
      expect(colorLocalized('#00ff01').colorName).to.equal('GREEN');
      expect(colorLocalized('#01ffff').colorName).to.equal('CYAN');
      expect(colorLocalized('#0100ff').colorName).to.equal('BLUE');
      expect(colorLocalized('#ff01ff').colorName).to.equal('MAGENTA');
    }); 
    it('Should have mixed color', async () => {
      // Red with 10% Yellow
      expect(colorLocalized('#ff1900').colorName).to.equal('RED');
      expect(colorLocalized('#ff1900').colorMixName).to.equal('YELLOW');
      expect(colorLocalized('#ff1900').colorMixPercent).to.equal(10);
      
      // Yellow with 10% Red
      expect(colorLocalized('#ffe500').colorName).to.equal('YELLOW');
      expect(colorLocalized('#ffe500').colorMixName).to.equal('RED');
      expect(colorLocalized('#ffe500').colorMixPercent).to.equal(10);
    }); 
    it('Should have color tones', async () => {
      expect(colorLocalized('#ff9999').colorTone).to.equal('VERY_LIGHT');
      expect(colorLocalized('#ff4d4d').colorTone).to.equal('LIGHT');
      expect(colorLocalized('#b30000').colorTone).to.equal('DARK');
      expect(colorLocalized('#330000').colorTone).to.equal('VERY_DARK');
    }); 
    it('Should have color name when color value match with css color name', async () => {
      expect(colorLocalized('#f0f8ff').name).to.equal('aliceblue');
      expect(colorLocalized('#ff00ff').name).to.equal('fuchsia');
      expect(colorLocalized('#5f9ea0').name).to.equal('cadetblue');
      expect(colorLocalized('#ff1493').name).to.equal('deeppink');
    }); 
  });
});

