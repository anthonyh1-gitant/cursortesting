# CreatorReach AI

CreatorReach AI is a modern SaaS-style web app for **AI-assisted creator outreach CRM**.  
It helps founders and small brands plan campaigns, manage creator relationships, generate personalized outreach drafts, and track pipeline movement safely.

> Compliance-first by design: this app is **not** a bulk auto-DM tool and does not include social credential scraping or prohibited automation flows.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui-inspired component structure (reusable local UI primitives)
- Supabase (Auth + Postgres-ready schema)
- Recharts (analytics)
- dnd-kit (pipeline drag-and-drop)

## Features Implemented

- Email/password auth UI using Supabase client integration
- Protected `/app/*` routes via `middleware.ts` + server layout checks
- Responsive app shell with sidebar nav and topbar
- Light/dark mode support (`next-themes`)
- Dashboard with KPI cards, recent campaigns, recent activity, trend chart
- Campaign list + create campaign modal
- Campaign detail page with tabs:
  - Creators
  - Messages
  - Pipeline
  - Analytics
  - Settings
- Creators CRM:
  - Search + platform/stage filters
  - Rich table columns
  - Manual creator add flow
  - Detail side panel (summary, notes, AI hook, outreach, timeline)
- Pipeline board with drag/drop stages:
  - New, Reviewed, Drafted, Ready to Send, Sent, Replied, Interested, Negotiating, Won, Not Interested
- AI Outreach Studio:
  - Context form + channel/tone/CTA/offer controls
  - Generated subject + 3-message sequence
  - Rewrite actions (shorter/warmer/premium/less salesy/social proof)
  - Editable outputs + copy-to-clipboard
- AI architecture:
  - Mock generation service
  - Future OpenAI adapter placeholders
  - API routes for outreach and creator-insights generation
- Analytics page with funnel chart, reply rate, and conversion cards
- Settings page with explicit safety/compliance guidance
- Supabase-ready SQL schema + seed SQL
- Mock seed data throughout app so UI feels alive immediately

## Project Structure

```text
src/
  app/
    (auth)/login
    (auth)/signup
    (app)/app/...
    api/ai/...
  components/
    analytics/
    auth/
    campaigns/
    creators/
    dashboard/
    layout/
    outreach/
    ui/
  lib/
    ai/
    supabase/
    constants.ts
    env.ts
    mock-data.ts
    presentation.ts
    types.ts
supabase/
  schema.sql
  seed.sql
middleware.ts
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment file:

```bash
cp .env.example .env.local
```

3. Fill in Supabase values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_USE_MOCK_AI=true
```

4. Run dev server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Schema + Seed

1. Run `supabase/schema.sql` in the Supabase SQL editor.
2. Replace `USER_UUID` placeholders in `supabase/seed.sql`.
3. Run `supabase/seed.sql`.

The schema includes:

- `users`
- `campaigns`
- `creators`
- `outreach_messages`
- `activities`

with row-level security policies for owner-based access.

## AI Integration Notes

Current generation uses mock logic (`src/lib/ai/mock-generator.ts`) via a stable service layer.

To connect a real model later:

1. Implement `generateCreatorInsightsWithOpenAI` and `generateOutreachWithOpenAI` in:
   - `src/lib/ai/openai-provider.ts`
2. Set `NEXT_PUBLIC_USE_MOCK_AI=false`
3. Add secure server-side API key handling and request validation.

No UI refactor should be required because the service interface is already abstracted.

## Scripts

- `npm run dev` - run local development server
- `npm run lint` - run ESLint
- `npm run build` - production build
- `npm run start` - start production server

## Safety / Compliance

CreatorReach AI is intentionally scoped to:

- campaign planning
- AI-assisted drafting
- relationship tracking
- analytics for manually sent outreach

It does **not** include:

- bulk social auto-send
- scraping social platform credentials
- prohibited platform abuse workflows
