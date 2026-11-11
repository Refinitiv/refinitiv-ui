import { expect, nextFrame } from '@refinitiv-ui/test-helpers';

import { BasicElement, registerElfScope, requireElfScope } from '../lib/index.js';

class ScopeTestControl extends BasicElement {}
customElements.define('elf-scope-test-control', ScopeTestControl);

describe('ELF app scope', function () {
  let host;
  let root;
  let scope;

  beforeEach(function () {
    host = document.createElement('div');
    root = host.attachShadow({ mode: 'open' });
    document.body.append(host);
    scope = registerElfScope(root);
  });

  afterEach(function () {
    root.replaceChildren();
    scope.dispose();
    host.remove();
  });

  it('resolves ownership through nested shadow roots', function () {
    const nestedHost = document.createElement('div');
    root.append(nestedHost);
    const nestedRoot = nestedHost.attachShadow({ mode: 'open' });
    const control = document.createElement('button');
    nestedRoot.append(control);
    expect(requireElfScope(control)).to.equal(scope);
  });

  it('rejects another scope even when the first host is hidden', function () {
    host.hidden = true;
    expect(() => registerElfScope(root)).to.throw('only one registered app scope');
  });

  it('rejects controls outside the app instead of using the page', function () {
    expect(() => requireElfScope(document.body)).to.throw('no registered app scope');
  });

  it('synthesizes taps only inside the app', function () {
    const button = document.createElement('button');
    root.append(button);
    let appTaps = 0;
    let outsideTaps = 0;
    button.addEventListener('tap', () => appTaps++);
    const outsideButton = document.createElement('button');
    outsideButton.addEventListener('tap', () => outsideTaps++);
    document.body.append(outsideButton);
    button.click();
    outsideButton.click();
    outsideButton.remove();
    expect([appTaps, outsideTaps]).to.deep.equal([1, 0]);
  });

  it('stops handling input after idempotent disposal', function () {
    const button = document.createElement('button');
    root.append(button);
    let taps = 0;
    button.addEventListener('tap', () => taps++);
    scope.dispose();
    scope.dispose();
    button.click();
    expect(taps).to.equal(0);
  });

  it('registers a fresh scope after disposal', function () {
    scope.dispose();
    scope = registerElfScope(root);
    expect(requireElfScope(root)).to.equal(scope);
  });

  it('refuses disposal while an ELF control is connected', function () {
    root.append(document.createElement('elf-scope-test-control'));
    expect(() => scope.dispose()).to.throw('Disconnect ELF controls');
  });

  it('retains the saved scope during control disconnection', function () {
    const control = document.createElement('elf-scope-test-control');
    root.append(control);
    control.remove();
    expect(requireElfScope(control)).to.equal(scope);
  });

  it('rejects saved ownership after scope disposal', function () {
    const control = document.createElement('elf-scope-test-control');
    root.append(control);
    control.remove();
    scope.dispose();
    expect(() => requireElfScope(control)).to.throw('no registered app scope');
  });

  it('rejects a root with a disconnected host', function () {
    const disconnectedRoot = document.createElement('div').attachShadow({ mode: 'open' });
    expect(() => registerElfScope(disconnectedRoot)).to.throw('connected app host');
  });

  it('completes an app press outside without synthesizing or cancelling outside input', function () {
    const button = document.createElement('button');
    root.append(button);
    let appReleases = 0;
    let outsideReleases = 0;
    button.addEventListener('tapend', (event) => {
      appReleases++;
      event.preventDefault();
    });
    const outsideButton = document.createElement('button');
    outsideButton.addEventListener('tapend', () => outsideReleases++);
    document.body.append(outsideButton);
    button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }));
    const release = new MouseEvent('mouseup', { bubbles: true, composed: true, cancelable: true });
    outsideButton.dispatchEvent(release);
    outsideButton.remove();
    expect([appReleases, outsideReleases, release.defaultPrevented]).to.deep.equal([1, 0, false]);
  });

  it('does not synthesize a tap on the outside host when press and release have no app element in common', function () {
    const pressedButton = document.createElement('button');
    const releasedButton = document.createElement('button');
    root.append(pressedButton, releasedButton);
    let hostTaps = 0;
    host.addEventListener('tap', () => hostTaps++);
    pressedButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }));
    releasedButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, composed: true }));
    expect(hostTaps).to.equal(0);
  });

  it('clears focused state when the last control disconnects', async function () {
    const control = document.createElement('elf-scope-test-control');
    control.tabIndex = 0;
    root.append(control);
    control.focus();
    await nextFrame();
    expect(control.focused).to.equal(true);
    control.remove();
    await nextFrame();
    expect(control.focused).to.equal(false);
  });

  it('still synthesizes a tap on a shared ancestor inside the app', function () {
    const container = document.createElement('div');
    const pressedButton = document.createElement('button');
    const releasedButton = document.createElement('button');
    container.append(pressedButton, releasedButton);
    root.append(container);
    let tapTarget;
    container.addEventListener('tap', (event) => {
      tapTarget = event.target;
    });
    pressedButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, composed: true }));
    releasedButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, composed: true }));
    expect(tapTarget).to.equal(container);
  });
});
