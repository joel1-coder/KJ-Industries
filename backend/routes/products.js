const express = require('express');
const router = express.Router();

// Static product data — will be moved to DB later
const products = [
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
  },
];

// Get all products
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
      p.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

  res.json({ success: true, data: filtered, total: filtered.length });
});

// Get single product
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
});

module.exports = router;
