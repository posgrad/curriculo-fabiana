document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav__toggle");
  const links = document.querySelector(".nav__links");
  const yearEl = document.getElementById("ano");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // Header com fundo ao rolar
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Menu mobile
  if (toggle && links && nav) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      });
    });
  }

  // Botão Contatos no hero
  const contactBtn = document.getElementById("btn-contatos");
  const contactList = document.getElementById("lista-contatos");

  if (contactBtn && contactList) {
    contactBtn.addEventListener("click", () => {
      const isOpen = contactBtn.getAttribute("aria-expanded") === "true";
      const nextOpen = !isOpen;
      contactBtn.setAttribute("aria-expanded", String(nextOpen));
      contactList.hidden = !nextOpen;
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (contactBtn.contains(target) || contactList.contains(target)) return;
      contactBtn.setAttribute("aria-expanded", "false");
      contactList.hidden = true;
    });
  }

  // Barras de idioma: define a largura via CSS variable
  document.querySelectorAll(".language").forEach((item) => {
    const level = item.getAttribute("data-level") || "0";
    item.style.setProperty("--level", `${level}%`);
  });

  // Animações ao entrar na tela
  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }
});
