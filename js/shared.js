/* =============================================
   SK TEXTILE — Shared JS Utilities
   ============================================= */

const WA_NUMBER = '60123456789'; // ← Replace with your WhatsApp number

const SIZES = ['XS','S','M','L','XL','XXL'];
const VIEWS = ['Front','Back','Left','Right'];

const PRODUCTS = [
  {
    id: 1,
    name: 'Classic Crew Tee',
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
    fab: '100% Cotton',
    desc: 'Clean V-neck silhouette in smooth cotton. Versatile and stylish — great for layering or standalone wear.',
    min: 10,
    color: '#4a3728',
    type: 'V-Neck',
    category: 'Basics'
  }
];

// ── SHIRT SVG GENERATOR ──
function shirtSVG(color, label, w, h) {
  w = w || 90; h = h || 98;
  return `<svg viewBox="0 0 120 130" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
    <path d="M25 30 L5 55 L20 60 L18 125 L102 125 L100 60 L115 55 L95 30 Q80 20 70 18 Q65 28 60 30 Q55 28 50 18 Q40 20 25 30Z"
      fill="${color}" stroke="rgba(201,168,76,0.4)" stroke-width="1"/>
    <text x="60" y="76" text-anchor="middle" font-size="10" fill="#c9a84c"
      font-family="DM Sans,sans-serif" font-weight="500">${label}</text>
  </svg>`;
}

// ── WA OPEN ──
function openWA(msg) {
  window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(msg), '_blank');
}

// ── ORDER NUMBER GENERATOR ──
function genOrderNo() {
  return 'SKT-' + String(Math.floor(Math.random() * 9000) + 1000);
}

// ── SELECTED PRODUCT (from catalog → order) ──
function saveSelectedProduct(id) {
  sessionStorage.setItem('sk_selected_product', id);
}
function getSelectedProduct() {
  return sessionStorage.getItem('sk_selected_product');
}
function clearSelectedProduct() {
  sessionStorage.removeItem('sk_selected_product');
}
