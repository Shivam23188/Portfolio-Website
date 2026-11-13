/* ==========================================================================
   TPA Workspace — Dashboard prototype interactions
   Vanilla JS, no dependencies. The page is fully readable without it.
   ========================================================================== */
(function () {
  "use strict";

  const root = document.documentElement;
  const body = document.body;
  root.classList.remove("no-js");
  root.classList.add("js");

  const mobile = window.matchMedia("(max-width: 860px)");

  /* ---------- Entrance ---------- */
  requestAnimationFrame(() => requestAnimationFrame(() => body.classList.add("is-ready")));

  /* ---------- Time-of-day greeting ---------- */
  const greeting = document.querySelector("[data-greeting]");
  if (greeting) {
    const h = new Date().getHours();
    greeting.textContent = h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  }

  /* ---------- Active navigation item ---------- */
  const title = document.querySelector("[data-page-title]");
  const items = document.querySelectorAll("[data-nav]");
  const groupBtn = document.querySelector('[data-group="admin"]');
  const group = document.getElementById("group-admin");

  items.forEach((item) => {
    item.addEventListener("click", () => {
      items.forEach((el) => el.removeAttribute("aria-current"));
      item.setAttribute("aria-current", "page");
      if (title) title.textContent = item.querySelector(".nav-item__label").textContent;
      if (groupBtn) groupBtn.classList.toggle("is-current-group", group.contains(item));
      if (mobile.matches) setDrawer(false);
    });
  });

  /* ---------- Admin group expand / collapse ---------- */
  if (groupBtn && group) {
    groupBtn.addEventListener("click", () => {
      const open = groupBtn.getAttribute("aria-expanded") !== "true";
      groupBtn.setAttribute("aria-expanded", String(open));
      group.hidden = !open;
    });
  }

  /* ---------- Sidebar: rail on desktop, drawer on mobile ---------- */
  const toggle = document.querySelector("[data-sidebar-toggle]");
  const scrim = document.querySelector("[data-scrim]");

  function setDrawer(open) {
    body.classList.toggle("is-drawer-open", open);
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
  }

  function syncToggle() {
    if (!toggle) return;
    const expanded = mobile.matches
      ? body.classList.contains("is-drawer-open")
      : !body.classList.contains("is-collapsed");
    toggle.setAttribute("aria-expanded", String(expanded));
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      if (mobile.matches) {
        setDrawer(!body.classList.contains("is-drawer-open"));
      } else {
        body.classList.toggle("is-collapsed");
        syncToggle();
      }
    });
  }
  if (scrim) scrim.addEventListener("click", () => setDrawer(false));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && body.classList.contains("is-drawer-open")) {
      setDrawer(false);
      if (toggle) toggle.focus();
    }
  });
  mobile.addEventListener("change", () => {
    setDrawer(false);
    syncToggle();
  });
  syncToggle();
})();
