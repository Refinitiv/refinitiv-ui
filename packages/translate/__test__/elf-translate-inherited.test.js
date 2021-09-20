import { fixture, expect } from '@refinitiv-ui/test-helpers';
import '../lib/test/test-inherited';

describe('Elf Translate Inherited Test', () => {
  it('Check that super class directives work as expected', async function () {
    const el = await fixture('<test-inherited lang="en-GB" with-nested></test-inherited>');
    expect(el.inheritEl.innerText).to.equal('en: inherited');
    expect(el.defaultEl.innerText).to.equal('This is en locale');
    expect(el.nestedEl.attribute).to.equal('Attribute: I am nested attribute');
    expect(el.nestedEl.property).to.equal('Property: I am nested property');
  });
});
