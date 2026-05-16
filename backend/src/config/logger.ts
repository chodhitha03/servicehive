type LogMeta = Record<string, unknown>;

export const logger = {
  info: (message: string, meta?: LogMeta): void => {
    if (meta) {
      console.log(message, meta);
      return;
    }
    console.log(message);
  },
  error: (message: string, meta?: LogMeta): void => {
    if (meta) {
      console.error(message, meta);
      return;
    }
    console.error(message);
  }
};