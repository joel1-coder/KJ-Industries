import React, { useState, useEffect } from 'react';
import { Search, Grid, List, Star, ChevronDown } from 'lucide-react';
import omnicoreAdmin from '../assets/images/omnicore_admin.png';
import fluxstoreEcom from '../assets/images/fluxstore_ecom.png';
import atlasProject from '../assets/images/atlas_project.png';
import nexusWeb3 from '../assets/images/nexus_web3.png';
import cognitoAi from '../assets/images/cognito_ai.png';

// Local assets map matching backend image values
const imageMap = {
  'omnicore_admin.png': omnicoreAdmin,
  'fluxstore_ecom.png': fluxstoreEcom,
  'atlas_project.png': atlasProject,
  'nexus_web3.png': nexusWeb3,
  'cognito_ai.png': cognitoAi,
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = `http://localhost:5000/api/products?category=${category}&search=${search}&sort=${sort}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (err) {
      // Offline fallback
      const mockProducts = [
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
      
      let filtered = mockProducts;
      if (category !== 'all') {
        filtered = filtered.filter(p => p.category === category);
      }
      if (search) {
        const q = search.toLowerCase();
        filtered = filtered.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
      }
      if (sort === 'price-low') filtered.sort((a, b) => a.price - b.price);
      if (sort === 'price-high') filtered.sort((a, b) => b.price - a.price);
      if (sort === 'rating') filtered.sort((a, b) => b.rating - a.rating);

      setProducts(filtered);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, search, sort]);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'management-systems', label: 'Management Systems' },
    { id: 'e-commerce', label: 'E-commerce' },
    { id: 'dashboards', label: 'Dashboards' },
    { id: 'ai-platforms', label: 'AI Platforms' },
    { id: 'web3-crypto', label: 'Web3/Crypto' }
  ];

  return (
    <div className="container animate-fade-in" style={{ minHeight: '80vh' }}>
      {/* Header */}
      <div className="mkt-header">
        <h1 className="mkt-title">Next-Gen Software Marketplace</h1>
        <p className="mkt-subtitle">
          Deploy high-performance, enterprise-grade architecture in minutes. Our curated collection of software projects is engineered for precision and scale.
        </p>
      </div>

      {/* Filters and Controls */}
      <div className="filter-bar">
        <div className="search-sort-row">
          <div className="search-box-wrapper">
            <Search size={18} className="search-icon-inside" />
            <input 
              type="text" 
              placeholder="Search architecture, stacks, or keywords..." 
              className="search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="actions-row">
            <select 
              className="sort-select" 
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="relevance">Sort by: Relevance</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating: Highest</option>
            </select>

            <div className="layout-toggles">
              <button 
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={18} />
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {categories.map((cat) => (
            <button 
              key={cat.id}
              className={`pill ${category === cat.id ? 'active' : ''}`}
              onClick={() => setCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products list/grid layout */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          Loading premium software modules...
        </div>
      ) : products.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
          No software modules match your query. Try another search or category.
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'products-layout-grid' : 'products-layout-list'}>
          {products.map((product) => (
            <div key={product.id} className={`product-mkt-card ${viewMode === 'list' ? 'list-view' : ''}`}>
              {product.badge && <span className="badge-mkt">{product.badge}</span>}
              <span className="rating-badge">
                <Star size={12} fill="#ffb300" color="#ffb300" />
                {product.rating.toFixed(1)}
              </span>

              <div className="mkt-img-wrapper">
                <img 
                  src={imageMap[product.image] || omnicoreAdmin} 
                  alt={product.name} 
                  className="mkt-img" 
                />
              </div>

              <div className="mkt-card-body">
                <div className="mkt-title-row">
                  <h3 className="mkt-prod-name">{product.name}</h3>
                  <span className="mkt-prod-price">${product.price}</span>
                </div>
                
                <p className="mkt-prod-desc">{product.description}</p>
                
                <div className="mkt-prod-tags">
                  {product.tags.map((tag, idx) => (
                    <span key={idx} className="mkt-tag">{tag}</span>
                  ))}
                </div>

                <div className="mkt-card-footer">
                  <button className="mkt-btn outline">Demo</button>
                  <button className="mkt-btn fill">Buy License</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More Button */}
      <div className="load-more-container">
        <button className="load-more-btn">
          Load More Projects <ChevronDown size={16} />
        </button>
      </div>
    </div>
  );
}
