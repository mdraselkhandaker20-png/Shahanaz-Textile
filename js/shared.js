/* =============================================
   SHAHANAZ TEXTILE — Shared JS
   All shared functions for all pages
   ============================================= */

const WA_NUMBER = '+601151663724';
const SIZES = ['XS','S','M','L','XL','XXL'];
const VIEWS = ['Front','Back','Left','Right'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Crew Tee',
    img: 'images/amg.png',
    imgBack:  'images/amg-back.png',
    fab: '100% Cotton',
    desc: 'Everyday round neck tee — perfect for corporate, event, or casual wear. Heavyweight cotton, pre-shrunk for lasting fit.',
    min: 10,
    color: '#1a1a1a',
    type: 'Round Neck',
    category: 'Basics'
  },
  {
    id: 2,
    name: 'Performance Polo',
    img: 'amg.png',
    fab: 'Dri-fit Polyester',
    desc: 'Moisture-wicking polo with structured collar. Ideal for sports teams, corporate uniforms, and activewear.',
    min: 10,
    color: '#1a2744',
    type: 'Polo',
    category: 'Corporate'
  },
  {
    id: 3,
    name: 'Premium White Tee',
    img: '',
    fab: '100% Cotton',
    desc: 'Heavyweight white round neck. Clean bright base for vibrant, bold prints. Long-lasting quality fabric.',
    min: 10,
    color: '#e8e4d8',
    type: 'Round Neck',
    category: 'Basics'
  },
  {
    id: 4,
    name: 'Maroon Corporate Tee',
    img: '',
    fab: 'Cotton Blend',
    desc: 'Rich maroon tone with smart casual fit. Great for team uniforms, events, and branded corporate apparel.',
    min: 10,
    color: '#7b2d2d',
    type: 'Round Neck',
    category: 'Corporate'
  },
  {
    id: 5,
    name: 'Muslimah Long Sleeve',
    img: '',
    fab: 'Cotton Spandex',
    desc: 'Long sleeve round neck with modest cut. Soft stretchy fabric — comfortable for daily wear and uniforms.',
    min: 10,
    color: '#2c5f5f',
    type: 'Muslimah',
    category: 'Muslimah'
  },
  {
    id: 6,
    name: 'Muslimah Polo Tee',
    img: '',
    fab: 'Dri-fit Spandex',
    desc: 'Muslimah-cut polo with collar. Modest, professional look — perfect for corporate uniforms and team events.',
    min: 10,
    color: '#3d4f2e',
    type: 'Muslimah',
    category: 'Muslimah'
  },
  {
    id: 7,
    name: 'Hoodie Premium',
    img: '',
    fab: 'Fleece Cotton',
    desc: 'Heavyweight pullover hoodie with kangaroo pocket. Great for events, team merchandise, and casual wear.',
    min: 10,
    color: '#2d2d3f',
    type: 'Hoodie',
    category: 'Premium'
  },
  {
    id: 8,
    name: 'V-Neck Classic',
    img: '',
    fab: '100% Cotton',
    desc: 'Clean V-neck silhouette in smooth cotton. Versatile and stylish — great for layering or standalone wear.',
    min: 10,
    color: '#4a3728',
    type: 'V-Neck',
    category: 'Basics'
  }
];

/* ── SVG SHIRT ── */
function shirtSVG(color, label, w, h) {
  w = w || 90; h = h || 98;
  return `<svg viewBox="0 0 120 130" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 30 L5 55 L20 60 L18 125 L102 125 L100 60 L115 55 L95 30 Q80 20 70 18 Q65 28 60 30 Q55 28 50 18 Q40 20 25 30Z"
      fill="${color}" stroke="rgba(201,168,76,0.4)" stroke-width="1"/>
    <text x="60" y="76" text-anchor="middle" font-size="10" fill="#c9a84c"
      font-family="DM Sans,sans-serif" font-weight="500">${label}</text>
  </svg>`;
}

/* ── PRODUCT IMAGE OR SVG ── */
function prodImg(p, w, h) {
  if (p.img) {
    return `<img src="${p.img}" style="width:100%;height:${h||160}px;object-fit:contain;padding:8px;" alt="${p.name}" onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
            <div style="display:none">${shirtSVG(p.color, p.name, w||90, h||98)}</div>`;
  }
  return shirtSVG(p.color, VIEWS[0], w||90, h||98);
}

/* ── MODAL PREVIEW (image or SVG based on view) ── */
function prodModalImg(p, vi) {
  if (p.img && vi === 0) {
    return `<img src="${p.img}" style="max-width:100%;max-height:160px;object-fit:contain;" alt="${p.name}" onerror="this.outerHTML='${shirtSVG(p.color, VIEWS[vi], 110, 120).replace(/'/g,"\\'")}'">`;
  }
  return shirtSVG(p.color, VIEWS[vi], 110, 120);
}

