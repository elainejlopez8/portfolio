const LOG_LEVELS = {
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
};

export const vercelLog = (level, message, metadata) => {
  const method = LOG_LEVELS[level] || LOG_LEVELS.info;

  if (metadata && Object.keys(metadata).length > 0) {
    console[method](message, metadata);
    return;
  }

  console[method](message);
};
