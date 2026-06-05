import React, { useState } from 'react';
import { ArrowRight, Mail, Lock, CheckCircle2, Shield } from 'lucide-react';
import '../Admin.css';

export default function AdminLogin({ setActivePage }) {
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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSuccess('Access granted. Initializing Aura Control Center...');
        localStorage.setItem('adminToken', data.token);
        setTimeout(() => {
          setActivePage('admin-dashboard');
        }, 1200);
      } else {
        setError(data.message || 'Verification failed. Please check your credentials.');
      }
    } catch (err) {
      // Offline fallback
      if (email === 'admin@precision.dev' && password === 'admin123') {
        setSuccess('Access granted. Initializing Aura Control Center (Local Bypass)...');
        localStorage.setItem('adminToken', 'mock-token-aura');
        setTimeout(() => {
          setActivePage('admin-dashboard');
        }, 1200);
      } else {
        setError('Network offline. Only the official admin credentials will bypass locally.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-portal-layout animate-fade-in">
      {/* Left Column (Hero Info) */}
      <div className="login-portal-info-panel">
        <div className="tech-grid-overlay"></div>
        
        <a href="#home" onClick={() => setActivePage('home')} className="login-portal-brand">
          <Shield size={22} className="login-portal-brand-icon" /> PRECISION
        </a>

        <div className="login-portal-hero-text">
          <h1>Secure Access to <br /><span>Aura Enterprise</span></h1>
          <p>
            Experience the next generation of intelligence-driven software solutions with enterprise-grade security.
          </p>

          <div className="login-portal-features">
            <div className="login-portal-feature-item">
              <CheckCircle2 size={16} /> Military-grade encryption
            </div>
            <div className="login-portal-feature-item">
              <CheckCircle2 size={16} /> Real-time threat monitoring
            </div>
            <div className="login-portal-feature-item">
              <CheckCircle2 size={16} /> Global identity management
            </div>
          </div>
        </div>

        <div className="login-portal-footer">
          © 2026 Precision Intelligence Agency.
        </div>
      </div>

      {/* Right Column (Sign In Form) */}
      <div className="login-portal-form-panel">
        <div className="login-portal-card">
          <h2>Welcome Back</h2>
          <p className="login-portal-card-subtitle">Authenticate to continue to Aura Control Center.</p>

          {error && <div className="login-portal-error">{error}</div>}
          {success && <div className="login-portal-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="settings-form-group" style={{ marginBottom: '20px' }}>
              <label className="settings-form-label">Professional Email</label>
              <div className="form-input-icon-wrapper">
                <Mail size={16} />
                <input 
                  type="email" 
                  className="settings-form-input" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  required
                />
              </div>
            </div>

            <div className="settings-form-group" style={{ marginBottom: '24px' }}>
              <div className="label-row">
                <label className="settings-form-label">Password</label>
                <a href="#forgot" className="forgot-password-link" onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </a>
              </div>
              <div className="form-input-icon-wrapper">
                <Lock size={16} />
                <input 
                  type="password" 
                  className="settings-form-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button type="submit" className="login-portal-btn-submit" disabled={loading}>
              {loading ? 'Verifying...' : 'Sign In'} <ArrowRight size={16} />
            </button>
          </form>

          <div className="divider-container">
            <span className="divider-text">OR CONTINUE WITH</span>
          </div>

          <div className="social-login-grid">
            <button className="social-login-btn" onClick={() => setActivePage('admin-dashboard')}>
              {/* Google G Logo SVG */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="social-login-btn" onClick={() => setActivePage('admin-dashboard')}>
              {/* GitHub Logo SVG */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="create-account-container">
            New to the Agency? <a href="#create" onClick={(e) => e.preventDefault()}>Create an account</a>
          </div>
        </div>

        {/* Mobile-only footer */}
        <div className="mobile-login-footer">
          <p>© 2026 Precision Intelligence Agency.</p>
          <p>
            <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a> | 
            <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a> | 
            <a href="#cookies" onClick={(e) => e.preventDefault()}>Cookie Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}
