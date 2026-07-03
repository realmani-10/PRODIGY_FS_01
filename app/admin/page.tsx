import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { getAllUsers } from '@/lib/db/users';

export default async function AdminPage() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  if ((session as any)?.user?.role !== 'ADMIN') {
    redirect('/dashboard');
  }

  const users = await getAllUsers();

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <header className="admin-header">
          <div>
            <h1 className="admin-title">Admin Dashboard</h1>
            <p className="admin-subtitle">
              Manage users and oversee platform activity
            </p>
          </div>
          <span className="role-badge role-admin">ADMIN</span>
        </header>

        {/* Users Table */}
        <div className="glass-card">
          <div className="table-header">
            <h2 className="table-title">All Users</h2>
            <span className="table-count">{users.length} users</span>
          </div>

          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any) => (
                  <tr key={user.id}>
                    <td className="cell-name">{user.name || '—'}</td>
                    <td className="cell-email">{user.email}</td>
                    <td>
                      <span
                        className={`role-badge role-${user.role?.toLowerCase()}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="cell-date">
                      {new Date(user.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
