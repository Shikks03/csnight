'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Tag } from 'lucide-react'
import { reserveSeat, clearSeat } from './actions'
import type { Seat, Tier } from '@/lib/seats'
import { TIERS } from '@/lib/seats'

interface SeatDialogProps {
  seat: Seat
  onClose: () => void
}

const TIER_COLORS: Record<Tier, string> = {
  ACM: '#4ade80',
  'Non-ACM CS': '#60a5fa',
  External: '#f59e0b',
  Associates: '#a78bfa',
  Awardees: '#f472b6',
}

function formatSeatLabel(seat: Seat): string {
  return `Table ${seat.table_no}, Side ${seat.side}, Seat ${seat.seat_no}`
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function SeatDialog({ seat, onClose }: SeatDialogProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [mode, setMode] = useState<'view' | 'edit'>(
    seat.status === 'available' ? 'edit' : 'view',
  )
  const [name, setName] = useState(seat.registrant_name ?? '')
  const [tier, setTier] = useState<Tier>(seat.tier ?? 'ACM')
  const [error, setError] = useState('')

  function handleClose() {
    if (!isPending) onClose()
  }

  async function handleReserveOrSave() {
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    setError('')
    startTransition(async () => {
      await reserveSeat(seat.id, name.trim(), tier)
      router.refresh()
      onClose()
    })
  }

  async function handleClear() {
    startTransition(async () => {
      await clearSeat(seat.id)
      router.refresh()
      onClose()
    })
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.625rem 0.75rem 0.625rem 2.25rem',
    backgroundColor: '#0A1628',
    border: '1px solid #C89B3C',
    borderRadius: '4px',
    color: '#F5EDD8',
    fontSize: '0.9375rem',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    color: '#8BA3BF',
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: '0.375rem',
  }

  const btnBase: React.CSSProperties = {
    padding: '0.625rem 1.25rem',
    borderRadius: '4px',
    fontSize: '0.9375rem',
    fontWeight: 600,
    cursor: isPending ? 'not-allowed' : 'pointer',
    letterSpacing: '0.04em',
    transition: 'opacity 0.15s',
    opacity: isPending ? 0.6 : 1,
    border: 'none',
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.18 }}
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(10, 22, 40, 0.82)',
          backdropFilter: 'blur(2px)',
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }}
      >
        {/* Dialog panel */}
        <motion.div
          key="dialog"
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 12 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '440px',
            backgroundColor: '#0d1e38',
            border: '1px solid #C89B3C',
            borderRadius: '8px',
            padding: '1.75rem',
            position: 'relative',
            boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          }}
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            disabled={isPending}
            aria-label="Close dialog"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              color: '#8BA3BF',
              cursor: 'pointer',
              padding: '0.25rem',
              lineHeight: 0,
            }}
          >
            <X size={18} />
          </button>

          {/* Seat label */}
          <p
            style={{
              fontFamily: 'Playfair Display, serif',
              color: '#C89B3C',
              fontSize: '1.125rem',
              fontWeight: 700,
              marginBottom: '0.25rem',
            }}
          >
            {formatSeatLabel(seat)}
          </p>
          <p
            style={{
              color: '#8BA3BF',
              fontSize: '0.8125rem',
              marginBottom: '1.5rem',
              letterSpacing: '0.06em',
            }}
          >
            {seat.status === 'available' ? 'AVAILABLE' : 'RESERVED'}
          </p>

          {/* VIEW mode (reserved) */}
          {mode === 'view' && seat.status === 'reserved' && (
            <>
              <div style={{ marginBottom: '1.25rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  <User size={16} color="#8BA3BF" />
                  <span style={{ color: '#F5EDD8', fontSize: '1rem', fontWeight: 600 }}>
                    {seat.registrant_name}
                  </span>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: seat.tier ? TIER_COLORS[seat.tier] : '#8BA3BF',
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ color: '#F5EDD8', fontSize: '0.9375rem' }}>{seat.tier}</span>
                </div>
                <p style={{ color: '#8BA3BF', fontSize: '0.75rem', marginTop: '0.75rem' }}>
                  Reserved {formatTimestamp(seat.updated_at)}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setMode('edit')}
                  disabled={isPending}
                  style={{
                    ...btnBase,
                    backgroundColor: 'transparent',
                    border: '1.5px solid #C89B3C',
                    color: '#C89B3C',
                    flex: 1,
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={handleClear}
                  disabled={isPending}
                  style={{
                    ...btnBase,
                    backgroundColor: '#450a0a',
                    border: '1.5px solid #ef4444',
                    color: '#fca5a5',
                    flex: 1,
                  }}
                >
                  {isPending ? 'Clearing…' : 'Clear Seat'}
                </button>
                <button
                  onClick={handleClose}
                  disabled={isPending}
                  style={{
                    ...btnBase,
                    backgroundColor: 'transparent',
                    border: '1.5px solid #8BA3BF',
                    color: '#8BA3BF',
                    flex: 1,
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* EDIT / RESERVE mode */}
          {mode === 'edit' && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle} htmlFor="seat-name">
                  <User
                    size={11}
                    style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: 'middle' }}
                  />
                  Registrant name
                </label>
                <div style={{ position: 'relative' }}>
                  <User
                    size={15}
                    color="#8BA3BF"
                    style={{
                      position: 'absolute',
                      left: '0.65rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  />
                  <input
                    id="seat-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    autoFocus
                    style={inputStyle}
                  />
                </div>
                {error && (
                  <p style={{ color: '#ef4444', fontSize: '0.8125rem', marginTop: '0.375rem' }}>
                    {error}
                  </p>
                )}
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle} htmlFor="seat-tier">
                  <Tag
                    size={11}
                    style={{ display: 'inline', marginRight: '0.3rem', verticalAlign: 'middle' }}
                  />
                  Ticket tier
                </label>
                <div style={{ position: 'relative' }}>
                  <Tag
                    size={15}
                    color="#8BA3BF"
                    style={{
                      position: 'absolute',
                      left: '0.65rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  />
                  <select
                    id="seat-tier"
                    value={tier}
                    onChange={(e) => setTier(e.target.value as Tier)}
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    {TIERS.map((t) => (
                      <option key={t} value={t} style={{ backgroundColor: '#0A1628' }}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button
                  onClick={handleReserveOrSave}
                  disabled={isPending}
                  style={{
                    ...btnBase,
                    backgroundColor: '#C89B3C',
                    border: '1.5px solid #C89B3C',
                    color: '#0A1628',
                    flex: 2,
                  }}
                >
                  {isPending
                    ? 'Saving…'
                    : seat.status === 'available'
                    ? 'Reserve'
                    : 'Save'}
                </button>
                <button
                  onClick={() =>
                    seat.status === 'reserved' ? setMode('view') : onClose()
                  }
                  disabled={isPending}
                  style={{
                    ...btnBase,
                    backgroundColor: 'transparent',
                    border: '1.5px solid #8BA3BF',
                    color: '#8BA3BF',
                    flex: 1,
                  }}
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
