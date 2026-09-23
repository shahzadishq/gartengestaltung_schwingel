/* Karriere-Seite Gartengestaltung Schwingel
   Inhalte, Fragen, Formular-Logik und Bewerbungsdaten 1:1 wie im Karriere-Funnel
   (schwingel-karriere.vercel.app) – dargestellt als vollbreite Seite im Design der Startseite. */
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
      headerBg: '../assets/img/hero-garten-750.webp',
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
  const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  /* ======================= Bausteine ======================= */
  const JobButton = (title) => {
    const { main, suffix } = splitTitle(title);
    return `<button type="button" class="job-btn" data-stelle="${esc(title)}">
      <span class="job-btn__title">${esc(main)}</span>
      ${suffix ? `<span class="job-btn__suffix">${esc(suffix)}</span>` : ''}
      <span class="job-btn__arrow">${ARROW}</span>
    </button>`;
  };

  const Badge = () => `
    <div class="k-badge">
      <span class="k-badge__frame" aria-hidden="true"></span>
      <span class="k-badge__main">Du<br>kannst<br>mehr<span class="dot">.</span></span>
      <span class="k-badge__sub">Dein Job sollte das<br>auch können<span class="dot">.</span></span>
      <span class="k-badge__line" aria-hidden="true"></span>
    </div>`;

  const STEP_NAMES = ['Bereich', 'Qualifikation', 'Erfahrung', 'Führerschein', 'Kontaktdaten'];
  // Seitenleiste: Bild, gewählte Stelle, Fortschritt (Punkte mobil, Schrittliste Desktop)
  const Aside = (current, total) => `
    <aside class="funnel__aside">
      <picture class="funnel__aside-bg"><img src="${CONFIG.img.headerBg}" alt="" width="750" height="1000"></picture>
      <div class="funnel__aside-inner">
        <div class="funnel__top">
          <button type="button" class="funnel__back" data-back><svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>Zurück</button>
          ${Badge()}
        </div>
        <div class="funnel__job">
          <small>Deine Bewerbung als</small>
          <strong>${esc(state.data.bereich)}</strong>
        </div>
        <div class="funnel__dots" aria-hidden="true">
          ${Array.from({ length: total }, (_, i) => `<span class="${i <= current ? 'is-done' : ''}"></span>`).join('')}
        </div>
        <ol class="funnel__steps" aria-label="Fortschritt">
          ${Array.from({ length: total }, (_, i) => {
            const cls = i < current ? 'is-done' : i === current ? 'is-current' : '';
            return `<li class="${cls}"${i === current ? ' aria-current="step"' : ''}><span class="n">${i < current ? '✓' : i + 1}</span>${STEP_NAMES[i] ?? ''}</li>`;
          }).join('')}
        </ol>
      </div>
    </aside>`;

  const Shell = (current, total, main) => `
    <div class="funnel__grid">
      ${Aside(current, total)}
      <div class="funnel__main">${main}</div>
    </div>`;

  const Count = (current, total) => `<p class="funnel__count">Schritt ${current + 1} von ${total}</p>`;

  /* ======================= Screens ======================= */
  const FrageScreen = (frage, index, total) => Shell(index, total, `
    ${Count(index, total)}
    <h1 class="funnel__title" tabindex="-1">${esc(frage.frage)}</h1>
    <div class="funnel__answers">
      ${frage.antworten.map((a, i) => `
      <button type="button" class="answer-btn" data-antwort="${i}" style="--i:${i}">
        <span class="answer-btn__label">${esc(a.label)}</span>
        <span class="answer-btn__arrow">${ARROW}</span>
      </button>`).join('')}
    </div>`);

  const HinweisScreen = (vorschlaege, current, total) => Shell(current, total, `
    <h1 class="funnel__title" tabindex="-1">Danke für deine Ehrlichkeit!</h1>
    <p class="funnel__sub">Kein Problem — vielleicht passt eine dieser Stellen sogar besser zu dir:</p>
    <div class="funnel__answers">${vorschlaege.map((v) => JobButton(v)).join('')}</div>`);

  const ICON = {
    user: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20c1-4 4-6 8-6s7 2 8 6M12 12a4 4 0 100-8 4 4 0 000 8z"/></svg>',
    phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-3 2a12 12 0 006 6l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3.5 7.5l8.5 6 8.5-6"/></svg>',
  };

  const KontaktScreen = (current, total, d) => Shell(current, total, `
    ${Count(current, total)}
    <h1 class="funnel__title" tabindex="-1">Fast geschafft!</h1>
    <p class="funnel__sub">Nur noch deine Kontaktdaten — wir rufen dich an.</p>
    <form class="k-form" data-form autocomplete="on" novalidate>
      <label class="k-field"><span class="sr-only">Name</span>${ICON.user}<input type="text" name="name" id="bewerber-name" placeholder="Dein vollständiger Name" value="${esc(d.name)}" autocomplete="name" required></label>
      <div class="k-form__row">
        <label class="k-field"><span class="sr-only">Handynummer</span>${ICON.phone}<input type="tel" name="tel" id="bewerber-tel" placeholder="Deine Handynummer" value="${esc(d.phone)}" autocomplete="tel" inputmode="tel" required></label>
        <label class="k-field"><span class="sr-only">E-Mail</span>${ICON.mail}<input type="email" name="email" id="bewerber-email" placeholder="Deine E-Mail Adresse (optional)" value="${esc(d.email)}" autocomplete="email" inputmode="email"></label>
      </div>
      <div>
        <p class="k-form__label" id="reach-label">Wann bist du am besten erreichbar?</p>
        <div class="k-reach" role="group" aria-labelledby="reach-label">
          ${ERREICHBARKEIT.map((e) => `<button type="button" data-erreichbar="${e}" aria-pressed="${(d.erreichbarkeit || 'Ganztags') === e}">${e}</button>`).join('')}
        </div>
      </div>
      <label class="k-check">
        <input type="checkbox" name="datenschutz" ${d.datenschutz ? 'checked' : ''} required>
        <span>Ich akzeptiere die <a href="https://www.schwingel-gartengestaltung.de/datenschutzerklaerung/" target="_blank" rel="noopener noreferrer">Datenschutzbestimmungen</a></span>
      </label>
      <div class="k-error" data-fehler hidden role="alert">
        <strong>Das Absenden hat leider nicht geklappt.</strong> Bitte versuche es gleich noch einmal — oder schreib uns direkt an <a href="mailto:hello@greenfield-digital.de?subject=Bewerbung%20Gartengestaltung%20Schwingel">hello@greenfield-digital.de</a>, dann geht deine Bewerbung garantiert nicht verloren.
      </div>
      <button type="submit" class="k-submit" data-submit><span data-submit-label>Jetzt bewerben!</span></button>
      <p class="k-note">Wir verwenden deine Daten ausschließlich für den Bewerbungsprozess und die Kontaktaufnahme.</p>
      <p class="k-secure"><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 018 0v3"/></svg>100 % sichere Datenverbindung</p>
    </form>
    <div class="k-next">
      <h3>So geht's danach weiter</h3>
      <ol>
        <li><span>1</span><span>Wir melden uns innerhalb von <b>48 Stunden</b> bei dir für ein kurzes Kennenlerngespräch.</span></li>
        <li><span>2</span><span>Passt es für beide Seiten, laden wir dich zum Vorstellungsgespräch ein.</span></li>
      </ol>
    </div>`);

  const ErfolgScreen = () => `
    <div class="k-success">
      <div class="k-success__media">
        <img src="${CONFIG.img.success}" alt="Das Team von Gartengestaltung Schwingel" width="1080" height="1440">
        ${Badge()}
      </div>
      <div class="k-success__body">
        <span class="k-success__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
        <h1 tabindex="-1">Deine Bewerbung<br>ist eingegangen!</h1>
        <p>Wir prüfen deine Angaben persönlich und melden uns in deinem angegebenen Zeitraum — innerhalb von <b>48 Stunden</b>.</p>
        <a class="btn btn--lime k-success__home" href="../">Zur Startseite</a>
        <div class="k-success__band">Wir freuen uns auf dich!</div>
      </div>
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
  const landing = document.querySelector('[data-landing]');
  const funnel = document.querySelector('[data-funnel]');
  const header = document.querySelector('[data-header]');

  // Stellen-Buttons in Hero und „Offene Stellen“
  document.querySelectorAll('[data-jobs]').forEach((el) => {
    el.innerHTML = KUNDE.stellen.map((s) => JobButton(s.title)).join('');
  });

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
    const onLanding = state.screen === 'start';
    landing.hidden = !onLanding;
    funnel.hidden = onLanding;
    if (onLanding) {
      funnel.innerHTML = '';
      document.getElementById('stellen').scrollIntoView({ block: 'start' });
      return;
    }
    if (state.screen === 'frage') funnel.innerHTML = FrageScreen(fragen()[state.index], state.index, total());
    else if (state.screen === 'hinweis') funnel.innerHTML = HinweisScreen(state.vorschlaege, state.index, total());
    else if (state.screen === 'kontakt') { funnel.innerHTML = KontaktScreen(fragen().length, total(), d); bindForm(); }
    else if (state.screen === 'success') funnel.innerHTML = ErfolgScreen();
    window.scrollTo(0, 0);
    funnel.querySelector('h1')?.focus({ preventScroll: true });
  };

  // Klicks zentral auswerten (Stellen, Antworten, Zurück)
  document.addEventListener('click', (e) => {
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

  // „Jetzt bewerben“-Links im Header/Menü führen zurück zur Stellenwahl
  document.querySelectorAll('a[href="#stellen"]').forEach((a) => a.addEventListener('click', () => {
    if (state.screen !== 'start') { state.screen = 'start'; state.data = { ...LEER }; render(); }
  }));

  const bindForm = () => {
    const form = funnel.querySelector('[data-form]');
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
        form.querySelectorAll('[data-erreichbar]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
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
})();
