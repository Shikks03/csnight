import 'server-only'
import { createHmac, timingSafeEqual } from 'crypto'

export const SESSION_COOKIE_NAME = 'cs_admin'

export const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: 60 * 60 * 8, // 8 hours
}

// Signed payload constant — what we HMAC to produce the session token.
const SESSION_PAYLOAD = 'admin'

// HMAC-SHA256 of `data` keyed with ADMIN_PASSWORD. Returns hex string.
export function signSessionToken(data: string): string {
  const secret = process.env.ADMIN_PASSWORD!
  return createHmac('sha256', secret).update(data).digest('hex')
}

// Constant-time verify: re-derive the expected token and compare.
export function verifySessionCookie(cookieValue: string): boolean {
  const expected = signSessionToken(SESSION_PAYLOAD)
  try {
    const a = Buffer.from(cookieValue, 'hex')
    const b = Buffer.from(expected, 'hex')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

// Build the session token that gets stored in the cookie.
export function buildSessionToken(): string {
  return signSessionToken(SESSION_PAYLOAD)
}

// Constant-time password check: hash both sides to equalise length before comparing.
export function checkPassword(input: string): boolean {
  const secret = process.env.ADMIN_PASSWORD ?? ''
  const a = createHmac('sha256', 'pw-check').update(input).digest()
  const b = createHmac('sha256', 'pw-check').update(secret).digest()
  return timingSafeEqual(a, b)
}
