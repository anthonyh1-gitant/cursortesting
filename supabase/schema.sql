-- CreatorReach AI schema
-- Run in Supabase SQL editor.

create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  company_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  name text not null,
  product_name text not null,
  product_url text not null,
  niche text not null,
  target_audience text not null,
  campaign_goal text not null,
  offer_type text not null,
  brand_tone text not null,
  description text not null,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.creators (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  name text not null,
  handle text not null,
  platform text not null,
  niche text not null,
  follower_count bigint not null default 0,
  fit_score integer not null default 0,
  stage text not null default 'New',
  offer_type text not null,
  last_activity text,
  notes text,
  ai_hook text,
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.outreach_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  campaign_id uuid not null references public.campaigns (id) on delete cascade,
  creator_id uuid not null references public.creators (id) on delete cascade,
  subject_line text not null,
  first_message text not null,
  follow_up_one text not null,
  follow_up_two text not null,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activities (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  campaign_id uuid references public.campaigns (id) on delete cascade,
  creator_id uuid references public.creators (id) on delete cascade,
  action text not null,
  detail text not null,
  occurred_at timestamptz not null default now()
);

drop trigger if exists campaigns_set_updated_at on public.campaigns;
create trigger campaigns_set_updated_at
before update on public.campaigns
for each row
execute procedure public.set_updated_at();

drop trigger if exists creators_set_updated_at on public.creators;
create trigger creators_set_updated_at
before update on public.creators
for each row
execute procedure public.set_updated_at();

drop trigger if exists outreach_messages_set_updated_at on public.outreach_messages;
create trigger outreach_messages_set_updated_at
before update on public.outreach_messages
for each row
execute procedure public.set_updated_at();

alter table public.users enable row level security;
alter table public.campaigns enable row level security;
alter table public.creators enable row level security;
alter table public.outreach_messages enable row level security;
alter table public.activities enable row level security;

create policy "users can read own profile"
  on public.users for select
  using (auth.uid() = id);

create policy "users can upsert own profile"
  on public.users for all
  using (auth.uid() = id)
  with check (auth.uid() = id);

create policy "users manage own campaigns"
  on public.campaigns for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users manage own creators"
  on public.creators for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users manage own outreach messages"
  on public.outreach_messages for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users manage own activities"
  on public.activities for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
