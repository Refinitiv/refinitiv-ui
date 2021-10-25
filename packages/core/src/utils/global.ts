import type { ELF } from '../interfaces/ELF';

type Global = typeof globalThis & { elf: ELF; Elf: ELF; ELF: ELF };
export const global = (typeof window === 'undefined' ? this || {} : window) as Global;
