import { expect, aTimeout } from '@refinitiv-ui/test-helpers';
import IntlMessageFormat from 'intl-messageformat';
import { Memoiser } from '../lib/memoiser';

const scope = 'memoiser-test';
const key = 'TEST';
const message = 'Memoiser test message';

describe('Memoiser Test', () => {
  it('Public API are present', async () => {
    expect(Memoiser.format).to.exist;
    expect(Memoiser.clear).to.exist;
    expect(Memoiser.delete).to.exist;
  });

  it('Memoised function is of valid format', async () => {
    const memoisedFn = Memoiser.get(scope, 'en', key, message);
    expect(memoisedFn).to.be.instanceOf(IntlMessageFormat, 'Wrong message format returned');
    expect(memoisedFn === Memoiser.get(scope, 'en', key, message)).to.equal(true, 'Memoiser must always return the same instance of callback');
    Memoiser.clear();
  });

  it('Can get and clear memoised records', async () => {
    Memoiser.get(scope, 'en', key, message);
    Memoiser.get(scope, 'ru', key, message);
    Memoiser.get(scope, 'it', key, message);
    Memoiser.get('new-scope', 'en', key, message);
    expect(Object.keys(Memoiser.memoiseMap).length).to.equal(4, 'Memoiser should store the records');
    Memoiser.delete(scope, 'en');
    expect(Object.keys(Memoiser.memoiseMap).length).to.equal(3, 'Memoiser should delete a single record');
    Memoiser.clear();
    expect(Memoiser.hasRecords()).to.equal(false, 'Clear should remove the memoised callback');
  });

  it('Memoiser should clear callbacks in some time', async () => {
    const Timeout = Memoiser.Timeout;
    Memoiser.Timeout = 1; // force to 1ms for testing
    Memoiser.get(scope, 'en', key, message);
    await aTimeout(10);
    expect(Memoiser.hasRecords()).to.equal(false, 'Memoiser should clear records in some time');
    Memoiser.Timeout = Timeout;
  });

  it('Should be able to memoise keys and delete them', async () => {
    const memoisedFn = Memoiser.get(scope, 'en', 'TEST1', 'Memoiser test message 1');
    const newMemoisedFn = Memoiser.get(scope, 'en', 'TEST2', 'Memoiser test message 2');

    expect(memoisedFn.format()).to.equal('Memoiser test message 1');
    expect(newMemoisedFn.format()).to.equal('Memoiser test message 2');

    Memoiser.delete(scope, 'en');
    expect(Memoiser.hasRecords()).to.equal(false, 'Deleting record should delete all keys');
  });
});
