import { timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

/**
 * The contact submissions and maintenance endpoints expose personal data and
 * billable third-party calls, so every one of them requires the bearer token
 * held in ADMIN_TOKEN. With the secret unset they fail closed.
 */
function tokensMatch(provided: string, expected: string) {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function requireAdmin(request: NextRequest): NextResponse | null {
  const secret = process.env.ADMIN_TOKEN;
  if (!secret) {
    return NextResponse.json(
      { success: false, error: 'ADMIN_TOKEN is not configured on this deployment' },
      { status: 503 }
    );
  }

  const header = request.headers.get('authorization') ?? '';
  const provided = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!provided || !tokensMatch(provided, secret)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return null;
}
