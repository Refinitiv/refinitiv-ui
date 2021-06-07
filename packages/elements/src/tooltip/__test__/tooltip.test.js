import { fixture, expect, nextFrame, elementUpdated, aTimeout, isIE } from '@refinitiv-ui/test-helpers';

// import element and theme
import '@refinitiv-ui/elements/tooltip';
import {
  registerOverflowTooltip
} from '@refinitiv-ui/elements/tooltip';
import '@refinitiv-ui/elemental-theme/light/ef-tooltip.js';

const ShowDelay = 300;
const HideDelay = 150;
const TransitionTime = 500; // opacity
const MouseMoveDelay = 1000;

// there is show delay and animation. Take care of all of that
const mouseMove = async (config = {}) => {
  const {
    target = document,
    x = 0,
    y = 0,
    tooltip,
    showDelay = ShowDelay,
    hideDelay = HideDelay,
    transitionTime = TransitionTime
  } = config;

  const event = new MouseEvent('mousemove', {
    target,
    clientX: x,
    clientY: y,
    bubbles: true,
    cancelable: true,
    view: document.defaultView
  });

  await nextFrame();
  target.dispatchEvent(event);
  await aTimeout((config.target ? showDelay : hideDelay) + transitionTime + 5); /* 5 for general mousemove delay */
  await elementUpdated(tooltip); /* all these lines ensure that IE finished rendering */
  await nextFrame();
};

