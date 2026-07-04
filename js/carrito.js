function renderCarrito() {
  const cart = getCart();
  const contenedor = document.getElementById('cart-content');
  const resumen    = document.getElementById('cart-summary');

  if (!cart.length) {
    contenedor.innerHTML = `
      <div class="cart-empty">
        <div class="icon">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega productos desde la <a href="galeria.html" style="color:var(--primary)">galería</a>.</p>
      </div>`;
    resumen.style.display = 'none';
    return;
  }

  resumen.style.display = '';
  const subtotal = cart.reduce((s, i) => s + i.precio * i.cantidad, 0);

  contenedor.innerHTML = `
    <div class="cart-items-list">
      ${cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-emoji">${item.emoji}</div>
          <div class="cart-item-info">
            <h4>${item.nombre}</h4>
            <span class="cat">${item.categoria}</span>
          </div>
          <div class="cart-item-controls">
            <button class="qty-btn" onclick="cambiarCantidad(${item.id}, -1)">−</button>
            <span class="qty-value">${item.cantidad}</span>
            <button class="qty-btn" onclick="cambiarCantidad(${item.id}, 1)">+</button>
          </div>
          <span class="item-price">$${item.precio * item.cantidad}</span>
          <button class="btn-remove" onclick="eliminarItem(${item.id})" title="Eliminar">🗑️</button>
        </div>
      `).join('')}
    </div>`;

  resumen.innerHTML = `
    <h3>Resumen del pedido</h3>
    <div class="summary-line"><span>Artículos (${cart.reduce((s,i)=>s+i.cantidad,0)})</span><span>$${subtotal}</span></div>
    <div class="summary-line"><span>Envío</span><span style="color:green">A coordinar</span></div>
    <div class="summary-total"><span>Total</span><span>$${subtotal}</span></div>
    <button class="btn btn-whatsapp" onclick="enviarWhatsApp()">
      📲 Enviar pedido por WhatsApp
    </button>
    <button class="btn btn-outline" style="background:var(--bg);color:var(--primary);border-color:var(--primary);margin-top:.5rem" onclick="vaciarCarrito()">
      🗑️ Vaciar carrito
    </button>`;
}

function cambiarCantidad(id, delta) {
  let cart = getCart();
  const idx = cart.findIndex(i => i.id === id);
  if (idx < 0) return;
  cart[idx].cantidad += delta;
  if (cart[idx].cantidad <= 0) cart.splice(idx, 1);
  saveCart(cart);
  updateCartBadge();
  renderCarrito();
}

function eliminarItem(id) {
  let cart = getCart().filter(i => i.id !== id);
  saveCart(cart);
  updateCartBadge();
  renderCarrito();
}

function vaciarCarrito() {
  if (!confirm('¿Seguro que deseas vaciar el carrito?')) return;
  saveCart([]);
  updateCartBadge();
  renderCarrito();
}

function enviarWhatsApp() {
  const cart = getCart();
  if (!cart.length) return;

  const lineas = cart.map(i => `• ${i.nombre} x${i.cantidad} = $${i.precio * i.cantidad}`).join('%0A');
  const total  = cart.reduce((s, i) => s + i.precio * i.cantidad, 0);
  const texto  = `Hola,%20quiero%20hacer%20un%20pedido:%0A%0A${encodeURIComponent(lineas)}%0A%0ATotal:%20$${total}%0A%0AQuedo%20en%20espera%20de%20confirmación.%20¡Gracias!`;

  window.open(`https://wa.me/525584192229?text=${texto}`, '_blank');
}

document.addEventListener('DOMContentLoaded', renderCarrito);
