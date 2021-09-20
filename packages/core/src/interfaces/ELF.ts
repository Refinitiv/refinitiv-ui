import { CustomStyleRegistry } from '../registries/CustomStyleRegistry';
import { NativeStyleRegistry } from '../registries/NativeStyleRegistry';

export interface ELF {
  version: string;
  customStyles: typeof CustomStyleRegistry;
  nativeStyles: typeof NativeStyleRegistry;
}
