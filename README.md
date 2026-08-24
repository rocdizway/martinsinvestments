# Martins Investments

The official corporate website and content platform for Martins Investments, a portfolio-focused
holding company operating across culture, experience and enterprise.

The application presents the group, its investment approach, its businesses, the founder's story
and the Perspectives editorial platform within a responsive black-and-gold design system.

## Key features

- Corporate pages for the group, portfolio, businesses, approach and contact information.
- Dedicated profiles for RocDizWay, Roc\*Parties and Roc\*Away.
- An interactive, chapter-based founder profile with archival media and video.
- A headless WordPress integration for Perspectives articles, including pagination, rich-content
  sanitisation, featured-image heroes and static fallback content.
- Server-rendered metadata, canonical URLs, structured data and a dynamic XML sitemap.
- Consent-aware analytics, cookie preferences and responsive light and dark themes.
- Self-hosted Jost and Marcellus webfonts, so typography does not require a pre-consent request to
  Google Fonts.

## Technology

- React 19 and TypeScript
- TanStack Start, Router and Query
- Vite 8 and Nitro
- Tailwind CSS 4
- Radix UI primitives
- Zod and `sanitize-html` for WordPress response validation and content sanitisation

## Local development

### Requirements

- Node.js `^20.19.0` or `>=22.12.0`
- npm 11.6.2 (declared in `package.json`)

### Setup

1. Clone the repository and enter the project directory.
2. Install dependencies:

   ```sh
   npm ci
   ```

3. Create `.env.local` from `.env.example` and configure the required values.
4. Start the development server:

   ```sh
   npm run dev
   ```

Vite prints the local URL after the server starts.

npm is the canonical package manager for this repository; `package-lock.json` is the only lockfile.
Keep the explicit WASM-runtime and `lru-cache` development dependencies in place: they satisfy
optional peers in the Vite/Nitro toolchain and keep clean installs reproducible across platforms.

## Environment variables

| Variable                 | Required   | Purpose                                                                                                      |
| ------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------ |
| `VITE_SITE_URL`          | Production | Canonical public origin, without a trailing slash.                                                           |
| `VITE_GA_MEASUREMENT_ID` | No         | Google Analytics measurement ID. Analytics remains disabled when omitted and requires visitor consent.       |
| `VITE_WORDPRESS_API_URL` | No         | Public WordPress REST API root ending in `/wp-json/wp/v2`. Static Perspectives content is used when omitted. |

Variables prefixed with `VITE_` are public application configuration and must never contain secrets.
Keep `.env.local` out of version control. Configure production values in the hosting platform before
building and deploying the application.

## Headless WordPress

Perspectives retrieves published posts from the WordPress REST API on the server. A typical local
configuration is:

```env
VITE_WORDPRESS_API_URL=https://cms.example.com/wp-json/wp/v2
```

The endpoint must use HTTPS outside local development and must not contain credentials, a query
string or a fragment. Public posts do not require WordPress authentication.

The frontend accepts HTTPS WordPress images and native video, caption-track, YouTube,
YouTube-nocookie and Vimeo embeds. HTTP media and unsupported iframe hosts are removed during
sanitisation to prevent mixed content and untrusted embeds.

For consistent article presentation, each published post should include:

- A stable slug, excerpt and category.
- A featured image with meaningful alternative text.
- Inline images uploaded through the WordPress Media Library and served from a public HTTPS URL.
- Headings and captions that follow a clear document hierarchy.

The featured image is used as the article hero. If the same file is also present in the post body,
the duplicate body image is removed; other inline images are retained. Do not insert images with
`localhost` or development-only URLs because they will not load on the production website.

When `VITE_WORDPRESS_API_URL` is omitted, the application uses the three static Perspectives posts
in `src/data/group.ts`. If the variable is configured but WordPress is unavailable or returns an
invalid response, the application displays a retryable error rather than silently substituting
fallback content.

The CMS itself is a separate deployment boundary. Apply and record the required comment, ping,
XML-RPC, REST-user, 2FA and login-rate-limit controls in
[`security/wordpress/README.md`](security/wordpress/README.md).

## Available commands

| Command                | Description                                                     |
| ---------------------- | --------------------------------------------------------------- |
| `npm run dev`          | Start the local development server.                             |
| `npm run build`        | Create the production client, SSR and Nitro output.             |
| `npm run build:dev`    | Create a development-mode build.                                |
| `npm run preview`      | Preview the generated application locally.                      |
| `npm run lint`         | Run ESLint and the configured Prettier checks.                  |
| `npm run format`       | Format supported files with Prettier.                           |
| `npm run format:check` | Check formatting without changing files.                        |
| `npm run typecheck`    | Compile-check TypeScript without emitting files.                |
| `npm test`             | Run the automated Vitest suite once.                            |
| `npm run test:watch`   | Run Vitest in watch mode.                                       |
| `npm run check`        | Run lint, type-checking, tests and a production build in order. |

Before merging or deploying changes, run:

```sh
npm run check
```

## Project structure

```text
public/              Static images, videos, documents and site icons
security/            Deployment handoffs for controls outside the frontend
src/components/      Shared layout, navigation and UI components
src/data/            Structured corporate and fallback editorial content
src/lib/             Site configuration, WordPress integration and shared utilities
src/routes/          TanStack Start pages and server-rendered routes
src/styles.css       Global styles and design-system tokens
tests/               Automated pagination, sanitiser and security-header tests
```

## Deployment

The current Nitro configuration targets a Cloudflare-compatible deployment through the Lovable
TanStack configuration. `npm run build` generates the deployable application in `.output`.

Set production environment variables in the deployment platform before the build begins. Do not
upload or commit `.env.local` as a deployment mechanism.

## Lovable workflow

This repository is connected to the
[Lovable project](https://lovable.dev/projects/93c63593-d47a-433a-ae9d-819c7c044791).
Commits pushed to the connected branch are synchronised with the Lovable editor.

Do not force-push, rebase, amend or squash commits that have already been published to the connected
branch. Rewriting published history can remove the corresponding project history from Lovable.
