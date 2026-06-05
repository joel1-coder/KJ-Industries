import React from 'react';
import { ArrowRight, Shield, Zap, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import aboutHero from '../assets/images/about_hero.png';
import teamAlex from '../assets/images/team_alex.png';
import teamSarah from '../assets/images/team_sarah.png';

export default function About({ setActivePage }) {
  return (
    <div className="about-page animate-fade-in">
      {/* 1. Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="badge-version">
              <Sparkles size={12} className="badge-sparkle-icon" /> WHO WE ARE
            </span>
            <h1 className="hero-title">
              The Architects of <span>Digital Excellence</span>
            </h1>
            <p className="hero-subtitle">
              We engineer software that powers the next generation of enterprise scale applications. Performance, security, and precision are at the core of everything we build.
            </p>
            <div className="hero-ctas">
              <button className="glow-btn-primary" onClick={() => setActivePage('products')}>
                Our Marketplace
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => {
                  const cycleEl = document.getElementById('precision-cycle');
                  cycleEl?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Partner with Us
              </button>
            </div>
          </div>
          
          <div className="about-hero-image-container">
            <div className="about-hero-glow"></div>
            <img src={aboutHero} alt="Precision HQ" className="about-hero-img" />
          </div>
        </div>
      </section>

      {/* 2. Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-text">
              <span className="story-sub">OUR ORIGINS</span>
              <h2 className="story-title">From Boutique Roots to Global Marketplace</h2>
              <p className="story-desc">
                Founded with a vision to eliminate the friction between complex design and rapid deployment, Precision began as an elite software consulting agency. We observed a persistent gap: enterprises needed bleeding-edge performance, yet standard off-the-shelf templates fell short in security, test coverage, and clean architecture.
              </p>
              <p className="story-desc">
                Today, we have evolved into a curated marketplace. We build, audit, and distribute pre-engineered software components designed for developers and corporations who demand nothing less than perfection.
              </p>
              
              <div className="story-stats">
                <div className="story-stat-item">
                  <span className="story-stat-number">900+</span>
                  <span className="story-stat-label">Enterprise Deployments</span>
                </div>
                <div className="story-stat-divider"></div>
                <div className="story-stat-item">
                  <span className="story-stat-number">99.9%</span>
                  <span className="story-stat-label">Service Uptime Guaranteed</span>
                </div>
              </div>
            </div>
            
            <div className="story-image-card">
              <div className="story-glass-card">
                <div className="card-header-dot"></div>
                <h3>Engineered for Precision</h3>
                <p>Every line of code undergoes rigorous automated testing, security scanning, and peer review before entering our active marketplace.</p>
                <div className="spec-lines">
                  <div className="spec-line"><span>Performance Index</span><span className="spec-value">100/100</span></div>
                  <div className="spec-line"><span>Security Level</span><span className="spec-value">Military-Grade</span></div>
                  <div className="spec-line"><span>Frameworks Supported</span><span className="spec-value">React, Next, Go, Python</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core DNA Section */}
      <section className="about-dna">
        <div className="container">
          <div className="dna-header">
            <h2 className="section-title">Our Core DNA</h2>
            <p className="section-subtitle">The bedrock values that drive our engineering team forward.</p>
          </div>
          
          <div className="dna-grid">
            <div className="dna-card">
              <div className="dna-icon-wrapper cyan">
                <Cpu size={22} />
              </div>
              <h3>Innovation</h3>
              <p>We actively push the envelope of software engineering, utilizing cutting-edge paradigms and technologies.</p>
            </div>
            
            <div className="dna-card">
              <div className="dna-icon-wrapper purple">
                <CheckCircle2 size={22} />
              </div>
              <h3>Quality</h3>
              <p>We write dry, clean, thoroughly commented code with comprehensive unit testing coverage to ensure lasting stability.</p>
            </div>
            
            <div className="dna-card">
              <div className="dna-icon-wrapper orange">
                <Zap size={22} />
              </div>
              <h3>Performance</h3>
              <p>Speed is a feature. We optimize rendering cycles, bundle sizes, and database queries for absolute minimum latency.</p>
            </div>
            
            <div className="dna-card">
              <div className="dna-icon-wrapper green">
                <Shield size={22} />
              </div>
              <h3>Security</h3>
              <p>Built with security at the foundation. Regular vulnerability audits protect your users and enterprise infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Team Section */}
      <section className="about-team">
        <div className="container">
          <div className="team-header">
            <h2 className="section-title">The Minds Behind Precision</h2>
            <p className="section-subtitle">Meet the visionary leaders driving our technical roadmap and corporate strategy.</p>
          </div>
          
          <div className="team-grid">
            <div className="team-card">
              <div className="team-img-wrapper">
                <img src={teamAlex} alt="Alex Rivera" className="team-img" />
              </div>
              <div className="team-info">
                <h3>Alex Rivera</h3>
                <span className="team-role">Chief Executive Officer</span>
                <p className="team-bio">Former Tech Lead at Netflix and Google. Alex sets the product vision and ensures Precision remains the premier platform for enterprise software deployment.</p>
              </div>
            </div>
            
            <div className="team-card">
              <div className="team-img-wrapper">
                <img src={teamSarah} alt="Sarah Chen" className="team-img" />
              </div>
              <div className="team-info">
                <h3>Sarah Chen</h3>
                <span className="team-role">Chief Technology Officer</span>
                <p className="team-bio">Open-source contributor and systems architect. Sarah leads our engineering team, overseeing research into Web3, decentralized systems, and AI models.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Process Section */}
      <section id="precision-cycle" className="about-process">
        <div className="container">
          <div className="process-header">
            <h2 className="section-title">The Precision Cycle</h2>
            <p className="section-subtitle">How we construct, evaluate, and deliver high-performance software.</p>
          </div>
          
          <div className="process-timeline">
            <div className="process-step">
              <div className="process-number">01</div>
              <div className="process-content">
                <h3>Consultation</h3>
                <p>We work close-hand to understand your legacy constraints, infrastructure stack, and ultimate performance objectives.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="process-number">02</div>
              <div className="process-content">
                <h3>Architecture</h3>
                <p>We draft a complete, production-ready system blueprint that solves bottlenecks and builds a secure layout foundation.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="process-number">03</div>
              <div className="process-content">
                <h3>Sprint</h3>
                <p>Rapid execution using modular design principles, continuous integration, and comprehensive automated testing schedules.</p>
              </div>
            </div>
            
            <div className="process-step">
              <div className="process-number">04</div>
              <div className="process-content">
                <h3>Deployment</h3>
                <p>Seamless execution into production environment with complete observability, monitoring tools, and zero-downtime guarantees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Tech Stack */}
      <section className="about-tech-stack">
        <div className="container">
          <h3 className="tech-title">Ecosystem Compatibility</h3>
          <div className="tech-badges">
            <div className="tech-badge">React & Next.js</div>
            <div className="tech-badge">Node.js & Express</div>
            <div className="tech-badge">Python & FastAPI</div>
            <div className="tech-badge">Amazon Web Services</div>
            <div className="tech-badge">PostgreSQL & Redis</div>
            <div className="tech-badge">Docker & Kubernetes</div>
          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="about-cta-banner">
        <div className="container">
          <div className="cta-banner-card">
            <h2>Ready to Elevate Your Infrastructure?</h2>
            <p>Deploy our pre-packaged solutions or contact our team for custom, dedicated system design.</p>
            <div className="cta-actions">
              <button className="glow-btn-primary" onClick={() => setActivePage('products')}>
                Get Started
              </button>
              <button 
                className="btn-secondary" 
                onClick={() => {
                  setActivePage('home');
                  setTimeout(() => {
                    const contactEl = document.getElementById('contact-me');
                    contactEl?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
              >
                Get In Touch <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
