-- V1 teaser: email capture table
-- Stores emails submitted via the landing page form.

create table if not exists email_signups (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique,
  created_at timestamptz not null default now(),
  source     text default 'v1_teaser'
);

-- Enable RLS — anon role can insert only, never read or delete
alter table email_signups enable row level security;

create policy "anon insert only"
  on email_signups
  for insert
  to anon
  with check (true);
