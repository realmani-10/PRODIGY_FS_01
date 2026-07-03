'use client';

import { useActionState } from 'react';
import { loginAction, AuthState } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    {} as AuthState
  );

  return (
    <div className="auth-page">
      <div className="form-container">
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Welcome Back</h1>
            <p className="form-subtitle">
              Sign in to your account to continue
            </p>
          </div>

          <form action={formAction} className="form">
            {state.message && (
              <div className="alert alert-error">{state.message}</div>
            )}

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
              />
              {state.errors?.password && (
                <p className="field-error">{state.errors.password[0]}</p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-large btn-full"
              disabled={isPending}
            >
              {isPending ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don&apos;t have an account?{' '}
              <Link href="/register" className="form-link">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
