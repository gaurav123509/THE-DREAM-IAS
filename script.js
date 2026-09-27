const header = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const revealItems = document.querySelectorAll(".reveal");
const yearLabel = document.querySelector("#current-year");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const setMenuOpen = (isOpen) => {
  if (!menuToggle || !navigation) return;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navigation.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
};

menuToggle?.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
  setMenuOpen(isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenuOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 800) setMenuOpen(false);
});

let scrollTicking = false;
const updateHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
  scrollTicking = false;
};

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateHeader);
    scrollTicking = true;
  }
}, { passive: true });
updateHeader();

if (yearLabel) yearLabel.textContent = String(new Date().getFullYear());

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach((item) => revealObserver.observe(item));
}
