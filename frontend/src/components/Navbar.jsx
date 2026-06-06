import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, ShieldCheck, LogOut, LayoutDashboard, Menu, X } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, theme, toggleTheme }) {
  const [user, setUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    setUser(token ? { email: 'admin@precision.dev', role: 'admin' } : null);
  }, [activePage]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('adminToken');
    setActivePage('home');
    setMobileOpen(false);
  };

  const navTo = (page) => {
    setActivePage(page);
    setMobileOpen(false);
  };

  const navLinks = [
    { id: 'home',     label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about',    label: 'About' },
  ];

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-container">

        {/* Brand */}
        <button className="logo-brand" onClick={() => navTo('home')}>
          <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
          PRECISION
        </button>

        {/* Desktop Nav Links */}
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.id}>
              <button
                className={`nav-link-btn ${activePage === link.id ? 'active' : ''}`}
                onClick={() => navTo(link.id)}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Desktop Right Actions */}
        <div className="nav-actions">
          {/* Theme Toggle */}
          <button className="nav-icon-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {user ? (
            /* Admin pill when logged in */
            <div className="nav-admin-pill">
              <button
                className="nav-admin-dash-btn"
                onClick={() => navTo('admin-dashboard')}
                title="Go to Dashboard"
              >
                <LayoutDashboard size={14} />
                Dashboard
              </button>
              <span className="nav-admin-divider" />
              <button
                className="nav-admin-logout-btn"
                onClick={handleLogout}
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            </div>
          ) : (
            <div className="nav-right-group">
              <button
                className="nav-admin-login-btn"
                onClick={() => navTo('admin-login')}
              >
                <ShieldCheck size={14} />
                Admin Login
              </button>
              <button className="glow-btn-primary" onClick={() => navTo('products')}>
                Browse Products
              </button>
            </div>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="nav-mobile-menu" ref={mobileRef}>
          {navLinks.map(link => (
            <button
              key={link.id}
              className={`nav-mobile-link ${activePage === link.id ? 'active' : ''}`}
              onClick={() => navTo(link.id)}
            >
              {link.label}
            </button>
          ))}
          <div className="nav-mobile-divider" />
          {user ? (
            <>
              <button className="nav-mobile-link" onClick={() => navTo('admin-dashboard')}>
                <LayoutDashboard size={14} /> Dashboard
              </button>
              <button className="nav-mobile-link nav-mobile-logout" onClick={handleLogout}>
                <LogOut size={14} /> Sign Out
              </button>
            </>
          ) : (
            <button className="nav-mobile-link nav-mobile-admin" onClick={() => navTo('admin-login')}>
              <ShieldCheck size={14} /> Admin Login
            </button>
          )}
        </div>
      )}
    </header>
  );
}
