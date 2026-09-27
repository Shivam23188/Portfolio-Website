/* ==========================================================================
   Shivam Pandey — Portfolio interactions
   Vanilla JS, no dependencies. Everything degrades gracefully.
   ========================================================================== */
(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  root.classList.remove("no-js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Theme ---------- */
  const themeBtn = document.querySelector("[data-theme-toggle]");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("theme", next); } catch (e) {}
    });
  }

  /* ---------- Preloader (first visit per session only) ---------- */
  const preloader = document.querySelector(".preloader");
  let seen = false;
  try { seen = sessionStorage.getItem("seen") === "1"; } catch (e) {}

  function startPage() {
    body.classList.add("is-ready");
    initReveals();
  }

  if (preloader && !seen && !reduceMotion) {
    const count = preloader.querySelector(".preloader__count");
    const start = performance.now();
    const duration = 1600;
    body.style.overflow = "hidden";
    (function tick(now) {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (count) count.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (p < 1) return requestAnimationFrame(tick);
      preloader.classList.add("is-done");
      body.style.overflow = "";
      try { sessionStorage.setItem("seen", "1"); } catch (e) {}
      setTimeout(startPage, 350);
      setTimeout(() => preloader.remove(), 1200);
    })(start);
  } else {
    if (preloader) preloader.remove();
    startPage();
  }

  /* ---------- Page transition wipe ---------- */
  const wipe = document.querySelector(".page-wipe");
  if (wipe && !reduceMotion) {
    // Arriving from another page of this site: start covered, then lift away
    let arriving = false;
    try { arriving = sessionStorage.getItem("wipe") === "1"; sessionStorage.removeItem("wipe"); } catch (e) {}
    if (arriving) {
      wipe.style.transition = "none";
      wipe.classList.add("is-on");
      requestAnimationFrame(() => requestAnimationFrame(() => {
        wipe.style.transition = "";
        wipe.classList.add("is-leaving");
        setTimeout(() => {
          wipe.style.transition = "none";
          wipe.classList.remove("is-on", "is-leaving");
          requestAnimationFrame(() => (wipe.style.transition = ""));
        }, 750);
      }));
    }

    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || a.hasAttribute("download")) return;
      if (url.pathname === location.pathname && url.hash) return; // in-page anchor
      e.preventDefault();
      try { sessionStorage.setItem("wipe", "1"); } catch (err) {}
      wipe.classList.add("is-on");
      setTimeout(() => (location.href = a.href), 650);
    });
    // Restore when navigating back with bfcache
    window.addEventListener("pageshow", (e) => {
      if (e.persisted) wipe.classList.remove("is-on");
    });
  }

  /* ---------- Split quote into words for scroll-lit effect ---------- */
  document.querySelectorAll("[data-split-words]").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w) => `<span class="word">${w}</span>`).join(" ");
  });

  /* ---------- Reveal on scroll ---------- */
  function initReveals() {
    const targets = document.querySelectorAll(
      ".reveal, .line-mask, .draw-line, .project__media, .cs-cover, [data-reveal-group]"
    );
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
    );
    targets.forEach((t) => io.observe(t));
  }

  /* ---------- Scroll-driven bits (progress, nav, quote) ---------- */
  const progress = document.querySelector(".progress");
  const nav = document.querySelector(".nav");
  const quoteWords = document.querySelectorAll(".quote .word");
  const quote = document.querySelector(".quote blockquote");
  let lastY = window.scrollY;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

    if (nav && !body.classList.contains("menu-open")) {
      nav.classList.toggle("is-scrolled", y > 20);
      nav.classList.toggle("is-hidden", y > lastY && y > 400);
    }
    lastY = y;

    if (quote && quoteWords.length) {
      const r = quote.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(Math.max((vh * 0.85 - r.top) / (r.height + vh * 0.35), 0), 1);
      const lit = Math.round(p * quoteWords.length);
      quoteWords.forEach((w, i) => w.classList.toggle("lit", i < lit || reduceMotion));
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const menuBtn = document.querySelector(".menu-btn");
  if (menuBtn) {
    const toggle = (open) => {
      body.classList.toggle("menu-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    menuBtn.addEventListener("click", () => toggle(!body.classList.contains("menu-open")));
    document.querySelectorAll(".mobile-menu a").forEach((a) => a.addEventListener("click", () => toggle(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") toggle(false); });
  }

  /* ---------- Active nav link by section ---------- */
  const navLinks = document.querySelectorAll(".nav__links a[href^='#'], .toc a[href^='#']");
  if (navLinks.length && "IntersectionObserver" in window) {
    const map = new Map();
    navLinks.forEach((a) => {
      const sec = document.querySelector(a.getAttribute("href"));
      if (sec) map.set(sec, a);
    });
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const link = map.get(entry.target);
          const group = link.closest(".nav__links, .toc");
          group.querySelectorAll("a").forEach((l) => l.classList.remove("is-active"));
          link.classList.add("is-active");
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    map.forEach((_, sec) => spy.observe(sec));
  }

  /* ---------- Custom cursor ---------- */
  const dot = document.querySelector(".cursor");
  const ring = document.querySelector(".cursor-ring");
  if (dot && ring && finePointer && !reduceMotion) {
    let mx = -100, my = -100, rx = -100, ry = -100;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    });
    (function loop() {
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    })();

    const label = ring.querySelector(".cursor-ring__label");
    document.addEventListener("mouseover", (e) => {
      const view = e.target.closest("[data-cursor]");
      const hover = e.target.closest("a, button, .tag, .card");
      body.classList.toggle("cursor-view", !!view);
      body.classList.toggle("cursor-hover", !view && !!hover);
      if (view && label) label.textContent = view.getAttribute("data-cursor");
    });
    document.addEventListener("mouseleave", () => {
      dot.style.opacity = ring.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
      dot.style.opacity = ring.style.opacity = "";
    });
  } else {
    if (dot) dot.remove();
    if (ring) ring.remove();
  }

  /* ---------- Magnetic buttons ---------- */
  if (finePointer && !reduceMotion) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => {
        el.style.transition = "transform .6s cubic-bezier(.22,1,.36,1)";
        el.style.transform = "";
        setTimeout(() => (el.style.transition = ""), 600);
      });
    });

    /* Subtle tilt on project mockups */
    document.querySelectorAll(".project__media").forEach((card) => {
      const mock = card.querySelector(".mock");
      if (!mock) return;
      card.addEventListener("mousemove", (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        mock.style.transform = `scale(1.035) translate(${x * -14}px, ${y * -14}px)`;
      });
      card.addEventListener("mouseleave", () => (mock.style.transform = ""));
    });
  }

  /* ---------- Count-up numbers ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if (counters.length && "IntersectionObserver" in window) {
    const co = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = parseFloat(el.getAttribute("data-count"));
        const decimals = (el.getAttribute("data-count").split(".")[1] || "").length;
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const t0 = performance.now();
        const dur = reduceMotion ? 1 : 1400;
        (function step(now) {
          const p = Math.min((now - t0) / dur, 1);
          const v = end * (1 - Math.pow(1 - p, 4));
          el.textContent = prefix + v.toFixed(decimals) + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
        co.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => co.observe(c));
  }

  /* ---------- Live local time (IST) ---------- */
  const clock = document.querySelector("[data-clock]");
  if (clock) {
    const fmt = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata",
    });
    const update = () => (clock.textContent = fmt.format(new Date()).toUpperCase());
    update();
    setInterval(update, 1000 * 15);
  }

  /* ---------- Copy email ---------- */
  const toast = document.querySelector(".toast");
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
        showToast("Email copied — talk soon!");
      } catch (e) {
        location.href = "mailto:" + text;
      }
    });
  });
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(showToast.t);
    showToast.t = setTimeout(() => toast.classList.remove("is-on"), 2200);
  }

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
