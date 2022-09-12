// some description link to web-test-runner
import { fixture, expect } from '@refinitiv-ui/test-helpers';

// import element and theme
import '../src/efx-element.ts';
import '../themes/halo-theme/dark';

describe('EfxElementTest', () => {
  it('Label and DOM structure is correct', async () => {
    const el = await fixture('<efx-element></efx-element>');
    await expect(el).shadowDom.to.equalSnapshot({ ignoreAttributes: ['class', 'style'] });
    expect(el.count).to.equal(0);
    const button = el.shadowRoot.querySelector('[part=button]');
    button.click();
    expect(el.count).to.equal(1);
  });
});
