import { elementUpdated, expect, nextFrame, isFirefox, isNear } from '@refinitiv-ui/test-helpers';

import '@refinitiv-ui/elements/overlay';
import '@refinitiv-ui/elemental-theme/light/ef-overlay';
import {
  createPositionTargetFixture,
  expectMatchExactAlignWord,
  expectMatchExactPositionWord,
  getPossibleOffsets,
  getSizes,
  heightSizes,
  initPossiblePositions,
  matchExact,
  matchExactAlignWord,
  matchExactPositionWord,
  matchExactSize, openedUpdated,
  possiblePositions,
  widthSizes,
  targetWidthEqualToPanelWidth,
  targetHeightEqualToPanelHeight
} from './mocks/helper.js';

initPossiblePositions();

const screenWidth = document.documentElement.clientWidth;
const screenHeight = document.documentElement.clientHeight;

const screenCenter = { left: screenWidth / 2, top: screenHeight / 2 };

describe('overlay/PositionTarget', () => {
  describe(`Test Positions (screen width: ${screenWidth}, height: ${screenHeight})`, () => {
    describe('Test with position target in center without fallback', () => {
      for (let widthSize of widthSizes) {
        for (let heightSize of heightSizes) {
          describe(`Test ${widthSize} and ${heightSize}`, () => {
            const { targetSize } = getSizes(widthSize, heightSize);

            const x = screenCenter.left - targetSize.width / 2;
            const y = screenCenter.top - targetSize.height / 2;

            for (let possiblePosition of possiblePositions) {
              it(`Test position ${possiblePosition}`, async () => {
                const { target, panel } = await createPositionTargetFixture(x, y, possiblePosition, widthSize, heightSize);

                const matchExactResult = matchExact(target, panel, possiblePosition);
                expect(matchExactResult).to.equal('', matchExactResult);

                const matchExactSizeResult = matchExactSize(target, panel, widthSize, heightSize);
                expect(matchExactSizeResult).to.equal('', matchExactSizeResult);
              });
            }
          });
        }
      }
    });

    describe('Test with position target in center with fallback', () => {
      for (let widthSize of widthSizes) {
        for (let heightSize of heightSizes) {
          describe(`Test ${widthSize} and ${heightSize}`, () => {
            const { targetSize } = getSizes(widthSize, heightSize);

            const x = screenCenter.left - targetSize.width / 2;
            const y = screenCenter.top - targetSize.height / 2;

            for (let possiblePosition of possiblePositions) {
              it(`Test position ${possiblePosition}`, async () => {
                const fallbackPosition = 'top-middle';
                const { target, panel } = await createPositionTargetFixture(x, y, `${possiblePosition}, ${fallbackPosition}`, widthSize, heightSize);

                const matchExactResult = matchExact(target, panel, possiblePosition);
                expect(matchExactResult).to.equal('', matchExactResult);

                const matchExactSizeResult = matchExactSize(target, panel, widthSize, heightSize);
                expect(matchExactSizeResult).to.equal('', matchExactSizeResult);
              });
            }
          });
        }
      }
    });

    describe('Test with position target x and y offsets', () => {
      before(function() {
        isFirefox() && this.skip(); // Firefox has the page navigated interrupt issue on BrowserStack (no workaround)
      });
      for (let widthSize of widthSizes) {
        for (let heightSize of heightSizes) {
          describe(`Test ${widthSize} and ${heightSize}`, () => {
            const {
              xOffsets,
              yOffsets
            } = getPossibleOffsets(widthSize, heightSize);

            const { targetSize, panelSize } = getSizes(widthSize, heightSize);

            for (let possiblePosition of possiblePositions) {
              describe(`Test Position ${possiblePosition}`, () => {
                for (let xOffset of xOffsets) {
                  for (let yOffset of yOffsets) {
                    it(`Test offset x: ${xOffset} y: ${yOffset}`, async () => {
                      const { target, panel } = await createPositionTargetFixture(xOffset, yOffset, possiblePosition, widthSize, heightSize, false);
                      target.style.top = `${yOffset}px`;
                      target.style.left = `${xOffset}px`;

                      panel.opened = true;

                      await elementUpdated(panel);

                      /**
                       * ! Using Web Test Runner on BrowserStack need request one frame only,
                       * otherwise it will throw the error message "Tests were interrupted because the page navigated to ...".
                       * Chrome need only one frame but Firefox throw the error on when request `nextFrame()` so need to skip Firefox for now
                       */
                      await nextFrame();

                      const matchExactPositionWordResult = matchExactPositionWord(target, panel, possiblePosition);

                      if (expectMatchExactPositionWord(xOffset, yOffset, targetSize, panelSize, possiblePosition)) {
                        expect(matchExactPositionWordResult).to.equal('', matchExactPositionWordResult);
                      }
                      else {
                        expect(matchExactPositionWordResult).to.not.equal('', `Panel should not have correct position word: x ${xOffset} y ${yOffset}`);
                      }

                      const matchExactAlignWordResult = matchExactAlignWord(target, panel, possiblePosition);

                      if (expectMatchExactAlignWord(xOffset, yOffset, targetSize, panelSize, possiblePosition)) {
                        expect(matchExactAlignWordResult).to.equal('', matchExactAlignWordResult);
                      }
                      else {
                        expect(matchExactAlignWordResult).to.not.equal('', `Panel should not have correct position align word: x ${xOffset} y ${yOffset}`);
                      }
                    });
                  }
                }
              });
            }
          });
        }
      }
    });

    describe('Overlap', () => {
      const borderOffset = 20;
      const alignOffset = 200;

      const { targetSize: { width, height } } = getSizes(targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);

      it('Test top-middle', async () => {
        const { target, panel } = await createPositionTargetFixture(alignOffset, borderOffset, 'top-middle', targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);
        panel.style.minHeight = `${height}px`;

        await openedUpdated(panel);

        panel.noOverlap = true;

        await openedUpdated(panel);

        const panelRect = panel.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        expect(panelRect.bottom).to.equal(targetRect.top);
        expect(panelRect.height).to.equal(borderOffset);
        expect(panel.style.minHeight).to.equal(`${borderOffset}px`);
        expect(panel.style.maxHeight).to.equal(`${borderOffset}px`);
      });

      it('Test bottom-middle', async () => {
        const { target, panel } = await createPositionTargetFixture(alignOffset, screenHeight - height - borderOffset, 'bottom-middle', targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);

        await openedUpdated(panel);

        panel.noOverlap = true;

        await openedUpdated(panel);

        const panelRect = panel.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        expect(panelRect.top).to.equal(targetRect.bottom);
        expect(isNear(panelRect.height, borderOffset, 1, true)).to.equal(true);
      });

      it('Test left-middle', async () => {
        const { target, panel } = await createPositionTargetFixture(borderOffset, alignOffset, 'left-middle', targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);
        panel.style.minWidth = `${width}px`;

        await openedUpdated(panel);

        panel.noOverlap = true;

        await openedUpdated(panel);

        const panelRect = panel.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        expect(panelRect.right).to.equal(targetRect.left);
        expect(panelRect.width).to.equal(borderOffset);
        expect(panel.style.minWidth).to.equal(`${borderOffset}px`);
        expect(panel.style.maxWidth).to.equal(`${borderOffset}px`);
      });

      it('Test right-middle', async () => {
        const { target, panel } = await createPositionTargetFixture(screenWidth - width - borderOffset, alignOffset, 'right-middle', targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);

        await openedUpdated(panel);

        panel.noOverlap = true;

        await openedUpdated(panel);

        const panelRect = panel.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();

        expect(panelRect.left).to.equal(targetRect.right);
        expect(panelRect.width).to.equal(borderOffset);
      });
    });

    describe('Outside View', () => {
      const { targetSize: { width, height } } = getSizes(targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);

      it('Test outside view bottom-start', async () => {
        const { panel } = await createPositionTargetFixture(screenWidth / 2 - width / 2, screenHeight + 1, 'bottom-start', targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);

        await openedUpdated(panel);
        const rect = panel.getBoundingClientRect();

        expect(isNear(rect.bottom, screenHeight, 1, true)).to.equal(true);
      });

      it('Test outside view top-start', async () => {
        const { panel } = await createPositionTargetFixture(screenWidth / 2 - width / 2, -height - 1, 'top-start', targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);

        await openedUpdated(panel);
        const rect = panel.getBoundingClientRect();

        expect(rect.top).to.equal(0);
      });

      it('Test outside view left-start', async () => {
        const { panel } = await createPositionTargetFixture(-width - 1, screenHeight / 2 - height / 2, 'left-start', targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);

        await openedUpdated(panel);
        const rect = panel.getBoundingClientRect();

        expect(rect.left).to.equal(0);
      });

      it('Test outside view right-start', async () => {
        const { panel } = await createPositionTargetFixture(screenWidth + width + 1, screenHeight / 2 - height / 2, 'right-start', targetWidthEqualToPanelWidth, targetHeightEqualToPanelHeight);

        await openedUpdated(panel);
        const rect = panel.getBoundingClientRect();

        expect(rect.right).to.equal(screenWidth);
      });
    });
  });
});
