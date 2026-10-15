// Efecto parallax: cada elemento con data-speed se mueve a distinto ritmo que el scroll
const items = document.querySelectorAll('[data-speed]');
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const nav = document.getElementById('nav');
let ticking = false;

function parallax() {
  const vh = window.innerHeight;
  items.forEach(el => {
    const box = el.parentElement.getBoundingClientRect();
    if (box.bottom < -200 || box.top > vh + 200) return; // fuera de pantalla
    const delta = box.top + box.height / 2 - vh / 2;
    el.style.transform = `translate3d(0, ${-delta * parseFloat(el.dataset.speed)}px, 0)`;
  });
  nav.classList.toggle('solid', window.scrollY > 60);
  ticking = false;
}
if (!reduce) {
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(parallax); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', parallax);
}
parallax();

// Menú en móvil y enlace de la página actual
const burger = document.getElementById('burger');
const menu = document.getElementById('menu');
burger.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});
const actual = location.pathname.split('/').pop() || 'index.html';
menu.querySelectorAll('a').forEach(a => {
  if (a.getAttribute('href') === actual) a.classList.add('active');
});

// Formulario de contacto (solo existe en contacto.html)
const form = document.getElementById('form');
if (form) {
  const msg = document.getElementById('msg');
  form.addEventListener('submit', e => {
    e.preventDefault();
    let valido = true;
    form.querySelectorAll('[required]').forEach(campo => {
      const mal = !campo.value.trim() || (campo.type === 'email' && !/^\S+@\S+\.\S+$/.test(campo.value));
      campo.classList.toggle('error', mal);
      if (mal) valido = false;
    });
    msg.className = valido ? 'ok' : 'bad';
    msg.textContent = valido ? '¡Gracias! Recibimos tu mensaje y te escribiremos pronto.' : 'Revisa los campos marcados en rojo.';
    if (valido) form.reset();
  });
}