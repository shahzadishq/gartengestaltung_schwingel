# Gartengestaltung Schwingel – Homepage-Konzept 2026

Konzept für eine neue Startseite von **Gartengestaltung Schwingel GmbH & Co. KG** (Ennigerloh-Enniger).
Statische One-Page ohne Build-Schritt: HTML, CSS und ein kleines Vanilla-JS-Modul.

```bash
npm install        # nur für Dev-Server und Bildoptimierung nötig
npm run dev        # http://localhost:5173
npm run images     # Bilder aus images-src/ neu erzeugen
```

Deployment: Den Ordner unverändert auf Vercel, Netlify oder einen beliebigen Webspace legen.

## Aufbau

| Abschnitt | Anker | Inhalt |
|---|---|---|
| 1 · Hero | `#top` | „Gärten mit Handschrift.“, Bezug auf die handcolorierte Planung |
| 2 · Über uns | `#ueber-uns` | Teamfoto, „Ein eingeschworenes Gartenteam“, Firmengeschichte |
| 3 · Leistungen | `#leistungen` | alle 8 Leistungen der bestehenden Website |
| 4 · Warum Schwingel | `#vorteile` | 4 Kernargumente, Verbandsmitgliedschaft, Ausbildungsbetrieb |
| 5 · CTA | `#kontakt` | „Aus Ideen werden Gärten.“, E-Mail, Telefon, Ansprechpartner |
| 6 · Footer | – | Kontakt, Navigation, Leistungen, Impressum/Datenschutz |

```
index.html                Startseite
karriere/                 Karriere-Funnel (1:1-Nachbau von schwingel-karriere.vercel.app)
assets/css/styles.css     Design-Tokens, Layout, Motion
assets/js/main.js         Menü, Scroll-Reveal, Leistungs-Bühne/Akkordeon, Parallaxe
assets/fonts/             Archivo + Archivo Black (selbst gehostet → keine Google-Anfrage, DSGVO)
assets/img/               optimierte WebP/JPEG-Varianten (generiert)
images-src/               Originalbilder (Quelle für npm run images)
scripts/optimize-images.mjs
```

## Karriere-Seite (`/karriere/`)

1:1-Nachbau des bestehenden Bewerbungs-Funnels schwingel-karriere.vercel.app. Er ist ohne React
und ohne Build-Schritt umgesetzt, damit er auf GitHub Pages läuft.

- **Identisch:** alle Texte, 3 Stellen, je 4 Fragen, „Danke für deine Ehrlichkeit!“-Weiterleitung,
  Kontaktformular (Name, Handy, E-Mail optional, Erreichbarkeit, Datenschutz), Validierung,
  3 Sendeversuche, Fehlermeldung, Erfolgsseite. Das Stylesheet ist der Original-Tailwind-Build
  (`karriere/karriere.css`), nur die Schriften sind selbst gehostet. Pixelvergleich mit dem Original
  bei 390 und 1440 px: 0 abweichende Pixel auf allen Screens.
- **Bewerbungen** gehen mit exakt denselben Feldern an denselben Make-Webhook wie das Original.
- **Bewusst abweichend:** Meta Pixel und Funnel-Tracking (greenhub) sind standardmäßig **aus**
  (`tracking: false` in `karriere/karriere.js`). Sie laufen ohne Cookie-Einwilligung und würden
  sonst die Statistik der Live-Seite verfälschen. Einschalten, wenn diese Seite die Live-Seite ersetzt.
  „Zur Webseite“ im Footer führt auf die neue Startseite statt auf die Altseite.

## Corporate Identity

Übernommen aus dem Karriere-Funnel des Kunden (schwingel-karriere.vercel.app):

- **Farben:** Bordeaux `#840636`, Tiefrot `#43041b`, Hellrot `#a3174a`, Limette `#a8cc3c`.
  Neu ergänzt ist nur ein warmes Papierweiß (`#f4f1ea`) als ruhiger Grund. Alle Text- und
  Hintergrundkombinationen erreichen mindestens WCAG AA (4,5 : 1).
- **Typografie:** Archivo Black für Headlines (Versalien, enge Laufweite, Punkt als Akzent),
  Archivo für Fließtext. Kicker in Versalien mit weiter Laufweite, wie im Funnel.
- **Markenmotiv:** Die gekippte tiefrote Box mit versetztem Rahmen („Du kannst mehr.“) kommt als
  Leitmotiv im Hero und im CTA zurück. Das Logo steht wie im Funnel auf einer weißen Plakette.
- **Bildsprache:** Team in Bordeaux-Shirts und grüner Arbeitskleidung, echte Projekte.

## Herkunft der Inhalte

