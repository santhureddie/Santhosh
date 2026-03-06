# F1 Three.js Portfolio

Interactive Formula-1 themed portfolio for **Santhosh Kumar Reddy Jampana**.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.

## Publish with GitHub Actions (Live URL)

This repo includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`.

### One-time setup (recommended)

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Go to **Settings → Actions → General → Workflow permissions** and choose **Read and write permissions**.
5. Push a commit to `main`, `master`, or `work` (or run the workflow manually from the **Actions** tab).

### Optional auto-enable mode (for first-time Pages init)

If your repo has never had Pages enabled, you can let the workflow initialize it automatically:

1. Create a Personal Access Token with repo admin/pages write capability.
2. Add it as repository secret: `PAGES_DEPLOY_TOKEN`.
3. Re-run the workflow.

The workflow will use:

- `actions/configure-pages@v5` with `enablement: true` **only** when `PAGES_DEPLOY_TOKEN` exists.
- default `GITHUB_TOKEN` path otherwise.

### Result

- GitHub Actions runs **Deploy portfolio to GitHub Pages**.
- After success, the live URL will be:
  - `https://<your-username>.github.io/<repo-name>/`

> For a root URL like `https://<your-username>.github.io/`, use a repo named `<your-username>.github.io`.

### Why deployment failed before

Error observed:

- `Get Pages site failed. Not Found`

Root cause:

- `configure-pages` could not find an initialized Pages site in the repository.
- `enablement: true` requires a non-default token (PAT/App token), so using it with plain `GITHUB_TOKEN` can still fail.

What changed now:

- Added explicit file validation before packaging.
- Kept artifact packaging to a clean `dist/` bundle.
- Added conditional configure-pages logic:
  - auto-enable path with PAT (`PAGES_DEPLOY_TOKEN`)
  - safe default path with `GITHUB_TOKEN`

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
