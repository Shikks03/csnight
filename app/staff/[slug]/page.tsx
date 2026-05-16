import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import {
  SESSION_COOKIE_NAME,
  verifySessionCookie,
} from '@/lib/auth'
import { getSupabaseClient } from '@/lib/supabase'
import SeatMap from './SeatMap'
import { login } from './actions'

export const revalidate = 15

interface Props {
  params: Promise<{ slug: string }>
}

export default async function AdminPage({ params }: Props) {
  const { slug } = await params

  if (slug !== process.env.ADMIN_PATH_SLUG) {
    notFound()
  }

  const cookieStore = await cookies()
  const cookie = cookieStore.get(SESSION_COOKIE_NAME)
  const authenticated = cookie ? verifySessionCookie(cookie.value) : false

  if (!authenticated) {
    return (
      <main
        style={{
          minHeight: '100vh',
          backgroundColor: '#0A1628',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '400px',
            padding: '2.5rem 2rem',
            border: '1px solid #C89B3C',
            borderRadius: '8px',
            backgroundColor: '#0d1e38',
          }}
        >
          <h1
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#C89B3C',
              fontSize: '1.5rem',
              fontWeight: 700,
              textAlign: 'center',
              marginBottom: '0.5rem',
            }}
          >
            CS Night
          </h1>
          <p
            style={{
              color: '#8BA3BF',
              fontSize: '0.875rem',
              textAlign: 'center',
              marginBottom: '2rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            Staff Portal
          </p>

          <form action={login}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label
                htmlFor="password"
                style={{
                  display: 'block',
                  color: '#F5EDD8',
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                }}
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                style={{
                  width: '100%',
                  padding: '0.625rem 0.875rem',
                  backgroundColor: '#0A1628',
                  border: '1px solid #C89B3C',
                  borderRadius: '4px',
                  color: '#F5EDD8',
                  fontSize: '1rem',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'transparent',
                border: '1px solid #C89B3C',
                borderRadius: '4px',
                color: '#C89B3C',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
    )
  }

  const { data: seats } = await getSupabaseClient()
    .from('seats')
    .select('*')
    .order('table_no', { ascending: true })
    .order('side', { ascending: true })
    .order('seat_no', { ascending: true })

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#0A1628',
        color: '#F5EDD8',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <SeatMap seats={seats ?? []} />
    </main>
  )
}
