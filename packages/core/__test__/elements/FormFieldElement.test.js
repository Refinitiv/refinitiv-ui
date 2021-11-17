import { elementUpdated, expect, fixture, html } from '@refinitiv-ui/test-helpers';
import { FormFieldElement } from '../../lib/elements/FormFieldElement';
import { customElement } from '../../lib/decorators/custom-element';

class FormFieldElementTest extends FormFieldElement {
  render () {
    return html`<input ${this.ariaDecorate()}>`;
  }
}
customElement('form-field-element-test', {
  theme: false
})(FormFieldElementTest);

describe('elements/FormFieldElement/DefaultsTest',  () => {
  it('Default properties', async () => {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});

describe('elements/FormFieldElement/RequiredTest', () => {
  it('aria-required is propagated', async () => {
    const formFieldEl = await fixture('<form-field-element-test aria-required="true"></form-field-element-test>');
    expect(formFieldEl).shadowDom.to.equalSnapshot();
    formFieldEl.removeAttribute('aria-required');
    await elementUpdated(formFieldEl);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});

describe('elements/FormFieldElement/ErrorTest', () => {
  it('error is propagated', async () => {
    const formFieldEl = await fixture('<form-field-element-test error></form-field-element-test>');
    expect(formFieldEl).shadowDom.to.equalSnapshot();
    formFieldEl.error = false;
    await elementUpdated(formFieldEl);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});

describe('elements/FormFieldElement/AriaLabelTest', () => {
  it('aria-label is propagated', async () => {
    const formFieldEl = await fixture('<form-field-element-test aria-label="Label"></form-field-element-test>');
    expect(formFieldEl).shadowDom.to.equalSnapshot();
    formFieldEl.removeAttribute('aria-label');
    await elementUpdated(formFieldEl);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
  it('aria-labelledby is propagated', async () => {
    const formFieldEl = await fixture(`
        <form-field-element-test aria-labelledby="label"></form-field-element-test>
        <label id="label">Labelled By</label>
      `);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
  it('for attribute is propagated', async () => {
    const formFieldEl = await fixture(`
        <form-field-element-test id="label"></form-field-element-test>
        <label for="label">Label For</label>
      `);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});

describe('elements/FormFieldElement/AriaDescriptionTest', () => {
  it('aria-description is propagated', async () => {
    const formFieldEl = await fixture('<form-field-element-test aria-description="Description"></form-field-element-test>');
    expect(formFieldEl).shadowDom.to.equalSnapshot();
    formFieldEl.removeAttribute('aria-description');
    await elementUpdated(formFieldEl);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
  it('aria-describedby is propagated', async () => {
    const formFieldEl = await fixture(`
        <form-field-element-test aria-describedby="description"></form-field-element-test>
        <span id="description">Described By</span>
      `);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
  it('aria-description is updated on error', async () => {
    const el = await fixture(`
        <div>
          <form-field-element-test aria-describedby="description"></form-field-element-test>
          <span id="description">Described By</span>
        </div>
      `);

    const formFieldEl = el.querySelector('form-field-element-test');
    const descEl = el.querySelector('span');

    formFieldEl.error = true;
    descEl.innerHTML = '!ERROR! Described By'
    await elementUpdated(formFieldEl);

    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});
