import { expect } from '@refinitiv-ui/test-helpers';
import { WarningNotice } from '../../lib/notices/WarningNotice';

describe('TestWarningNotice', () => {
  let originFunc;
  let shownMessage = '';
  let callCount = 0;
  let notice;

  const fakedFunc = (message) => {
    shownMessage = message;
    callCount += 1;
  };

  beforeEach(() => {
    // eslint-disable-next-line no-console
    originFunc = console.warn;
    // eslint-disable-next-line no-console
    console.warn = fakedFunc;
    shownMessage = '';
    callCount = 0;

    notice = new WarningNotice('test');
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.warn = originFunc;
  });

  it('Test defaults', () => {
    expect(notice.shown).to.equal(false, 'By default message is already shown');
  });

  it('Test generate simple message', async () => {
    notice.show();

    expect(notice.shown).to.equal(true, 'Message not shown');
    await expect(shownMessage).to.equalSnapshot();
    expect(callCount).to.equal(1, 'Info function is not called');
  });

  it('Test generate message with url', async () => {
    notice = new WarningNotice('test', 'url');

    notice.show();

    expect(notice.shown).to.equal(true, 'Message not shown');
    await expect(shownMessage).to.equalSnapshot();
    expect(callCount).to.equal(1, 'Info function is not called');
  });
});
