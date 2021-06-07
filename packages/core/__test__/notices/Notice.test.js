import { expect } from '@refinitiv-ui/test-helpers';
import { Notice } from '../../lib/notices/Notice';

describe('TestNotice', () => {
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
    originFunc = console.info;
    // eslint-disable-next-line no-console
    console.info = fakedFunc;
    shownMessage = '';
    callCount = 0;

    notice = new Notice('test');
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.info = originFunc;
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
    notice = new Notice('test', 'url');

    notice.show();

    expect(notice.shown).to.equal(true, 'Message not shown');
    expect(shownMessage).to.equalSnapshot();
    expect(callCount).to.equal(1, 'Info function is not called');
  });

  it('Test generate message once', () => {
    notice.once();

    expect(notice.shown).to.equal(true, 'Message not shown');
    expect(shownMessage).to.equalSnapshot();
    expect(callCount).to.equal(1, 'Info function is not called');

    notice.once();

    expect(notice.shown).to.equal(true, 'Message not shown');
    expect(shownMessage).to.equalSnapshot();
    expect(callCount).to.equal(1, 'Info function called more then once');
  });


});
