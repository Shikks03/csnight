export const TABLES = 16
export const SIDES = ['A', 'B'] as const
export const SEATS_PER_SIDE = 8
export const TIERS = ['ACM', 'Non-ACM CS', 'External', 'Associates', 'Awardees'] as const

export type Side = typeof SIDES[number]       // 'A' | 'B'
export type Tier = typeof TIERS[number]       // 'ACM' | 'Non-ACM CS' | 'External'
export type SeatStatus = 'available' | 'reserved'

export interface Seat {
  id: string
  table_no: number
  side: Side
  seat_no: number
  status: SeatStatus
  registrant_name: string | null
  tier: Tier | null
  updated_at: string
}

// Build seat ID from components, e.g. seatId(1, 'A', 1) → 'T01-A1'
export function seatId(tableNo: number, side: Side, seatNo: number): string {
  return `T${String(tableNo).padStart(2, '0')}-${side}${seatNo}`
}
