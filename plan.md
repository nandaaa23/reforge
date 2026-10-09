# KTU Pulse — Implementation Plan

## Product intent

KTU Pulse is a public, **demo-only** student portal redesign for the APJ Abdul Kalam Technological University (KTU), Kerala. It helps students **find**, **understand**, and **act** on academic information quickly, without collecting credentials or representing fictional records as official university data.

The initial delivery is a self-contained Next.js App Router prototype. All records are typed local data; route handlers expose safe integration seams only. No KTU systems, login endpoints, real results, private data, push sender, or external AI provider are assumed.

## Architecture and implementation approach

- **Framework:** Next.js App Router with strict TypeScript, React 19, Tailwind CSS, Lucide React, `next-intl`, React Hook Form, and Zod.
- **Locale routing:** `app/[locale]/` owns English and Malayalam routes. Middleware supplies a safe default locale and persists language preference. The selector changes locale while retaining the current internal route and query string.
- **Data layer:** typed local records in `src/data/`; query and search utilities in `src/lib/`. Every supplied record uses `isSample: true` and renders a visible demo label where it appears.
- **Client state:** a compact locale-aware provider tracks notification read state, notification preferences, text scale, global overlays, and the local demo chatbot.
- **Server integration seams:** Route Handlers under `app/api/` return mock-safe data and an intentionally local `POST /api/chat`; no keys are used or claimed.
- **User experience:** server-rendered page shells with client components only for interactive filtering, lookup, preference, search, chat, reading, and navigation controls.
- **Production posture:** the demo does not expose passwords, personal data, or real student records. Real notices, result lookup, AI retrieval, push subscriptions, and preference persistence require approved backend integrations and authorization.

## Design system

### Design movement

**Technical institutional modernism**: the calm legibility of a university information system joined with crisp, tactile interface geometry. It avoids youthful dashboard styling by using cool neutral surfaces, restrained status color, compact information density, and a measured physical edge.

### Core principles

1. **Action before ornament** — deadlines, exam status, results, sources, and next steps lead each view.
2. **Quiet clarity** — cool gray-blue grouping lowers cognitive load while dark navy edges keep controls legible.
3. **Visible provenance** — sample indicators and source actions keep public prototypes honest.
4. **Mobile parity** — every task works with touch, keyboard, and narrow screens rather than relying on desktop-only hover patterns.

### Color philosophy

Cool mist (`#F4F6F8`) is a neutral, low-glare canvas; technical navy (`#16324F`) carries primary actions and institutional trust; steel blue-gray (`#DCE4EA`) groups supportive content without competing; muted amber (`#C58A4A`) marks demonstration and secondary emphasis without the energy of bright coral. Charcoal-navy text/borders (`#1F2933`) and slate shadows (`#7B8794`) create a disciplined information-system character with accessible contrast.

**Signature brand color:** KTU Pulse Technical Navy — `#16324F`.

### Layout paradigm

A **campus noticeboard** structure replaces a single central admin grid: a compact orientation band leads into a broad Pulse Priority ledger, then narrow-to-wide academic content strips. On desktop, a left editorial rail holds section context while the information canvas changes density across the page. On mobile, the same hierarchy becomes a linear stack with top-level actions always near the first screen.

### Signature elements

- A small **PULSE / LIVE DEMO** label system with solid borders, not decorative pills.
- Offset, one-direction hard shadows on primary actions and key cards.
- A square **KTU Pulse glyph**: three stacked signal bars cut from a teal square, paired with the wordmark.

### Interaction and motion

Interactive controls respond with a short 120–160ms color/translate treatment and hard-shadow shift; overlays use an unobtrusive fade. Reduced-motion users receive no transitions. Focus rings are clearly teal and offset. All active, disabled, loading, error, empty, and hover states remain understandable without colour alone.

### Typography system

- **Space Grotesk:** compact high-impact headings, navigation, data summaries.
- **Inter:** body copy, form labels, tables, helper text, Malayalam fallback stack.
- Headings are dense rather than oversized; essential interactive text remains at least 14px.

### Brand and voice

**Brand essence:** A student-first academic command centre that makes university information visible, understandable, and actionable.

