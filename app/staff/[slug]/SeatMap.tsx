'use client'

import { useState } from 'react'
import type { Seat, Tier } from '@/lib/seats'
import { TABLES, SIDES, SEATS_PER_SIDE, seatId } from '@/lib/seats'
import SeatDialog from './SeatDialog'

interface SeatMapProps {
  seats: Seat[]
}

const TIER_COLORS: Record<Tier, string> = {
  ACM: '#4ade80',
  'Non-ACM CS': '#60a5fa',
  External: '#f59e0b',
  Associates: '#a78bfa',
  Awardees: '#f472b6',
}

function getInitials(name: string | null): string {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return name.slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

export default function SeatMap({ seats }: SeatMapProps) {
  const [selected, setSelected] = useState<Seat | null>(null)

  // Index seats by id for O(1) lookup
  const seatMap = new Map<string, Seat>(seats.map((s) => [s.id, s]))

  // Summary stats
  const reserved = seats.filter((s) => s.status === 'reserved')
  const total = TABLES * SIDES.length * SEATS_PER_SIDE // 256

  const tierCounts: Record<Tier, number> = {
    ACM: 0,
    'Non-ACM CS': 0,
    External: 0,
    Associates: 0,
    Awardees: 0,
  }
  for (const s of reserved) {
    if (s.tier) tierCounts[s.tier]++
  }

  return (
    <>
      {/* Sticky summary header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: '#0d1e38',
          borderBottom: '1px solid rgba(200, 155, 60, 0.35)',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'Playfair Display, serif',
            color: '#C89B3C',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          CS Night — Seat Panel
        </span>

        <span
          style={{
            color: '#F5EDD8',
            fontSize: '0.9375rem',
            fontWeight: 600,
          }}
        >
          {reserved.length} / {total} reserved
        </span>

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            marginLeft: 'auto',
          }}
        >
          {(['ACM', 'Non-ACM CS', 'External', 'Associates', 'Awardees'] as Tier[]).map((t) => (
            <span
              key={t}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.375rem',
                color: '#8BA3BF',
                fontSize: '0.8125rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: TIER_COLORS[t],
                  flexShrink: 0,
                }}
              />
              {t}: <span style={{ color: '#F5EDD8', fontWeight: 600 }}>{tierCounts[t]}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Table grid */}
      <div
        style={{
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {Array.from({ length: TABLES }, (_, i) => i + 1).map((tableNo) => (
          <TableCard
            key={tableNo}
            tableNo={tableNo}
            seatMap={seatMap}
            onSelect={setSelected}
          />
        ))}
      </div>

      {/* Dialog */}
      {selected && (
        <SeatDialog seat={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// TableCard
// ---------------------------------------------------------------------------

interface TableCardProps {
  tableNo: number
  seatMap: Map<string, Seat>
  onSelect: (seat: Seat) => void
}

function TableCard({ tableNo, seatMap, onSelect }: TableCardProps) {
  return (
    <div
      style={{
        backgroundColor: '#0d1e38',
        border: '1px solid rgba(200, 155, 60, 0.3)',
        borderRadius: '8px',
        padding: '1rem 1.125rem',
      }}
    >
      <p
        style={{
          color: '#C89B3C',
          fontSize: '0.8125rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: '0.875rem',
        }}
      >
        {tableNo === 16 ? "Associate's Table" : `Table ${tableNo}`}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {SIDES.map((side) => (
          <div key={side}>
            <p
              style={{
                color: '#8BA3BF',
                fontSize: '0.6875rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}
            >
              {tableNo === 15 && side === 'B' ? "Awardees Table" : `Side ${side}`}
            </p>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
              {Array.from({ length: SEATS_PER_SIDE }, (_, j) => j + 1).map((seatNo) => {
                const id = seatId(tableNo, side, seatNo)
                const seat = seatMap.get(id)
                return (
                  <SeatButton
                    key={id}
                    seatNo={seatNo}
                    seat={seat}
                    onSelect={onSelect}
                  />
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SeatButton
// ---------------------------------------------------------------------------

interface SeatButtonProps {
  seatNo: number
  seat: Seat | undefined
  onSelect: (seat: Seat) => void
}

function SeatButton({ seatNo, seat, onSelect }: SeatButtonProps) {
  const [hovered, setHovered] = useState(false)

  if (!seat) {
    // Seat not in DB yet — render as placeholder
    return (
      <div
        style={{
          width: '44px',
          height: '44px',
          border: '1.5px dashed rgba(200, 155, 60, 0.2)',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgba(245, 237, 216, 0.2)',
          fontSize: '0.6875rem',
        }}
      >
        {seatNo}
      </div>
    )
  }

  const isReserved = seat.status === 'reserved'
  const initials = getInitials(seat.registrant_name)

  return (
    <button
      onClick={() => onSelect(seat)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={
        isReserved
          ? `${seat.registrant_name} (${seat.tier})`
          : `Seat ${seatNo} — available`
      }
      style={{
        width: '44px',
        height: '44px',
        borderRadius: '4px',
        border: '1.5px solid #C89B3C',
        backgroundColor: isReserved
          ? '#2a1f0a'
          : hovered
          ? 'rgba(200, 155, 60, 0.2)'
          : 'transparent',
        color: '#F5EDD8',
        fontSize: isReserved ? '0.6875rem' : '0.75rem',
        fontWeight: isReserved ? 700 : 400,
        cursor: 'pointer',
        position: 'relative',
        transition: 'background-color 0.12s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: 1,
        padding: 0,
      }}
    >
      {isReserved ? initials : seatNo}

      {/* Tier dot */}
      {isReserved && seat.tier && (
        <span
          style={{
            position: 'absolute',
            top: '3px',
            right: '3px',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: TIER_COLORS[seat.tier],
          }}
        />
      )}
    </button>
  )
}
