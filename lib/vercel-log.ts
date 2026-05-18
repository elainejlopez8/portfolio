/* eslint-disable no-console */
const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

export const vercelLog = (level: LogLevel, message: string, metadata?: Record<string, unknown>) => {
  const method = LOG_LEVELS.includes(level) ? level : 'info';

  if (metadata && Object.keys(metadata).length > 0) {
    console[method](message, metadata);
    return;
  }

  console[method](message);
};
