/*
# Create yandex_reviews table for caching Yandex Maps reviews

1. New Tables
- `yandex_reviews`: caches reviews fetched from Yandex Maps for the КосмоВита clinic
  - `id` (text, primary key) — Yandex review ID
  - `author` (text) — reviewer name
  - `avatar_url` (text, nullable) — reviewer avatar URL template
  - `rating` (int) — 1-5 star rating
  - `text` (text) — review body
  - `review_date` (date, nullable) — when the review was posted/updated
  - `fetched_at` (timestamptz) — when this row was last refreshed from Yandex
2. Security
- Enable RLS on `yandex_reviews`.
- Allow anon + authenticated SELECT (data is public, read-only from the site).
- No INSERT/UPDATE/DELETE from the frontend — only the edge function (service role) writes.
*/

CREATE TABLE IF NOT EXISTS yandex_reviews (
  id text PRIMARY KEY,
  author text NOT NULL,
  avatar_url text,
  rating int NOT NULL DEFAULT 5,
  text text NOT NULL,
  review_date date,
  fetched_at timestamptz DEFAULT now()
);

ALTER TABLE yandex_reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_yandex_reviews" ON yandex_reviews;
CREATE POLICY "anon_read_yandex_reviews"
ON yandex_reviews FOR SELECT
TO anon, authenticated
USING (true);
