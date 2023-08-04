import '@refinitiv-ui/elements/header';
import '@refinitiv-ui/elements/panel';
// import elements
import '@refinitiv-ui/elements/sidebar-layout';

import '@refinitiv-ui/elemental-theme/light/ef-header.js';
import '@refinitiv-ui/elemental-theme/light/ef-panel.js';
// import themes
import '@refinitiv-ui/elemental-theme/light/ef-sidebar-layout.js';
import { elementUpdated, expect, fixture } from '@refinitiv-ui/test-helpers';

describe('sidebar-layout/SidebarLayout', function () {
  const defaultLayout = `
    <ef-sidebar-layout>
      <ef-header slot="sidebar-header">Sidebar Header</ef-header>
      <ef-panel slot="sidebar-content" spacing>Sidebar Content</ef-panel>
      <ef-header slot="main-header">Main Header</ef-header>
      <ef-panel slot="main-content" spacing>Main Content</ef-panel>
    </ef-sidebar-layout>
  `;

  const collapsedLayout = `
    <ef-sidebar-layout collapsed>
      <ef-header slot="sidebar-header">Sidebar Header</ef-header>
      <ef-panel slot="sidebar-content" spacing>Sidebar Content</ef-panel>
      <ef-header slot="main-header">Main Header</ef-header>
      <ef-panel slot="main-content" spacing>Main Content</ef-panel>
    </ef-sidebar-layout>
  `;

  it('Has correct shadow dom structure', async function () {
    const el = await fixture(defaultLayout);
    await expect(el).shadowDom.to.equalSnapshot({
      ignoreAttributes: ['class', 'size', 'style']
    });
  });

  it('Sidebar is opened by default', async function () {
    const el = await fixture(defaultLayout);
    const sidebarPart = el.shadowRoot.querySelector('[part=sidebar]');
    expect(el.collapsed).to.equal(false);
    expect(el.hasAttribute('collapsed')).to.equal(false);
    expect(window.getComputedStyle(sidebarPart).getPropertyValue('margin-left')).to.equal('0px');
  });

  it('Sidebar is closed by setting collapsed attribute', async function () {
    const el = await fixture(collapsedLayout);
    const sidebarPart = el.shadowRoot.querySelector('[part=sidebar]');
    expect(el.hasAttribute('collapsed')).to.equal(true);
    expect(el.collapsed).to.equal(true);
    expect(window.getComputedStyle(sidebarPart).getPropertyValue('margin-left')).to.equal(
      '-' + sidebarPart.offsetWidth + 'px'
    );
  });

  it('Sidebar is closed when set collapsed property to true', async function () {
    const el = await fixture(defaultLayout);
    const sidebarPart = el.shadowRoot.querySelector('[part=sidebar]');
    expect(el.collapsed).to.equal(false);
    el.collapsed = true;
    await elementUpdated(el);
    expect(el.hasAttribute('collapsed')).to.equal(true);
    expect(window.getComputedStyle(sidebarPart).getPropertyValue('margin-left')).to.equal(
      '-' + sidebarPart.offsetWidth + 'px'
    );
  });

  it('Can set sidebar width with sidebarWidth property', async function () {
    const el = await fixture(defaultLayout);
    const sidebarPart = el.shadowRoot.querySelector('[part=sidebar]');
    const width = '100px';
    el.sidebarWidth = width;
    await elementUpdated(el);
    expect(sidebarPart.getAttribute('size')).to.equal(width);
  });

  it('Can set sidebarWidth property with sidebar-width attribute', async function () {
    const el = await fixture(defaultLayout);
    const sidebarPart = el.shadowRoot.querySelector('[part=sidebar]');
    const width = '100px';
    el.setAttribute('sidebar-width', width);
    await elementUpdated(el);
    expect(el.sidebarWidth).to.equal(width);
    expect(sidebarPart.getAttribute('size')).to.equal(width);
  });

  it('Has access to sidebar part via property', async function () {
    const el = await fixture(defaultLayout);
    const sidebarPart = el.shadowRoot.querySelector('[part=sidebar]');
    expect(el.sidebar).to.equal(sidebarPart);
  });

  it('sets property to null when attribute is removed', async function () {
    const el = await fixture(defaultLayout);
    el.setAttribute('sidebar-width', '100px');
    expect(el.sidebarWidth).to.equal('100px');
    expect(el.getAttribute('sidebar-width')).to.equal('100px');
    el.removeAttribute('sidebar-width');
    expect(el.sidebarWidth).to.equal(null);
  });
});
