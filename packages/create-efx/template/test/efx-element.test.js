// The test runner can be configured with a configuration file (web-test-runner.config.js).
// https://modern-web.dev/docs/test-runner/overview/
import { fixture, expect } from '@refinitiv-ui/test-helpers';

// import element and theme
import '../src/efx-element.ts';
import '../themes/halo/dark';

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
