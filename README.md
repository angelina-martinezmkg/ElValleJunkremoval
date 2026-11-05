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
  photos/
    hero.jpg      Hero photo (1600px wide)
    about.jpg     About section photo
    furniture.jpg, appliances.jpg, mattress.jpg, household.jpg,
    garage.jpg, yard-waste.jpg, construction.jpg, property.jpg   Service photos
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

## Photos

The hero, about and service images are photorealistic JPGs in `assets/photos/`
(~1000px wide, compressed). To use your own job-site photos, replace a file with
one of the same name (4:3 landscape works best), or update the matching `src` in `index.html`.
