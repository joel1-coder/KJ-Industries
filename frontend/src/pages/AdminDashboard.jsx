import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, CreditCard, FileText, Settings, 
  HelpCircle, LogOut, Bell, Plus, Search, Zap, Cpu, Shield, 
  Filter, Play, CheckCircle2, AlertTriangle, RefreshCw, Braces, Box
} from 'lucide-react';
import teamAlex from '../assets/images/team_alex.png';
import '../Admin.css';

export default function AdminDashboard({ setActivePage }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('1M'); // '1W' | '1M' | '1Y'
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setActivePage('home');
  };

  const inventoryData = [
    { name: 'NeuralEngine Core', version: 'v4.2.0-stable', deployment: 'Multi-Cloud', revenue: '$420k', status: 'optimal', icon: <Braces size={16} /> },
    { name: 'Sentinel Firewall', version: 'v3.1.0-patch', deployment: 'Edge Only', revenue: '$185k', status: 'updated', icon: <Box size={16} /> },
    { name: 'Quantum Ledger', version: 'v1.8.5', deployment: 'Hybrid', revenue: '$1.2M', status: 'optimal', icon: <CreditCard size={16} /> },
    { name: 'Cognition Mesh', version: 'v0.9.1-beta', deployment: 'Edge Only', revenue: '$95k', status: 'degraded', icon: <Zap size={16} /> }
  ];

  const filteredInventory = inventoryData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.version.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.deployment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const revenueBars = [
    { label: 'Jan', value: 80, amount: '$80k', highlighted: false },
    { label: 'Feb', value: 95, amount: '$95k', highlighted: false },
    { label: 'Mar', value: 88, amount: '$88k', highlighted: false },
    { label: 'Apr', value: 110, amount: '$110k', highlighted: false },
    { label: 'May', value: 105, amount: '$105k', highlighted: false },
    { label: 'Jun', value: 125, amount: '$125k', highlighted: false },
    { label: 'Jul', value: 118, amount: '$118k', highlighted: false },
    { label: 'Aug', value: 142, amount: '$142.8k', highlighted: true }
  ];

  return (
    <div className="admin-layout animate-fade-in">
      {/* Left Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <button onClick={() => setActivePage('home')} className="sidebar-logo">
            <Shield size={22} className="sidebar-logo-icon" /> PRECISION
          </button>

          <div className="sidebar-section">
            <span className="sidebar-section-title">CORE SYSTEMS</span>
            <ul className="sidebar-menu">
              <li>
                <button 
                  className="sidebar-link active" 
                  onClick={() => setActivePage('admin-dashboard')}
                >
                  <LayoutDashboard size={16} /> Dashboard
                </button>
              </li>
              <li>
                <button 
                  className="sidebar-link" 
                  onClick={() => setActivePage('admin-inventory')}
                >
                  <Box size={16} /> Inventory
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
          <button className="sidebar-link" onClick={handleLogout}>
            <LogOut size={16} /> Sign Out
          </button>

          <div className="sidebar-user-block">
            <img src={teamAlex} alt="Admin" className="sidebar-avatar" />
            <div className="sidebar-user-info">
              <span className="sidebar-username">Admin User</span>
              <span className="sidebar-tier">ENTERPRISE TIER</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content view */}
      <main className="admin-main">
        <div className="admin-header-row">
          <div className="admin-title-group">
            <h1>Control Center</h1>
            <p>Real-time enterprise operational overview</p>
          </div>

          <div className="admin-header-actions">
            <button className="admin-btn-primary" onClick={() => setActivePage('admin-inventory')}>
              <Plus size={16} /> Manage Products
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="stat-header">
              <span className="stat-label-text">MONTHLY RECURRING REVENUE</span>
              <span className="stat-trend green">+12.4% vs LW</span>
            </div>
            <div className="stat-value-text">$142,850.00</div>
            <div className="stat-progress-bar blue"></div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-header">
              <span className="stat-label-text">ACTIVE ENTITIES</span>
              <span className="stat-trend purple">+890 new</span>
            </div>
            <div className="stat-value-text">12,402</div>
            <div className="stat-progress-bar purple"></div>
          </div>

          <div className="admin-stat-card">
            <div className="stat-header">
              <span className="stat-label-text">TOTAL SALES (Q4)</span>
              <span className="stat-trend cyan">+5.2% daily</span>
            </div>
            <div className="stat-value-text">$2.14M</div>
            <div className="stat-progress-bar cyan"></div>
          </div>
        </div>

        {/* Widgets Grid */}
        <div className="admin-widgets-grid">
          {/* Revenue Chart Widget */}
          <div className="widget-card">
            <div className="widget-header">
              <span className="widget-title">
                <CreditCard size={18} /> Revenue Intelligence
              </span>
              <div className="widget-header-actions">
                <button 
                  className={`filter-pill ${activeTab === '1W' ? 'active' : ''}`}
                  onClick={() => setActiveTab('1W')}
                >
                  1W
                </button>
                <button 
                  className={`filter-pill ${activeTab === '1M' ? 'active' : ''}`}
                  onClick={() => setActiveTab('1M')}
                >
                  1M
                </button>
                <button 
                  className={`filter-pill ${activeTab === '1Y' ? 'active' : ''}`}
                  onClick={() => setActiveTab('1Y')}
                >
                  1Y
                </button>
              </div>
            </div>

            <div className="revenue-chart-container">
              {revenueBars.map((bar, idx) => (
                <div key={idx} className="chart-bar-col">
                  <div className="chart-bar-wrapper">
                    <div 
                      className={`chart-bar-fill ${bar.highlighted ? 'highlighted' : ''}`}
                      style={{ height: `${(bar.value / 150) * 100}%` }}
                    >
                      <div className="chart-bar-tooltip">{bar.amount}</div>
                    </div>
                  </div>
                  <span className="chart-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Feed Widget */}
          <div className="widget-card">
            <div className="widget-header">
              <span className="widget-title">
                <Zap size={18} /> Operational Feed
              </span>
            </div>

            <div className="operational-feed">
              <div className="feed-item">
                <div className="feed-status-dot blue"></div>
                <div className="feed-content">
                  <span className="feed-title">New Enterprise License</span>
                  <span className="feed-meta">Global Nexus Corp • $12,500/yr</span>
                  <span className="feed-time">2 mins ago</span>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-status-dot orange"></div>
                <div className="feed-content">
                  <span className="feed-title">Node 04 Latency Spike</span>
                  <span className="feed-meta">EU-Central Auto-Scaling Active</span>
                  <span className="feed-time">14 mins ago</span>
                </div>
              </div>

              <div className="feed-item">
                <div className="feed-status-dot cyan"></div>
                <div className="feed-content">
                  <span className="feed-title">Weekly Audit Complete</span>
                  <span className="feed-meta">No compliance issues detected</span>
                  <span className="feed-time">1 hour ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Table Card */}
        <div className="inventory-card">
          <div className="inventory-header">
            <span className="inventory-title">Software Asset Inventory</span>
            
            <div className="inventory-controls">
              <div className="inventory-search-wrapper">
                <Search size={14} className="inventory-search-icon" />
                <input 
                  type="text" 
                  className="inventory-search-input" 
                  placeholder="Search assets..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="admin-icon-btn" style={{ width: '32px', height: '32px' }} title="Filter inventory">
                <Filter size={14} />
              </button>
            </div>
          </div>

          <div className="inventory-table-wrapper">
            <table className="inventory-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Version</th>
                  <th>Deployment</th>
                  <th>Revenue Contribution</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="inventory-product-cell">
                        <div className="inventory-product-icon-box">
                          {item.icon}
                        </div>
                        {item.name}
                      </div>
                    </td>
                    <td><span style={{ color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'monospace' }}>{item.version}</span></td>
                    <td>{item.deployment}</td>
                    <td style={{ fontWeight: '600', color: '#fff' }}>{item.revenue}</td>
                    <td>
                      <span className={`inventory-status-badge ${item.status}`}>
                        {item.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredInventory.length === 0 && (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '24px', color: 'rgba(255, 255, 255, 0.4)' }}>
                      No assets found matching "{searchTerm}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
