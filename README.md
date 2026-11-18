# Pomelo Designs website

Static site for [pomelodesigns.com.au](https://www.pomelodesigns.com.au), hosted on GitHub Pages.
It's plain HTML, CSS and a little JavaScript, so there's no build step. Edit a file, push it, and the site updates.

```
index.html      Home: hero, services, gallery strip, contact
gallery.html    Projects: Enze Bakery, AusRealty, Malkonyan, Carniceria Greenfield
about.html      Studio story, client logos, team
css/style.css   All styling (colours and font are set at the top)
js/main.js      Mobile menu, image placeholders, gallery lightbox
CNAME           Custom domain for GitHub Pages
```

## Images

All photos are in `images/`, resized and compressed for the web:

- `hero.jpg`, `ana.jpg`, `contact.jpg`, `about.jpg`: page images
- `projects/<project>-<n>.jpg`: the Gallery page, which also feeds the scrolling strip on Home
- `team/`: About page portraits
- `logo.svg`, `favicon.svg`: brand logo and browser tab icon

**To add a project photo:** export it as a JPG about 1400px on the long edge and save it as `images/projects/<project>-<next number>.jpg`. Then raise that project's count in `gallery.html` by copying one of its `<div class="ph">…</div>` lines and changing the number.

## Going live with your domain (Crazy Domains)

1. In the GitHub repo, open **Settings → Pages**. Set the source to **Deploy from a branch**, `main`, `/ (root)`. Enter `www.pomelodesigns.com.au` as the custom domain.
2. In Crazy Domains, go to **Domains → pomelodesigns.com.au → DNS settings**. Remove the Wix records, then add:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `mazdesigns.github.io`
3. Wait for DNS to update. This is usually under an hour but can take up to 24 hours. Then tick **Enforce HTTPS** in GitHub Pages.
4. Only cancel the Wix plan once the new site is loading on your domain.

Before changing DNS, check whether your email (info@pomelodesigns.com.au) runs through Crazy Domains or Google/Microsoft. If it does, leave its `MX` records exactly as they are.
