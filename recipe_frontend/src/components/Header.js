import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './header.css';

// PUBLIC_INTERFACE
export default function Header() {
  /** App header with navigation and user actions. */
  const { user, actions } = useApp();

  return (
    <header className="header">
      <div className="container header-row">
        <Link to="/" className="brand">
          <span className="brand-mark" />
          <span className="brand-text">Recipe Explorer</span>
        </Link>

        <nav className="nav">
          <Link to="/" className="nav-link">Browse</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/collection" className="nav-link">My Collection</Link>
        </nav>

        <div className="header-actions">
          {user ? (
            <>
              <div className="user-chip">
                <span className="avatar">{user.name?.[0]?.toUpperCase() || 'U'}</span>
                <span className="name">{user.name || user.email}</span>
              </div>
              <button className="btn btn-ghost" onClick={actions.signOut}>Sign out</button>
            </>
          ) : (
            <>
              <Link to="/signin" className="btn btn-ghost">Sign in</Link>
              <Link to="/signup" className="btn btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
