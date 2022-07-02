export const getEnumValues = <T extends Record<string, string>>(
  enums: T
): Array<keyof T> => {
  return Object.values(enums);
};

/**
 * Delay invoking function and kill previously invoked function
 * @params wait: millisecond
 */
export class Debouncer {
  private timer: number | undefined;
  constructor(readonly wait: number) {
    this.wait = wait;
    this.timer = undefined;
  }
  cancel() {
    if (this.timer) window.clearTimeout(this.timer);
  }

  debouce(callback: () => void) {
    if (this.timer) window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      callback();
    }, this.wait);
  }
}
