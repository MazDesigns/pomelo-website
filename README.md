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

## Images to add

Put the photos in `images/` using these exact names. Until a photo is added, its spot shows a grey box labelled with the filename it's waiting for.

| File | Where it shows |
|---|---|
| `images/hero.jpg` | Home, full-screen hero (landscape, ~2400px wide) |
| `images/ana.jpg` | Home, next to Our Services |
| `images/contact.jpg` | Home, contact section |
| `images/gallery/01.jpg` … `15.jpg` | Home, scrolling gallery strip (portrait) |
| `images/projects/enze-1.jpg` … `enze-6.jpg` | Gallery, Enze Bakery |
| `images/projects/ausrealty-1.jpg` … `-6.jpg` | Gallery, AusRealty |
| `images/projects/malkonyan-1.jpg` … `-6.jpg` | Gallery, Malkonyan |
| `images/projects/carniceria-1.jpg` … `-6.jpg` | Gallery, Carniceria Greenfield |
| `images/about.jpg` | About, hero image |
| `images/team/ana-campos.jpg`, `maria-andrea.jpg`, `andrew-hosick.jpg` | About, team |
| `images/clients/client-1.png` … `client-8.png` | About, client logos (transparent PNG) |
| `images/favicon.png` | Browser tab icon (square, 512px) |

To add or remove gallery photos, copy or delete a `<div class="ph">…</div>` line in `gallery.html`.
Keep photos under ~400 KB each. Resize to about 2000px on the long edge and export as JPG at 80%.

## Going live with your domain (Crazy Domains)

1. In the GitHub repo, open **Settings → Pages**. Set the source to **Deploy from a branch**, `main`, `/ (root)`. Enter `www.pomelodesigns.com.au` as the custom domain.
2. In Crazy Domains, go to **Domains → pomelodesigns.com.au → DNS settings**. Remove the Wix records, then add:
   - `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` record for `www` → `mazdesigns.github.io`
3. Wait for DNS to update. This is usually under an hour but can take up to 24 hours. Then tick **Enforce HTTPS** in GitHub Pages.
4. Only cancel the Wix plan once the new site is loading on your domain.

Before changing DNS, check whether your email (info@pomelodesigns.com.au) runs through Crazy Domains or Google/Microsoft. If it does, leave its `MX` records exactly as they are.
