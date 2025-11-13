import { createConsola } from 'consola';

export interface LoggerOptions {
  name: string;
  fancy?: boolean;
}

const logLevel = Number(
  process.env.LOG_LEVEL
  ?? process.env.NODE_ENV === 'test'
    ? -999
    : process.env.NODE_ENV === 'development'
      ? 4 : 3,
);

export const createLogger = (options: LoggerOptions) => {
  const {
    name,
    fancy = true,
  } = options;

  return createConsola({
    level: logLevel,
    formatOptions: {
      colors: fancy,
      compact: !fancy,
    },
    defaults: {
      tag: name,
    },
  });
};
