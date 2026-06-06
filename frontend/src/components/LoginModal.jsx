import React, { useState } from 'react';
import { X, Lock, Mail } from 'lucide-react';
import { API_BASE } from '../config';

export default function LoginModal({ onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('admin@precision.dev');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Authentication successful! Redirecting...');
        localStorage.setItem('adminToken', data.token);
        setTimeout(() => {
          onLoginSuccess(data.user);
        }, 1000);
      } else {
        setError(data.message || 'Login failed. Please verify credentials.');
      }
    } catch (err) {
      // Fallback for UI presentation in case backend isn't running yet
      if (email === 'admin@precision.dev' && password === 'admin123') {
        setSuccess('Logged in (local mock success)');
        localStorage.setItem('adminToken', 'mock-token');
        setTimeout(() => {
          onLoginSuccess({ email, role: 'admin' });
        }, 1000);
      } else {
        setError('Network error. Check if backend is active.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 className="login-title">Admin Console</h2>
        <p className="login-subtitle">Enter admin privileges credentials below to authenticate.</p>

        {error && <div className="login-error">{error}</div>}
        {success && <div className="login-success-msg">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-muted)' 
                }} 
              />
              <input 
                type="email" 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }}
                placeholder="admin@precision.dev"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock 
                size={16} 
                style={{ 
                  position: 'absolute', 
                  left: '12px', 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: 'var(--text-muted)' 
                }} 
              />
              <input 
                type="password" 
                className="form-input" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '40px', width: '100%' }}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In as Admin'}
          </button>
        </form>
      </div>
    </div>
  );
}
