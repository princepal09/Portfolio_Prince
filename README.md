# Prince Pal Portfolio

Next.js App Router migration of [Prince Pal’s React portfolio](https://github.com/princepal09/Portfolio). The site uses shadcn/ui, Tailwind CSS, Framer Motion, React Hook Form, and a small Three.js decoration in the hero.

## Run locally

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Run `npm run build` to verify the production build and `npm run lint` for ESLint.

## GitHub activity

Copy `.env.example` to `.env.local` and set `GITHUB_TOKEN` to a GitHub token with access to public GitHub data. Restart the dev server after saving it. The browser fetches `/api/github`, and only the Next.js server uses the token. The token belongs in a server environment variable without a `NEXT_PUBLIC_` prefix.

The section links to the GitHub profile while the token is missing or GitHub is unavailable.

## Contact form

React Hook Form validates each submission before the browser sends it to Formspree. Set the recipient in the form’s Target Email setting in the Formspree dashboard.

Edit the Formspree endpoint, personal details, navigation, résumé, social links, and projects in `src/constants/index.ts`.

## Deploy from GitHub to Vercel

Push this project to `princepal09/portfolia_prince` and import that repository in Vercel. Use the Next.js preset with the repository root as the root directory. Add `GITHUB_TOKEN` in the project's Production environment variables and deploy or redeploy after saving it.
