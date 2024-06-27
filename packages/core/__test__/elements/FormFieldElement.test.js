import { elementUpdated, expect, fixture, oneEvent, triggerFocusFor } from '@refinitiv-ui/test-helpers';

import { customElement } from '../../lib/decorators/custom-element.js';
import { FormFieldElement } from '../../lib/elements/FormFieldElement.js';

class FormFieldElementTest extends FormFieldElement {
  inputEventCounter = 0;
  changeEventCounter = 0;

  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.inputValue = 'some text to test';
  }

  onInputInput(event) {
    this.inputEventCounter += 1;
  }

  onInputChange(event) {
    this.changeEventCounter += 1;
  }

  get inputElement() {
    return super.inputElement;
  }

  set inputValue(inputValue) {
    super.inputValue = inputValue;
  }

  get inputValue() {
    return super.inputValue;
  }
}
customElement('form-field-element-test', {
  theme: false
})(FormFieldElementTest);

describe('elements/FormFieldElement/DefaultsTest', function () {
  it('Default properties', async function () {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    await expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
  it('should include clears button when value is filled', async function () {
    const formFieldEl = await fixture(
      '<form-field-element-test value="test" clears></form-field-element-test>'
    );
    expect(formFieldEl.hasClear).to.equal(true);
  });
});

describe('elements/FormFieldElement/RequiredTest', function () {
  describe('aria-required is propagated', function () {
    it('attribute `aria-required` must be rendered correctly', async function () {
      const formFieldEl = await fixture(
        '<form-field-element-test aria-required="true"></form-field-element-test>'
      );
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
    it('attribute `aria-required` must be removed', async function () {
      const formFieldEl = await fixture(
        '<form-field-element-test aria-required="true"></form-field-element-test>'
      );
      formFieldEl.removeAttribute('aria-required');
      await elementUpdated(formFieldEl);
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
  });
});

describe('elements/FormFieldElement/ErrorTest', function () {
  describe('error is propagated', function () {
    it('attribute `aria-invalid` must be rendered correctly', async function () {
      const formFieldEl = await fixture('<form-field-element-test error></form-field-element-test>');
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
    it('attribute `aria-invalid` must be removed', async function () {
      const formFieldEl = await fixture('<form-field-element-test error></form-field-element-test>');
      formFieldEl.error = false;
      await elementUpdated(formFieldEl);
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
  });
});

describe('elements/FormFieldElement/PlaceholderTest', function () {
  describe('placeholder is propagated', function () {
    it('attribute `placeholder` must be rendered correctly', async function () {
      const formFieldEl = await fixture(
        '<form-field-element-test placeholder="Placeholder"></form-field-element-test>'
      );
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
    it('attribute `placeholder` must be removed', async function () {
      const formFieldEl = await fixture(
        '<form-field-element-test placeholder="Placeholder"></form-field-element-test>'
      );
      formFieldEl.placeholder = null;
      await elementUpdated(formFieldEl);
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
  });
});

describe('elements/FormFieldElement/ReadonlyTest', function () {
  describe('readonly is propagated', function () {
    it('attribute `readonly` must be rendered correctly', async function () {
      const formFieldEl = await fixture('<form-field-element-test readonly></form-field-element-test>');
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
    it('attribute `readonly` must be removed', async function () {
      const formFieldEl = await fixture('<form-field-element-test readonly></form-field-element-test>');
      formFieldEl.readonly = false;
      await elementUpdated(formFieldEl);
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
  });
  it('should not include clears button', async function () {
    const formFieldEl = await fixture(
      '<form-field-element-test value="test" readonly clears></form-field-element-test>'
    );
    expect(formFieldEl.hasClear).to.equal(false);
  });
});

describe('elements/FormFieldElement/DisabledTest', function () {
  describe('disabled is propagated', function () {
    it('attribute `disabled` must be rendered correctly', async function () {
      const formFieldEl = await fixture('<form-field-element-test disabled></form-field-element-test>');
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
    it('attribute `disabled` must be removed', async function () {
      const formFieldEl = await fixture('<form-field-element-test disabled></form-field-element-test>');
      formFieldEl.disabled = false;
      await elementUpdated(formFieldEl);
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
  });
  it('should not include clears button', async function () {
    const formFieldEl = await fixture(
      '<form-field-element-test value="test" disabled clears></form-field-element-test>'
    );
    expect(formFieldEl.hasClear).to.equal(false);
  });
});

describe('elements/FormFieldElement/AriaLabelTest', function () {
  describe('aria-label is propagated', function () {
    it('attribute `aria-label` must be rendered correctly', async function () {
      const formFieldEl = await fixture(
        '<form-field-element-test aria-label="Label"></form-field-element-test>'
      );
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
    it('attribute `aria-label` must be removed', async function () {
      const formFieldEl = await fixture(
        '<form-field-element-test aria-label="Label"></form-field-element-test>'
      );
      formFieldEl.removeAttribute('aria-label');
      await elementUpdated(formFieldEl);
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
  });
  it('aria-labelledby is propagated', async function () {
    const formFieldEl = await fixture(`
        <form-field-element-test aria-labelledby="label"></form-field-element-test>
        <label id="label">Labelled By</label>
      `);
    await expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
  it('for attribute is propagated', async function () {
    const formFieldEl = await fixture(`
        <form-field-element-test id="label"></form-field-element-test>
        <label for="label">Label For</label>
      `);
    await expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});

describe('elements/FormFieldElement/AriaDescriptionTest', function () {
  describe('aria-description is propagated', function () {
    it('attribute `aria-description` must be rendered correctly', async function () {
      const formFieldEl = await fixture(
        '<form-field-element-test aria-description="Description"></form-field-element-test>'
      );
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
    it('attribute `aria-description` must be removed', async function () {
      const formFieldEl = await fixture(
        '<form-field-element-test aria-description="Description"></form-field-element-test>'
      );
      formFieldEl.removeAttribute('aria-description');
      await elementUpdated(formFieldEl);
      await expect(formFieldEl).shadowDom.to.equalSnapshot();
    });
  });
  it('aria-describedby is propagated', async function () {
    const formFieldEl = await fixture(`
        <form-field-element-test aria-describedby="description"></form-field-element-test>
        <span id="description">Described By</span>
      `);
    await expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
  it('aria-description is updated on error', async function () {
    const el = await fixture(`
        <div>
          <form-field-element-test aria-describedby="description"></form-field-element-test>
          <span id="description">Described By</span>
        </div>
      `);

    const formFieldEl = el.querySelector('form-field-element-test');
    const descEl = el.querySelector('span');

    formFieldEl.error = true;
    descEl.innerHTML = '!ERROR! Described By';
    await elementUpdated(formFieldEl);

    await expect(formFieldEl).shadowDom.to.equalSnapshot();
  });
});

describe('elements/FormFieldElement/EventsTest', function () {
  it('input event callback should be run', async function () {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    formFieldEl.inputElement.dispatchEvent(new CustomEvent('input'));
    expect(formFieldEl.inputEventCounter).to.equal(1);
  });
  it('change event callback should be run', async function () {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    formFieldEl.inputElement.dispatchEvent(new CustomEvent('change'));
    expect(formFieldEl.changeEventCounter).to.equal(1);
  });
  it('should fired error-changed event when calling reportValidity with no constraints while in an error state', async function () {
    const formFieldEl = await fixture('<form-field-element-test error></form-field-element-test>');
    setTimeout(() => formFieldEl.reportValidity());
    const e = await oneEvent(formFieldEl, 'error-changed');
    await elementUpdated(formFieldEl);
    expect(e.detail.value).to.equal(false);
  });
});

describe('elements/FormFieldElement/SelectionTest', function () {
  it('Applies `selectionStart`', async function () {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    const inputElement = formFieldEl.inputElement;
    await triggerFocusFor(inputElement);
    const selectionStart = 5;
    formFieldEl.selectionStart = selectionStart;
    expect(formFieldEl.selectionStart).to.equal(selectionStart);
    await elementUpdated(formFieldEl);
    expect(inputElement.selectionStart).to.equal(selectionStart);
  });
  it('Applies `selectionEnd`', async function () {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    const inputElement = formFieldEl.inputElement;
    await triggerFocusFor(inputElement);
    const selectionEnd = 5;
    formFieldEl.selectionEnd = selectionEnd;
    expect(formFieldEl.selectionEnd).to.equal(selectionEnd);
    await elementUpdated(formFieldEl);
    expect(inputElement.selectionEnd).to.equal(selectionEnd);
  });

  it('Applies `selectionDirection`', async function () {
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

  it('Can use `select` method', async function () {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    await triggerFocusFor(formFieldEl);
    formFieldEl.select();
    await elementUpdated(formFieldEl);
    expect(formFieldEl.selectionStart).to.equal(0);
    expect(formFieldEl.selectionEnd).to.equal(formFieldEl.inputValue.length);
  });

  it('Can use `setSelectionRange` method', async function () {
    const formFieldEl = await fixture('<form-field-element-test></form-field-element-test>');
    await triggerFocusFor(formFieldEl);
    formFieldEl.setSelectionRange(1, 2);
    await elementUpdated(formFieldEl);
    expect(formFieldEl.selectionStart).to.equal(1, 'selectionStart');
    expect(formFieldEl.selectionEnd).to.equal(2, 'selectionEnd');

    formFieldEl.setSelectionRange(1, 2, 'backward');
    await elementUpdated(formFieldEl);
    expect(formFieldEl.selectionDirection).to.equal('backward');
  });
});
