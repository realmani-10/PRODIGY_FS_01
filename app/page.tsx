import Link from 'next/link';

export default function Home() {
  return (
    <main className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-content">
          <span className="badge">Security by Design</span>
          <h1 className="hero-title">
            Authentication{' '}
            <span className="gradient-text">Made Simple</span>
          </h1>
          <p className="hero-subtitle">
            A premium, production-ready authentication system with secure
            sessions, role-based access control, and a modern developer
            experience.
          </p>
          <div className="hero-actions">
            <Link href="/register" className="btn btn-primary btn-large">
              Get Started
            </Link>
            <Link href="/login" className="btn btn-ghost btn-large">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3 className="feature-title">Secure Auth</h3>
            <p className="feature-description">
              Industry-standard bcrypt password hashing with secure JWT session
              management to keep your users safe.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3 className="feature-title">Role-Based Access</h3>
            <p className="feature-description">
              Built-in USER and ADMIN roles with granular access control to
              protect your routes and resources.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3 className="feature-title">Modern Stack</h3>
            <p className="feature-description">
              Built with Next.js 16, PostgreSQL, and Prisma ORM for a
              type-safe, performant, and scalable foundation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
