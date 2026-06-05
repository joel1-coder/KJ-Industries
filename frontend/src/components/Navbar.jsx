import React, { useState, useEffect } from 'react';
import { ShoppingCart, Heart, Bell, LogOut, Sun, Moon } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, theme, toggleTheme }) {
  const [user, setUser] = useState(null); // stores user session

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setUser({ email: 'admin@precision.dev', role: 'admin' });
    } else {
      setUser(null);
    }
  }, [activePage]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('adminToken');
    setActivePage('home');
  };

  return (
    <header className="navbar-header">
      <div className="container nav-container">
        <a href="#home" onClick={() => setActivePage('home')} className="logo-brand">
          PRECISION
        </a>

        <ul className="nav-links">
          <li>
            <a 
              href="#products" 
              onClick={() => setActivePage('products')}
              className={activePage === 'products' ? 'active' : ''}
            >
              Products
            </a>
          </li>

          <li>
            <a 
              href="#about" 
              onClick={() => setActivePage('about')}
              className={activePage === 'about' ? 'active' : ''}
            >
              About
            </a>
          </li>
        </ul>

        <div className="nav-actions">
          {/* Light/Dark Toggle */}
          <button className="nav-icon-btn" onClick={toggleTheme} title="Toggle Dark/Light Mode">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button className="nav-icon-btn">
            <Bell size={18} />
          </button>
          <button className="nav-icon-btn">
            <Heart size={18} />
          </button>
          <button className="nav-icon-btn" onClick={() => setActivePage('products')}>
            <ShoppingCart size={18} />
          </button>
          
          {user ? (
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
              onClick={() => setActivePage('admin-dashboard')}
              title="Aura Control Center"
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                <span style={{ fontSize: '12px', fontWeight: '600' }}>Admin User</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLogout();
                  }}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#ef4444', 
                    fontSize: '11px', 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <LogOut size={10} /> Logout
                </button>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="Admin Profile" 
                className="avatar-img" 
              />
            </div>
          ) : (
            <button className="glow-btn-primary" onClick={() => setActivePage('admin-login')}>
              Get Started
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
