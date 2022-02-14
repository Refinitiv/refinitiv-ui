import { expect, fixture } from '@refinitiv-ui/test-helpers';

import { tweenAnimate } from '../../../../lib/tab-bar/helpers/animate.js';

describe('Functions from helpers', () => {
  describe('Test tweenAnimate', () => {
    let el;

    beforeEach(async () => {
      el = await fixture(`
        <div style="width: 10px; overflow: auto;">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy
        </div>
      `);
    });

    it('Should thrown error if target is not passed', () => {
      expect(() => tweenAnimate({ startPosition: 0, endPosition: 10 })).throw(TypeError);
    });
    it('Should scroll an element to the end position', (done) => {
      const startPosition = 0;
      const endPosition = 50;

      tweenAnimate({
        target: el,
        startPosition,
        endPosition,
        complete: () => {
          expect(Math.round(el.scrollLeft)).equal(endPosition); // scrollLeft can be decimal number on zoom screen
          done();
        }
      });
    });
    it('Should call callback function when scroll finished', async () => {
      let isCalled = false;
      const startPosition = 0;
      const endPosition = 50;

      const callback = () => {
        isCalled = true;
      }

      tweenAnimate({
        target: el,
        startPosition,
        endPosition,
        complete: () => {
          callback();
          expect(isCalled).to.equal(true);
        }
      });
    });
  });
});
