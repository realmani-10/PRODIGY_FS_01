import Link from 'next/link';
import { auth } from '@/auth';
import { LockKeyhole, ShieldCheck, Zap } from 'lucide-react';

export default async function Home() {
  const session = await auth();

  return (
    <main className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-glow" />
        <div className="hero-content">
          <span className="hero-badge">Security by Design</span>
          <h1 className="hero-title">
            Secure Authentication,{' '}
            <span className="hero-title-gradient">Built Right</span>
          </h1>
          <p className="hero-subtitle">
            A secure authentication system with protected sessions, role-based access and reliable user management.
          </p>
          <div className="hero-actions">
            {session ? (
              <Link href="/dashboard" className="btn btn-primary btn-large">
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link href="/register" className="btn btn-primary btn-large">
                  Create Account
                </Link>
                <Link href="/login" className="btn btn-ghost btn-large">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" style={{ paddingBottom: '2rem' }}>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <LockKeyhole size={24} strokeWidth={1.75} color="var(--accent-cyan)" />
            </div>
            <h3 className="feature-title">Secure Auth</h3>
            <p className="feature-desc">
              Industry-standard bcrypt password hashing with secure JWT session
              management to keep your users safe.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <ShieldCheck size={24} strokeWidth={1.75} color="var(--accent-cyan)" />
            </div>
            <h3 className="feature-title">Role-Based Access</h3>
            <p className="feature-desc">
              Built-in USER and ADMIN roles with granular access control to
              protect your routes and resources.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <Zap size={24} strokeWidth={1.75} color="var(--accent-cyan)" />
            </div>
            <h3 className="feature-title">Modern Stack</h3>
            <p className="feature-desc">
              Built with Next.js 16, PostgreSQL, and Prisma ORM for a
              type-safe, performant, and scalable foundation.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
