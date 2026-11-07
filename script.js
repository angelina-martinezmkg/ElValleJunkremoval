/* El Valle Junk Removal — site interactions */
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  const header = document.querySelector(".site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.querySelector(".nav-toggle");

  /* ---------- Header shadow on scroll ---------- */
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  function setMenu(open) {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("nav-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && nav.classList.contains("is-open")) { setMenu(false); toggle.focus(); } });
  window.matchMedia("(min-width: 1101px)").addEventListener("change", (mq) => { if (mq.matches) setMenu(false); });

  /* ---------- Active nav link while scrolling ---------- */
  const navLinks = Array.from(document.querySelectorAll(".nav__list a"));
  const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === id));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => spy.observe(s));
  }

  /* ---------- Reveal on scroll ---------- */
  const reveals = document.querySelectorAll(".reveal");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Service card links pre-select the service ---------- */
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const target = document.querySelector(link.getAttribute("href"));
      const select = target && target.querySelector(".js-service-select");
      if (select) { select.value = link.dataset.service; clearError(select); }
    });
  });

  /* ---------- Block past dates ---------- */
  const pad = (n) => String(n).padStart(2, "0");
  const now = new Date();
  const today = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  document.querySelectorAll(".js-min-today").forEach((input) => { input.min = today; });

  /* ---------- Form validation + Netlify AJAX submit ---------- */
  const messages = {
    "full-name": "Please enter your full name.",
    phone: "Please enter a valid phone number (at least 10 digits).",
    "pickup-date": "Please choose a pickup date (today or later).",
    "pickup-time": "Please choose a preferred pickup time.",
    service: "Please select the type of service.",
  };

  function fieldOf(el) { return el.closest(".field"); }
  function clearError(el) {
    const f = fieldOf(el); if (!f) return;
    f.classList.remove("is-invalid");
    el.removeAttribute("aria-invalid");
    const err = f.querySelector(".field__error"); if (err) err.textContent = "";
  }
  function showError(el, msg) {
    const f = fieldOf(el); if (!f) return;
    f.classList.add("is-invalid");
    el.setAttribute("aria-invalid", "true");
    const err = f.querySelector(".field__error"); if (err) err.textContent = msg;
  }
  function validateField(el) {
    if (!el.required) return true;
    const value = el.value.trim();
    let ok = el.checkValidity() && value !== "";
    if (ok && el.name === "phone") ok = value.replace(/\D/g, "").length >= 10;
    if (ok && el.type === "date" && el.min) ok = value >= el.min;
    ok ? clearError(el) : showError(el, messages[el.name] || "This field is required.");
    return ok;
  }

  const encode = (data) => new URLSearchParams(data).toString();
  const isLocal = /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname) || location.protocol === "file:";

  document.querySelectorAll(".js-netlify-form").forEach((form) => {
    const card = form.closest(".form-card");
    const success = card.querySelector(".form-success");
    const status = form.querySelector(".form-status");
    const submit = form.querySelector('button[type="submit"]');
    const submitLabel = submit.textContent;
    const fields = Array.from(form.querySelectorAll("input:not([type=hidden]):not([name=bot-field]), select, textarea"));

    fields.forEach((el) => {
      el.addEventListener("blur", () => { if (el.value) validateField(el); });
      el.addEventListener("input", () => { if (fieldOf(el) && fieldOf(el).classList.contains("is-invalid")) validateField(el); });
      el.addEventListener("change", () => validateField(el));
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      status.textContent = "";
      const invalid = fields.filter((el) => !validateField(el));
      if (invalid.length) { invalid[0].focus(); return; }

      submit.disabled = true;
      submit.textContent = "Sending…";
      try {
        if (!isLocal) {
          const res = await fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode(new FormData(form)),
          });
          if (!res.ok) throw new Error("Network response " + res.status);
        }
        form.hidden = true;
        success.hidden = false;
        success.focus();
        form.reset();
      } catch (err) {
        status.textContent = "Sorry, something went wrong sending your request. Please try again or call (602) 639-2971.";
      } finally {
        submit.disabled = false;
        submit.textContent = submitLabel;
      }
    });

    const again = card.querySelector(".js-form-reset");
    if (again) again.addEventListener("click", () => {
      success.hidden = true;
      form.hidden = false;
      fields.forEach(clearError);
      fields[0].focus();
    });
  });
})();
