const VERCEL_LOG_ENDPOINT = '/api/log';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

type LogContext = Record<string, unknown>;

type ClientLogPayload = {
  level: LogLevel;
  message: string;
  context?: LogContext;
  pathname?: string;
  timestamp: string;
  userAgent?: string;
};

const normalizeUnknown = (value: unknown): unknown => {
  if (value == null || typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return value;
  }

  if (value instanceof Error) {
    return {
      name: value.name,
      message: value.message,
      stack: value.stack,
    };
  }

  if (Array.isArray(value)) {
    return value.map((entry) => normalizeUnknown(entry));
  }

  if (typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, normalizeUnknown(entry)]));
  }

  return String(value);
};

const sendLog = async (payload: ClientLogPayload) => {
  if (typeof window === 'undefined') {
    return;
  }

  const body = JSON.stringify(payload);

  if (typeof navigator !== 'undefined' && typeof navigator.sendBeacon === 'function') {
    const blob = new Blob([body], { type: 'application/json' });
    if (navigator.sendBeacon(VERCEL_LOG_ENDPOINT, blob)) {
      return;
    }
  }

  await fetch(VERCEL_LOG_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body,
    keepalive: true,
  }).catch(() => undefined);
};

export const logClientEvent = async (level: LogLevel, message: string, context?: LogContext) => {
  await sendLog({
    level,
    message,
    context: normalizeUnknown(context) as LogContext | undefined,
    pathname: typeof window !== 'undefined' ? window.location.pathname : undefined,
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
  });
};

export const logClientError = async (message: string, error: unknown, context?: LogContext) => {
  await logClientEvent('error', message, {
    ...context,
    error: normalizeUnknown(error),
  });
};
