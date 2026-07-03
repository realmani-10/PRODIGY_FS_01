"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { logoutAction } from "@/app/actions/auth";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <span className="logo-icon">🛡️</span>
          <span className="logo-text">AuthGuard</span>
        </Link>

        <div className="navbar-links">
          {status === "loading" ? (
            <div className="nav-skeleton" />
          ) : session?.user ? (
            <>
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              {session.user.role === "ADMIN" && (
                <Link href="/admin" className="nav-link nav-link-admin">
                  Admin
                </Link>
              )}
              <div className="nav-user-info">
                <span className="nav-user-name">{session.user.name}</span>
                <span
                  className={`nav-role-badge ${
                    session.user.role === "ADMIN" ? "badge-admin" : "badge-user"
                  }`}
                >
                  {session.user.role}
                </span>
              </div>
              <form action={logoutAction}>
                <button type="submit" className="btn btn-ghost">
                  Sign Out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost">
                Sign In
              </Link>
              <Link href="/register" className="btn btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
