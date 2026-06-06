import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Box, CreditCard, FileText, Settings,
  HelpCircle, LogOut, Search, Shield, Edit2, Trash2,
  ChevronLeft, ChevronRight, Plus, X, Save, AlertTriangle,
  CheckCircle, Package, Loader
} from 'lucide-react';
import teamAlex from '../assets/images/team_alex.png';
import { API_BASE } from '../config';
import '../Admin.css';

const CATEGORIES = [
  { id: 'dashboards',          label: 'Dashboards' },
  { id: 'e-commerce',          label: 'E-commerce' },
  { id: 'management-systems',  label: 'Management Systems' },
  { id: 'ai-platforms',        label: 'AI Platforms' },
  { id: 'web3-crypto',         label: 'Web3 / Crypto' },
];

const IMAGES = [
  'omnicore_admin.png',
  'fluxstore_ecom.png',
  'atlas_project.png',
  'nexus_web3.png',
  'cognito_ai.png',
];

const STATUSES = ['PUBLISHED', 'DRAFT', 'UPDATING'];

const ITEMS_PER_PAGE = 6;

const emptyForm = {
  name: '',
  price: '',
  rating: '4.5',
  image: 'omnicore_admin.png',
  description: '',
  tags: '',
  category: 'dashboards',
  badge: '',
  status: 'DRAFT',
};

// ─── Local-storage CRUD helpers (offline fallback) ───────────────────────────
const LS_KEY = 'precision_products';