/* ── WHATSAPP ── */
function openWA(msg) {
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

/* ── ORDER NUMBER ── */
function genOrderNo() {
  return 'SHT-' + String(Math.floor(Math.random() * 9000) + 1000);
}

/* ── MODAL SHARED STATE ── */
let curProd = 0, curQty = 10, curView = 0;

function openModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  curProd = id; curQty = 10; curView = 0;
  document.getElementById('mTitle').textContent = p.name;
  document.getElementById('mName').textContent = p.name;
  document.getElementById('mDesc').textContent = p.desc;
  document.getElementById('mFab').textContent = 'Fabric: ' + p.fab + ' · Min ' + p.min + ' pcs';
  document.getElementById('mQty').textContent = curQty;
  if (document.getElementById('mOrderBtn')) {
    document.getElementById('mOrderBtn').href = 'order.html?product=' + p.id;
  }
  renderModalMain(p, 0);
  renderModalThumbs(p);
  if (document.getElementById('mDownload')) setupDownload(p);
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderModalMain(p, vi) {
  document.getElementById('mMain').innerHTML = prodModalImg(p, vi);
}

function renderModalThumbs(p) {
  document.getElementById('mThumbs').innerHTML = VIEWS.map((v, vi) => `
    <div class="thumb-item${vi === curView ? ' active' : ''}" onclick="switchModalView(${vi}, ${p.id})">
      ${shirtSVG(p.color, v[0], 28, 30)}
      <span>${v}</span>
    </div>
  `).join('');
}

function switchModalView(vi, id) {
  curView = vi;
  const p = PRODUCTS.find(x => x.id === id);
  renderModalMain(p, vi);
  renderModalThumbs(p);
}

function changeQty(d) {
  curQty = Math.max(10, curQty + d);
  document.getElementById('mQty').textContent = curQty;
}

function catalogWA() {
  const p = PRODUCTS.find(x => x.id === curProd);
  openWA(`*New catalog order — Shahanaz Textile*\n\nProduct: ${p.name}\nFabric: ${p.fab}\nQuantity: ${curQty} pcs\n\nPlease send me the order form and payment details.`);
}

function setupDownload(p) {
  document.getElementById('mDownload').onclick = function () {
    const svg = shirtSVG(p.color, p.name, 200, 220);
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'Shahanaz-Textile-' + p.name.replace(/\s+/g, '-') + '.svg';
    a.click(); URL.revokeObjectURL(url);
  };
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function handleOverlay(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

/* ── MODAL HTML (inject into any page) ── */
function injectModal(showDownload) {
  const dl = showDownload
    ? `<button class="btn-outline" id="mDownload" style="font-size:12px;padding:8px;justify-content:center;">↓ Download mockup</button>`
    : '';
  const html = `
  <div class="modal-overlay" id="modalOverlay" onclick="handleOverlay(event)">
    <div class="modal-box">
      <div class="modal-hdr">
        <span class="modal-hdr-title" id="mTitle">Product</span>
        <button class="modal-close" onclick="closeModal()">✕</button>
      </div>
      <div class="modal-body">
        <div class="modal-views">
          <div class="main-preview" id="mMain"></div>
          <div class="thumb-grid" id="mThumbs"></div>
          ${dl}
        </div>
        <div class="modal-details">
          <div class="modal-pname" id="mName"></div>
          <div class="modal-pdesc" id="mDesc"></div>
          <div class="modal-pfab" id="mFab"></div>
          <div class="qty-wrap">
            <label>Quantity (minimum 10 pcs)</label>
            <div class="qty-ctrl">
              <button class="qty-btn" onclick="changeQty(-5)">−</button>
              <div class="qty-num" id="mQty">10</div>
              <button class="qty-btn" onclick="changeQty(5)">+</button>
            </div>
          </div>
          <a id="mOrderBtn" href="order.html" class="btn-gold" style="justify-content:center;">Order this product →</a>
          <button class="btn-wa" onclick="catalogWA()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Quick order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

/* ── NAV HTML ── */
function injectNav(activePage) {
  const pages = [
    { href: 'index.html', label: 'Home' },
    { href: 'catalog.html', label: 'Catalog' },
    { href: 'index.html#custom', label: 'Custom Order' },
    { href: 'order.html', label: 'Order Form' },
    { href: 'index.html#contact', label: 'Contact' },
  ];
  const links = pages.map(p =>
    `<a href="${p.href}"${p.label === activePage ? ' class="active"' : ''}>${p.label}</a>`
  ).join('');
  const html = `
  <nav>
    <a href="index.html" class="nav-logo">Shahanaz Textile<span>Bangladesh</span></a>
    <div class="nav-links">${links}</div>
  </nav>`;
  document.body.insertAdjacentHTML('afterbegin', html);
}

/* ── WA BAR HTML ── */
function injectWABar(msg) {
  const html = `
  <button class="wa-bar" onclick="openWA('${msg}')">
    <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    <span>Chat with us on WhatsApp</span>
  </button>`;
  document.body.insertAdjacentHTML('beforeend', html);
}

/* ── FOOTER HTML ── */
function injectFooter(text) {
  const html = `<footer><p>${text || '© 2026 <span>Shahanaz Textile</span> · Narshingdi, Bangladesh · Delivery nationwide Bangladesh'}</p></footer>`;
  document.body.insertAdjacentHTML('beforeend', html);
}
