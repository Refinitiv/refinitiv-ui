import { useFakeTimers } from 'sinon';

import { setupElf } from '@refinitiv-ui/elements/compat';
import { info } from '@refinitiv-ui/elements/notification';
import '@refinitiv-ui/elements/notification/themes/halo/dark';
import '@refinitiv-ui/elements/tooltip/themes/halo/dark';

import { expect, nextFrame } from '@refinitiv-ui/test-helpers';

describe('ELF local services', function () {
  let host;
  let root;
  let scope;

  beforeEach(function () {
    host = document.createElement('div');
    root = host.attachShadow({ mode: 'open' });
    document.body.append(host);
    scope = setupElf(root);
  });

  afterEach(function () {
    scope.dispose();
    host.remove();
  });

  it('creates a default tooltip inside the app instead of the page body', async function () {
    await nextFrame();
    expect([
      root.querySelectorAll('ef-tooltip').length,
      document.body.querySelectorAll('ef-tooltip').length
    ]).to.deep.equal([1, 0]);
  });

  it('preserves native title accessors and attribute values', function () {
    const element = document.createElement('button');
    element.title = 'Native title';
    expect([element.title, element.getAttribute('title'), element.hasAttribute('tooltip')]).to.deep.equal([
      'Native title',
      'Native title',
      false
    ]);
  });

  it('removes its service and accepts a fresh setup', async function () {
    await nextFrame();
    scope.dispose();
    expect(root.querySelector('ef-tooltip')).to.equal(null);
    scope = setupElf(root);
  });

  it('does not remove later scope notifications when an old handle is disposed twice', async function () {
    await nextFrame();
    const previousScope = scope;
    previousScope.dispose();
    scope = setupElf(root);
    info('New app notification');
    await nextFrame();
    previousScope.dispose();
    expect(root.querySelector('ef-notification')?.message).to.equal('New app notification');
  });

  it('preserves host styles changed after an empty notification tray was measured', async function () {
    info('App notification', Infinity);
    await nextFrame();
    const tray = root.querySelector('ef-notification-tray');
    const clock = useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
    try {
      tray.resizedCallback({ width: 100, height: 0 });
      clock.tick(0);
      host.style.setProperty('padding-top', '17px', 'important');
      host.style.setProperty('box-sizing', 'content-box', 'important');
      tray.resizedCallback({ width: 100, height: 40 });
      clock.tick(0);
      expect(host.style.getPropertyValue('padding-top')).to.equal('40px');
      tray.resizedCallback({ width: 100, height: 0 });
      clock.tick(0);
      expect([
        host.style.getPropertyValue('padding-top'),
        host.style.getPropertyPriority('padding-top'),
        host.style.getPropertyValue('box-sizing'),
        host.style.getPropertyPriority('box-sizing')
      ]).to.deep.equal(['17px', 'important', 'content-box', 'important']);
    } finally {
      clock.restore();
    }
  });
});
