# Broward County Locksmith — Social Agent

Social-media posting agent for **Broward County Locksmith** (Residential · Commercial ·
Automotive). Runs on a daily GitHub Actions cron, rotates through the locksmith
service catalog, generates a photo background via OpenAI, **composites a
branded service-ad flyer**, and publishes to **Google Business Profile** (plus
Instagram / Facebook once connected) via [upload-post.com](https://upload-post.com).

Duplicated from the Home Advisor Locksmith agent — same posting stack, same
Upload-Post safety checks, including **multi-location Google Business
support**: every GBP post pins itself to a specific location via
`gbp_location_id`.

### Daily service-ad flyers

Each run builds a designed **service-ad flyer**: a photo background + the
Broward County Locksmith logo + a service headline + benefit bullets + a blue
**CALL NOW · (954) 888-8800** bar + a "Serving Broward County & Surrounding
Areas" badge.

Only the **photo background** is AI-generated — every piece of text, the logo,
the phone number, and the CTA are composited in code
([`src/lib/flyer.ts`](src/lib/flyer.ts)), so the branding is always pixel-perfect
(gpt-image-1 can't reliably render exact text or logos).

The agent **rotates through the service catalog**
([`src/content/services.ts`](src/content/services.ts)) — one job type per day,
wrapping around forever with a fresh background image each time. The catalog is
weighted **~70% commercial locksmith & access control** (access control,
keycard/fob entry, commercial rekeys, master key systems, panic bars, door
closers, storefront door repair, electric strikes & mag locks, security
upgrades, commercial door hardware, property management) and **~30% emergency
services** (car / residential / commercial lockouts, lost car keys & key
programming), interleaved so roughly every 4th post is an emergency topic.
Captions are long-form, educational, and SEO-focused with relevant hashtags —
written to attract higher-value commercial work while keeping visibility for
emergency searches. Set the cron in
[`.github/workflows/daily.yml`](.github/workflows/daily.yml) (defaults to daily).

The logo lives at `assets/logo.jpg`; the service area is set via the
`SERVICE_AREA` env var (defaults to "Broward County & Surrounding Areas").

## Multiple Google Business locations

Upload-Post connects your whole Google account as one connection. When that
account owns more than one Business Profile, the upload API can't guess which
location a post is for and will error unless you tell it. This agent handles
that with the `gbp_location_id` parameter:

```bash
# 1. List the locations connected to your profile
npm run gbp:locations
```

```bash
# 2. Put the one you want in .env (or as a GitHub secret)
GBP_LOCATION_ID=accounts/123456789/locations/222222222
```

**One location per run.** To cover multiple locations, either change
`GBP_LOCATION_ID` between runs, or stand up a second copy of this repo/agent
with its own secret value. (Don't see your profiles in the list? Disconnect and
reconnect Google at upload-post.com → **Manage Users** to refresh the scopes.)

## Quickstart

### 1. Local prerequisites
- Node 20+
- An [upload-post.com](https://upload-post.com) account with **Google
  Business** (and optionally Instagram + Facebook) connected to a profile
- The Google Business `GBP_LOCATION_ID` (from `npm run gbp:locations`)
- An OpenAI API key (for the AI flyer backgrounds)

### 2. Install + configure

```bash
npm install
cp .env.example .env
# then fill in the values in .env
npm run gbp:locations   # to find your GBP_LOCATION_ID
```

### 3. Try a dry-run

```bash
npm run post:dry
```

Generates any AI images and prints the captions to stdout but doesn't upload.

### 4. Ship one post

```bash
npm run post
```

Picks the next service, generates its media, builds the flyer, posts it, and
writes the result to `state.json`.

### 5. Check what's next without running it

```bash
npm run post:next
```

## Running on GitHub Actions (production)

1. Push this repo to GitHub.
2. Repo → **Settings → Secrets and variables → Actions → New repository secret** —
   add the values from `.env.example`:
   - `UPLOAD_POST_API_KEY` (required)
   - `UPLOAD_POST_USER` (required)
   - `UPLOAD_POST_EXPECTED_HANDLES` (optional but recommended — safety check)
   - `FACEBOOK_PAGE_ID` (required only if posting to Facebook)
   - `GBP_LOCATION_ID` (required to post to Google Business)
   - `OPENAI_API_KEY` (required for the AI flyer backgrounds)
3. Default schedule is **daily at 10 AM ET** (cron `0 14 * * *`).
   Edit `.github/workflows/daily.yml` to change it.
4. Manual run: **Actions → Daily Social Post → Run workflow** (optional "Dry run").

## Adding / editing services

Brand details (phone, area, tagline, promo) live in the `BRAND` const at the top
of [src/content/services.ts](src/content/services.ts). Each entry in the
`SERVICES` array is one job type the agent rotates through. Add as many as you
like — order only affects rotation; list a service twice to show it more often:

```ts
{
  id: "lock-rekey",                       // stable id, used in filenames/state
  headline: ["Rekey", "Service"],         // big flyer headline (1–3 short lines)
  subhead: "New place? Make old keys stop working.",
  bullets: ["Enhanced security", "Cost-effective", "Same day"],  // 3 short bullets
  bgPrompt: "A locksmith rekeying a door lock... No text, no logos...",  // PHOTO only
  caption: "Just moved in? ...",          // social caption (no prices)
  hashtags: ["rekey", "homesecurity", "locksmith"],
},
```

⚠️ The `bgPrompt` must say **no text / words / logos** — all text is drawn by
the flyer composer, not the AI. And **never put prices** in captions.

## Safety nets baked in

- **Account-routing verification** (`UPLOAD_POST_EXPECTED_HANDLES`): aborts if
  Upload-Post's profile is wired to the wrong IG / FB / Google account.
- **Explicit Facebook Page ID**: required when posting to Facebook.
- **Explicit Google Business location** (`gbp_location_id`): required when
  posting to Google Business — prevents the "which of your profiles?" error and
  stops a post landing on the wrong location.
- **State.json** is the source of truth for "what's been published" — committed
  after every run. Git is the database.
- **Dry-run mode** prints the caption + generates media but never posts.
- **Logo-optional**: no `assets/logo.jpg` yet? Posts ship unbranded with a
  warning instead of crashing.

## Folder layout

```
browardcountylocksmith-social-agent/
├── .github/workflows/daily.yml    # cron + workflow
├── src/
│   ├── content/services.ts        # the service catalog + BRAND details — main thing you edit
│   ├── lib/flyer.ts               # composites the branded ad flyer (logo + text + CALL NOW bar)
│   ├── lib/
│   │   ├── uploadpost.ts          # Upload-Post API wrapper + safety checks + gbp_location_id
│   │   ├── locations.ts           # Google Business location lookup
│   │   ├── image.ts               # OpenAI gpt-image-1 generation
│   │   ├── logo.ts                # auto logo overlay (sharp-based, logo-optional)
│   │   ├── state.ts               # state.json read/write
│   │   └── types.ts
│   ├── locations.ts               # `npm run gbp:locations` CLI
│   └── index.ts                   # main entry — picks next post, posts it
├── assets/                        # logo + fallback images (logo.jpg lives here)
├── preview/                       # ai-generated + branded images (gitignored)
├── state.json                     # what's been published (auto-updated)
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| Same service repeats too often | Catalog is short or a service is listed twice | Add more entries to `src/content/services.ts` |
| `GBP_LOCATION_ID not set` | Posting to Google Business with no location chosen | Run `npm run gbp:locations`, copy a `name` into `GBP_LOCATION_ID` |
| `google-business/locations lookup failed` / empty list | Google not connected, or scopes stale | Reconnect Google at upload-post.com → Manage Users |
| `FACEBOOK_PAGE_ID not set` | Posting to FB without a Page ID | Get it from `https://api.upload-post.com/api/uploadposts/facebook/pages?profile=<your_profile>` |
| `ABORT: ...connected to wrong account(s)` | Safety check fired | Reconnect the right account at upload-post.com |
| Images post without a logo | No `assets/logo.jpg` | Drop your logo there |

## License

Private. Internal tooling for Broward County Locksmith.
