async function cargarPromociones() {
  const res = await fetch('data/promociones.json');
  const promos = await res.json();

  const destacadas = promos.filter(p => p.destacada);
  const normales   = promos.filter(p => !p.destacada);

  renderDestacadas(destacadas);
  renderPromos(promos);
}

function renderDestacadas(promos) {
  const container = document.getElementById('promos-destacadas');
  if (!promos.length) { container.style.display = 'none'; return; }

  container.innerHTML = `
    <div class="promo-destacada-banner">
      <h2>🔥 Ofertas Especiales</h2>
      <p>¡No te pierdas estas promociones exclusivas por tiempo limitado!</p>
    </div>
    <div class="promos-grid">
      ${promos.map(p => tarjetaPromo(p)).join('')}
    </div>
    <h2 class="section-title" style="margin-top:2.5rem">Todas las promociones</h2>
  `;
}

function renderPromos(promos) {
  const grid = document.getElementById('promos-grid');
  grid.innerHTML = promos.map(p => tarjetaPromo(p)).join('');
}

function tarjetaPromo(p) {
  const preciosHTML = p.precioOriginal
    ? `<div class="promo-precios">
        <span class="precio-original">$${p.precioOriginal}</span>
        <span class="precio-oferta">${p.precioOferta === 0 ? 'GRATIS' : '$' + p.precioOferta}</span>
       </div>`
    : '';

  return `
    <div class="promo-card${p.destacada ? ' destacada' : ''}">
      <div class="promo-header">
        <span class="promo-emoji">${p.emoji}</span>
        <div>
          ${p.destacada ? '<span class="badge-destacada">Destacada</span>' : ''}
          <h3>${p.titulo}</h3>
        </div>
        <span class="badge-descuento">${p.descuento}</span>
      </div>
      <div class="promo-body">
        <p>${p.descripcion}</p>
        ${preciosHTML}
        <p class="promo-vigencia">📅 ${p.vigencia}</p>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', cargarPromociones);
