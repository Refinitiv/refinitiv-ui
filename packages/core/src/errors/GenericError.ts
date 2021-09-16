const generateMessage = (message: string, supportURL?: string): string =>
  !supportURL ? message : `${message}\n\n${supportURL}\n`;

export class GenericError extends Error {
  constructor (message: string, supportURL?: string) {
    super(generateMessage(message, supportURL));
    this.stack = undefined; // Clean error
  }
}
