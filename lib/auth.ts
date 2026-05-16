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

/**
 * HMAC-SHA256 of `data` keyed with ADMIN_PASSWORD env var.
 * Returns a hex string suitable for use as a session token.
 */
export async function signSessionToken(data: string): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD!
  const hmac = createHmac('sha256', secret)
  hmac.update(data)
  return hmac.digest('hex')
}

/**
 * Constant-time compare of a stored cookie value against a freshly
 * computed HMAC of ADMIN_PASSWORD.
 */
export async function verifySessionCookie(cookieValue: string): Promise<boolean> {
  const expected = await signSessionToken(process.env.ADMIN_PASSWORD!)
  try {
    const a = Buffer.from(cookieValue, 'hex')
    const b = Buffer.from(expected, 'hex')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

/**
 * Constant-time string compare of `input` against ADMIN_PASSWORD env var.
 */
export function checkPassword(input: string): boolean {
  const secret = process.env.ADMIN_PASSWORD ?? ''
  try {
    const a = Buffer.from(input)
    const b = Buffer.from(secret)
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}
