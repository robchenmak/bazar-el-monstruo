// ===== Shared utilities =====

function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((sum, i) => sum + i.cantidad, 0);
  document.querySelectorAll('.cart-badge').forEach(badge => {
    badge.textContent = total;
    badge.classList.toggle('visible', total > 0);
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem('bazar_cart') || '[]');
}

function saveCart(cart) {
  localStorage.setItem('bazar_cart', JSON.stringify(cart));
}

function addToCart(producto) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === producto.id);
  if (idx >= 0) {
    cart[idx].cantidad += 1;
  } else {
    cart.push({ ...producto, cantidad: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  showToast(`"${producto.nombre}" agregado al carrito 🛒`);
}

function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

// Mark active nav link
function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    link.classList.toggle('active', href === page || (page === '' && href === 'index.html'));
  });
}

// Mobile navbar toggle
function initNavToggle() {
  const toggle = document.querySelector('.navbar-toggle');
  const nav    = document.querySelector('.navbar-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  setActiveNav();
  initNavToggle();
});
