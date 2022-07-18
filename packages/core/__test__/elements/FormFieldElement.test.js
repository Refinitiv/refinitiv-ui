import { elementUpdated, expect, fixture, triggerFocusFor } from '@refinitiv-ui/test-helpers';
import { FormFieldElement } from '../../lib/elements/FormFieldElement';
import { customElement } from '../../lib/decorators/custom-element';

class FormFieldElementTest extends FormFieldElement {
  inputEventCounter = 0;
  changeEventCounter = 0;

  firstUpdated (changedProperties) {
    super.firstUpdated(changedProperties);
    this.inputValue = 'some text to test';
  }

  onInputInput (event) {
    this.inputEventCounter += 1;
  }

  onInputChange (event) {
    this.changeEventCounter += 1;
  }

  get inputElement () {
    return super.inputElement;
  }

  set inputValue (inputValue) {
    super.inputValue = inputValue;
  }

  get inputValue () {
    return super.inputValue;
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

describe('elements/FormFieldElement/PlaceholderTest', () => {
  it('placeholder is propagated', async () => {
    const formFieldEl = await fixture('<form-field-element-test placeholder="Placeholder"></form-field-element-test>');
    expect(formFieldEl).shadowDom.to.equalSnapshot();
    formFieldEl.placeholder = null;
    await elementUpdated(formFieldEl);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});

describe('elements/FormFieldElement/ReadonlyTest', () => {
  it('readonly is propagated', async () => {
    const formFieldEl = await fixture('<form-field-element-test readonly></form-field-element-test>');
    expect(formFieldEl).shadowDom.to.equalSnapshot();
    formFieldEl.readonly = false;
    await elementUpdated(formFieldEl);
    expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});

describe('elements/FormFieldElement/DisabledTest', () => {
  it('disabled is propagated', async () => {
    const formFieldEl = await fixture('<form-field-element-test disabled></form-field-element-test>');
    expect(formFieldEl).shadowDom.to.equalSnapshot();
    formFieldEl.disabled = false;
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

describe('elements/FormFieldElement/EventsTest', () => {
  it('input event callback should be run', async () => {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    formFieldEl.inputElement.dispatchEvent(new CustomEvent('input'));
    expect(formFieldEl.inputEventCounter).to.equal(1);
  });
  it('change event callback should be run', async () => {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    formFieldEl.inputElement.dispatchEvent(new CustomEvent('change'));
    expect(formFieldEl.changeEventCounter).to.equal(1);
  });
});

describe('elements/FormFieldElement/SelectionTest', () => {
  it('Applies `selectionStart`', async () => {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    const inputElement = formFieldEl.inputElement;
    await triggerFocusFor(inputElement);
    const selectionStart = 5;
    formFieldEl.selectionStart = selectionStart;
    expect(formFieldEl.selectionStart).to.equal(selectionStart);
    await elementUpdated(formFieldEl);
    expect(inputElement.selectionStart).to.equal(selectionStart);
  });
  it('Applies `selectionEnd`', async () => {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    const inputElement = formFieldEl.inputElement;
    await triggerFocusFor(inputElement);
    const selectionEnd = 5;
    formFieldEl.selectionEnd = selectionEnd;
    expect(formFieldEl.selectionEnd).to.equal(selectionEnd);
    await elementUpdated(formFieldEl);
    expect(inputElement.selectionEnd).to.equal(selectionEnd);
  });

  it('Applies `selectionDirection`', async () => {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    const inputElement = formFieldEl.inputElement;
    /**
     * Can't test this effectively on Safari and Firefox. The implementation in browsers are vary
     * e.g. Safari it doesn't allow you to blindly set this value to anything.
     * so the value need to be `forward` to make the test pass in Safari
     */
    const selectionDirection = 'forward';
    formFieldEl.selectionDirection = selectionDirection;
    expect(formFieldEl.selectionDirection).to.equal(selectionDirection);
    await elementUpdated(formFieldEl);
    expect(inputElement.selectionDirection).to.equal(selectionDirection);
  });

  it('Can use `select` method', async () => {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    await triggerFocusFor(formFieldEl);
    formFieldEl.select();
    await elementUpdated(formFieldEl);
    expect(formFieldEl.selectionStart).to.equal(0);
    expect(formFieldEl.selectionEnd).to.equal(formFieldEl.inputValue.length);
  });

  it('Can use `setSelectionRange` method', async () => {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    await triggerFocusFor(formFieldEl);
    formFieldEl.setSelectionRange(1, 2);
    await elementUpdated(formFieldEl);
    expect(formFieldEl.selectionStart).to.equal(1, 'selectionStart');
    expect(formFieldEl.selectionEnd).to.equal(2, 'selectionEnd');

    const valueLength = formFieldEl.inputValue.length;
    formFieldEl.setSelectionRange(1, 2, 'backward');
    await elementUpdated(formFieldEl);
    expect(formFieldEl.selectionDirection).to.equal('backward');
  });
});
