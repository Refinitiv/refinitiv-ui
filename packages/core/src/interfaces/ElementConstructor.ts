import type { BasicElement } from '../elements/BasicElement';
export type ElementConstructor = typeof BasicElement & {
  new (): BasicElement;
}
