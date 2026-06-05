import React, { useState } from 'react';
import { 
  LayoutDashboard, ShoppingBag, CreditCard, FileText, Settings, 
  HelpCircle, LogOut, Bell, Plus, Shield, KeyRound, Lock, Smartphone
} from 'lucide-react';
import teamAlex from '../assets/images/team_alex.png';
import '../Admin.css';

export default function AdminSettings({ setActivePage }) {
  const [displayName, setDisplayName] = useState('Alexander Vance');
  const [email, setEmail] = useState('a.vance@precision-intel.ai');
  const [workspaceUrl, setWorkspaceUrl] = useState('precision-hq');
  const [twoFactor, setTwoFactor] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState('profile'); // 'profile' | 'security' | 'billing' | 'notifications'

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setActivePage('home');
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    alert('Preferences and profile identity updated successfully.');
  };

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
                <button className="sidebar-link" onClick={() => alert('Purchases log is in read-only')}>
                  <ShoppingBag size={16} /> Purchases
                </button>
              </li>
              <li>
                <button className="sidebar-link" onClick={() => alert('Subscriptions log is in read-only')}>
                  <CreditCard size={16} /> Subscriptions
                </button>
              </li>
              <li>
                <button className="sidebar-link" onClick={() => alert('Invoices panel is in read-only')}>
                  <FileText size={16} /> Invoices
                </button>
              </li>
              <li>
                <button 
                  className="sidebar-link active" 
                  onClick={() => setActivePage('admin-settings')}
                >
                  <Settings size={16} /> Settings
                </button>
              </li>
            </ul>

            <button className="sidebar-btn-new" onClick={() => alert('Create New Project flow initialized')}>
              <Plus size={16} /> New Project
            </button>
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
        <div className="admin-header-row">
          <div className="admin-title-group">
            <h1>Account Settings</h1>
            <p>Manage your workspace preferences, security protocols, and billing cycles.</p>
          </div>

          <div className="admin-header-actions">
            <button className="admin-icon-btn" onClick={() => alert('No new notifications')}>
              <Bell size={18} />
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="settings-container-layout">
          {/* Sub Navigation List */}
          <div className="settings-subnav">
            <button 
              className={`settings-subnav-btn ${activeSubTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('profile')}
            >
              Profile Details
            </button>
            <button 
              className={`settings-subnav-btn ${activeSubTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('security')}
            >
              Security
            </button>
            <button 
              className={`settings-subnav-btn ${activeSubTab === 'billing' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('billing')}
            >
              Billing & Plans
            </button>
            <button 
              className={`settings-subnav-btn ${activeSubTab === 'notifications' ? 'active' : ''}`}
              onClick={() => setActiveSubTab('notifications')}
            >
              Notifications
            </button>
          </div>

          {/* Settings Panels Form */}
          <div className="settings-panel-flow">
            {/* Profile Identity Card */}
            {activeSubTab === 'profile' && (
              <>
                <div className="settings-panel-card">
                  <div className="settings-panel-header">
                    <div className="settings-panel-title">
                      <h3>Profile Identity</h3>
                      <p>Your public and administrative persona on Aura.</p>
                    </div>
                    <button className="settings-btn-save" onClick={handleSaveChanges}>
                      Save Changes
                    </button>
                  </div>

                  <div className="settings-profile-identity-grid">
                    <div className="avatar-upload-block">
                      <div className="avatar-upload-circle" onClick={() => alert('Avatar upload triggers standard media picker.')}>
                        <img src={teamAlex} alt="Alex Thorne" className="avatar-upload-img" />
                      </div>
                      <span className="avatar-upload-label">Click to update avatar</span>
                    </div>

                    <div className="settings-inputs-block">
                      <div className="settings-form-group">
                        <label className="settings-form-label">Display Name</label>
                        <input 
                          type="text" 
                          className="settings-form-input" 
                          value={displayName}
                          onChange={(e) => setDisplayName(e.target.value)}
                        />
                      </div>

                      <div className="settings-form-group">
                        <label className="settings-form-label">Professional Email</label>
                        <input 
                          type="email" 
                          className="settings-form-input" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="settings-form-group">
                        <label className="settings-form-label">Workspace URL</label>
                        <div className="workspace-url-input-wrapper">
                          <span className="workspace-url-prefix">aura.ai/</span>
                          <input 
                            type="text" 
                            className="settings-form-input workspace-url-field" 
                            value={workspaceUrl}
                            onChange={(e) => setWorkspaceUrl(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Security and Access Card inside Profile tab */}
                <div className="settings-panel-card">
                  <div className="settings-panel-header" style={{ borderBottom: 'none', paddingBottom: 0, marginBottom: '20px' }}>
                    <div className="settings-panel-title">
                      <h3>Security & Access</h3>
                      <p>Maintain the integrity of your enterprise connection.</p>
                    </div>
                  </div>

                  <div className="security-list">
                    {/* Row 1: Password */}
                    <div className="security-item-row">
                      <div className="security-item-info">
                        <div className="security-item-icon-box">
                          <Lock size={18} />
                        </div>
                        <div className="security-item-details">
                          <span className="security-item-title">Change Password</span>
                          <span className="security-item-desc">Last updated 42 days ago</span>
                        </div>
                      </div>
                      <button className="security-btn-action" onClick={() => alert('Password modification flow triggered.')}>
                        Update
                      </button>
                    </div>

                    {/* Row 2: 2FA */}
                    <div className="security-item-row">
                      <div className="security-item-info">
                        <div className="security-item-icon-box">
                          <Smartphone size={18} />
                        </div>
                        <div className="security-item-details">
                          <span className="security-item-title">Two-Factor Authentication</span>
                          <span className="security-item-desc active">Currently Active (Auth App)</span>
                        </div>
                      </div>
                      
                      <label className="switch-toggle-label">
                        <input 
                          type="checkbox" 
                          checked={twoFactor}
                          onChange={(e) => setTwoFactor(e.target.checked)}
                        />
                        <span className="switch-toggle-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Inactive Tabs fallbacks */}
            {activeSubTab !== 'profile' && (
              <div className="settings-panel-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
                <KeyRound size={32} style={{ color: 'rgba(255, 255, 255, 0.2)', marginBottom: '16px' }} />
                <h3>{activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1)} Sub-Panel</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '13px', marginTop: '6px' }}>
                  This preferences area is currently configured as read-only.
                </p>
                <button 
                  className="settings-btn-save" 
                  style={{ marginTop: '20px' }}
                  onClick={() => setActiveSubTab('profile')}
                >
                  Return to Profile Details
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
