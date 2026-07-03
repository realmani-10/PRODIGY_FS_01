import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const user = session.user as {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };

  const memberSince = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Header */}
        <header className="dashboard-header">
          <div>
            <h1 className="dashboard-title">
              Welcome back, {user.name || 'User'}
            </h1>
            <p className="dashboard-subtitle">
              Here&apos;s an overview of your account
            </p>
          </div>
          <span className={`role-badge role-${user.role?.toLowerCase()}`}>
            {user.role}
          </span>
        </header>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3 className="stat-label">Account Status</h3>
              <p className="stat-value">Active</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-content">
              <h3 className="stat-label">Role</h3>
              <p className="stat-value">{user.role}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">🔒</div>
            <div className="stat-content">
              <h3 className="stat-label">Security</h3>
              <p className="stat-value">Protected</p>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="info-card">
          <h2 className="info-card-title">Account Details</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name : </span>
              <span className="info-value">{user.name || '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email : </span>
              <span className="info-value">{user.email || '—'}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Role : </span>
              <span className="info-value">{user.role}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since : </span>
              <span className="info-value">{memberSince}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