**Personality:** grounded, helpful, precise.

**Voice:** direct, calm, and action-oriented; it never overclaims official status.

Examples:
- “Three updates deserve your attention.”
- “This is demonstration data. Open the source before you act.”

### Wordmark and logo

A geometric teal tile with three cream horizontal signal bars creates the `P` in Pulse; the adjacent wordmark uses Space Grotesk with an editorial small-caps `KTU` and a bolder `PULSE`.

## Page and feature scope

### Shared application shell

- Desktop header, active navigation, global search, language switcher, notification bell, settings/profile popover, and floating Ask Pulse.
- Mobile header plus an accessible navigation drawer with Home, Exams, Results, and Ask Pulse/Help.
- Notification centre with read state, mark-one/mark-all actions and four preference categories.
- Settings panel with text-size controls and optional browser read-aloud. It accurately describes browser support rather than promising Malayalam pronunciation quality.

### Home (`/[locale]`)

- Compact welcome, search field, quick actions, and a three-tab **Pulse Priority** module.
- Sample-only notices divided into Action required, Coming up, and New updates; deadline/date fields render only when present.
- Quick-access actions, upcoming examinations, searchable/category-filterable announcements, and a compact help module.

### Examinations (`/[locale]/exams`)

- Keyword, year, type, programme/semester filters and a reset action; a visible count updates from local typed data.
- Responsive exam-card layouts; loading, available, empty, unconfigured, and retryable error states are distinct and understandable.

### Results (`/[locale]/results`)

- Validation-first, no-credential semester demo lookup with a short loading state.
- Internally consistent fictional grade card that changes by selected semester, calls out DEMONSTRATION DATA, explains the simplified SGPA scale, and uses a working browser print action.

### Search and Ask Pulse

- Global search groups local notice, exam, and resource matches, supports keyboard movement, reset, result count, selected navigation, and a no-results state.
- Ask Pulse has suggested questions, local varied responses, history, clear/retry behavior, source/internal links, and contextual page awareness. It names unverified information instead of inventing academic rules or dates.

## Localization

`messages/en.json` and `messages/ml.json` cover all rendered UI strings, including navigation, filters, errors, validation, notifications, accessibility options, chatbot prompts, labels, and confirmations. Source notices remain in their original sample wording; the UI identifies summaries as demonstration data and does not present automatic translation as official text.

## Project structure

```text
src/
  app/
    [locale]/
      layout.tsx                 # locale shell and metadata
      page.tsx                   # dashboard
      exams/page.tsx             # examinations
      results/page.tsx           # results lookup
    api/
      chat/route.ts
      examinations/route.ts
      notices/route.ts
      notifications/route.ts
      notifications/[id]/read/route.ts
      preferences/route.ts
      push/subscribe/route.ts
      push/unsubscribe/route.ts
    globals.css
    layout.tsx
  components/
    app-shell/                   # header, mobile drawer, settings, footer
    dashboard/                   # priority, notice, upcoming and access components
    exams/                       # filters and responsive record list
    results/                     # lookup and printable grade card
    search/                      # accessible global search dialog
    chat/                        # Ask Pulse panel
    notifications/               # notification centre
    ui/                          # small reusable primitives
  data/                           # sample-only typed records
  i18n/                           # next-intl request/routing config
  lib/                            # filters, search, demo chat, helpers, validation
  providers/                      # demo state and accessibility state
  types/                          # shared typed models
messages/
  en.json
  ml.json
public/
  manus-routes.json
```

## Dependencies and serving

The new project is configured with pnpm and a reviewed pnpm build-script policy. The browser prototype uses no external API key. Next.js serves pages and internal route handlers on port 3000; a `manus-routes.json` document will list every public page route before the first development-server start. The server capability is reserved for safe future API integration points.

## Explicit production integrations deferred by design

- Approved KTU notice/examination feeds and result service with authorized authentication.
- Server-side RAG over approved university documents for AI answers and citations.
- Durable user preference storage and authenticated student profiles.
- Explicit-permission browser push with a service worker, subscription storage, delivery sender, expiry handling, and safe click navigation.
- A real client-side PDF exporter, if download rather than print is required.
