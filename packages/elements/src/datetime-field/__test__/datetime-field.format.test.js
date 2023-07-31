// import element and theme
import '@refinitiv-ui/elements/datetime-field';

import '@refinitiv-ui/elemental-theme/light/ef-datetime-field';
import { elementUpdated, expect, fixture, replaceWhitespace } from '@refinitiv-ui/test-helpers';

import { inputValue } from './utils';

describe('datetime-field/Format', function() {
  it('Check default format for en-gb', async function() {
    const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
    expect(replaceWhitespace(inputValue(el))).to.be.equal('21 Apr 1988');
  });
  it('Check timepicker format for en-gb', async function() {
    const el = await fixture(
      '<ef-datetime-field lang="en-gb" timepicker value="1988-04-21T12:00"></ef-datetime-field>'
    );
    expect(replaceWhitespace(inputValue(el))).to.be.equal('21 Apr 1988, 12:00');
  });
  it('Check showSeconds format for en-gb', async function() {
    const el = await fixture(
      '<ef-datetime-field lang="en-gb" show-seconds value="1988-04-21T11:00:59"></ef-datetime-field>'
    );
    expect(replaceWhitespace(inputValue(el))).to.be.equal('21 Apr 1988, 11:00:59');
  });
  it('Check am-pm format for en-gb', async function() {
    const el = await fixture(
      '<ef-datetime-field lang="en-gb" am-pm value="1988-04-21T11:00"></ef-datetime-field>'
    );
    expect(replaceWhitespace(inputValue(el))).to.be.equal('21 Apr 1988, 11:00 am');
  });
  it('Check am-pm and showSeconds format for en-gb', async function() {
    const el = await fixture(
      '<ef-datetime-field lang="en-gb" am-pm show-seconds value="1988-04-21T01:00:59"></ef-datetime-field>'
    );
    expect(replaceWhitespace(inputValue(el))).to.be.equal('21 Apr 1988, 1:00:59 am');
  });
  it('Should be possible to change lang from en-gb to en-us', async function() {
    const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
    el.lang = 'en-us';
    await elementUpdated(el);
    expect(replaceWhitespace(inputValue(el))).to.be.equal('Apr 21, 1988');
  });
  it('Should be possible to use custom format', async function() {
    const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
    el.formatOptions = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit'
    };
    await elementUpdated(el);
    expect(inputValue(el)).to.be.equal('21/04/88');
  });
});
