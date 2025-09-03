import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// PUBLIC_INTERFACE
export default function SignIn() {
  /** Sign In page using Figma-inspired styling and tokens. */
  const { actions, loading } = useApp();
  const [email, setEmail] = useState('demo@recipes.app');
  const [password, setPassword] = useState('demo123');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await actions.signIn(email, password);
      nav('/');
    } catch (err) {
      setError(err.message || 'Failed to sign in');
    }
  };

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <div className="signin-panel">
        <div style={{ marginBottom: 18 }}>
          <h1 className="signin-title">Hello,</h1>
          <div className="signin-subtitle">Welcome Back!</div>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: 14 }}>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" className="input" type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label className="label" htmlFor="password">Enter Password</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
              <input id="password" className="input" type={showPw ? 'text' : 'password'} placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="btn btn-ghost" onClick={() => setShowPw(s => !s)}>{showPw ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <a href="#forgot" className="subtitle" style={{ color: '#ff9c00' }}>Forgot Password?</a>
          </div>

          {error && <div className="card" style={{ padding: 12, borderColor: '#ffd1d6', background: '#ffe1e7', color: '#7a1021', marginBottom: 12 }}>{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <button className="btn btn-primary" style={{ width: 315, height: 60, borderRadius: 10 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="divider">
          <div className="line" />
          <div style={{ textAlign: 'center', fontSize: 11, color: '#a9a9a9' }}>Or Sign in With</div>
          <div className="line" />
        </div>

        <div className="social-row">
          <button className="social-btn" aria-label="Sign in with Google" title="Google">
            <div style={{ position: 'relative', width: 24, height: 24 }}>
              <span style={{ position: 'absolute', width: 10, height: 10, background: 'var(--color-secondary)', borderRadius: '50%', left: 0, top: 0 }} />
              <span style={{ position: 'absolute', width: 10, height: 10, background: '#ff3d00', borderRadius: '50%', right: 0, top: 0 }} />
              <span style={{ position: 'absolute', width: 10, height: 10, background: 'var(--color-primary)', borderRadius: '50%', left: 0, bottom: 0 }} />
              <span style={{ position: 'absolute', width: 10, height: 10, background: '#1976d2', borderRadius: '50%', right: 0, bottom: 0 }} />
            </div>
          </button>

          <button className="social-btn" aria-label="Sign in with Facebook" title="Facebook">
            <div style={{ position: 'relative', width: 24, height: 24 }}>
              <span style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.58)', borderRadius: 6 }} />
              <span style={{ position: 'absolute', left: 7, top: 4, width: 10, height: 16, background: '#035b81', borderRadius: 2 }} />
            </div>
          </button>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <span style={{ fontSize: 11 }}>Don’t have an account? </span>
          <Link to="/signup" style={{ fontSize: 11, fontWeight: 600 }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
}
