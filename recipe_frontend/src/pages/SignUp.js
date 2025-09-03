import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

// PUBLIC_INTERFACE
export default function SignUp() {
  /** Sign Up page consistent with Sign In style. */
  const { actions, loading } = useApp();
  const [name, setName] = useState('New User');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await actions.signUp(name, email, password);
      nav('/');
    } catch (err) {
      setError(err.message || 'Failed to sign up');
    }
  };

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <div className="signin-panel">
        <div style={{ marginBottom: 18 }}>
          <h1 className="signin-title">Create account</h1>
          <div className="signin-subtitle">Start your recipe journey</div>
        </div>

        <form onSubmit={submit}>
          <div style={{ marginBottom: 14 }}>
            <label className="label" htmlFor="name">Name</label>
            <input id="name" className="input" type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" className="input" type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
          </div>

          <div style={{ marginBottom: 8 }}>
            <label className="label" htmlFor="password">Create Password</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8 }}>
              <input id="password" className="input" type={showPw ? 'text' : 'password'} placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
              <button type="button" className="btn btn-ghost" onClick={() => setShowPw(s => !s)}>{showPw ? 'Hide' : 'Show'}</button>
            </div>
          </div>

          {error && <div className="card" style={{ padding: 12, borderColor: '#ffd1d6', background: '#ffe1e7', color: '#7a1021', marginBottom: 12 }}>{error}</div>}

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <button className="btn btn-primary" style={{ width: 315, height: 60, borderRadius: 10 }}>
              {loading ? 'Creating...' : 'Create Account'}
            </button>
          </div>
        </form>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <span style={{ fontSize: 11 }}>Already have an account? </span>
          <Link to="/signin" style={{ fontSize: 11, fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}
