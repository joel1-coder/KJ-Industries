import React, { useState } from 'react';
import { ArrowRight, Mail, Cpu, Terminal, Shield, Zap, RefreshCw, HardDrive, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { API_BASE } from '../config';

// Initialize EmailJS with public key
emailjs.init('wwxIlB4EbuEd8woEd');
import omnicoreAdmin from '../assets/images/omnicore_admin.png';
import fluxstoreEcom from '../assets/images/fluxstore_ecom.png';
import atlasProject from '../assets/images/atlas_project.png';

export default function Home({ setActivePage }) {
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setFeedbackMsg('');
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const mobile = formData.get('mobile');
    const subject = formData.get('subject') || 'Project Inquiry';
    const message = formData.get('message');

    try {
      await emailjs.send(
        'service_b77noeo',
        'template_6ukv74r',
        {
          name: name,
          email: email,
          title: subject,
          message: message,
          mobile: mobile,
        }
      );
      
      setFormStatus('success');
      setFeedbackMsg('Thank you! Your message has been sent successfully.');
      e.target.reset();
    } catch (err) {
      console.error('EmailJS Error:', err);
      setFormStatus('error');
      setFeedbackMsg('Failed to send message. Please try again later.');
    }

    setTimeout(() => {
      setFormStatus('idle');
      setFeedbackMsg('');
    }, 6000);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="badge-version">
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--color-primary)' }}></span>
            Precision Intelligence 2.0
          </div>
          <h1 className="hero-title">
            Professional Software<br />
            <span>Solutions Ready</span><br />
            for Deployment
          </h1>
          <p className="hero-subtitle">
            Accelerate your enterprise digital transformation with cloud-native architectures and rigorous engineering. We bridge the gap between design and operational excellence.
          </p>
          <div className="hero-ctas">
            <button className="glow-btn-primary" onClick={() => setActivePage('products')}>
              Browse Projects
            </button>
            <button className="btn-secondary" onClick={() => {
              const contactEl = document.getElementById('contact-me');
              contactEl?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Request Custom Development
            </button>
          </div>

          {/* Stats Grid */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number cyan">99.9%</div>
              <div className="stat-label">Uptime Reliability</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Deployments</div>
            </div>
            <div className="stat-card">
              <div className="stat-number purple">15ms</div>
              <div className="stat-label">Average Latency</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Expert Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Ecosystems Section */}
      <section className="container" style={{ padding: '80px 0' }}>
        <div className="section-header">
          <div>
            <h2 className="section-title">Featured Ecosystems</h2>
            <p className="section-subtitle">Production-ready modules for immediate integration</p>
          </div>
          <a href="#products" onClick={() => setActivePage('products')} className="view-all-link">
            View Portfolio <ArrowRight size={16} />
          </a>
        </div>

        <div className="ecosystem-grid">
          {/* Card 1 */}
          <div className="ecosystem-card">
            <div className="eco-img-container">
              <img src={omnicoreAdmin} alt="Enterprise Portfolios" className="eco-img" />
            </div>
            <div className="eco-content">
              <span className="eco-category marketplace">Marketplace</span>
              <h3 className="eco-title">Enterprise Portfolios</h3>
              <p className="eco-desc">High-performance custom portfolios for global agencies. Scalable and secure layout.</p>
              <div className="eco-tags">
                <span className="eco-tag">NEXT.JS</span>
                <span className="eco-tag">PRISMA</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="ecosystem-card">
            <div className="eco-img-container">
              <img src={fluxstoreEcom} alt="Precision HRM" className="eco-img" />
            </div>
            <div className="eco-content">
              <span className="eco-category saas">SaaS</span>
              <h3 className="eco-title">Precision HRM</h3>
              <p className="eco-desc">Intelligent vacancy planning and talent management platform. Full candidate dashboard.</p>
              <div className="eco-tags">
                <span className="eco-tag">TYPESCRIPT</span>
                <span className="eco-tag">POSTGRES</span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="ecosystem-card">
            <div className="eco-img-container">
              <img src={atlasProject} alt="Real-time Analytics" className="eco-img" />
            </div>
            <div className="eco-content">
              <span className="eco-category enterprise">Enterprise</span>
              <h3 className="eco-title">Real-time Analytics</h3>
              <p className="eco-desc">Deep intelligence flow for complex data orchestration. Customizable charts and tables.</p>
              <div className="eco-tags">
                <span className="eco-tag">RUST</span>
                <span className="eco-tag">KAFKA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Precision Section */}
      <section className="why-section">
        <div className="container why-container">
          <div className="why-left">
            <h2>Why Precision Intelligence?</h2>
            <div className="why-list">
              <div className="why-item">
                <div className="why-icon">
                  <Terminal size={20} />
                </div>
                <div>
                  <h4 className="why-item-title">Clean Code Assurance</h4>
                  <p className="why-item-desc">Every line of code is peer-reviewed and optimized for long-term maintainability.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <Shield size={20} />
                </div>
                <div>
                  <h4 className="why-item-title">Security-First Culture</h4>
                  <p className="why-item-desc">Enterprise-grade security protocols baked into the foundation of every product.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon">
                  <HardDrive size={20} />
                </div>
                <div>
                  <h4 className="why-item-title">Scalable Infrastructure</h4>
                  <p className="why-item-desc">Architectures built to handle millions of requests without breaking a sweat.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="why-right">
            <div className="tech-grid-visualization">
              <div className="tech-node">
                <div className="node-circle"><Cpu size={24} /></div>
                <div className="node-label">AWS</div>
              </div>
              <div className="tech-node">
                <div className="node-circle"><Shield size={24} /></div>
                <div className="node-label">Security</div>
              </div>
              <div className="tech-node">
                <div className="node-circle"><Terminal size={24} /></div>
                <div className="node-label">React</div>
              </div>
              <div className="tech-node">
                <div className="node-circle"><Zap size={24} /></div>
                <div className="node-label">Vitesse</div>
              </div>
              <div className="tech-node">
                <div className="node-circle"><RefreshCw size={24} /></div>
                <div className="node-label">CI/CD</div>
              </div>
              <div className="tech-node">
                <div className="node-circle"><HardDrive size={24} /></div>
                <div className="node-label">NodeJS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header" style={{ justifyContent: 'center', textAlign: 'center', marginBottom: '60px' }}>
            <div>
              <h2 className="section-title">Client Success Stories</h2>
              <p className="section-subtitle">What partners say about working with Precision</p>
            </div>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-quote">
                "Precision transformed our legacy HRM system into a modern, lightning-fast platform. Their attention to detail is unmatched in the enterprise space."
              </p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                  alt="Marcus Thorne"
                  className="author-avatar"
                />
                <div>
                  <div className="author-name">Marcus Thorne</div>
                  <div className="author-role">CTO, NexaCorp</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <p className="testimonial-quote">
                "Working with them felt like having an elite SWAT team for our software. They delivered a complex marketplace 3 weeks ahead of schedule."
              </p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100"
                  alt="Sarah Chen"
                  className="author-avatar"
                />
                <div>
                  <div className="author-name">Sarah Chen</div>
                  <div className="author-role">Product Lead, Web3 Startups</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="contact-section">
        <div className="container contact-grid">
          <div className="contact-left">
            <span className="contact-sub">Get in touch</span>
            <h2 className="contact-title">Contact <span>Us</span></h2>
            <p className="contact-desc">
              Whether you have a project in mind, want to collaborate, or just want to say hello — our inbox is always open.
            </p>

            <div className="contact-links-list">
              <a href="mailto:kjindus70@gmail.com" className="contact-link-card">
                <div className="contact-link-card-left">
                  <div className="contact-link-icon-wrapper">
                    <Mail size={18} />
                  </div>
                  <div className="contact-link-info">
                    <span className="contact-link-label">Email me</span>
                    <span className="contact-link-value">kjindus70@gmail.com</span>
                  </div>
                </div>
                <ArrowRight size={16} className="contact-link-arrow" />
              </a>

              <a href="https://github.com/kjindus" target="_blank" rel="noopener noreferrer" className="contact-link-card">
                <div className="contact-link-card-left">
                  <div className="contact-link-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg>
                  </div>
                  <div className="contact-link-info">
                    <span className="contact-link-label">GitHub</span>
                    <span className="contact-link-value">github.com/kjindus</span>
                  </div>
                </div>
                <ArrowRight size={16} className="contact-link-arrow" />
              </a>

              <a href="https://linkedin.com/in/kjindus" target="_blank" rel="noopener noreferrer" className="contact-link-card">
                <div className="contact-link-card-left">
                  <div className="contact-link-icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
                  </div>
                  <div className="contact-link-info">
                    <span className="contact-link-label">LinkedIn</span>
                    <span className="contact-link-value">linkedin.com/in/kjindus</span>
                  </div>
                </div>
                <ArrowRight size={16} className="contact-link-arrow" />
              </a>
            </div>
          </div>

          <div className="contact-right">
            <form onSubmit={handleContactSubmit}>
              <div className="contact-form-grid">
                <div className="contact-form-group">
                  <label className="contact-label">Full Name</label>
                  <input type="text" name="name" className="contact-input" placeholder="Your Name" required />
                </div>
                <div className="contact-form-group">
                  <label className="contact-label">Email</label>
                  <input type="email" name="email" className="contact-input" placeholder="your@email.com" required />
                </div>
                <div className="contact-form-group">
                  <label className="contact-label">Mobile</label>
                  <input type="text" name="mobile" className="contact-input" placeholder="+91 XXXXXXXXXX" required />
                </div>
                <div className="contact-form-group">
                  <label className="contact-label">Subject</label>
                  <input type="text" name="subject" className="contact-input" placeholder="Project Inquiry" required />
                </div>
                <div className="contact-form-group full-width">
                  <label className="contact-label">Message</label>
                  <textarea name="message" className="contact-textarea" placeholder="Tell me about your project..." required></textarea>
                </div>
              </div>
              <div className="contact-submit-btn-wrapper">
                {formStatus === 'success' && (
                  <div style={{
                    background: 'rgba(48, 209, 88, 0.12)',
                    border: '1px solid rgba(48, 209, 88, 0.3)',
                    color: '#30d158',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    ✓ {feedbackMsg}
                  </div>
                )}
                {formStatus === 'error' && (
                  <div style={{
                    background: 'rgba(255, 69, 58, 0.12)',
                    border: '1px solid rgba(255, 69, 58, 0.3)',
                    color: '#ff453a',
                    padding: '12px 20px',
                    borderRadius: '10px',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    ⚠️ {feedbackMsg}
                  </div>
                )}
                <button
                  type="submit"
                  className="contact-submit-btn"
                  disabled={formStatus === 'sending'}
                  style={{ opacity: formStatus === 'sending' ? 0.7 : 1 }}
                >
                  {formStatus === 'sending' ? 'Sending message…' : 'Send Message'} <Send size={14} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Ready to Build Section */}
      <section className="container">
        <div className="cta-banner">
          <h2 className="cta-title">Ready to Build the Future?</h2>
          <p className="cta-desc">Join the hundreds of enterprises who trust Precision Intelligence for their critical software infrastructure.</p>
          <button className="glow-btn-primary" onClick={() => setActivePage('products')}>
            Get Started Today
          </button>
        </div>
      </section>
    </div>
  );
}
