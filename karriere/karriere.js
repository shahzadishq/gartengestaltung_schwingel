/* Karriere-Funnel Gartengestaltung Schwingel
   1:1-Nachbau von schwingel-karriere.vercel.app ohne React/Build-Schritt:
   gleiche Texte, gleiche Reihenfolge, gleiche CSS-Klassen, gleiche Formular-Logik
   und gleiche Daten an denselben Make-Webhook. */
(() => {
  /* ======================= Konfiguration ======================= */
  const CONFIG = {
    // Bewerbungen gehen – wie im Original – an diesen Make-Webhook.
    webhook: 'https://hook.eu1.make.com/6jtks744hc72aod9uzr1ke3k7ykbstgu',
    // Meta Pixel + Funnel-Tracking (greenhub) des Originals.
    // Standardmäßig AUS: ohne Cookie-Einwilligung nicht DSGVO-konform, und diese
    // Kopie soll die Statistik der Live-Seite nicht verfälschen. Auf true setzen,
    // wenn diese Seite die Live-Seite ersetzt.
    tracking: false,
    metaPixelIds: ['1586088959588352'],
    funnelEndpoint: 'https://greenhub-six.vercel.app/api/recruiting/funnel-event',
    quelle: 'schwingel-landingpage',
    img: {
      logo: 'img/logo.png',
      heroStart: 'img/hero-start.jpg',
      headerBg: 'img/header-bg-2.jpg',
      success: 'img/success.jpg',
    },
  };

  /* ======================= Inhalte (identisch zum Original) ======================= */
  const BAULEITER = 'Bauleiter im Garten- und Landschaftsbau (m/w/d)';
  const VORARBEITER = 'Vorarbeiter im Garten- und Landschaftsbau (m/w/d)';
  const GAERTNER = 'Landschaftsgärtner (m/w/d)';

  const F_BEREICH = {
    frage: 'Welcher Bereich interessiert dich?',
    antworten: [
      { label: 'Garten- & Landschaftsbau (Neubau & Gestaltung)' },
      { label: 'Grünflächen- & Gartenpflege' },
      { label: 'Beides ist mir recht' },
    ],
  };
  const F_ERFAHRUNG = {
    frage: 'Wie viel Berufserfahrung hast du?',
    antworten: [
      { label: 'Unter 2 Jahre' },
      { label: '2–5 Jahre' },
      { label: '5–10 Jahre' },
      { label: 'Über 10 Jahre' },
    ],
  };
  const F_FUEHRERSCHEIN = {
    frage: 'Hast du einen Führerschein?',
    antworten: [
      { label: 'Ja, Klasse B' },
      { label: 'Ja, Klasse B + BE' },
      { label: 'Ja, Klasse C/CE (LKW)' },
      { label: 'Nein' },
    ],
  };

  const KUNDE = {
    name: 'Gartengestaltung Schwingel',
    kundeGlideId: 'Yn-3jhZIQEK1WVeRry9JCg',
    kundeRecId: 'recyQGXOGLz48neVk',
    ort: 'Ennigerloh',
    benefits: [
      'Überdurchschnittliches Gehalt + Sonderzahlungen',
      '30 Tage Urlaub + Sonderurlaub',
      'Regelmäßige Teamevents & echter Zusammenhalt',
      'Wertschätzung ab Tag 1',
      'Entwicklung & Aufstiegschancen',
    ],
    stellen: [
      {
        title: BAULEITER,
        id: '2G3KfhqySxK3p-6eh05h3w',
        fragen: [
          F_BEREICH,
          {
            frage: 'Was ist deine Qualifikation?',
            antworten: [
              { label: 'Meister im Garten- & Landschaftsbau' },
              { label: 'Techniker im Garten- & Landschaftsbau' },
              { label: 'Ingenieur im Garten- & Landschaftsbau' },
              { label: 'Abgeschlossene Ausbildung im GaLaBau' },
              { label: 'Quereinsteiger / (noch) keine Qualifikation im GaLaBau', weiterVorschlag: [VORARBEITER, GAERTNER] },
            ],
          },
          F_ERFAHRUNG,
          F_FUEHRERSCHEIN,
        ],
      },
      {
        title: VORARBEITER,
        id: 'a.7T8f7--Rie4Q9zX1K8drQ',
        fragen: [
          F_BEREICH,
          {
            frage: 'Was ist deine Qualifikation?',
            antworten: [
              { label: 'Abgeschlossene Ausbildung zum Gärtner (m/w/d)' },
              { label: 'Keine Ausbildung, aber mehrjährige Erfahrung im GaLaBau' },
              { label: 'Weder Ausbildung noch Erfahrung im GaLaBau', weiterVorschlag: [GAERTNER] },
            ],
          },
          F_ERFAHRUNG,
          F_FUEHRERSCHEIN,
        ],
      },
      {
        title: GAERTNER,
        id: 'eTBVrcd7R86tdLB6uozzlA',
        fragen: [
          F_BEREICH,
          {
            frage: 'Was ist deine Qualifikation?',
            antworten: [
              { label: 'Ausgebildeter Landschaftsgärtner (m/w/d)' },
              { label: 'Meister / Techniker' },
              { label: 'Erfahren ohne Ausbildung' },
              { label: 'Quereinsteiger' },
            ],
          },
          F_ERFAHRUNG,
          F_FUEHRERSCHEIN,
        ],
      },
    ],
  };

  const BENEFIT_ICONS = ['💶', '🌴', '🎉', '🤝', '🚀'];
  const ERREICHBARKEIT = ['Ganztags', 'Vormittags', 'Nachmittags', 'Abends'];

  const BEWERBERPROFIL = `# Bewerberprofil

---

**Datum Interview:**

**Wohnort:**

---

(1) Berufliche Laufbahn: Was machen Sie aktuell? Was haben Sie vorher gemacht?

(2) Such-Hintergrund: Warum wollen Sie Ihr Arbeitsumfeld wechseln? Warum bewerben Sie sich?

(3) Prioritäten: Was wäre Ihnen denn wichtig, wenn Sie bei uns anfangen? (Gehalt, Team, Kunden, Weiterbildung, Arbeitseinstellung)

(4) Stärken/Charaktereigenschaften: Worin sind sie gut/Was ist ihr Steckenpferd? Wie würden Sie ihre Charaktereigenschaften beschreiben, wenn man mit Ihnen zusammenarbeitet? (Belastbar, Führung, Teamfähig, lernbereit, offen für Neues)

(5) Arbeitsaufgaben/Alltag: Was wäre der ideale Arbeits-Alltag/die idealen Arbeitsaufgaben?

(6) Alter: Wie alt sind Sie?

(7) Führerschein: Haben Sie einen Führerschein? Wenn ja, welche(n)?

(8) Start: Ab wann könnten Sie beginnen?

(9) Persönliche Einschätzung:`;

  /* ======================= Hilfsfunktionen ======================= */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const splitTitle = (t) => {
    const m = t.match(/^(.+?)\s*(\([^)]+\))\s*$/);
    return m ? { main: m[1], suffix: m[2] } : { main: t, suffix: '' };
  };
  const findStelle = (title) => KUNDE.stellen.find((s) => s.title === title);
  const chevron = (stroke = 'white', size = 18) =>
    `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

  /* ======================= Bausteine (Komponenten des Originals) ======================= */
  const Logo = (onDark = false) => {
    const img = `<img src="${CONFIG.img.logo}" alt="Gartengestaltung Schwingel" class="h-7 w-auto object-contain sm:h-8">`;
    return onDark ? `<span class="inline-flex items-center rounded-xl bg-white px-2.5 py-1.5 shadow-md">${img}</span>` : img;
  };

  const Footer = () => `
    <div class="border-t border-surface-border bg-surface-soft px-6 py-3.5 text-center text-[11px] font-medium text-ink-muted">
      <a href="https://www.schwingel-gartengestaltung.de/impressum/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 transition-colors hover:text-brand">Impressum</a><span class="mx-2 text-ink-subtle">·</span><a href="https://www.schwingel-gartengestaltung.de/datenschutzerklaerung/" target="_blank" rel="noopener noreferrer" class="underline underline-offset-2 transition-colors hover:text-brand">Datenschutz</a><span class="mx-2 text-ink-subtle">·</span><a href="../" class="underline underline-offset-2 transition-colors hover:text-brand">Zur Webseite</a>
    </div>`;

  const BADGE_SIZES = {
    lg: { main: 'text-[44px] sm:text-[56px]', sub: 'text-[14px] sm:text-[18px]', pad: 'px-4 py-2.5 sm:px-5 sm:py-3' },
    sm: { main: 'text-[26px] sm:text-[30px]', sub: 'text-[9px] sm:text-[10px]', pad: 'px-2.5 py-1.5' },
  };
  const DuKannstMehr = (size = 'lg', animate = false, extra = '') => {
    const r = BADGE_SIZES[size];
    const lg = size === 'lg';
    return `
      <div class="inline-block ${animate ? 'animate-float' : ''} ${extra}">
        <div class="relative -rotate-[4deg]">
          <span aria-hidden="true" class="absolute block border-brand ${lg ? '-left-3 -top-3 h-[118%] w-[56%] border-[4px]' : '-left-2 -top-2 h-[116%] w-[58%] border-[3px]'}"></span>
          <div class="relative bg-brand-deep ${r.pad} shadow-block">
            <span class="block font-display uppercase leading-[0.84] tracking-[-0.015em] text-white ${r.main}">Du<br>Kannst<br>Mehr<span class="text-brand-light">.</span></span>
          </div>
          <div class="relative ${lg ? '-mt-1 ml-5' : '-mt-0.5 ml-3'} w-fit -skew-x-[12deg] bg-brand ${lg ? 'px-3 py-1.5' : 'px-2 py-1'}">
            <span class="block font-sans font-black uppercase italic leading-[1.08] tracking-[0.01em] text-white ${r.sub}">Dein Job sollte das<br>auch können<span class="text-brand-light">.</span></span>
          </div>
          <span aria-hidden="true" class="mt-1 block h-[2px] -skew-x-[12deg] bg-brand ${lg ? 'ml-8 w-[62%]' : 'ml-5 w-[55%]'}"></span>
        </div>
      </div>`;
  };

  const OrtPin = (text) => `
    <span class="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-semibold text-brand shadow-md">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-5.686 7-11a7 7 0 10-14 0c0 5.314 7 11 7 11z" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"></path><circle cx="12" cy="10" r="2.4" stroke="currentColor" stroke-width="2.2"></circle></svg>${esc(text)}
    </span>`;

  const Chip = (text) => `
    <span class="inline-flex items-center gap-1 rounded-full border-2 border-accent-limeLight bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-deep">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg>${esc(text)}
    </span>`;

  const StellenListe = () => `
    <div class="flex flex-col gap-3">
      ${KUNDE.stellen.map((s, i) => {
        const { main, suffix } = splitTitle(s.title);
        return `
        <button type="button" data-stelle="${esc(s.title)}" style="animation-delay: ${i * 70}ms;" class="group relative w-full animate-slide-up overflow-hidden rounded-2xl bg-brand px-5 py-5 pr-14 text-left shadow-block transition-all duration-200 hover:bg-brand-dark active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
          <span aria-hidden="true" class="absolute inset-y-0 left-0 w-1.5 bg-accent-limeLight transition-all duration-200 group-hover:w-2.5"></span>
          <span class="block font-sans text-[16px] font-bold uppercase leading-[1.15] tracking-[0.01em] text-white sm:text-[17px]">${esc(main)}</span>
          ${suffix ? `<span class="mt-1 block text-[13px] font-semibold text-white/65">${esc(suffix)}</span>` : ''}
          <span aria-hidden="true" class="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">${chevron('white', 18)}</span>
        </button>`;
      }).join('')}
    </div>`;

  const Vorteile = () => `
    <div class="relative overflow-hidden bg-brand-deep bg-grid px-5 py-9">
      <div class="relative">
        <p class="text-[12px] font-bold uppercase tracking-[0.18em] text-accent-limeLight">Deine Vorteile</p>
        <h2 class="mt-1 font-display text-[24px] uppercase leading-[1.05] tracking-[-0.01em] text-white sm:text-[28px]">Was dir<br>Schwingel bietet</h2>
        <div class="mt-6 flex flex-col gap-3">
          ${KUNDE.benefits.map((b, i) => `
          <div style="animation-delay: ${i * 80}ms;" class="group flex animate-slide-up items-center gap-4 rounded-2xl border-2 border-accent-limeLight/70 bg-white/[0.07] p-3.5 backdrop-blur-sm transition-colors hover:border-accent-limeLight hover:bg-white/[0.12]">
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent-limeLight text-[22px] shadow-sm">${BENEFIT_ICONS[i] ?? '✓'}</span>
            <span class="text-[15px] font-bold leading-snug text-white sm:text-[16px]">${esc(b)}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>`;

  const Titel = (text, sub) => `
    <div class="px-5 pb-4 pt-5">
      <h1 class="font-display text-[22px] uppercase leading-[1.05] tracking-[-0.01em] text-brand-deep sm:text-[25px]">${esc(text)}</h1>
      ${sub ? `<p class="mt-1.5 text-[14px] font-medium leading-snug text-ink-muted">${esc(sub)}</p>` : ''}
    </div>`;

  const AntwortButton = (label, index) => `
    <div class="animate-slide-up" style="animation-delay: ${index * 60}ms;">
      <button type="button" data-antwort="${index}" class="group relative w-full overflow-hidden rounded-2xl px-5 py-4 pr-14 text-left transition-all duration-200 active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 bg-brand text-white shadow-block hover:bg-brand-dark">
        <span aria-hidden="true" class="absolute inset-y-0 left-0 w-1.5 transition-all duration-200 group-hover:w-2.5 bg-accent-limeLight"></span>
        <span class="block text-[15px] font-bold leading-snug">${esc(label)}</span>
        <span aria-hidden="true" class="absolute right-3.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-200 group-hover:translate-x-0.5 bg-white/15">${chevron('currentColor', 17)}</span>
      </button>
    </div>`;

  const SchrittHeader = (current, total) => `
    <div class="relative overflow-hidden bg-brand-deep px-4 pb-4 pt-3.5">
      <img src="${CONFIG.img.headerBg}" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover object-center">
      <div class="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/40 to-transparent"></div>
      <div class="absolute inset-0 bg-black/5"></div>
      <div class="relative flex items-start justify-between gap-3">
        <button type="button" data-back class="-ml-1 inline-flex items-center gap-1 rounded-lg px-1.5 py-1 text-[13px] font-semibold text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M15 6l-6 6 6 6" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>Zurück
        </button>
        ${Logo(true)}
      </div>
      <div class="relative mt-3 flex items-end justify-between gap-4">
        ${DuKannstMehr('sm')}
        <div class="flex items-center gap-1.5 rounded-full bg-brand-deep/55 px-2.5 py-1.5 backdrop-blur-sm">
          ${Array.from({ length: total }, (_, i) => `<span class="h-1.5 rounded-full transition-all duration-300 ${i <= current ? 'w-6 bg-accent-limeLight' : 'w-2.5 bg-white/45'}"></span>`).join('')}
        </div>
      </div>
    </div>`;

  const FeldIcon = (name) => {
    const s = 'currentColor';
    if (name === 'user') return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M4 20c1-4 4-6 8-6s7 2 8 6M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="${s}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    if (name === 'mail') return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><rect x="3" y="5" width="18" height="14" rx="2.5" stroke="${s}" stroke-width="2"></rect><path d="M3.5 7.5l8.5 6 8.5-6" stroke="${s}" stroke-width="2"></path></svg>`;
    return `<svg width="19" height="19" viewBox="0 0 24 24" fill="none"><path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" stroke="${s}" stroke-width="2" stroke-linejoin="round"></path></svg>`;
  };
  const Feld = (icon, input) => `
    <div class="flex items-center gap-3 rounded-2xl border-2 border-surface-border bg-white px-4 py-3 transition-colors focus-within:border-brand">
      <span class="shrink-0 text-brand/60">${FeldIcon(icon)}</span>
      <div class="min-w-0 flex-1">${input}</div>
    </div>`;
  const INPUT_CLS = 'w-full bg-transparent text-[15px] font-medium outline-none placeholder:font-normal placeholder:text-ink-subtle';
  const chipCls = (active) =>
    `rounded-full px-4 py-2 text-[13px] transition-all active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-1 ${active ? 'bg-brand font-semibold text-white shadow-sm' : 'border-2 border-surface-border bg-white font-medium text-ink hover:border-brand/40'}`;

  /* ======================= Screens ======================= */
  const StartScreen = () => `
    <div class="animate-fade-in">
      <div class="relative h-64 overflow-hidden bg-brand-deep">
        <img src="${CONFIG.img.heroStart}" alt="Das Team von Gartengestaltung Schwingel bei der Arbeit" class="absolute inset-0 h-full w-full object-cover object-[center_28%]">
        <div class="absolute inset-0 bg-gradient-to-t from-brand-deep/95 via-brand-deep/30 to-black/35"></div>
        <div class="relative flex items-start justify-between gap-3 p-4">${OrtPin(KUNDE.ort)}${Logo(true)}</div>
        <div class="absolute inset-x-0 bottom-0 px-5 pb-4">
          <h1 class="font-display text-[30px] uppercase leading-[0.92] tracking-[-0.01em] text-white drop-shadow-sm sm:text-[34px]">Wir suchen<br>Verstärkung</h1>
          <div class="mt-3 flex flex-wrap gap-1.5">${Chip('100 % diskret')}${Chip('Unverbindlich')}${Chip('In 2 Minuten')}</div>
        </div>
      </div>
      <div class="px-5 pb-7 pt-6">
        <h1 class="font-display text-[21px] uppercase leading-[1.08] tracking-[-0.01em] text-brand-deep sm:text-[24px]">Welche Stelle interessiert dich?</h1>
        <div class="mt-5">${StellenListe()}</div>
      </div>
      <div class="relative flex justify-center overflow-hidden bg-brand-deep px-5 py-10">
        <img src="${CONFIG.img.headerBg}" alt="" aria-hidden="true" class="absolute inset-0 h-full w-full object-cover object-center">
        <div class="absolute inset-0 bg-black/15"></div>
        ${DuKannstMehr('lg', true, 'relative')}
      </div>
      ${Vorteile()}
      <div class="px-5 pb-8 pt-8">
        <h2 class="font-display text-[20px] uppercase leading-[1.1] tracking-[-0.01em] text-brand-deep sm:text-[23px]">Wir vergrößern unser Team</h2>
        <p class="mt-1.5 text-[14px] font-medium text-ink-muted">Verstärke uns — wähl die Stelle, die zu dir passt.</p>
        <div class="mt-5">${StellenListe()}</div>
      </div>
      ${Footer()}
    </div>`;

  const FrageScreen = (frage, index, total) => `
    <div class="animate-fade-in">
      ${SchrittHeader(index, total)}
      ${Titel(frage.frage)}
      <div class="flex flex-col gap-3 px-5 pb-6">${frage.antworten.map((a, i) => AntwortButton(a.label, i)).join('')}</div>
      ${Footer()}
    </div>`;

  const HinweisScreen = (vorschlaege, current, total) => `
    <div class="animate-fade-in">
      ${SchrittHeader(current, total)}
      ${Titel('Danke für deine Ehrlichkeit!', 'Kein Problem — vielleicht passt eine dieser Stellen sogar besser zu dir:')}
      <div class="flex flex-col gap-3 px-5 pb-4">
        ${vorschlaege.map((v) => `
        <button type="button" data-stelle="${esc(v)}" class="group relative w-full overflow-hidden rounded-2xl bg-brand px-5 py-4 pr-12 text-left shadow-block transition-all duration-200 hover:bg-brand-dark active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2">
          <span aria-hidden="true" class="absolute inset-y-0 left-0 w-1.5 bg-accent-limeLight"></span>
          <span class="block text-[15px] font-bold leading-snug text-white">${esc(v)}</span>
          <span aria-hidden="true" class="absolute right-3.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5">${chevron('white', 17)}</span>
        </button>`).join('')}
      </div>
      <div class="pb-6"></div>
      ${Footer()}
    </div>`;

  const KontaktScreen = (current, total, d) => `
    <div class="animate-fade-in">
      ${SchrittHeader(current, total)}
      ${Titel('Fast geschafft!', 'Nur noch deine Kontaktdaten — wir rufen dich an.')}
      <form data-form class="flex flex-col gap-2.5 px-5 pb-5" autocomplete="on" novalidate>
        ${Feld('user', `<input type="text" name="name" id="bewerber-name" placeholder="Dein vollständiger Name" value="${esc(d.name)}" autocomplete="name" required class="${INPUT_CLS}">`)}
        ${Feld('phone', `<input type="tel" name="tel" id="bewerber-tel" placeholder="Deine Handynummer" value="${esc(d.phone)}" autocomplete="tel" inputmode="tel" required class="${INPUT_CLS}">`)}
        ${Feld('mail', `<input type="email" name="email" id="bewerber-email" placeholder="Deine E-Mail Adresse (optional)" value="${esc(d.email)}" autocomplete="email" inputmode="email" class="${INPUT_CLS}">`)}
        <div class="mt-1.5">
          <p class="mb-2 text-[13px] font-medium text-ink">Wann bist du am besten erreichbar?</p>
          <div class="flex flex-wrap gap-2">
            ${ERREICHBARKEIT.map((e) => {
              const active = (d.erreichbarkeit || 'Ganztags') === e;
              return `<button type="button" data-erreichbar="${e}" aria-pressed="${active}" class="${chipCls(active)}">${e}</button>`;
            }).join('')}
          </div>
        </div>
        <label class="mt-2 flex cursor-pointer items-start gap-2.5 text-[13px] leading-snug text-ink">
          <input type="checkbox" name="datenschutz" ${d.datenschutz ? 'checked' : ''} class="mt-0.5 h-[18px] w-[18px] accent-brand" required>
          <span>Ich akzeptiere die <a href="https://www.schwingel-gartengestaltung.de/datenschutzerklaerung/" target="_blank" rel="noopener noreferrer" class="font-semibold text-brand underline underline-offset-2">Datenschutzbestimmungen</a></span>
        </label>
        <div data-fehler hidden class="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-[13px] leading-relaxed text-red-700">
          <span class="font-semibold">Das Absenden hat leider nicht geklappt.</span> Bitte versuche es gleich noch einmal — oder schreib uns direkt an <a href="mailto:hello@greenfield-digital.de?subject=Bewerbung%20Gartengestaltung%20Schwingel" class="font-semibold underline underline-offset-2">hello@greenfield-digital.de</a>, dann geht deine Bewerbung garantiert nicht verloren.
        </div>
        <button type="submit" data-submit class="group relative mt-2 w-full overflow-hidden rounded-2xl bg-brand py-4 font-display text-[17px] uppercase tracking-[0.01em] text-white shadow-block transition-all duration-200 hover:bg-brand-dark active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none">
          <span aria-hidden="true" class="absolute inset-y-0 left-0 w-1.5 bg-accent-limeLight"></span><span data-submit-label>Jetzt bewerben!</span>
        </button>
        <p class="mt-1 text-center text-[12px] leading-relaxed text-ink-muted">Wir verwenden deine Daten ausschließlich für den Bewerbungsprozess und die Kontaktaufnahme.</p>
      </form>
      <div class="mx-5 mb-6 flex items-center justify-center gap-2 rounded-2xl bg-canvas px-4 py-2.5 text-center text-[12px] font-semibold text-brand">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" stroke-width="2.2"></rect><path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"></path></svg>100 % sichere Datenverbindung
      </div>
      <div class="border-t border-surface-border px-5 py-6">
        <h2 class="text-center font-display text-[15px] uppercase tracking-[0.02em] text-brand-deep">So geht's danach weiter</h2>
        <ol class="mt-4 flex flex-col gap-4">
          <li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand font-display text-[13px] text-white">1</span><span class="pt-0.5 text-[14px] leading-relaxed text-ink">Wir melden uns innerhalb von <b>48 Stunden</b> bei dir für ein kurzes Kennenlerngespräch.</span></li>
          <li class="flex gap-3"><span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand font-display text-[13px] text-white">2</span><span class="pt-0.5 text-[14px] leading-relaxed text-ink">Passt es für beide Seiten, laden wir dich zum Vorstellungsgespräch ein.</span></li>
        </ol>
      </div>
      ${Footer()}
    </div>`;

  const ErfolgScreen = () => `
    <div class="animate-fade-in">
      <div class="relative">
        <img src="${CONFIG.img.success}" alt="Das Team von Gartengestaltung Schwingel" class="h-64 w-full object-cover object-[center_25%] sm:h-72">
        <div class="absolute inset-0 bg-gradient-to-t from-brand-deep via-brand-deep/45 to-brand-deep/10"></div>
        <div class="absolute inset-x-0 top-0 flex justify-end p-4">${Logo(true)}</div>
        <div class="absolute inset-x-0 bottom-0 p-5">${DuKannstMehr('sm')}</div>
      </div>
      <div class="bg-brand-deep bg-grid px-5 pb-7 pt-6 text-center">
        <span class="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent-limeLight"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#43041b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        <h1 class="mt-4 font-display text-[24px] uppercase leading-[1.08] text-white sm:text-[27px]">Deine Bewerbung<br>ist eingegangen!</h1>
        <p class="mx-auto mt-3 max-w-[19rem] text-[14px] leading-relaxed text-white/80">Wir prüfen deine Angaben persönlich und melden uns in deinem angegebenen Zeitraum — innerhalb von <b class="font-extrabold text-white">48 Stunden</b>.</p>
      </div>
      <div class="bg-accent-limeLight px-5 py-4 text-center"><span class="font-display text-[17px] uppercase tracking-[0.01em] text-brand-deep">Wir freuen uns auf dich!</span></div>
      ${Footer()}
    </div>`;

  /* ======================= Versand (identische Nutzdaten) ======================= */
  const notizen = (d) => {
    const fragen = findStelle(d.bereich)?.fragen ?? [];
    return `**Fragen & Antworten:**

${fragen.map((f, i) => `[${f.frage}] ${d.antworten[i] ?? ''}`).join('\n\n')}


${BEWERBERPROFIL}`;
  };
  const payload = (d) => {
    const s = findStelle(d.bereich);
    return {
      name: d.name,
      email: d.email,
      phone: d.phone,
      erreichbarkeit: d.erreichbarkeit,
      stelle: d.bereich,
      stelle_id: s?.id ?? '',
      ausbildung: d.antworten[0] ?? '',
      erfahrung: d.antworten[1] ?? '',
      datenschutz: d.datenschutz,
      unternehmen: KUNDE.name,
      kunde_glide_id: KUNDE.kundeGlideId,
      kunde_rec_id: KUNDE.kundeRecId,
      ort: KUNDE.ort,
      quelle: CONFIG.quelle,
      zeitstempel: new Date().toISOString(),
      notizen: notizen(d),
      status: '🆕 Unbearbeitet',
    };
  };
  const RETRY_DELAYS = [800, 2000];
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));
  const postOnce = async (body) => {
    try {
      const res = await fetch(CONFIG.webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      return res.ok ? { ok: true } : { ok: false, error: `Webhook antwortete mit ${res.status}` };
    } catch (e) {
      return { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  };
  const submitApplication = async (d) => {
    const body = payload(d);
    let result = { ok: false, error: 'unbekannt' };
    for (let i = 0; i <= RETRY_DELAYS.length; i++) {
      if (i > 0) await wait(RETRY_DELAYS[i - 1]);
      result = await postOnce(body);
      if (result.ok) {
        if (typeof window.fbq === 'function') window.fbq('track', 'Lead', { content_name: body.stelle, content_category: body.unternehmen });
        return { ok: true };
      }
      console.warn(`[submitApplication] Versuch ${i + 1} fehlgeschlagen:`, result.error);
    }
    return result;
  };

  /* ======================= Tracking (optional, siehe CONFIG) ======================= */
  const initPixel = () => {
    if (!CONFIG.tracking || window.fbq) return;
    ((w, d, t, src) => {
      if (w.fbq) return;
      const n = (w.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
      w._fbq ||= n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      const s = d.createElement(t); s.async = true; s.src = src;
      const f = d.getElementsByTagName(t)[0]; f.parentNode.insertBefore(s, f);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    CONFIG.metaPixelIds.forEach((id) => window.fbq('init', id));
    window.fbq('track', 'PageView');
  };
  const session = () => {
    try {
      let id = sessionStorage.getItem('schwingel_session');
      if (!id) {
        id = `anon-${crypto?.randomUUID ? crypto.randomUUID() : Math.random().toString(16).slice(2) + Date.now().toString(16)}`;
        sessionStorage.setItem('schwingel_session', id);
      }
      return id;
    } catch { return 'anon-unknown'; }
  };
  const track = (event, extra = {}) => {
    if (!CONFIG.tracking) return;
    const body = JSON.stringify({
      event, session: session(), kunde: KUNDE.name, kunde_id: KUNDE.kundeGlideId,
      stelle: extra.stelle ?? null, stelle_id: extra.stelle_id ?? null, schritt: extra.schritt ?? null, status: extra.status ?? null,
      quelle: CONFIG.quelle, zeitstempel: new Date().toISOString(),
    });
    try {
      navigator.sendBeacon
        ? navigator.sendBeacon(CONFIG.funnelEndpoint, new Blob([body], { type: 'text/plain;charset=UTF-8' }))
        : fetch(CONFIG.funnelEndpoint, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=UTF-8' }, body, keepalive: true });
    } catch (e) { console.debug('[funnel-track] senden fehlgeschlagen (ignoriert)', e); }
  };

  /* ======================= Zustand & Ablauf ======================= */
  const LEER = { bereich: '', antworten: [], name: '', email: '', phone: '', erreichbarkeit: '', datenschutz: false };
  const state = { screen: 'start', index: 0, data: { ...LEER }, vorschlaege: [] };
  const card = document.createElement('div');
  card.className = 'w-full max-w-md overflow-hidden rounded-[26px] bg-white shadow-card';
  const shell = document.createElement('div');
  shell.className = 'flex min-h-[100dvh] flex-col items-center justify-start bg-canvas px-3 py-4 sm:justify-center sm:py-10';
  shell.appendChild(card);
  const root = document.getElementById('root');
  root.replaceChildren(shell);

  const fragen = () => findStelle(state.data.bereich)?.fragen ?? [];
  const total = () => fragen().length + 1;

  const waehleStelle = (title) => {
    const s = findStelle(title);
    track('stelle_gewaehlt', { stelle: title, stelle_id: s?.id });
    track('schritt_erreicht', { stelle: title, stelle_id: s?.id, schritt: 1 });
    state.data = { ...LEER, antworten: [], bereich: title };
    state.index = 0;
    go('frage');
  };
  const weiter = (i) => {
    const s = findStelle(state.data.bereich);
    if (i + 1 < fragen().length) {
      track('schritt_erreicht', { stelle: state.data.bereich, stelle_id: s?.id, schritt: i + 2 });
      state.index = i + 1;
      go('frage');
    } else {
      track('kontakt_erreicht', { stelle: state.data.bereich, stelle_id: s?.id });
      go('kontakt');
    }
  };

  const go = (screen) => { state.screen = screen; render(); };

  const render = () => {
    const d = state.data;
    if (state.screen === 'start') card.innerHTML = StartScreen();
    else if (state.screen === 'frage') card.innerHTML = FrageScreen(fragen()[state.index], state.index, total());
    else if (state.screen === 'hinweis') card.innerHTML = HinweisScreen(state.vorschlaege, state.index, total());
    else if (state.screen === 'kontakt') { card.innerHTML = KontaktScreen(fragen().length, total(), d); bindForm(); }
    else if (state.screen === 'success') card.innerHTML = ErfolgScreen();
  };

  // Klicks zentral auswerten (Stellen, Antworten, Zurück)
  card.addEventListener('click', (e) => {
    const stelle = e.target.closest('[data-stelle]');
    if (stelle) return waehleStelle(stelle.dataset.stelle);

    const back = e.target.closest('[data-back]');
    if (back) {
      if (state.screen === 'frage') state.index === 0 ? go('start') : ((state.index -= 1), go('frage'));
      else if (state.screen === 'hinweis') go('frage');
      else if (state.screen === 'kontakt') { state.index = Math.max(0, fragen().length - 1); go('frage'); }
      return;
    }

    const antwort = e.target.closest('[data-antwort]');
    if (antwort && state.screen === 'frage') {
      const i = state.index;
      const a = fragen()[i].antworten[+antwort.dataset.antwort];
      state.data.antworten = [...state.data.antworten];
      state.data.antworten[i] = a.label;
      if (a.weiterVorschlag && a.weiterVorschlag.length) {
        track('disqualifiziert', { stelle: state.data.bereich, stelle_id: findStelle(state.data.bereich)?.id, schritt: i + 1 });
        state.vorschlaege = a.weiterVorschlag;
        go('hinweis');
      } else {
        weiter(i);
      }
    }
  });

  const bindForm = () => {
    const form = card.querySelector('[data-form]');
    const name = form.querySelector('#bewerber-name');
    const tel = form.querySelector('#bewerber-tel');
    const mail = form.querySelector('#bewerber-email');
    const check = form.querySelector('input[name="datenschutz"]');
    const submit = form.querySelector('[data-submit]');
    const label = form.querySelector('[data-submit-label]');
    const fehler = form.querySelector('[data-fehler]');
    const d = state.data;
    if (!d.erreichbarkeit) d.erreichbarkeit = 'Ganztags';
    let sending = false;

    const valid = () => {
      const emailOk = d.email.trim() === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email);
      return d.name.trim().length > 1 && d.phone.trim().length >= 6 && emailOk && d.datenschutz;
    };
    const update = () => { submit.disabled = !valid() || sending; };

    name.addEventListener('input', () => { d.name = name.value; update(); });
    tel.addEventListener('input', () => { d.phone = tel.value; update(); });
    mail.addEventListener('input', () => { d.email = mail.value; update(); });
    check.addEventListener('change', () => { d.datenschutz = check.checked; update(); });
    form.querySelectorAll('[data-erreichbar]').forEach((btn) => {
      btn.addEventListener('click', () => {
        d.erreichbarkeit = btn.dataset.erreichbar;
        form.querySelectorAll('[data-erreichbar]').forEach((b) => {
          const on = b === btn;
          b.setAttribute('aria-pressed', String(on));
          b.className = chipCls(on);
        });
      });
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!valid() || sending) return;
      sending = true; update();
      label.textContent = 'Wird gesendet…';
      fehler.hidden = true;
      d.name = d.name.trim(); d.email = d.email.trim(); d.phone = d.phone.trim();
      const result = await submitApplication(d);
      track('abgeschickt', { stelle: d.bereich, stelle_id: findStelle(d.bereich)?.id, status: result.ok ? 'erfolg' : 'fehler' });
      if (result.ok) return go('success');
      sending = false; update();
      label.textContent = 'Jetzt bewerben!';
      fehler.hidden = false;
    });
    update();
  };

  initPixel();
  track('seite_geoeffnet');
  render();
})();
