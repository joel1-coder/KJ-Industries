import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, CreditCard, FileText, Settings, 
  HelpCircle, LogOut, Search, Filter, Box, Shield, Server,
  MoreVertical, ChevronLeft, ChevronRight, Zap, Braces, Plus
} from 'lucide-react';
import teamAlex from '../assets/images/team_alex.png';
import '../Admin.css';

export default function AdminInventory({ setActivePage }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setActivePage('home');
  };

  const fullInventoryData = [
    { 
      id: 'NX-420-99',
      name: 'Neural Engine Core v4.2', 
      category: 'Enterprise Core', 
      price: '$2,499.00', 
      status: 'PUBLISHED', 
      dateAdded: 'May 12, 2024',
      icon: <Braces size={16} /> 
    },
    { 
      id: 'CS-P89-01',
      name: 'Cyber Sentinel Pro', 
      category: 'Security', 
      price: '$899.00', 
      status: 'DRAFT', 
      dateAdded: 'Mar 28, 2024',
      icon: <Shield size={16} /> 
    },
    { 
      id: 'QV-Z10-X',
      name: 'Quantum Visualizer', 
      category: 'Analytics', 
      price: '$12,500.00', 
      status: 'UPDATING', 
      dateAdded: 'Jan 15, 2024',
      icon: <Box size={16} /> 
    },
    { 
      id: 'AS-004-OK',
      name: 'Auto-Stack Optimizer', 
      category: 'Infrastructure', 
      price: '$4,200.00', 
      status: 'PUBLISHED', 
      dateAdded: 'Nov 05, 2023',
      icon: <Server size={16} /> 
    }
  ];

  const filteredInventory = fullInventoryData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-layout animate-fade-in">
      {/* Left Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <a href="#home" onClick={() => setActivePage('home')} className="sidebar-logo">
            <Shield size={22} className="sidebar-logo-icon" /> PRECISION
          </a>

          <div className="sidebar-section">
            <span className="sidebar-section-title">CORE SYSTEMS</span>
            <ul className="sidebar-menu">
              <li>
                <button 
                  className="sidebar-link" 
                  onClick={() => setActivePage('admin-dashboard')}
                >
                  <LayoutDashboard size={16} /> Dashboard
                </button>
              </li>
              <li>
                <button 
                  className="sidebar-link active" 
                  onClick={() => setActivePage('admin-inventory')}
                >
                  <Box size={16} /> Inventory
                </button>
              </li>
              <li>
                <button className="sidebar-link" onClick={() => alert('Sales Data is in read-only')}>
                  <CreditCard size={16} /> Sales Data
                </button>
              </li>
              <li>
                <button className="sidebar-link" onClick={() => alert('Customers panel is in read-only')}>
                  <FileText size={16} /> Customers
                </button>
              </li>
              <li>
                <button 
                  className="sidebar-link" 
                  onClick={() => setActivePage('admin-settings')}
                >
                  <Settings size={16} /> Settings
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-link" onClick={() => alert('Precision Intelligence support ticket system')}>
            <HelpCircle size={16} /> Support
          </button>
          <button className="sidebar-link" onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>

          <div className="sidebar-user-block">
            <img src={teamAlex} alt="Alex Thorne" className="sidebar-avatar" />
            <div className="sidebar-user-info">
              <span className="sidebar-username">Alex Thorne</span>
              <span className="sidebar-tier">ENTERPRISE TIER</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content view */}
      <main className="admin-main">
        <div className="admin-header-row" style={{ alignItems: 'flex-start' }}>
          <div className="admin-title-group">
            <h1 style={{ fontSize: '36px' }}>Asset Management</h1>
            <p style={{ fontSize: '15px', maxWidth: '600px', lineHeight: '1.6' }}>High-performance inventory control for enterprise software, plugins, and digital modules.</p>
          </div>

          <div className="admin-header-actions">
            <button className="admin-btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }} onClick={() => alert('Add New Product flow initialized')}>
              <Plus size={18} /> Add New Product
            </button>
          </div>
        </div>

        <div className="inventory-card" style={{ marginTop: '40px' }}>
          <div className="inventory-header" style={{ padding: '16px 24px' }}>
            <div className="inventory-search-wrapper" style={{ width: '320px' }}>
              <Search size={14} className="inventory-search-icon" />
              <input 
                type="text" 
                className="inventory-search-input" 
                placeholder="Filter assets..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="inventory-controls" style={{ gap: '16px' }}>
              <select style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 12px', borderRadius: '6px', fontSize: '12px' }}>
                <option>Bulk Actions</option>
              </select>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="filter-pill active">All Products</button>
                <button className="filter-pill">Published</button>
              </div>
              
              <div style={{ display: 'flex', gap: '4px', alignItems: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '12px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px' }}>
                View: 
                <button className="admin-icon-btn" style={{ width: '28px', height: '28px', marginLeft: '8px' }} title="List View">
                  <LayoutDashboard size={14} />
                </button>
                <button className="admin-icon-btn" style={{ width: '28px', height: '28px' }} title="Grid View">
                  <Box size={14} />
                </button>
              </div>
            </div>
          </div>

          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}><input type="checkbox" style={{ cursor: 'pointer' }} /></th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date Added</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item, idx) => (
                  <tr key={idx}>
                    <td><input type="checkbox" style={{ cursor: 'pointer' }} /></td>
                    <td>
                      <div className="inventory-product-cell">
                        <div className="inventory-product-icon-box">
                          {item.icon}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{item.name}</span>
                          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace', marginTop: '4px' }}>ID: {item.id}</span>
                        </div>
                      </div>
                    </td>
                    <td><span style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{item.category}</span></td>
                    <td style={{ fontWeight: '600', color: '#fff', fontFamily: 'monospace' }}>{item.price}</td>
                    <td>
                      <span className={`inventory-status-badge ${item.status === 'PUBLISHED' ? 'optimal' : item.status === 'UPDATING' ? 'updated' : 'degraded'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ color: 'rgba(255, 255, 255, 0.7)' }}>{item.dateAdded}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="admin-icon-btn" style={{ display: 'inline-flex', width: '32px', height: '32px', border: 'none', marginRight: '4px' }}>
                        <Box size={14} />
                      </button>
                      <button className="admin-icon-btn" style={{ display: 'inline-flex', width: '32px', height: '32px', border: 'none' }}>
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.03)' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>Showing 1 to {filteredInventory.length} of 24 assets</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button className="admin-icon-btn" style={{ width: '32px', height: '32px' }}><ChevronLeft size={14} /></button>
              <button className="admin-icon-btn" style={{ width: '32px', height: '32px', background: '#a5b4fc', color: '#111827', border: 'none' }}>1</button>
              <button className="admin-icon-btn" style={{ width: '32px', height: '32px' }}>2</button>
              <button className="admin-icon-btn" style={{ width: '32px', height: '32px' }}><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', letterSpacing: '-0.02em', color: '#fff', marginBottom: '8px' }}>PRECISION Intelligence Agency</h3>
          </div>
          <div style={{ display: 'flex', gap: '80px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#a5b4fc' }}>Management</span>
              <a href="#policy" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Inventory Policy</a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: '600', color: '#a5b4fc' }}>System</span>
              <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>© 2026 Precision</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
