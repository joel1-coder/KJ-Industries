const express = require('express');
const router = express.Router();

// In-memory product store — persists for the server session
let products = [
  {
    id: 1,
    name: 'OmniCore Admin',
    price: 199,
    rating: 4.9,
    image: 'omnicore_admin.png',
    description: 'Enterprise-grade dashboard suite with real-time analytics, modular widgets, and advanced reporting capabilities.',
    tags: ['React', 'Node.js', 'Tailwind', 'PostgreSQL'],
    category: 'dashboards',
    badge: null,
    status: 'PUBLISHED',
    dateAdded: 'May 12, 2024',
  },
  {
    id: 2,
    name: 'FluxStore E-com',
    price: 249,
    rating: 4.8,
    image: 'fluxstore_ecom.png',
    description: 'High-performance marketplace template with Stripe integration, inventory tracking, and multi-vendor support.',
    tags: ['Next.js 14', 'Prisma', 'MERN'],
    category: 'e-commerce',
    badge: null,
    status: 'PUBLISHED',
    dateAdded: 'Mar 28, 2024',
  },
  {
    id: 3,
    name: 'Atlas Project OS',
    price: 320,
    rating: 5.0,
    image: 'atlas_project.png',
    description: 'Complete project management solution with Kanban boards, Gantt charts, and team collaboration tools.',
    tags: ['Vue 3', 'Go', 'Redis'],
    category: 'management-systems',
    badge: null,
    status: 'PUBLISHED',
    dateAdded: 'Jan 15, 2024',
  },
  {
    id: 4,
    name: 'Nexus Web3 Framework',
    price: 599,
    rating: 4.7,
    image: 'nexus_web3.png',
    description: 'A comprehensive toolkit for building dApps. Includes wallet connectors, smart contract templates, and a customizable governance dashboard. Fully audited and production-ready.',
    tags: ['Solidity', 'Ethers.js', 'Next.js'],
    category: 'web3-crypto',
    badge: 'Best Seller',
    status: 'PUBLISHED',
    dateAdded: 'Nov 05, 2023',
  },
  {
    id: 5,
    name: 'Cognito AI Engine',
    price: 129,
    rating: 4.7,
    image: 'cognito_ai.png',
    description: 'Plug-and-play AI integration for SaaS apps. Natural language processing, computer vision, and predictive analytics.',
    tags: ['Python', 'FastAPI', 'PyTorch'],
    category: 'ai-platforms',
    badge: null,
    status: 'PUBLISHED',
    dateAdded: 'Oct 20, 2023',
  },
];

let nextId = 6;

// GET all products (with optional filter/sort/search)
router.get('/', (req, res) => {
  const { category, search, sort } = req.query;
  let filtered = [...products];

  if (category && category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
    );
  }

  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  res.json({ success: true, data: filtered, total: filtered.length });
});

// GET single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

// POST — create new product
router.post('/', (req, res) => {
  const { name, price, rating, image, description, tags, category, badge, status } = req.body;

  if (!name || !price || !category) {
    return res.status(400).json({ success: false, message: 'name, price and category are required' });
  }

  const now = new Date();
  const dateAdded = now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: '2-digit' });

  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    rating: parseFloat(rating) || 4.5,
    image: image || 'omnicore_admin.png',
    description: description || '',
    tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(t => t.trim()) : []),
    category,
    badge: badge || null,
    status: status || 'DRAFT',
    dateAdded,
  };

  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct, message: 'Product created successfully' });
});

// PUT — update existing product
router.put('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });

  const { name, price, rating, image, description, tags, category, badge, status } = req.body;

  products[idx] = {
    ...products[idx],
    ...(name !== undefined && { name }),
    ...(price !== undefined && { price: parseFloat(price) }),
    ...(rating !== undefined && { rating: parseFloat(rating) }),
    ...(image !== undefined && { image }),
    ...(description !== undefined && { description }),
    ...(tags !== undefined && { tags: Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()) }),
    ...(category !== undefined && { category }),
    ...(badge !== undefined && { badge: badge || null }),
    ...(status !== undefined && { status }),
  };

  res.json({ success: true, data: products[idx], message: 'Product updated successfully' });
});

// DELETE — remove product
router.delete('/:id', (req, res) => {
  const idx = products.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false, message: 'Product not found' });

  const deleted = products.splice(idx, 1)[0];
  res.json({ success: true, data: deleted, message: 'Product deleted successfully' });
});

module.exports = router;