Alle Fakten stammen von schwingel-gartengestaltung.de (Unterseiten „Das sind wir“, „Unser Team“,
„Ansprechpartner“, „Kontakt“, „Impressum“, die Leistungsseiten und „Gerätschaften“).
Keine Referenzen, Bewertungen, Auszeichnungen oder Zahlen wurden erfunden.

| Aussage | Quelle |
|---|---|
| Gründung 1991, Vollzeit 1996, ca. 10.000 m² Fläche 1999, GaLaBau 2001, Ausbildungsbetrieb 2003 | „Das sind wir“ – Zeitleiste |
| 25 gut ausgebildete Mitarbeiter | „Das sind wir“ ⚠️ bitte auf Aktualität prüfen |
| Berufsgruppen im Team | „Unser Team“ |
| FFL-zertifizierter Baumkontrolleur | „Unser Team“ (Matthias Lohmann) |
| Leistungstexte | jeweilige Leistungsseite, gekürzt |
| „modernste Technik – vom leichten bis zum schweren Gerät“ | „Gerätschaften“ |
| Adresse, Telefon, Fax, E-Mail | „Kontakt“ / „Impressum“ |

## Bilder und Instagram

Die Fotos stammen aus dem Karriere-Funnel (Hero, Teamfotos), von der bestehenden Website (Team 2022,
Projektfotos, Porträts) und aus Instagram (vom Kunden bereitgestellt). Es gibt keine Stockfotos.
Instagram-Posts mit eingebranntem Text (Stellenanzeigen) sind bewusst nicht verwendet.

**Bild austauschen**, z. B. durch ein Instagram-Foto:

1. Original unter dem gleichen Namen in `images-src/` ablegen (z. B. `leistung-teich.jpg`).
2. `npm run images` ausführen. Das Skript erzeugt alle Größen in WebP und JPEG.
3. Weicht das Seitenverhältnis stark ab, `width`/`height` im `<img>` in `index.html` anpassen.

Alle Bildstellen sind im HTML mit `<!-- BILDPLATZ: … -->` markiert.

| Datei | Verwendung | Hinweis |
|---|---|---|
| `hero-garten.jpg` | Hero | nur 750 px breit – **höher aufgelöstes Original gewünscht** (≥ 2000 px) |
| `team-kollektiv.jpg` | Über uns | 2560 px, gut |
| `team-lachen.jpg` | CTA | 1080 px, gut |
| `insta-garten-schubkarre.jpg`, `insta-team-shirt.jpg` | Über uns (Zweitbild), Warum Schwingel | aus Instagram, nur 512 px – reicht für die kleinen Formate |
| `person-*.jpg` | Ansprechpartner im CTA | Porträts der Altseite, 200 px |
| `leistung-*.jpg` | Leistungen | 800 px von der Altseite – bessere Instagram-Fotos willkommen |
| `leistung-baumfaellung.jpg`, `leistung-grab.jpg` | Baumfällarbeiten, Grabgestaltung | Banner der Altseite, nur 600×220 px – werden unbeschnitten auf unscharfem Hintergrund gezeigt. **Größere Fotos gewünscht** |

## Offene Punkte vor dem Livegang

- [ ] Mitarbeiterzahl „25“ bestätigen (Stand der Altseite)
- [ ] Hero-Foto in höherer Auflösung liefern
- [ ] Größere Fotos für Baumfällarbeiten und Friedhofs- & Grabgestaltung liefern (aktuell 600×220 px von der Altseite)
- [ ] Text für Baumfällarbeiten freigeben: Die Altseite ist dort „im Aufbau“, der Text bleibt deshalb bewusst knapp
- [ ] Impressum/Datenschutz verlinken aktuell auf die bestehenden Seiten, beim Relaunch umstellen
- [ ] Optional: Kontaktformular statt `mailto:`-Link (benötigt Backend oder Formular-Dienst)

## Technik & Qualität

- Semantisches HTML, eine H1, saubere H2/H3-Hierarchie, Skip-Link, `aria-expanded` im Akkordeon,
  Fokus-Falle und Escape-Taste im Mobile-Menü, sichtbare Fokuszustände.
- Leistungen: Am Desktop steht die Liste neben einer „sticky“ Bildbühne, die beim Scrollen und
  bei Hover/Fokus wechselt. Auf Mobil/Tablet ist es ein Akkordeon mit Vorschaubildern.
- Motion: Bild-Reveals, gestaffelte Text-Einblendung, leichte Hero-Parallaxe (nur Desktop).
  `prefers-reduced-motion` schaltet alles ab. Ohne JavaScript sind alle Inhalte sichtbar.
- Getestet bei 1440, 1280, 1024, 768, 390 und 375 px: keine horizontale Überbreite.
- Initiale Ladegröße ca. 380 KB (Desktop) bzw. 450 KB (Mobil). LCP ist das vorab geladene Hero-Bild.
- LocalBusiness-Daten als JSON-LD, Meta- und Open-Graph-Tags.
