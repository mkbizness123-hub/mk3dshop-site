# MK3DShop — Website

Oficiālā MK3DShop mājaslapa. Personalizēti 3D drukāti produkti privātpersonām un uzņēmumiem.

🌐 **Live:** https://mk3dshopstore.github.io/mk3dshop-site/ *(pēc GitHub Pages ieslēgšanas)*

## Tech stack

- Statisks HTML, CSS, JS — bez frameworks, bez build soļa
- Bilingvāls (LV / EN) — klienta puses valodu pārslēgšana
- Hostēts bezmaksas uz GitHub Pages
- Responsīvs dizains (telefons, planšete, dators)

## Struktūra

```
mk3dshop-site/
├── index.html      # Galvenā lapa (visas sadaļas)
├── styles.css      # Viss dizains
├── script.js       # Valodu pārslēdzējs, kontakta forma, scroll animācijas
├── images/         # (ielikt produktu fotogrāfijas te)
└── README.md       # Šis fails
```

## Kā deployot uz GitHub Pages

### 1. Izveido GitHub repo

```bash
cd mk3dshop-site
git init
git add .
git commit -m "Initial commit — MK3DShop website"
git branch -M main
git remote add origin https://github.com/TAVS-GITHUB-USERNAME/mk3dshop-site.git
git push -u origin main
```

### 2. Ieslēdz GitHub Pages

1. Ej uz savu repo GitHub.com → **Settings**
2. Kreisajā sānjoslā → **Pages**
3. **Source**: Deploy from a branch
4. **Branch**: `main` / `/root`
5. Noklikšķini **Save**
6. Pēc 1–2 minūtēm saits būs pieejams: `https://TAVS-USERNAME.github.io/mk3dshop-site/`

### 3. (Vēlāk) Pieslēdz savu domēnu

Ja nopērc domēnu (piem., `mk3dshop.lv`):

1. Repo Settings → Pages → **Custom domain** → ievadi `mk3dshop.lv`
2. Pie sava domēna reģistratora pievieno DNS ierakstus:
   - **A records** uz GitHub Pages IP: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - vai **CNAME** `www` → `TAVS-USERNAME.github.io`
3. Ieslēdz **Enforce HTTPS** GitHub Pages iestatījumos

## Kā rediģēt saturu

### Mainīt tekstu

Visi teksti ir `index.html` ar `data-lv` un `data-en` atribūtiem:

```html
<p data-lv="Teksts latviski" data-en="Text in English">Teksts latviski</p>
```

Vienkārši maini vērtības — abām valodām.

### Mainīt krāsas

Atver `styles.css`, pašā augšā ir `:root` bloks ar visām krāsām:

```css
:root {
  --accent: #FF3B30;        /* Galvenā sarkanā */
  --accent-hot: #FF6B35;    /* Oranža */
  --accent-cool: #0A84FF;   /* Zila */
  /* ... */
}
```

### Pievienot produktu

`index.html` sadaļā `<!-- PRODUCTS -->` kopē kādu `.product-card` bloku un maini:
- `--accent` krāsu (inline style)
- Kategoriju un nosaukumu
- `data-lv` / `data-en` aprakstu
- (Vēlāk) Pievieno īstu bildi `.product-visual` vietā

### Kontaktu forma

Forma pašlaik ir placeholder. Lai tā strādātu:

1. Reģistrējies bezmaksas uz [Formspree.io](https://formspree.io/) (50 ziņas/mēnesī)
2. Izveido jaunu formu, saņem savu Form ID
3. `index.html` atrodi `action="https://formspree.io/f/YOUR_FORM_ID"` un ieraksti īsto URL

Alternatīvi — var izmantot [Web3Forms](https://web3forms.com/) vai [FormSubmit](https://formsubmit.co/) (arī bezmaksas).

## Lokālā pārbaude

Vienkāršākais veids — atver `index.html` pārlūkā (dubultklikšķis).

Vai palaidiet lokālo serveri:

```bash
# Ar Python 3
python3 -m http.server 8000

# Ar Node.js (ja uzinstalēts http-server)
npx http-server

# Ar PHP
php -S localhost:8000
```

Pēc tam atver `http://localhost:8000`.

## Nākamie soļi

- [ ] Aizstāt placeholder auto formas ar īstām produktu bildēm
- [ ] Pievienot Google Analytics vai Plausible
- [ ] Pieslēgt īstu kontaktu formu (Formspree)
- [ ] Nopirkt `mk3dshop.lv` domēnu
- [ ] Pievienot favicon
- [ ] Pievienot vairāk produktu
- [ ] Open Graph attēls sociālajiem tīkliem
