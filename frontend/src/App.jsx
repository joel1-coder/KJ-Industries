import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminSettings from './pages/AdminSettings';
import AdminInventory from './pages/AdminInventory';
import './App.css';

function PublicSite() {
  const [activePage, setLocalActivePage] = useState('home'); // 'home' | 'products' | 'about'
  const navigate = useNavigate();
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  const setActivePage = (page) => {
    if (page.startsWith('admin-')) {
      if (page === 'admin-login') navigate('/login');
      else if (page === 'admin-dashboard') navigate('/admin');
      else if (page === 'admin-settings') navigate('/admin/settings');
    } else {
      setLocalActivePage(page);
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main style={{ flexGrow: 1 }}>
        {activePage === 'home' && <Home setActivePage={setActivePage} />}
        {activePage === 'products' && <Products />}
        {activePage === 'about' && <About setActivePage={setActivePage} />}
      </main>

      <Footer setActivePage={setActivePage} />
    </div>
  );
}

function AdminWrapper({ Component }) {
  const navigate = useNavigate();
  // Bridge the old setActivePage behavior to React Router
  const setActivePage = (page) => {
    if (page === 'home') navigate('/');
    else if (page === 'admin-dashboard') navigate('/admin');
    else if (page === 'admin-settings') navigate('/admin/settings');
    else if (page === 'admin-inventory') navigate('/admin/inventory');
    else if (page === 'admin-login') navigate('/login');
    else navigate('/');
  };

  return <Component setActivePage={setActivePage} />;
}

function App() {
  return (
    <Routes>
      <Route path="/*" element={<PublicSite />} />
      <Route path="/login" element={<AdminWrapper Component={AdminLogin} />} />
      <Route path="/admin" element={<AdminWrapper Component={AdminDashboard} />} />
      <Route path="/admin/settings" element={<AdminWrapper Component={AdminSettings} />} />
      <Route path="/admin/inventory" element={<AdminWrapper Component={AdminInventory} />} />
    </Routes>
  );
}

export default App;
