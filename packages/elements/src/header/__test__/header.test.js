import { fixture, expect, elementUpdated } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/header';
import '@refinitiv-ui/elemental-theme/light/ef-header.js';

describe('header/Header', () => {
  it('Should renders DOM structure correctly', async () => {
    const el = await fixture('<ef-header></ef-header>');

    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Should renders text content correctly', async () => {
    const el = await fixture('<ef-header></ef-header>');

    el.textContent = 'Header';
    expect(el.textContent.trim()).to.equal('Header');
  });

  it('Should have default level equal 2', async () => {
    const el = await fixture('<ef-header></ef-header>');

    expect(el.level).to.equal('2');
    expect(el.getAttribute('level')).to.equal('2');
  });

  it('Should have the correct level when changing a property', async () => {
    const el = await fixture('<ef-header level="4"></ef-header>');
    expect(el.level).to.equal('4');
    expect(el.getAttribute('level')).to.equal('4');

    el.level = '3';
    await elementUpdated(el);
    expect(el.level).to.equal('3');
    expect(el.getAttribute('level')).to.equal('3');
  });

});

