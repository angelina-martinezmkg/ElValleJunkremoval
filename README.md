# El Valle Junk Removal — Website

Single-page landing site for **El Valle Junk Removal** (Phoenix, AZ · (602) 639-2971).
Plain HTML, CSS and JavaScript — no build step.

## Files

```
index.html        Landing page (Home, Services, About, Quote, Contact)
styles.css        All styles (responsive, reduced-motion aware)
script.js         Mobile menu, scroll effects, form validation, Netlify AJAX submit
thank-you.html    Fallback success page (used if JavaScript is off)
netlify.toml      Netlify settings (publish root, headers)
assets/
  photos/
    hero.jpg      Hero photo (1600px wide)
    about.jpg     About section photo
    household.jpg, furniture.jpg, appliances.jpg, garage.jpg, property.jpg,
    yard-waste.jpg, construction.jpg   Service photos (hero.jpg is reused for Pickup & Hauling)
```

## Forms (Netlify Forms)

One form is detected automatically by Netlify at deploy time:

| Form name             | Fields                                                              |
|-----------------------|---------------------------------------------------------------------|
| `quote-request`       | full-name, phone, pickup-date, pickup-time, service, notes (optional) |

It includes `data-netlify="true"`, a hidden `form-name` input and a honeypot (`bot-field`).
Submissions appear in **Netlify → Site → Forms**. To get them by email, add a notification
under **Site configuration → Notifications → Form submission notifications**.

> When previewing locally (localhost / file://) the form shows the success message without
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