function lsGet() {
  try { return JSON.parse(localStorage.getItem(LS_KEY)) || null; }
  catch { return null; }
}
function lsSet(data) {
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export default function AdminInventory({ setActivePage }) {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [page, setPage]           = useState(1);
  const [useLocal, setUseLocal]   = useState(false);

  // Modal state
  const [modal, setModal]         = useState(null);  // null | 'add' | 'edit' | 'delete'
  const [editTarget, setEditTarget] = useState(null);
  const [form, setForm]           = useState(emptyForm);
  const [saving, setSaving]       = useState(false);
  const [toast, setToast]         = useState(null);   // { type, msg }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setActivePage('home');
  };

  // ── Fetch products ──────────────────────────────────────────────────────────
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res  = await fetch(`${API_BASE}/api/products`);
      const data = await res.json();
      if (data.success) {
        setProducts(data.data);
        lsSet(data.data);          // keep LS in sync
        setUseLocal(false);
      }
    } catch {
      // Offline: load from localStorage
      const cached = lsGet();
      if (cached) { setProducts(cached); setUseLocal(true); }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // ── Toast helper ────────────────────────────────────────────────────────────
  const showToast = (type, msg) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3500);
  };

  // ── CRUD: Create ────────────────────────────────────────────────────────────
  const handleCreate = async () => {
    if (!form.name.trim() || !form.price || !form.category) {
      showToast('error', 'Name, price, and category are required.'); return;
    }
    setSaving(true);
    try {
      if (!useLocal) {
        const res  = await fetch(`${API_BASE}/api/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          body: JSON.stringify({ ...form, price: parseFloat(form.price), rating: parseFloat(form.rating) }),
        });
        const data = await res.json();
        if (data.success) {
          setProducts(p => { const n = [...p, data.data]; lsSet(n); return n; });
          showToast('success', `"${data.data.name}" added successfully!`);
        } else showToast('error', data.message);
      } else {
        // Local-only fallback
        const newP = {
          ...form, id: Date.now(),
          price: parseFloat(form.price), rating: parseFloat(form.rating),
          tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
          badge: form.badge || null,
          dateAdded: new Date().toLocaleDateString('en-US', { year:'numeric', month:'short', day:'2-digit' }),
        };
        setProducts(p => { const n = [...p, newP]; lsSet(n); return n; });
        showToast('success', `"${newP.name}" added (offline mode).`);
      }
      setModal(null);
    } catch {
      showToast('error', 'Failed to create product. Saved locally.');
    } finally { setSaving(false); }
  };

  // ── CRUD: Update ────────────────────────────────────────────────────────────
  const handleUpdate = async () => {
    if (!form.name.trim() || !form.price || !form.category) {
      showToast('error', 'Name, price, and category are required.'); return;
    }
    setSaving(true);
    try {
      if (!useLocal) {
        const res  = await fetch(`${API_BASE}/api/products/${editTarget.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          body: JSON.stringify({ ...form, price: parseFloat(form.price), rating: parseFloat(form.rating) }),
        });
        const data = await res.json();
        if (data.success) {
          setProducts(p => { const n = p.map(x => x.id === editTarget.id ? data.data : x); lsSet(n); return n; });
          showToast('success', `"${data.data.name}" updated successfully!`);
        } else showToast('error', data.message);
      } else {
        const updated = {
          ...editTarget, ...form,
          price: parseFloat(form.price), rating: parseFloat(form.rating),
          tags: typeof form.tags === 'string' ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : form.tags,
          badge: form.badge || null,
        };
        setProducts(p => { const n = p.map(x => x.id === editTarget.id ? updated : x); lsSet(n); return n; });
        showToast('success', `"${updated.name}" updated (offline mode).`);
      }
      setModal(null);
    } catch {
      showToast('error', 'Failed to update. Saved locally.');
    } finally { setSaving(false); }
  };

  // ── CRUD: Delete ────────────────────────────────────────────────────────────
  const handleDelete = async () => {
    setSaving(true);
    try {
      if (!useLocal) {
        const res  = await fetch(`${API_BASE}/api/products/${editTarget.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        const data = await res.json();
        if (data.success) {
          setProducts(p => { const n = p.filter(x => x.id !== editTarget.id); lsSet(n); return n; });
          showToast('success', `"${editTarget.name}" deleted.`);
        } else showToast('error', data.message);
      } else {
        setProducts(p => { const n = p.filter(x => x.id !== editTarget.id); lsSet(n); return n; });
        showToast('success', `"${editTarget.name}" deleted (offline mode).`);
      }
      setModal(null);
    } catch {
      showToast('error', 'Failed to delete product.');
    } finally { setSaving(false); }
  };

  // ── Open modals ─────────────────────────────────────────────────────────────
  const openAdd = () => {
    setForm(emptyForm);
    setEditTarget(null);
    setModal('add');
  };

  const openEdit = (product) => {
    setEditTarget(product);
    setForm({
      name:        product.name || '',
      price:       String(product.price || ''),
      rating:      String(product.rating || '4.5'),
      image:       product.image || 'omnicore_admin.png',
      description: product.description || '',
      tags:        Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags || ''),
      category:    product.category || 'dashboards',
      badge:       product.badge || '',
      status:      product.status || 'DRAFT',
    });
    setModal('edit');
  };

  const openDelete = (product) => {
    setEditTarget(product);
    setModal('delete');
  };

  // ── Filtering & pagination ──────────────────────────────────────────────────
  const filtered = products.filter(p => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q ||
      p.name.toLowerCase().includes(q) ||
      (p.category && p.category.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q));
    const matchStatus = filterStatus === 'ALL' || p.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const statusBadgeClass = (s) =>
    s === 'PUBLISHED' ? 'optimal' : s === 'UPDATING' ? 'updated' : 'degraded';

  // ── Sidebar nav ─────────────────────────────────────────────────────────────
  const SidebarLink = ({ icon, label, pageKey, active }) => (
    <li>
      <button className={`sidebar-link ${active ? 'active' : ''}`} onClick={() => setActivePage(pageKey)}>
        {icon} {label}
      </button>
    </li>
  );

  return (
    <div className="admin-layout animate-fade-in">

      {/* Toast */}
      {toast && (
        <div className={`admin-toast admin-toast-${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
          {toast.msg}
        </div>
      )}

      {/* Offline badge */}
      {useLocal && (
        <div className="admin-offline-badge">
          ⚠ Offline mode — changes saved locally only
        </div>
      )}

      {/* ── Sidebar ── */}
      <aside className="admin-sidebar">
        <div className="sidebar-top">
          <button onClick={() => setActivePage('home')} className="sidebar-logo">
            <Shield size={22} className="sidebar-logo-icon" /> PRECISION
          </button>

          <div className="sidebar-section">
            <span className="sidebar-section-title">CORE SYSTEMS</span>
            <ul className="sidebar-menu">
              <SidebarLink icon={<LayoutDashboard size={16} />} label="Dashboard"  pageKey="admin-dashboard" />
              <SidebarLink icon={<Box size={16} />}             label="Inventory"  pageKey="admin-inventory" active />
              <SidebarLink icon={<CreditCard size={16} />}      label="Sales Data" pageKey="admin-sales" />
              <SidebarLink icon={<FileText size={16} />}        label="Customers"  pageKey="admin-customers" />
              <SidebarLink icon={<Settings size={16} />}        label="Settings"   pageKey="admin-settings" />
            </ul>
          </div>
        </div>

        <div className="sidebar-bottom">
          <button className="sidebar-link" onClick={() => alert('Support ticket system')}>
            <HelpCircle size={16} /> Support
          </button>
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

      {/* ── Main ── */}
      <main className="admin-main">

        {/* Header row */}
        <div className="admin-header-row" style={{ alignItems: 'flex-start' }}>
          <div className="admin-title-group">
            <h1 style={{ fontSize: '36px' }}>Product Management</h1>
            <p style={{ fontSize: '15px', maxWidth: '600px', lineHeight: '1.6' }}>
              Add, edit, and remove products — changes reflect instantly on the public store.
            </p>
          </div>
          <div className="admin-header-actions">
            <button className="admin-btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }} onClick={openAdd}>
              <Plus size={18} /> Add New Product
            </button>
          </div>
        </div>

        {/* Table card */}
        <div className="inventory-card" style={{ marginTop: '40px' }}>

          {/* Controls */}
          <div className="inventory-header" style={{ padding: '16px 24px', flexWrap: 'wrap', gap: '12px' }}>
            <div className="inventory-search-wrapper" style={{ width: '280px' }}>
              <Search size={14} className="inventory-search-icon" />
              <input
                type="text"
                className="inventory-search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setPage(1); }}
              />
            </div>

            <div className="inventory-controls" style={{ gap: '12px' }}>
              {['ALL', ...STATUSES].map(s => (
                <button
                  key={s}
                  className={`filter-pill ${filterStatus === s ? 'active' : ''}`}
                  onClick={() => { setFilterStatus(s); setPage(1); }}
                >
                  {s === 'ALL' ? 'All Products' : s}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="inventory-table-wrapper">
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.4)' }}>
                <Loader size={32} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px' }} />
                <p>Loading products...</p>
              </div>
            ) : paginated.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.4)' }}>
                <Package size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                <p>No products found.</p>
              </div>
            ) : (
              <table className="inventory-table">
                <thead>
                  <tr>
                    <th>PRODUCT NAME</th>
                    <th>CATEGORY</th>
                    <th>PRICE</th>
                    <th>RATING</th>
                    <th>STATUS</th>
                    <th>DATE ADDED</th>
                    <th style={{ textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginated.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="inventory-product-cell">
                          <div className="inventory-product-icon-box">
                            <Package size={16} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 600 }}>{item.name}</span>
                            {item.badge && (
                              <span style={{ fontSize: '10px', color: '#a5b4fc', marginTop: '2px' }}>{item.badge}</span>
                            )}
                            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace', marginTop: '2px' }}>
                              ID: {item.id}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td><span style={{ color: 'rgba(255,255,255,0.7)' }}>{item.category}</span></td>
                      <td style={{ fontWeight: 600, fontFamily: 'monospace' }}>${Number(item.price).toFixed(2)}</td>
                      <td style={{ color: '#fbbf24' }}>★ {Number(item.rating).toFixed(1)}</td>
                      <td>
                        <span className={`inventory-status-badge ${statusBadgeClass(item.status)}`}>
                          {item.status || 'DRAFT'}
                        </span>
                      </td>
                      <td style={{ color: 'rgba(255,255,255,0.7)' }}>{item.dateAdded || '—'}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          className="admin-icon-btn"
                          style={{ display: 'inline-flex', width: '32px', height: '32px', border: 'none', marginRight: '6px' }}
                          title="Edit"
                          onClick={() => openEdit(item)}
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="admin-icon-btn"
                          style={{ display: 'inline-flex', width: '32px', height: '32px', border: 'none', color: '#ef4444' }}
                          title="Delete"
                          onClick={() => openDelete(item)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
              Showing {Math.min((page - 1) * ITEMS_PER_PAGE + 1, filtered.length)}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} products
            </span>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button className="admin-icon-btn" style={{ width: '32px', height: '32px' }} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                <button
                  key={n}
                  className="admin-icon-btn"
                  style={{ width: '32px', height: '32px', background: n === page ? '#a5b4fc' : '', color: n === page ? '#111827' : '', border: 'none' }}
                  onClick={() => setPage(n)}
                >
                  {n}
                </button>
              ))}
              <button className="admin-icon-btn" style={{ width: '32px', height: '32px' }} onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>PRECISION Intelligence Agency</h3>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 Precision</span>
        </div>
      </main>

      {/* ════════ ADD / EDIT MODAL ════════ */}
      {(modal === 'add' || modal === 'edit') && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>{modal === 'add' ? 'Add New Product' : 'Edit Product'}</h2>
              <button className="admin-modal-close" onClick={() => setModal(null)}><X size={18} /></button>
            </div>

            <div className="admin-modal-body">
              <div className="admin-modal-grid">

                <div className="settings-form-group">
                  <label className="settings-form-label">Product Name *</label>
                  <input className="settings-form-input" placeholder="e.g. OmniCore Admin" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Price (USD) *</label>
                  <input className="settings-form-input" type="number" min="0" placeholder="e.g. 199" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Rating (0–5)</label>
                  <input className="settings-form-input" type="number" min="0" max="5" step="0.1" placeholder="4.5" value={form.rating} onChange={e => setForm(f => ({ ...f, rating: e.target.value }))} />
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Category *</label>
                  <select className="settings-form-input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                  </select>
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Status</label>
                  <select className="settings-form-input" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="settings-form-group">
                  <label className="settings-form-label">Badge (optional)</label>
                  <input className="settings-form-input" placeholder='e.g. "Best Seller"' value={form.badge} onChange={e => setForm(f => ({ ...f, badge: e.target.value }))} />
                </div>

                <div className="settings-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="settings-form-label">Image File</label>
                  <select className="settings-form-input" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))}>
                    {IMAGES.map(img => <option key={img} value={img}>{img}</option>)}
                  </select>
                </div>

                <div className="settings-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="settings-form-label">Tags (comma-separated)</label>
                  <input className="settings-form-input" placeholder="React, Node.js, PostgreSQL" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} />
                </div>

                <div className="settings-form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="settings-form-label">Description</label>
                  <textarea className="settings-form-input" rows={4} placeholder="Describe the product..." style={{ resize: 'vertical', fontFamily: 'inherit' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>

              </div>
            </div>

            <div className="admin-modal-footer">
              <button className="admin-btn-ghost" onClick={() => setModal(null)} disabled={saving}>Cancel</button>
              <button className="admin-btn-primary" onClick={modal === 'add' ? handleCreate : handleUpdate} disabled={saving}>
                {saving ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={14} />}
                {saving ? 'Saving...' : modal === 'add' ? 'Create Product' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ DELETE CONFIRM MODAL ════════ */}
      {modal === 'delete' && editTarget && (
        <div className="admin-modal-overlay" onClick={() => setModal(null)}>
          <div className="admin-modal" style={{ maxWidth: '440px' }} onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h2>Delete Product</h2>
              <button className="admin-modal-close" onClick={() => setModal(null)}><X size={18} /></button>
            </div>
            <div className="admin-modal-body" style={{ textAlign: 'center', padding: '32px 24px' }}>
              <AlertTriangle size={48} style={{ color: '#ef4444', margin: '0 auto 16px' }} />
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '15px', lineHeight: '1.6' }}>
                Are you sure you want to delete <strong style={{ color: '#fff' }}>"{editTarget.name}"</strong>?
                <br />This will also remove it from the public products page.
              </p>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn-ghost" onClick={() => setModal(null)} disabled={saving}>Cancel</button>
              <button
                className="admin-btn-primary"
                style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', boxShadow: '0 4px 20px rgba(239,68,68,0.35)' }}
                onClick={handleDelete}
                disabled={saving}
              >
                {saving ? <Loader size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={14} />}
                {saving ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
