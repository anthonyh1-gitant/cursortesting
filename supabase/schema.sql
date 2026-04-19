-- CreatorReach AI — Supabase Database Schema
-- Run this in your Supabase SQL Editor to create all tables.

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- Users (extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  company_name text,
  avatar_url text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

create policy "Users can insert own profile" on public.profiles
  for insert with check (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Campaigns
create table public.campaigns (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  name text not null,
  product_name text not null,
  product_url text,
  niche text,
  target_audience text,
  campaign_goal text,
  offer_type text check (offer_type in ('gifted', 'paid', 'affiliate', 'revenue_share', 'barter', 'other')) default 'gifted',
  brand_tone text check (brand_tone in ('friendly', 'professional', 'casual', 'premium', 'playful', 'bold')) default 'friendly',
  description text,
  status text check (status in ('active', 'paused', 'completed', 'draft')) default 'draft',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

alter table public.campaigns enable row level security;

create policy "Users can CRUD own campaigns" on public.campaigns
  for all using (auth.uid() = user_id);

-- Creators
create table public.creators (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  campaign_id uuid references public.campaigns(id) on delete set null,
  name text not null,
  handle text not null,
  platform text check (platform in ('instagram', 'tiktok', 'youtube', 'twitter', 'linkedin')) not null,
  niche text,
  follower_count integer default 0,
  engagement_rate numeric(5,2),
  fit_score integer default 0 check (fit_score between 0 and 100),
  stage text check (stage in ('new', 'reviewed', 'drafted', 'ready_to_send', 'sent', 'replied', 'interested', 'negotiating', 'won', 'not_interested')) default 'new',
  offer_type text check (offer_type in ('gifted', 'paid', 'affiliate', 'revenue_share', 'barter', 'other')) default 'gifted',
  email text,
  bio text,
  avatar_url text,
  notes text,
  ai_hooks text[],
  ai_summary text,
  last_activity timestamptz default now() not null,
  created_at timestamptz default now() not null
);

alter table public.creators enable row level security;

create policy "Users can CRUD own creators" on public.creators
  for all using (auth.uid() = user_id);

-- Outreach Messages
create table public.outreach_messages (
  id uuid default uuid_generate_v4() primary key,
  creator_id uuid references public.creators(id) on delete cascade not null,
  campaign_id uuid references public.campaigns(id) on delete cascade not null,
  channel text check (channel in ('email', 'dm', 'linkedin', 'other')) default 'email',
  type text check (type in ('initial', 'follow_up_1', 'follow_up_2', 'custom')) default 'initial',
  subject text,
  body text not null,
  status text check (status in ('draft', 'ready', 'sent', 'replied')) default 'draft',
  sent_at timestamptz,
  created_at timestamptz default now() not null
);

alter table public.outreach_messages enable row level security;

create policy "Users can CRUD own messages" on public.outreach_messages
  for all using (
    exists (
      select 1 from public.creators
      where creators.id = outreach_messages.creator_id
        and creators.user_id = auth.uid()
    )
  );

-- Activities
create table public.activities (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  type text check (type in ('campaign_created', 'creator_added', 'message_drafted', 'message_sent', 'reply_received', 'stage_changed', 'creator_won')) not null,
  title text not null,
  description text,
  campaign_id uuid references public.campaigns(id) on delete set null,
  creator_id uuid references public.creators(id) on delete set null,
  created_at timestamptz default now() not null
);

alter table public.activities enable row level security;

create policy "Users can CRUD own activities" on public.activities
  for all using (auth.uid() = user_id);

-- Indexes for performance
create index idx_campaigns_user on public.campaigns(user_id);
create index idx_creators_user on public.creators(user_id);
create index idx_creators_campaign on public.creators(campaign_id);
create index idx_creators_stage on public.creators(stage);
create index idx_outreach_creator on public.outreach_messages(creator_id);
create index idx_outreach_campaign on public.outreach_messages(campaign_id);
create index idx_activities_user on public.activities(user_id);
create index idx_activities_created on public.activities(created_at desc);

-- Updated_at trigger
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger campaigns_updated_at
  before update on public.campaigns
  for each row execute procedure update_updated_at();
