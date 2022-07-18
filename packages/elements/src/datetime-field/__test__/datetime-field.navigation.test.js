import { fixture, expect, elementUpdated, nextFrame } from '@refinitiv-ui/test-helpers';
import {
  focusInput,
  arrowRight,
  arrowLeft,
  arrowUp,
  arrowDown
} from './utils';
import { DateTimeFormat, utcFormat } from '@refinitiv-ui/utils/date.js';

// import element and theme
import '@refinitiv-ui/elements/datetime-field';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-field';

const getEl = async (value) => {
  const el = await fixture('<ef-datetime-field lang="en-gb"></ef-datetime-field>');
  el.formatOptions = {
    weekday: 'narrow',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    era: 'narrow',
    fractionalSecondDigits: 3
  };
  if (typeof value === 'number') {
    el.valueAsNumber = value;
  }
  await elementUpdated(el);
  await focusInput(el);
  el.select();
  await nextFrame();
  return el;
}

const selection = (el) => `${el.selectionStart}-${el.selectionEnd}`;
const Selection = {
  Weekday: '0-1',
  Day: '3-5',
  Month: '6-8',
  Year: '9-13',
  Hours: '17-19',
  Minutes: '20-22',
  Seconds: '23-25',
  Milliseconds: '26-29',
  Period: '30-32'
};

const setSelection = async (el, selection) => {
  const [selectionStart, selectionEnd] = selection.split('-');
  el.setSelectionRange(selectionStart, selectionEnd);
  await nextFrame();
};

const startDate = () => {
  // Noon in UTC
  const today = new Date();
  const date = new Date(0);
  date.setUTCFullYear(today.getFullYear());
  date.setUTCMonth(today.getMonth());
  date.setUTCDate(today.getDate());
  date.setUTCHours(12);
  return utcFormat(date, DateTimeFormat.yyyMMddTHHmmssSSS);
}

// Indicates if this is Safari. Put version parameter to specific version.
const isSafari = (version = undefined) => {
  const safari = !(/Chrome/).test(navigator.userAgent) && (/Apple Computer/).test(navigator.vendor);
  if (version) {
    return safari && (navigator.userAgent.indexOf(`Version\/${String(version)}`) > -1);
  }
  return safari;
};

describe('datetime-field/Navigation', () => {
  describe('Part Selection', () => {
    it('Should be possible to navigate right', async function () {
      if (isSafari('14')) { // Safari 14 shows different time than others.
        this.skip();
      }
      const el = await getEl();
      await arrowRight(el);
      expect(el.value).to.be.equal(startDate(), 'Value should be populated on navigation');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Weekday, 'Weekday should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Day, 'Day should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Month, 'Month should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Year, 'Year should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Hours, 'Hours should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Minutes, 'Minutes should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Seconds, 'Seconds should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Milliseconds, 'Milliseconds should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Period, '#1 Period should be selected');
      await arrowRight(el);
      expect(selection(el)).to.be.equal(Selection.Period, '#2 Period should be selected');
    });
    it('Should be possible to navigate left', async function () {
      if (isSafari('14')) { // Safari 14 shows different time than others.
        this.skip();
      }
      const el = await getEl();
      await arrowLeft(el);
      expect(el.value).to.be.equal(startDate(), 'Value should be populated on navigation');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Period, 'Period should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Milliseconds, 'Milliseconds should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Seconds, 'Seconds should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Minutes, 'Minutes should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Hours, 'Hours should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Year, 'Year should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Month, 'Month should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Day, 'Day should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Weekday, '#1 Weekday should be selected');
      await arrowLeft(el);
      expect(selection(el)).to.be.equal(Selection.Weekday, '#2 Weekday should be selected');
    });
  });
  describe('Part Change', () => {
    it('Should be possible to change weekday', async () => {
      const el = await getEl(0);
      await setSelection(el, Selection.Weekday);
      await arrowUp(el);
      expect(el.value).to.be.equal('1970-01-02T00:00:00.000', 'Arrow up should increase weekday');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease weekday');
    });
    it('Should be possible to change day', async () => {
      const el = await getEl(0);
      await setSelection(el, Selection.Day);
      await arrowUp(el);
      expect(el.value).to.be.equal('1970-01-02T00:00:00.000', 'Arrow up should increase day');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease day');
    });
    it('Should be possible to change month', async () => {
      const el = await getEl(0);
      await setSelection(el, Selection.Month);
      await arrowUp(el);
      expect(el.value).to.be.equal('1970-02-01T00:00:00.000', 'Arrow up should increase month');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease month');
    });
    it('Should be possible to change year', async () => {
      const el = await getEl(0);
      await setSelection(el, Selection.Year);
      await arrowUp(el);
      expect(el.value).to.be.equal('1971-01-01T00:00:00.000', 'Arrow up should increase year');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease year');
    });
    it('Should be possible to change hours', async () => {
      const el = await getEl(0);
      await setSelection(el, Selection.Hours);
      await arrowUp(el);
      expect(el.value).to.be.equal('1970-01-01T01:00:00.000', 'Arrow up should increase hours');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease hours');
    });
    it('Should be possible to change minutes', async () => {
      const el = await getEl(0);
      await setSelection(el, Selection.Minutes);
      await arrowUp(el);
      expect(el.value).to.be.equal('1970-01-01T00:01:00.000', 'Arrow up should increase minutes');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease minutes');
    });
    it('Should be possible to change seconds', async function () {
      if (isSafari('14')) { // Safari 14 shows different time than others.
        this.skip();
      }
      const el = await getEl(0);
      await setSelection(el, Selection.Seconds);
      await arrowUp(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:01.000', 'Arrow up should increase seconds');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease seconds');
    });
    it('Should be possible to change milliseconds', async () => {
      const el = await getEl(0);
      await setSelection(el, Selection.Milliseconds);
      await arrowUp(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.100', 'Arrow up should increase milliseconds');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease milliseconds');
    });
    it('Should be possible to change period', async function () {
      if (isSafari('14')) { // Safari 14 shows different time than others.
        this.skip();
      }
      const el = await getEl(0);
      await setSelection(el, Selection.Period);
      await arrowUp(el);
      expect(el.value).to.be.equal('1970-01-01T12:00:00.000', 'Arrow up should increase period');
      await arrowDown(el);
      expect(el.value).to.be.equal('1970-01-01T00:00:00.000', 'Arrow down should decrease period');
    });
  });
});
