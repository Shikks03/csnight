-- ============================================================
-- CS Night — Seats Table Schema
-- Run once in the Supabase SQL editor.
-- Safe to re-run (IF NOT EXISTS / ON CONFLICT DO NOTHING).
-- ============================================================


-- ------------------------------------------------------------
-- 1. TABLE DDL
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS seats (
  id               text        PRIMARY KEY,          -- e.g. "T01-A1"
  table_no         integer     NOT NULL CHECK (table_no BETWEEN 1 AND 16),
  side             text        NOT NULL CHECK (side IN ('A', 'B')),
  seat_no          integer     NOT NULL CHECK (seat_no BETWEEN 1 AND 8),
  status           text        NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'reserved')),
  registrant_name  text,                             -- nullable
  tier             text        CHECK (tier IN ('ACM', 'Non-ACM CS', 'External', 'Associates', 'Awardees')), -- nullable
  updated_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (table_no, side, seat_no)
);


-- ------------------------------------------------------------
-- 2. ROW-LEVEL SECURITY
-- No public policies — only the server-side service-role key
-- (which bypasses RLS entirely) may read/write this table.
-- ------------------------------------------------------------

ALTER TABLE seats ENABLE ROW LEVEL SECURITY;


-- ------------------------------------------------------------
-- 3. UPDATED_AT TRIGGER
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS seats_set_updated_at ON seats;

CREATE TRIGGER seats_set_updated_at
  BEFORE UPDATE ON seats
  FOR EACH ROW
  EXECUTE FUNCTION set_updated_at();


-- ------------------------------------------------------------
-- 4. 256-ROW SEED  (16 tables × 2 sides × 8 seats)
-- Generated via a DO block so the file stays concise but every
-- row is deterministic.  ON CONFLICT DO NOTHING makes it safe
-- to re-run at any time without wiping existing reservations.
--
-- To reset all reservations during development, uncomment:
-- UPDATE seats SET status = 'available', registrant_name = NULL, tier = NULL;
-- ------------------------------------------------------------

DO $$
DECLARE
  t  integer;
  s  text;
  n  integer;
  sid text;
BEGIN
  FOR t IN 1..16 LOOP
    FOREACH s IN ARRAY ARRAY['A', 'B'] LOOP
      FOR n IN 1..8 LOOP
        sid := 'T' || lpad(t::text, 2, '0') || '-' || s || n::text;
        INSERT INTO seats (id, table_no, side, seat_no)
        VALUES (sid, t, s, n)
        ON CONFLICT (id) DO NOTHING;
      END LOOP;
    END LOOP;
  END LOOP;
END;
$$;
