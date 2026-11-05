import { applyTapEvents } from '../events/TapEvent.js';

/** App boundary retained until controls have completed disconnection. */
export interface ElfAppScope {
  readonly root: ShadowRoot;
  readonly host: Element;
  /** Remove services only after app-owned controls have disconnected. Idempotent. */
  dispose(): void;
}

let activeScope: ElfAppScope | undefined;
const controlScopes = new WeakMap<Node, ElfAppScope>();
const connectedControls = new Set<Node>();

/**
 * Get the sole app scope for context-free ELF helpers such as notifications.
 * @returns Registered scope
 */
export const requireActiveElfScope = (): ElfAppScope => {
  if (!activeScope) {
    throw new Error('ELF has no registered app scope. Set up ELF before using its services.');
  }
  return activeScope;
};

/**
 * Register the existing app shadow root before connecting any ELF controls.
 * The Spike 1 build supports one scope, including hidden connected apps.
 * @param root Existing connected app boundary
 * @returns App scope with idempotent disposal
 */
export const registerElfScope = (root: ShadowRoot): ElfAppScope => {
  if (!(root instanceof ShadowRoot) || !root.host.isConnected) {
    throw new Error('ELF requires a shadow root with a connected app host.');
  }
  if (activeScope) {
    throw new Error(
      'ELF Spike 1 supports only one registered app scope. Dispose it before registering another.'
    );
  }
  const stopInput = applyTapEvents(root);
  let disposed = false;
  const scope: ElfAppScope = {
    root,
    host: root.host,
    dispose(): void {
      if (disposed) {
        return;
      }
      if (connectedControls.size) {
        throw new Error('Disconnect ELF controls before disposing their app scope.');
      }
      stopInput();
      activeScope = undefined;
      disposed = true;
    }
  };
  activeScope = scope;
  return scope;
};

/**
 * Resolve a connected control or its saved scope during disconnection; never fall back to the page.
 * @param control App-owned node
 * @returns Registered scope
 */
export const requireElfScope = (control: Node): ElfAppScope => {
  let ancestor: Node | null = control;
  while (ancestor) {
    if (activeScope?.root === ancestor) {
      return activeScope;
    }
    ancestor = ancestor instanceof ShadowRoot ? ancestor.host : ancestor.parentNode;
  }
  const savedScope = controlScopes.get(control);
  if (!control.isConnected && savedScope === activeScope && savedScope) {
    return savedScope;
  }
  throw new Error('ELF control has no registered app scope. Set up ELF before connecting controls.');
};

/**
 * Save ownership before control setup; a moved control must resolve its new boundary.
 * @param control Connecting control
 * @returns {void}
 */
export const connectElfControl = (control: Node): void => {
  controlScopes.set(control, requireElfScope(control));
  connectedControls.add(control);
};

/**
 * Release a control after base-class cleanup while retaining its saved scope for subclass cleanup.
 * @param control Disconnecting control
 * @returns {void}
 */
export const disconnectElfControl = (control: Node): void => {
  connectedControls.delete(control);
};
