/* Gartengestaltung Schwingel – Interaktionen (ohne Abhängigkeiten) */
(() => {
  const root = document.documentElement;
  root.classList.add('js');

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktop = window.matchMedia('(min-width: 1024px)');

  /* ---------- Hero-Einstieg ---------- */
  const start = () => requestAnimationFrame(() => root.classList.add('is-loaded'));
  const heroImg = document.querySelector('.hero__media img');
  if (heroImg && !heroImg.complete) {
    heroImg.addEventListener('load', start, { once: true });
    heroImg.addEventListener('error', start, { once: true });
    setTimeout(start, 900); // nie länger als nötig warten
  } else {
    start();
  }

  /* ---------- Header-Zustand + dezente Hero-Parallaxe ---------- */
  const header = document.querySelector('[data-header]');
  const parallax = document.querySelector('[data-parallax] picture');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      header.classList.toggle('is-scrolled', y > 8);
      if (parallax && desktop.matches && !reduceMotion.matches && y < window.innerHeight * 1.2) {
        parallax.style.transform = `translate3d(0, ${y * 0.12}px, 0)`;
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile-Menü ---------- */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  const label = document.querySelector('[data-menu-label]');

  const setMenu = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Menü schließen' : 'Menü öffnen';
    document.body.classList.toggle('menu-open', open);
    if (open) {
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add('is-open'));
      menu.querySelector('a').focus({ preventScroll: true });
    } else {
      menu.classList.remove('is-open');
      setTimeout(() => { if (toggle.getAttribute('aria-expanded') === 'false') menu.hidden = true; }, 300);
    }
  };
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || toggle.getAttribute('aria-expanded') !== 'true') return;
    setMenu(false);
    toggle.focus();
  });
  // Fokus im geöffneten Menü halten
  menu.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const items = [toggle, ...menu.querySelectorAll('a')];
    const i = items.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
    else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
  });
  desktop.addEventListener('change', (e) => { if (e.matches) setMenu(false); });

  /* ---------- Scroll-Reveal ---------- */
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    // leichte Staffelung für Elemente im selben Block
    const groups = new Map();
    reveals.forEach((el) => {
      const parent = el.parentElement;
      const n = groups.get(parent) || 0;
      groups.set(parent, n + 1);
      el.style.setProperty('--d', `${Math.min(n, 5) * 0.08}s`);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Aktiver Navigationspunkt ---------- */
  const navLinks = [...document.querySelectorAll('.main-nav a[href^="#"]')];
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const navIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((a) => {
          const active = a.getAttribute('href') === `#${entry.target.id}`;
          a.classList.toggle('is-current', active);
          if (active) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => navIo.observe(s));
  }

  /* ---------- Leistungen ----------
     Desktop: alle Texte sichtbar, Bildbühne folgt Hover/Fokus/Scroll.
     Mobil/Tablet: Akkordeon, jeweils ein Eintrag geöffnet. */
  const wrap = document.querySelector('[data-services]');
  if (!wrap) return;
  const items = [...wrap.querySelectorAll('[data-service]')];
  const stages = [...wrap.querySelectorAll('[data-stage]')];
  const stageNum = wrap.querySelector('[data-stage-num]');
  let active = 0;

  const setActive = (index) => {
    if (index === active) return;
    stages.forEach((s) => s.classList.remove('was-active'));
    stages[active]?.classList.add('was-active');
    stages[active]?.classList.remove('is-active');
    stages[index]?.classList.add('is-active');
    items[active].classList.remove('is-active');
    items[index].classList.add('is-active');
    if (stageNum) stageNum.textContent = String(index + 1).padStart(2, '0');
    active = index;
  };

  const setOpen = (index) => {
    items.forEach((item, i) => {
      const open = i === index;
      item.classList.toggle('is-open', open);
      item.querySelector('.service__toggle').setAttribute('aria-expanded', String(open));
    });
  };

  const syncMode = () => {
    if (desktop.matches) {
      items.forEach((item) => {
        item.classList.add('is-open');
        item.querySelector('.service__toggle').setAttribute('aria-expanded', 'true');
      });
    } else {
      setOpen(active);
    }
  };

  items.forEach((item, i) => {
    const btn = item.querySelector('.service__toggle');
    btn.addEventListener('click', () => {
      if (desktop.matches) { setActive(i); return; }
      const isOpen = item.classList.contains('is-open');
      setOpen(isOpen ? -1 : i);
      if (!isOpen) {
        setActive(i);
        // geöffneten Eintrag sanft in Sicht bringen, falls er nach oben verrutscht
        setTimeout(() => {
          const top = item.getBoundingClientRect().top;
          const headerH = header.offsetHeight;
          if (top < headerH) window.scrollBy({ top: top - headerH - 8, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        }, 520);
      }
    });
    item.addEventListener('mouseenter', () => { if (desktop.matches) setActive(i); });
    item.addEventListener('focusin', () => { if (desktop.matches) setActive(i); });
  });

  if ('IntersectionObserver' in window) {
    const svcIo = new IntersectionObserver((entries) => {
      if (!desktop.matches) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(items.indexOf(entry.target));
      });
    }, { rootMargin: '-48% 0px -48% 0px' });
    items.forEach((item) => svcIo.observe(item));
  }

  desktop.addEventListener('change', syncMode);
  syncMode();
})();
