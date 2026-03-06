# F1 Three.js Portfolio

Interactive Formula-1 themed portfolio for **Santhosh Kumar Reddy Jampana**.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Publish with GitHub Actions (Live URL)

This repo includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`.

### One-time setup

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Go to **Settings → Actions → General → Workflow permissions** and choose **Read and write permissions**.
5. Push a commit to `main`, `master`, or `work` (or run the workflow manually from the **Actions** tab).

### Result

- GitHub Actions runs **Deploy portfolio to GitHub Pages**.
- After success, the live URL will be:
  - `https://<your-username>.github.io/<repo-name>/`

> For a root URL like `https://<your-username>.github.io/`, use a repo named `<your-username>.github.io`.

### Fix for `Get Pages site failed. Not Found`

If deployment fails with:

- `Get Pages site failed`
- `HttpError: Not Found`

it usually means Pages was not initialized yet for the repository.

This workflow now sets:

- `actions/configure-pages@v5`
- `with: enablement: true`

So the action can automatically enable Pages before deployment.

If it still fails, verify:

- You have admin/maintainer permission on the repo.
- Repository Actions are allowed by org policy.
- Pages is not disabled by enterprise/org restrictions.

### Why deployments commonly fail (and what this workflow fixes)

- Uploading the entire repository (including extra/unexpected files) can break Pages artifact validation.
- This workflow publishes only a clean `dist/` bundle with required static files:
  - `index.html`
  - `styles.css`
  - `main.js`
  - `portfolio-data.js`
  - `.nojekyll`

## What's included

- 3D F1-inspired race track experience built with Three.js
- Drivable car with keyboard controls
- Checkpoint-based content panels for experience, skills, projects, and education
- Real profile/contact links integrated from resume

## Controls

- `← / →` or `A / D`: steer around the track
- `↑ / ↓` or `W / S`: boost / brake

## Update content

Edit `portfolio-data.js` to modify work experience, links, skills, and sections.
