# Jays Junk Removal — Website

Single-page landing site for **Jays Junk Removal** (Northern Virginia · (571) 707-0586).
Plain HTML, CSS and JavaScript — no build step.

## Files

```
index.html        Landing page (Home, Services, About, Quote, Book Appointment, Contact)
styles.css        All styles (responsive, reduced-motion aware)
script.js         Mobile menu, scroll effects, form validation, Netlify AJAX submit
thank-you.html    Fallback success page (used if JavaScript is off)
netlify.toml      Netlify settings (publish root, headers)
assets/
  logo.png        Official logo (original, 2000×2000)
  logo-512.png    Same logo resized for the web (header, footer, favicon)
  hero.svg        Hero illustration
  furniture.svg, appliances.svg, mattress.svg, household.svg,
  garage.svg, yard-waste.svg, construction.svg, property.svg   Service illustrations
```

## Forms (Netlify Forms)

Two forms are detected automatically by Netlify at deploy time:

| Form name             | Fields                                                              |
|-----------------------|---------------------------------------------------------------------|
| `quote-request`       | full-name, phone, pickup-date, pickup-time, service                 |
| `appointment-request` | full-name, phone, pickup-date, pickup-time, service, notes (optional) |

Both include `data-netlify="true"`, a hidden `form-name` input and a honeypot (`bot-field`).
Submissions appear in **Netlify → Site → Forms**. To get them by email, add a notification
under **Site configuration → Notifications → Form submission notifications**.

> When previewing locally (localhost / file://) the forms show the success message without
> sending anything — submissions only work on the deployed Netlify site.

## Deploy

1. Push this folder to a GitHub repository.
2. In Netlify: **Add new site → Import an existing project → GitHub** → pick the repo.
3. Build command: *(leave empty)* · Publish directory: `.`
4. Deploy, then make sure **Forms → Form detection** is enabled.

## Swapping in real photos

The service and hero images are brand-styled SVG illustrations. To use real photos,
drop JPGs into `assets/` (e.g. `assets/furniture.jpg`, ~1200×900, compressed) and update the
matching `src` in `index.html`.