describe('Tooltip', () => {
  it('DOM structure is correct', async () => {
    const el = await fixture('<ef-tooltip></ef-tooltip>');
    expect(el).shadowDom.to.equalSnapshot();
  });

  it('Default title override works as expected', async () => {
    const el = await fixture(`<div title="Parent">
      Parent
      <div id="child" title="Child">Child</div>
      <div id="empty" title>Empty</div>
    </div>`);
    const elTitle = el.getAttribute('title');
    const child = el.querySelector('[id=child]');
    const childTitle = child.getAttribute('title');
    const empty = el.querySelector('[id=empty]');
    const tooltip = el.ownerDocument.querySelector('ef-tooltip[ref=title-override]');

    await mouseMove({
      target: el,
      tooltip
    });
    expect(tooltip, 'Tooltip is not present').to.exist;
    expect(tooltip.opened, 'Tooltip on parent is not shown').to.be.true;
    expect(tooltip.innerText.trim(), 'Tooltip on parent label is wrong').to.equal(elTitle);
    expect(el.getAttribute('title'), 'Title is not reset or is removed').to.equal('');
    expect(el.getAttribute('tooltip'), 'Title is not changed').to.equal(elTitle);
    expect(el.title, 'Title property is not changed').to.equal(elTitle);

    await mouseMove({
      target: empty,
      tooltip
    });
    expect(tooltip.opened, 'Tooltip on empty is shown').to.be.false;

    await mouseMove({
      target: child,
      tooltip
    });
    expect(tooltip.opened, 'Tooltip on child is not shown').to.be.true;
    expect(tooltip.innerText.trim(), 'Tooltip on child label is wrong').to.equal(childTitle);
    expect(child.getAttribute('title'), 'Child title is not reset or is removed').to.equal('');
    expect(child.getAttribute('tooltip'), 'Child title is no changed').to.equal(childTitle);

    await mouseMove({
      tooltip
    });
    expect(tooltip.opened, 'Tooltip on document is shown').to.be.false;
  }).timeout(MouseMoveDelay * 4);

  it('Overflow tooltip works as expected', async () => {
    const longText = 'Hello World!';
    const el = await fixture(`<div style="white-space:nowrap;width:10px;overflow:hidden;text-overflow:ellipsis;">${longText}</div>`);
    const tooltip = el.ownerDocument.querySelector('ef-tooltip[ref=title-override]');
    registerOverflowTooltip(el);

    await mouseMove({
      target: el,
      tooltip
    });

    expect(tooltip.opened).to.be.equal(true, 'Overflow tooltip is not shown');
    expect(tooltip.textContent).to.be.equal(longText, 'Overflow tooltip should show textContent by default');

    // can override condition
    await mouseMove({
      target: el.ownerDocument.body,
      tooltip
    });

    const overriddenText = 'Overflow override';
    registerOverflowTooltip(el, () => overriddenText);
    await mouseMove({
      target: el,
      tooltip
    });

    expect(tooltip.opened).to.be.equal(true, 'Overridden overflow tooltip is not shown');
    expect(tooltip.textContent).to.be.equal(overriddenText, 'Overridden overflow tooltip should show custom renderer text');
  }).timeout(MouseMoveDelay * 3);

  it('Tooltip position, selector and API do work', async () => {
    const el = await fixture(`
      <div id="positionTest" style="width: 100px; height: 100px; margin: 150px;" tooltip="Position">
        <ef-tooltip selector="#positionTest" id="auto"></ef-tooltip>
        <ef-tooltip selector="div[id=positionTest]" id="left" position="left"></ef-tooltip>
        <ef-tooltip selector="#positionTest" id="right" position="right"></ef-tooltip>
        <ef-tooltip selector="#positionTest" id="above" position="above"></ef-tooltip>
        <ef-tooltip selector="#positionTest" id="below" position="below"></ef-tooltip>
      </div>
    `);

    const auto = el.querySelector('#auto');
    const left = el.querySelector('#left');
    const right = el.querySelector('#right');
    const below = el.querySelector('#below');
    const above = el.querySelector('#above');

    // show
    const rect = el.getBoundingClientRect();

    await mouseMove({
      tooltip: auto,
      target: el,
      x: rect.left,
      y: rect.top
    });

    expect(auto.opened, 'Tooltip auto opened=true is not set').to.be.true;
    expect(left.opened, 'Tooltip left opened=true is not set').to.be.true;
    expect(right.opened, 'Tooltip right opened=true is not set').to.be.true;
    expect(below.opened, 'Tooltip below opened=true is not set').to.be.true;
    expect(above.opened, 'Tooltip above opened=true is not set').to.be.true;

    expect(auto.tooltip.opened, 'Tooltip popup auto opened=true is not set').to.be.true;
    expect(left.tooltip.opened, 'Tooltip popup left opened=true is not set').to.be.true;
    expect(right.tooltip.opened, 'Tooltip popup right opened=true is not set').to.be.true;
    expect(below.tooltip.opened, 'Tooltip popup below opened=true is not set').to.be.true;
    expect(above.tooltip.opened, 'Tooltip popup above opened=true is not set').to.be.true;

    // check position
    const style = window.getComputedStyle(auto.tooltip);
    const marginLeft = parseInt(style['margin-left'], 0);
    const marginTop = parseInt(style['margin-top'], 0);

    expect(rect.top, 'Position auto top is not aligned with the cursor').to.be.equal(auto.tooltip.getBoundingClientRect().top - marginTop);
    expect(rect.left, 'Position auto left is not aligned with the cursor').to.be.equal(auto.tooltip.getBoundingClientRect().left - marginLeft);
    expect(rect.left >= left.tooltip.getBoundingClientRect().right, 'Position left is not rendered on the left').to.be.true;
    expect(rect.right <= right.tooltip.getBoundingClientRect().left, 'Position right is not rendered on the right').to.be.true;
    expect(rect.bottom <= below.tooltip.getBoundingClientRect().bottom, 'Position below is not rendered below').to.be.true;
    expect(rect.top >= above.tooltip.getBoundingClientRect().top, 'Position above is not rendered above').to.be.true;

    // hide
    await mouseMove({
      tooltip: auto
    });

    expect(auto.opened, 'Tooltip auto opened=false is not set').to.be.false;
    expect(left.opened, 'Tooltip left opened=false is not set').to.be.false;
    expect(right.opened, 'Tooltip right opened=false is not set').to.be.false;
    expect(below.opened, 'Tooltip below opened=false is not set').to.be.false;
    expect(above.opened, 'Tooltip above opened=false is not set').to.be.false;

    expect(auto.tooltip.opened, 'Tooltip popup auto opened=false is not set').to.be.false;
    expect(left.tooltip.opened, 'Tooltip popup left opened=false is not set').to.be.false;
    expect(right.tooltip.opened, 'Tooltip popup right opened=false is not set').to.be.false;
    expect(below.tooltip.opened, 'Tooltip popup below opened=false is not set').to.be.false;
    expect(above.tooltip.opened, 'Tooltip popup above opened=false is not set').to.be.false;
  }).timeout(MouseMoveDelay * 2);

  it('Custom condition works as expected', async () => {
    const el = await fixture(
      `<div>
        <div tooltip="Custom Condition">
          <ef-tooltip></ef-tooltip>
        </div>
        <div></div>
      </div>
    `);
    const els = el.querySelectorAll('div');
    const tooltip = els[0].querySelector('ef-tooltip');
    tooltip.condition = (target) => {
      return target === els[0];
    };

    await mouseMove({
      target: els[0],
      tooltip
    });

    expect(tooltip.opened, 'Tooltip condition did not work for match').to.be.true;

    await mouseMove({
      target: els[1],
      tooltip
    });

    expect(tooltip.opened, 'Tooltip condition did not work for not match').to.be.false;
  }).timeout(MouseMoveDelay * 2);

  it('Show/hide delay work as expected', async function () {
    if (isIE()) { /* CSS Variables do not work in IE11 without a polyfill. Skip */
      this.skip();
    }

    const el = await fixture(`
      <div tooltip="Show hide delay">
        <ef-tooltip style="--show-delay: 0; --hide-delay: 0;" id="hideShowTooltip" selector="div[tooltip='Show hide delay']"></ef-tooltip>
      </div>
    `);

    const tooltip = el.querySelector('ef-tooltip');

    expect(tooltip.showDelay, 'Tooltip show delay is not set').to.equal(0);
    expect(tooltip.hideDelay, 'Tooltip hide delay is not set').to.equal(0);

    await mouseMove({
      target: el,
      showDelay: tooltip.showDelay,
      transitionTime: 0,
      tooltip
    });

    expect(tooltip.opened, 'Tooltip is not opened').to.be.true;

    await mouseMove({
      hideDelay: tooltip.hideDelay,
      transitionTime: 0,
      tooltip
    });

    expect(tooltip.opened, 'Tooltip is not hidden').to.be.false;
  }).timeout(MouseMoveDelay * 2);

  it('Custom renderer works as expected', async () => {
    const el = await fixture(`
      <div id="tooltipRendererTest">
        <div renderer>I am custom renderer</div>
        <ef-tooltip selector="#tooltipRendererTest"></ef-tooltip>
      </div>
    `);
    const tooltip = el.querySelector('ef-tooltip');
    tooltip.renderer = (target) => {
      return target.querySelector('[renderer]');
    };

    await mouseMove({
      target: el,
      tooltip
    });

    expect(tooltip.opened, 'Tooltip is not opened').to.be.true;
    expect(el.querySelector('[renderer]'), 'Custom renderer should clone the nodes').to.exist;
    expect(tooltip.innerText.trim(), 'Content is not copied').to.equal(el.querySelector('[renderer]').innerText.trim());
  }).timeout(MouseMoveDelay * 1);

  it('Check event to close the tooltip', async () => {
    const el = await fixture('<div title="Click" a>Click</div>');
    const tooltip = el.ownerDocument.querySelector('ef-tooltip[ref=title-override]');
    const iframe = document.createElement('iframe');

    // force
    tooltip.transitionStyle = null;

    const mouseHideEvents = ['click', 'mouseleave', 'mouseout'];
    const wheelEvents = ['wheel'];
    const keyEvents = ['keydown'];

    const hideEvents = [...mouseHideEvents, ...wheelEvents, ...keyEvents];
    for (let i = 0; i < hideEvents.length; i += 1) {
      const eventType = hideEvents[i];
      await mouseMove({
        target: el,
        tooltip
      });
      expect(tooltip.opened, `Tooltip is not shown for "${eventType}" event`).to.be.true;
      let event;

      if (mouseHideEvents.includes(eventType)) {
        event = new MouseEvent(eventType, {
          relatedTarget: eventType === 'mouseout' ? iframe : document.body
        });
      }
      else {
        event = new CustomEvent(eventType); // Wheel event and KeyBoard event are not supported in IE11
      }

      document.dispatchEvent(event);
      await elementUpdated(tooltip);
      await nextFrame();
      expect(tooltip.opened, `Tooltip should be closed on "${eventType}" event`).to.be.false;
    }
  }).timeout(MouseMoveDelay * 5);

  it('Slotted tooltip should be shown', async () => {
    const el = await fixture(`
      <div id="slotTest">
        <ef-tooltip selector="#slotTest">Slot Content</ef-tooltip>
      </div>
    `);
    const tooltip = el.querySelector('ef-tooltip');

    await mouseMove({
      target: el,
      tooltip
    });

    expect(tooltip.opened, 'Tooltip on parent is not shown').to.be.true;
  }).timeout(MouseMoveDelay * 1);

  it('Empty tooltip should not be shown', async () => {
    const el = await fixture(`
      <div id="emptyTest">
        <ef-tooltip selector="#emptyTest"></ef-tooltip>
      </div>
    `);
    const tooltip = el.querySelector('ef-tooltip');

    await mouseMove({
      target: el,
      tooltip
    });

    expect(tooltip.opened, 'Tooltip on parent is shown').to.be.false;
  }).timeout(MouseMoveDelay * 1);
});

