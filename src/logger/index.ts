class Logger {
  private out: (value: string) => void;
  constructor(out: (value: string) => void) {
    this.out = out;
  }

  log(message: string) {
    this.out(message);
  }
}

export default Logger;
