# F1 Three.js Portfolio

Interactive Formula-1 themed portfolio for **Santhosh Kumar Reddy Jampana**.

## Run locally

```bash
python3 -m http.server 4173
```

Open `http://localhost:4173`.


## Publish with GitHub Actions (Live URL)

This repo now includes a GitHub Pages workflow at `.github/workflows/deploy-pages.yml`.

### One-time setup

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Commit/push to one of these branches: `main`, `master`, or `work`.

### Result

- GitHub Actions will run **Deploy portfolio to GitHub Pages**.
- After it finishes, your site will be live at:
  - `https://<your-username>.github.io/<repo-name>/`

> If you want your portfolio at `https://<your-username>.github.io/`, publish from a repo named `<your-username>.github.io`.

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

## Merge conflict resolution status

- Verified repository is conflict-free.
- Verified no unresolved merge markers (`<<<<<<<`, `=======`, `>>>>>>>`) remain in tracked files.
