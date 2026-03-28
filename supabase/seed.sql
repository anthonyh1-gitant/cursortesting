-- CreatorReach AI seed data
-- Replace USER_UUID before running.

-- Example:
-- do $$
-- declare
--   u uuid := '00000000-0000-0000-0000-000000000000';
-- begin
--   ...
-- end $$;

insert into public.campaigns (
  id,
  user_id,
  name,
  product_name,
  product_url,
  niche,
  target_audience,
  campaign_goal,
  offer_type,
  brand_tone,
  description,
  status
)
values
  (
    '11111111-1111-1111-1111-111111111111',
    'USER_UUID',
    'Spring UGC Push',
    'Aurora Sleep Gummies',
    'https://example.com/aurora-gummies',
    'Wellness',
    'Busy professionals, 24-38',
    'Drive creator-led UGC and trial purchases',
    'Gifted Product',
    'Warm, science-backed, premium',
    'Partner with nano and micro creators focused on productivity, sleep routines, and healthy habits.',
    'active'
  ),
  (
    '22222222-2222-2222-2222-222222222222',
    'USER_UUID',
    'Founder Story Series',
    'ScaleFlow CRM',
    'https://example.com/scaleflow',
    'B2B SaaS',
    'Early-stage startup founders',
    'Book demos through trusted founder creators',
    'Affiliate',
    'Direct, operator-first, smart',
    'Creator partnerships centered around transparent founder workflows and GTM lessons.',
    'active'
  );

insert into public.creators (
  id,
  user_id,
  campaign_id,
  name,
  handle,
  platform,
  niche,
  follower_count,
  fit_score,
  stage,
  offer_type,
  last_activity,
  notes,
  ai_hook,
  summary
)
values
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    'USER_UUID',
    '11111111-1111-1111-1111-111111111111',
    'Mina Patel',
    '@mindfulmina',
    'Instagram',
    'Wellness',
    34500,
    91,
    'Ready to Send',
    'Gifted Product',
    'Generated first outreach draft',
    'Strong audience overlap with routine-focused content.',
    'Your 30-second sleep reset reel aligns with our science-backed launch.',
    'High-fit wellness creator with strong short-form retention.'
  ),
  (
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    'USER_UUID',
    '22222222-2222-2222-2222-222222222222',
    'Sara Kim',
    '@sarakimfounder',
    'LinkedIn',
    'Startup Ops',
    15600,
    88,
    'Interested',
    'Affiliate',
    'Positive reply received',
    'Requested co-created educational content.',
    'Your founder-led sales post is a natural fit for a CRM teardown.',
    'High-credibility B2B creator with decision-maker audience.'
  );

insert into public.outreach_messages (
  user_id,
  campaign_id,
  creator_id,
  subject_line,
  first_message,
  follow_up_one,
  follow_up_two,
  status
)
values
  (
    'USER_UUID',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    'Loved your night routine content, Mina',
    'Hi Mina — your recent sleep reset reel stood out. We are launching science-backed sleep gummies and would love to send a package for honest feedback and potential collab.',
    'Quick follow-up in case this got buried. Happy to share examples and audience insights.',
    'Last nudge from me — no pressure either way.',
    'ready'
  );

insert into public.activities (
  user_id,
  campaign_id,
  creator_id,
  action,
  detail
)
values
  (
    'USER_UUID',
    '11111111-1111-1111-1111-111111111111',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa1',
    'Draft Generated',
    'AI generated outreach sequence for Mina Patel.'
  ),
  (
    'USER_UUID',
    '22222222-2222-2222-2222-222222222222',
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaa2',
    'Reply Received',
    'Positive reply received from Sara Kim.'
  );
