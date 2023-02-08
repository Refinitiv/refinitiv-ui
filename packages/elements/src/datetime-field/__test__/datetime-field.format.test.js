import { fixture, expect, elementUpdated, isSafari } from '@refinitiv-ui/test-helpers';
import { inputValue } from './utils';

// import element and theme
import '@refinitiv-ui/elements/datetime-field';
import '@refinitiv-ui/elemental-theme/light/ef-datetime-field';

describe('datetime-field/Format', () => {
  it('Check default format for en-gb', async () => {
    const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
    expect(inputValue(el)).to.be.equal('21 Apr 1988');
  });
  it('Check timepicker format for en-gb', async function() {
    if (isSafari()) { // Safari generate special character that make the test case fail even the value is correct
      this.skip();
    }
    const el = await fixture('<ef-datetime-field lang="en-gb" timepicker value="1988-04-21T12:00"></ef-datetime-field>');
    expect(inputValue(el)).to.be.equal('21 Apr 1988, 12:00');
  });
  it('Check showSeconds format for en-gb', async function() {
    if (isSafari()) { // Safari generate special character that make the test case fail even the value is correct
      this.skip();
    }
    const el = await fixture('<ef-datetime-field lang="en-gb" show-seconds value="1988-04-21T11:00:59"></ef-datetime-field>');
    expect(inputValue(el)).to.be.equal('21 Apr 1988, 11:00:59');
  });
  it('Check am-pm format for en-gb', async function () {
    if (isSafari()) { // Safari generate special character that make the test case fail even the value is correct
      this.skip();
    }
    const el = await fixture('<ef-datetime-field lang="en-gb" am-pm value="1988-04-21T11:00"></ef-datetime-field>');
    expect(inputValue(el)).to.be.equal('21 Apr 1988, 11:00 am');
  });
  it('Check am-pm and showSeconds format for en-gb', async function () {
    if (isSafari()) { // Safari generate special character that make the test case fail even the value is correct
      this.skip();
    }
    const el = await fixture('<ef-datetime-field lang="en-gb" am-pm show-seconds value="1988-04-21T01:00:59"></ef-datetime-field>');
    expect(inputValue(el)).to.be.equal('21 Apr 1988, 1:00:59 am');
  });
  it('Should be possible to change lang from en-gb to en-us', async () => {
    const el = await fixture('<ef-datetime-field lang="en-gb" value="1988-04-21"></ef-datetime-field>');
    el.lang = 'en-us';
    await elementUpdated(el);
    expect(inputValue(el)).to.be.equal('Apr 21, 1988');
  });
  it('Should be possible to use custom format', async () => {
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
