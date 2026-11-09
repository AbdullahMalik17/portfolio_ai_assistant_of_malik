# Deploying abdullahmalik17.me

## Recommended production shape

- **Frontend:** deploy `frontend/` as a Vercel project connected to this GitHub repository.
- **Backend:** deploy `backend/` as a separate FastAPI web service. Use the GitHub Student Developer Pack only where the current partner offer is active; offers can change.
- **Domain:** keep DNS at Namecheap and point the apex and `www` hostnames to the Vercel project.

## 1. Prepare the repository

1. Confirm the GitHub repository is the source of truth and that `.env`, `.env.local`, database files, and API keys are ignored.
2. Push the latest changes to `main`.
3. Add a CI check for `npm run lint` and `npm run build` before enabling automatic production deploys.

## 2. Deploy the frontend to Vercel

1. Import `AbdullahMalik17/portfolio_ai_assistant_of_malik` into Vercel.
2. Set **Root Directory** to `frontend`.
3. Use the detected Next.js build settings:
   - Install: `npm install`
   - Build: `npm run build`
   - Output: default Next.js output
4. Add frontend secrets in Vercel Project Settings → Environment Variables:
   - `OPENROUTER_API_KEY`
   - `OPENROUTER_MODEL`
   - `RESEND_API_KEY`
   - `NOTIFICATION_EMAIL`
   - `ADMIN_TOKEN`
   - `NEXT_PUBLIC_BACKEND_URL` only if a browser integration needs the separate backend origin.
5. Redeploy after saving environment variables.

## 3. Deploy the FastAPI backend

Create a separate service from the same repository with:

- Root directory: `backend`
- Build/install: `pip install -r requirements.txt` (or the provider's Python build equivalent)
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

Set these backend environment variables in the host dashboard:

```env
GEMINI_API_KEY=replace-with-the-provider-key
CORS_ORIGINS=https://abdullahmalik17.me,https://www.abdullahmalik17.me
DEBUG=false
HOST=0.0.0.0
PORT=8000
```

Use the provider's generated URL as the health-check target:

- `GET /health`
- `GET /api/assistant/health`

Do not upload `backend/.env`, SQLite databases containing contact/conversation data, or API keys to GitHub.

## 4. Connect Namecheap to Vercel

1. In Vercel, open the project → **Settings → Domains** and add:
   - `abdullahmalik17.me`
   - `www.abdullahmalik17.me`
2. Vercel will display the exact DNS values for this project. In Namecheap → **Domain List → Manage → Advanced DNS**:
   - Add the Vercel-provided **A** record for `@`.
   - Add the Vercel-provided **CNAME** record for `www`.
   - Remove conflicting old A/AAAA/CNAME records for these hostnames.
3. Verify both domains in Vercel and wait for SSL provisioning.
4. Select one canonical hostname and redirect the other to it. The canonical URL used by this project is `https://abdullahmalik17.me`.

Do not copy DNS values from an old tutorial: use the records shown in the current Vercel domain card.

## 5. Production verification

Run these checks after DNS and deployment:

```text
https://abdullahmalik17.me/
https://abdullahmalik17.me/sitemap.xml
https://abdullahmalik17.me/robots.txt
https://abdullahmalik17.me/llms.txt
https://abdullahmalik17.me/llm-context.txt
```

Then verify:

- The homepage metadata, canonical URL, JSON-LD, Open Graph image, and sitemap use the custom domain.
- The AI assistant returns a real response and does not expose provider keys.
- The contact form succeeds and reports failures clearly.
- The backend health endpoints respond over HTTPS.
- Mobile layout works at 375px width and keyboard focus remains visible.
- Vercel and backend logs contain no startup, CORS, or missing-secret errors.
