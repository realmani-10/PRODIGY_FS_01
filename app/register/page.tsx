'use client';

import { useActionState, useState } from 'react';
import { registerAction, AuthState } from '@/app/actions/auth';
import Link from 'next/link';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    {} as AuthState
  );

  const [password, setPassword] = useState('');

  const requirements = [
    { label: '8+ characters', met: password.length >= 8 },
    { label: 'Uppercase letter', met: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', met: /[a-z]/.test(password) },
    { label: 'Number', met: /[0-9]/.test(password) },
  ];

  return (
    <div className="auth-page">
      <div className="form-container">
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Create Account</h1>
            <p className="form-subtitle">
              Join AuthGuard and secure your application
            </p>
          </div>

          <form action={formAction} className="form">
            {state.message && (
              <div className="alert alert-error">{state.message}</div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                className="form-input"
                placeholder="John Doe"
              />
              {state.errors?.name && (
                <p className="field-error">{state.errors.name[0]}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                className="form-input"
                placeholder="you@example.com"
              />
              {state.errors?.email && (
                <p className="field-error">{state.errors.email[0]}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                required
                className="form-input"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
              />
              {state.errors?.password && (
                <p className="field-error">{state.errors.password[0]}</p>
              )}

              <ul className="password-requirements">
                {requirements.map((req) => (
                  <li
                    key={req.label}
                    className={`requirement ${req.met ? 'met' : ''}`}
                  >
                    <span className="requirement-icon">
                      {req.met ? '✓' : '○'}
                    </span>
                    {req.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                required
                className="form-input"
                placeholder="••••••••"
              />
              {state.errors?.confirmPassword && (
                <p className="field-error">
                  {state.errors.confirmPassword[0]}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large btn-full"
              disabled={isPending}
            >
              {isPending ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account?{' '}
              <Link href="/login" className="form-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
