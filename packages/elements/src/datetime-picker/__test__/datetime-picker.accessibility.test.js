// import element and theme
import '@refinitiv-ui/elements/datetime-picker';

import '@refinitiv-ui/elemental-theme/light/ef-datetime-picker';
import { expect, fixture } from '@refinitiv-ui/test-helpers';

describe('Accessibility', function () {
  describe('Default', function () {
    it('Should be accessible with `aria-label`', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" aria-label="Datetime picker"></ef-datetime-picker>'
      );
      await expect(el).to.be.accessible();
    });
    it('Should propagate `aria-label` attribute to input correctly', async function () {
      const label = 'Datetime picker';
      const el = await fixture(
        `<ef-datetime-picker lang="en-gb" aria-label="${label}"></ef-datetime-picker>`
      );
      await expect(el.inputEl.getAttribute('aria-label')).to.equal(label);
      await expect(el.inputAriaLabel).to.equal(label);
    });
    it('Should be accessible with `aria-labelledby`', async function () {
      await fixture('<label id="label">Label</label>');
      await fixture('<label id="sub-label">Sub Label</label>');
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" aria-labelledby="label sub-label"></ef-datetime-picker>'
      );
      await expect(el).to.be.accessible();
    });
    it('Should propagate `aria-describedby` attribute to input correctly', async function () {
      const label = 'Label';
      const subLabel = 'Sub Label';
      await fixture(`<label id="label">${label}</label>`);
      await fixture(`<label id="sub-label">${subLabel}</label>`);
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" aria-labelledby="label sub-label"></ef-datetime-picker>'
      );
      const joinedLabel = [label, subLabel].join(' ');
      await expect(el.inputEl.getAttribute('aria-label')).to.equal(joinedLabel);
      await expect(el.inputAriaLabel).to.equal(joinedLabel);
    });
    it('Should be accessible with `for` attribute on label', async function () {
      await fixture('<label for="datetime-picker">Datetime picker</label>');
      const el = await fixture('<ef-datetime-picker lang="en-gb" id="datetime-picker"></ef-datetime-picker>');
      await expect(el).to.be.accessible();
    });
    it('Should propagate `for` attribute to `aria-label` attribute of input correctly', async function () {
      const label = 'Datetime picker';
      await fixture(`<label for="datetime-picker">${label}</label>`);
      const el = await fixture('<ef-datetime-picker lang="en-gb" id="datetime-picker"></ef-datetime-picker>');
      await expect(el.inputEl.getAttribute('aria-label')).to.equal(label);
      await expect(el.inputAriaLabel).to.equal(label);
    });
  });
  describe('Range', function () {
    it('Should be accessible with `aria-label`', async function () {
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" range aria-label="Datetime picker"></ef-datetime-picker>'
      );
      await expect(el).to.be.accessible();
    });
    it('Should propagate `aria-label` attribute to input correctly', async function () {
      const label = 'Datetime picker';
      const el = await fixture(
        `<ef-datetime-picker lang="en-gb" range aria-label="${label}"></ef-datetime-picker>`
      );
      await expect(el.inputFromEl.getAttribute('aria-label')).to.equal(`${label} From`);
      await expect(el.inputToEl.getAttribute('aria-label')).to.equal(`${label} To`);
    });
    it('Should be accessible with `aria-labelledby`', async function () {
      await fixture('<label id="label">Label</label>');
      await fixture('<label id="sub-label">Sub Label</label>');
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" range aria-labelledby="label sub-label"></ef-datetime-picker>'
      );
      await expect(el).to.be.accessible();
    });
    it('Should propagate `aria-describedby` attribute to input correctly', async function () {
      const label = 'Label';
      const subLabel = 'Sub Label';
      await fixture(`<label id="label">${label}</label>`);
      await fixture(`<label id="sub-label">${subLabel}</label>`);
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" range aria-labelledby="label sub-label"></ef-datetime-picker>'
      );
      const joinedLabel = [label, subLabel].join(' ');
      await expect(el.inputFromEl.getAttribute('aria-label')).to.equal(`${joinedLabel} From`);
      await expect(el.inputToEl.getAttribute('aria-label')).to.equal(`${joinedLabel} To`);
    });
    it('Should be accessible with `for` attribute on label', async function () {
      await fixture('<label for="Datetime picker">Datetime picker</label>');
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" range id="Datetime picker"></ef-datetime-picker>'
      );
      await expect(el).to.be.accessible();
    });
    it('Should propagate `for` attribute to `aria-label` attribute of input correctly', async function () {
      const label = 'Datetime picker';
      await fixture(`<label for="datetime-picker">${label}</label>`);
      const el = await fixture(
        '<ef-datetime-picker lang="en-gb" range id="datetime-picker"></ef-datetime-picker>'
      );
      await expect(el.inputFromEl.getAttribute('aria-label')).to.equal(`${label} From`);
      await expect(el.inputToEl.getAttribute('aria-label')).to.equal(`${label} To`);
    });
  });
});
