import { expect } from '@refinitiv-ui/test-helpers';
import { DeprecationNotice } from '../../lib/notices/DeprecationNotice';

describe('TestDeprecationNotice', () => {
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

    notice = new DeprecationNotice('test');
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.warn = originFunc;
  });

  it('Test defaults', () => {
    expect(notice.shown).to.equal(false, 'By default message is already shown');
  });

  it('Test generate simple message', () => {
    notice.show();

    expect(notice.shown).to.equal(true, 'Message not shown');
    expect(shownMessage).to.equalSnapshot();
    expect(callCount).to.equal(1, 'Info function is not called');
  });

  it('Test generate message with url', () => {
    notice = new DeprecationNotice('test', 'url');

    notice.show();

    expect(notice.shown).to.equal(true, 'Message not shown');
    expect(shownMessage).to.equalSnapshot();
    expect(callCount).to.equal(1, 'Info function is not called');
  });
});
