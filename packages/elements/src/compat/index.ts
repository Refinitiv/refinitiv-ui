import { ElfAppScope, registerElfScope } from '@refinitiv-ui/core';

import { disposeDefaultNotifications } from '../notification/helpers/status.js';
import { createDefaultTooltip } from '../tooltip/elements/tooltip-element.js';
import '../tooltip/index.js';

/**
 * Start root-owned ELF input and default tooltip services before mounting controls.
 * Remove controls before disposal. This Spike 1 API does not provide hide/resume support.
 * @param root Existing connected app boundary
 * @returns Scope and service disposal handle
 */
export const setupElf = (root: ShadowRoot): ElfAppScope => {
  const scope = registerElfScope(root);
  const tooltip = createDefaultTooltip();
  root.appendChild(tooltip);
  let disposed = false;
  return {
    root,
    host: root.host,
    dispose(): void {
      if (disposed) {
        return;
      }
      disposeDefaultNotifications(root);
      tooltip.remove();
      scope.dispose();
      disposed = true;
    }
  };
};
