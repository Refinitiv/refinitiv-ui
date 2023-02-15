const cleanKey = (key: string):string => {
  return (key.match(/\[.*\]\[(.*)\]/s) || [])[1] || '';
};

const all = (name: string): string[] => {
  const result: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i) as string;
    if (key.startsWith(`[${name}]`)) {
      result.push(cleanKey(key));
    }
  }
  return result;
};

type StorageItem = [string, string];

export class LocalStorage {
  name: string;
  constructor (id: string) {
    this.name = id;
  }
  getItem (key: string): string | null {
    return localStorage.getItem(`[${this.name}][${key}]`);
  }
  setItem (key: string, value: string): void {
    return localStorage.setItem(`[${this.name}][${key}]`, value);
  }
  removeItem (key: string): void {
    return localStorage.removeItem(`[${this.name}][${key}]`);
  }
  clear (): void {
    all(this.name).forEach(key => this.removeItem(key));
  }
  keys (): IterableIterator<string> {
    return all(this.name).values();
  }
  values (): IterableIterator<string | null> {
    return all(this.name).map(key => this.getItem(key)).values();
  }
  list (): IterableIterator<StorageItem> {
    return all(this.name).map<StorageItem>(key => [key, this.getItem(key) || '']).values();
  }
}
