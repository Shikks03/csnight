'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import {
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_OPTIONS,
  verifySessionCookie,
  checkPassword,
  buildSessionToken,
} from '@/lib/auth'
import { getSupabaseClient } from '@/lib/supabase'
import { TIERS, type Tier } from '@/lib/seats'

const adminPath = '/staff/' + process.env.ADMIN_PATH_SLUG!

async function getVerifiedCookie(): Promise<boolean> {
  const cookieStore = await cookies()
  const cookie = cookieStore.get(SESSION_COOKIE_NAME)
  if (!cookie) return false
  return verifySessionCookie(cookie.value)
}

export async function login(formData: FormData) {
  const password = formData.get('password')
  if (typeof password !== 'string' || !password) {
    redirect(adminPath + '?error=1')
  }

  const valid = checkPassword(password)
  if (!valid) {
    redirect(adminPath + '?error=1')
  }

  const token = buildSessionToken()
  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, token, SESSION_COOKIE_OPTIONS)
  redirect(adminPath)
}

export async function reserveSeat(
  seatId: string,
  registrantName: string,
  tier: Tier,
) {
  const authed = await getVerifiedCookie()
  if (!authed) redirect(adminPath)

  if (!TIERS.includes(tier as Tier) || !registrantName.trim()) {
    redirect(adminPath)
  }

  await (getSupabaseClient().from('seats') as any) // no generated DB types yet
    .update({
      status: 'reserved',
      registrant_name: registrantName,
      tier,
      updated_at: new Date().toISOString(),
    })
    .eq('id', seatId)

  revalidatePath(adminPath)
}

export async function clearSeat(seatId: string) {
  const authed = await getVerifiedCookie()
  if (!authed) redirect(adminPath)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  await (getSupabaseClient().from('seats') as any)
    .update({
      status: 'available',
      registrant_name: null,
      tier: null,
      updated_at: new Date().toISOString(),
    })
    .eq('id', seatId)

  revalidatePath(adminPath)
}

