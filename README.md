# Shivam Pandey — Product Design Portfolio

A classic, minimal, fully animated portfolio. Plain HTML, CSS and JavaScript — no build step, no dependencies.

## Structure

```
index.html                  Home: hero, 3 projects, about, experience, process, contact
case-studies/kharcha.html   01 · Personal case study (mobile app)
case-studies/fleetdesk.html 02 · Internship (B2B dashboard)
case-studies/aarogya.html   03 · Freelance (clinic booking website)
prototypes/tpa-workspace.html  TPA Workspace admin dashboard (interactive prototype)
assets/css/style.css        All styles (colours are variables at the top)
assets/css/tpa-workspace.css  Styles for the TPA Workspace prototype
assets/js/tpa-workspace.js  Sidebar, nav and greeting logic for the prototype
assets/js/main.js           Animations & interactions
assets/img/                 Images (favicon, your photo, project screens)
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

## Before you publish — things to edit

Search the files for `EDIT:` to find every spot.

1. **Project content & numbers** – The three case studies contain realistic *sample* stories and metrics. Replace them with your real projects, research findings and results.
2. **Résumé** – Add your PDF as `assets/Shivam-Pandey-Resume.pdf`.
3. **Photo** – Add `assets/img/shivam.jpg` and uncomment the `<img>` in the About section.
4. **Project images** – Each project card uses a CSS mockup. To use real screens, replace the `<div class="mock">…</div>` with `<img src="assets/img/your-image.jpg" alt="…">`. In case studies, replace each `figure__placeholder` span with an image.
5. **Social links** – Update LinkedIn / Behance / Dribbble URLs in the footers.
6. **Dates & company** – Update the Experience timeline in `index.html`.

## Details included

- Preloader with name reveal and counter (first visit per session only)
- Line-by-line headline reveals, fade-up on scroll, clip-path image reveals
- Custom cursor that turns into a "View" bubble over projects (desktop only)
- Magnetic buttons, mockup parallax on hover, animated charts in mockups
- Scroll progress bar, auto-hiding nav, active-section highlighting
- Word-by-word quote that lights up as you scroll
- Count-up stats, live IST clock, "available for work" pulse, rotating badge
- Copy-email button with toast, page-transition wipe between pages
- Light / dark theme (remembers choice, follows system by default)
- Paper-grain texture, full mobile layout with animated menu
- Respects `prefers-reduced-motion`, keyboard focus styles, skip link, works without JS

## Deploy (free)

**GitHub Pages:** repo Settings → Pages → Source: *Deploy from a branch* → pick the branch and `/ (root)`.
Also works as-is on Netlify or Vercel (drag and drop the folder).
