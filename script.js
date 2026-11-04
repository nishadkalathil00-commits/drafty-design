// DRAFTY DESIGN — interactions
const header = document.querySelector('.site-header');
const progress = document.getElementById('scrollProgress');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

function updateScrollUI(){
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${percent}%`;
  header.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}));

// Project category filtering
const filterButtons = document.querySelectorAll('.filter');
const projectCards = document.querySelectorAll('.project-card');
filterButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach(item => item.classList.toggle('active', item === button));
  projectCards.forEach(card => {
    const shouldShow = category === 'all' || card.dataset.category === category;
    card.classList.toggle('is-hidden', !shouldShow);
  });
}));

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));

// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();
