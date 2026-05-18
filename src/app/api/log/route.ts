import { NextRequest, NextResponse } from 'next/server';
import { vercelLog } from '../../../../lib/vercel-log';

const ALLOWED_LEVELS = new Set(['debug', 'info', 'warn', 'error'] as const);
type AllowedLevel = 'debug' | 'info' | 'warn' | 'error';

const normalizeValue = (value: unknown): unknown => {
  if (value == null) return undefined;
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return value;
  if (value instanceof Error) return { message: value.message, stack: value.stack, name: value.name };
  if (Array.isArray(value)) return value.map(normalizeValue);
  if (typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .map(([key, entry]) => [key, normalizeValue(entry)])
        .filter(([, entry]) => entry !== undefined)
    );
  }
  return String(value);
};

export async function POST(request: NextRequest) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    /* ignore */
  }

  const rawLevel = body.level as string | undefined;
  const level: AllowedLevel = ALLOWED_LEVELS.has(rawLevel as AllowedLevel) ? (rawLevel as AllowedLevel) : 'info';
  const message = typeof body.message === 'string' && body.message.trim() ? body.message.trim() : 'Client log event';
  const metadata = normalizeValue({
    source: 'client',
    pathname: typeof body.pathname === 'string' ? body.pathname : undefined,
    timestamp: typeof body.timestamp === 'string' ? body.timestamp : new Date().toISOString(),
    userAgent: typeof body.userAgent === 'string' ? body.userAgent : undefined,
    context: body.context,
  }) as Record<string, unknown>;

  vercelLog(level, `[client] ${message}`, metadata);
  return new NextResponse(null, { status: 204 });
}
