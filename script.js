document.body.classList.add("js-ready");

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navIcon = navToggle?.querySelector("i");
const navLinks = document.querySelectorAll(".nav-menu a");
const revealItems = document.querySelectorAll(".reveal");

function closeMenu() {
  document.body.classList.remove("menu-open");
  navMenu?.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Abrir menú");

  if (navIcon) {
    navIcon.classList.add("fa-bars");
    navIcon.classList.remove("fa-xmark");
  }
}

function openMenu() {
  document.body.classList.add("menu-open");
  navMenu?.classList.add("is-open");
  navToggle?.setAttribute("aria-expanded", "true");
  navToggle?.setAttribute("aria-label", "Cerrar menú");

  if (navIcon) {
    navIcon.classList.remove("fa-bars");
    navIcon.classList.add("fa-xmark");
  }
}

navToggle?.addEventListener("click", () => {
  const isOpen = navMenu?.classList.contains("is-open");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

const navItems = document.querySelectorAll(".nav-menu a:not(.nav-store):not(.nav-whatsapp)");

function updateActiveNav() {
  const sections = document.querySelectorAll("section, header");

  navItems.forEach(link => link.classList.remove("active"));

  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 200) {
      const id = section.getAttribute("id");
      const href = link => link.getAttribute("href") === `#${id}`;
      current = id;
    }
  });

  if (current) {
    navItems.forEach(link => {
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
