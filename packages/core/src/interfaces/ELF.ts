import type { CustomStyleRegistry } from '../registries/CustomStyleRegistry';
import type { NativeStyleRegistry } from '../registries/NativeStyleRegistry';

export interface ELF {
  version: string;
  customStyles: typeof CustomStyleRegistry;
  nativeStyles: typeof NativeStyleRegistry;
}
