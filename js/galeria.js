let todosProductos = [];

async function cargarProductos() {
  const res = await fetch('data/productos.json');
  todosProductos = await res.json();
  renderCategorias(todosProductos);
  renderProductos(todosProductos);
}

function renderCategorias(productos) {
  const categorias = ['Todos', ...new Set(productos.map(p => p.categoria))];
  const bar = document.getElementById('filtros');
  bar.innerHTML = categorias.map(cat =>
    `<button class="filter-btn${cat === 'Todos' ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');

  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.cat;
      const filtrados = cat === 'Todos' ? todosProductos : todosProductos.filter(p => p.categoria === cat);
      renderProductos(filtrados);
    });
  });
}

function renderProductos(productos) {
  const grid = document.getElementById('productos-grid');
  if (!productos.length) {
    grid.innerHTML = '<p style="text-align:center;color:#999;grid-column:1/-1">No hay productos en esta categoría.</p>';
    return;
  }
  grid.innerHTML = productos.map(p => `
    <div class="product-card">
      <div class="product-img">
        ${p.imagen
          ? `<img src="${p.imagen}" alt="${p.nombre}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'"><span class="product-emoji" style="display:none">${p.emoji}</span>`
          : `<span class="product-emoji">${p.emoji}</span>`}
      </div>
      <div class="product-body">
        <div class="product-category">${p.categoria}</div>
        <div class="product-name">${p.nombre}</div>
        <div class="product-desc">${p.descripcion}</div>
        <div class="product-footer">
          <span class="product-price">$${p.precio}</span>
          <button class="btn btn-secondary btn-sm" data-id="${p.id}">🛒 Agregar</button>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('[data-id]').forEach(btn => {
    btn.addEventListener('click', () => {
      const producto = todosProductos.find(p => p.id === Number(btn.dataset.id));
      if (producto) addToCart(producto);
    });
  });
}

document.addEventListener('DOMContentLoaded', cargarProductos);
