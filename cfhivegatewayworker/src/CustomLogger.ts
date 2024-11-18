class Logger {
    constructor(private prefix?: string) {}
    public child(name: string) {
      return new Logger(name);
    }
    public log(...args: any) {
      if (this.prefix) console.log(`${this.prefix}:`);
      console.log(...args);
    }
    public info(...args: any) {
      if (this.prefix) console.info(`${this.prefix}:`);
      console.info(...args);
    }
    public warn(...args: any) {
      if (this.prefix) console.warn(`${this.prefix}:`);
      console.warn(...args);
    }
    public error(...args: any) {
      if (this.prefix) console.error(`${this.prefix}:`);
      console.error(...args);
    }
    public debug(...args: any) {
      if (this.prefix) console.debug(`${this.prefix}:`);
      console.debug(...args); 
    }
  }

export default Logger;