# For My Jaan Bacha

A static, mobile-first birthday and five-year anniversary love story. It is built with plain HTML, CSS, and JavaScript, so it can be hosted directly on GitHub Pages.

## Personalise it

Open [`script.js`](script.js) and edit the `CONFIG` object at the top. You can change the name, nickname, important dates, image paths, memory captions, notes, and story cards there. The long letter and page copy live in [`index.html`](index.html) so they are easy to edit in context.

The page includes original local demo SVG artwork and an original Web Audio demo melody. Real files automatically take over when added; no demo-mode switch is required.

Add your files using the structure explained in [`assets/README.md`](assets/README.md). Missing photos automatically become styled placeholders, so the page will never show a broken-image icon.

## Publish on GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `style.css`, `refine.css`, `carousel.css`, `script.js`, `README.md`, and the `assets` folder.
3. Put your photos, illustrations, and song in the matching folders under `assets`.
4. Commit and push the changes to the `main` branch.
5. Open the repository's **Settings → Pages**.
6. Under **Build and deployment**, choose **Deploy from a branch** (or GitHub Actions if you prefer).
7. Select the `main` branch and the `/ (root)` folder, then save.
8. Open the generated URL: `https://USERNAME.github.io/REPOSITORY/`.

All project links use relative paths, so the site works from a repository subpath as well as a custom domain.

## Local preview

You can double-click `index.html` for a quick preview. For the closest GitHub Pages behaviour, run a small static server from this folder, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
