# CreatorReach AI

AI-assisted creator outreach CRM for founders and small brands. Manage campaigns, add creators, generate personalized outreach drafts, and track your pipeline — all without bulk auto-sending or platform abuse.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** Supabase (PostgreSQL + Auth)
- **AI:** Mock functions (structured for OpenAI integration)
- **Charts:** Recharts
- **Drag & Drop:** @hello-pangea/dnd

## Features

- **Dashboard** — KPI cards, performance chart, recent campaigns, activity feed
- **Campaigns** — Create, manage, and view campaign details with tabs (Creators, Messages, Pipeline, Analytics, Settings)
- **Creators CRM** — Searchable, filterable table with detail side panel (AI summary, fit score, hooks, timeline)
- **Pipeline Board** — Kanban drag-and-drop across 10 stages (New → Won / Not Interested)
- **AI Outreach Studio** — Generate personalized subject lines, initial messages, and follow-ups with one-click rewrite actions (shorter, warmer, premium, less salesy, social proof)
- **Analytics** — Outreach funnel, weekly trends, conversion rates
- **Settings** — Profile, appearance, notifications, safety & compliance info
- **Auth** — Login/signup pages (Supabase Auth ready)
- **Light/Dark mode** — Full theme support

## Getting Started

### 1. Clone and install

```bash
git clone <repo-url>
cd creatorreach-ai
npm install
```

### 2. Environment variables

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anonymous key
- `OPENAI_API_KEY` — (Optional) For AI message generation

### 3. Database setup

Run the schema in your Supabase SQL Editor:

```bash
# Copy contents of supabase/schema.sql into Supabase SQL Editor and run
```

This creates all tables with Row Level Security policies:
- `profiles` — User profiles (auto-created on signup)
- `campaigns` — Outreach campaigns
- `creators` — Creator CRM entries
- `outreach_messages` — Generated/sent messages
- `activities` — Activity log

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The app ships with **mock data** so everything works immediately without a Supabase connection.

## Project Structure

```
src/
├── app/
│   ├── (app)/              # Protected app routes
│   │   ├── dashboard/
│   │   ├── campaigns/
│   │   ├── creators/
│   │   ├── pipeline/
│   │   ├── outreach/
│   │   ├── analytics/
│   │   └── settings/
│   ├── api/ai/generate/    # AI generation API route
│   └── auth/               # Login & signup pages
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Sidebar, header
│   ├── dashboard/          # KPI cards, chart, feed
│   ├── campaigns/          # Campaign card, create dialog
│   ├── creators/           # Creator panel, add dialog
│   └── ...
├── data/
│   └── mock.ts             # Seed/mock data
├── lib/
│   ├── ai.ts               # AI generation functions (mock → OpenAI)
│   ├── supabase/           # Supabase client setup
│   └── utils.ts            # Utility functions
└── types/
    └── index.ts            # TypeScript types
```

## Connecting OpenAI

The AI functions in `src/lib/ai.ts` are structured as drop-in replacements. To connect OpenAI:

1. Install the SDK: `npm install openai`
2. Add your API key to `.env.local`
3. Replace the mock implementations in `src/lib/ai.ts` with OpenAI API calls
4. The API route at `src/app/api/ai/generate/route.ts` is ready for server-side AI calls

## Safety & Compliance

CreatorReach AI is designed for **AI-assisted outreach**, not automated platform abuse:

- All messages are generated as **drafts for human review**
- No social platform credential scraping
- No bulk auto-send features
- No direct platform API integrations for messaging
- Users send messages manually through their own accounts

## License

MIT
