// src/components/AuthCard.jsx for user login and sign up authentication
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import '../styles/AuthCard.css';

export default function AuthCard() {
  const navigate = useNavigate();
  const { signup, login } = useAuth();
  const [isSignup, setIsSignup]         = useState(false);
  const [email, setEmail]               = useState('');
  const [password, setPassword]         = useState('');
  const [error, setError]               = useState('');
  const [loading, setLoading]           = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = () => {
    setError('');
    setIsSignup(v => !v);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isSignup) {
        await signup(email, password);
      } else {
        await login(email, password);
      }
      navigate('/');
    } catch (err) {
      setError(
        err.message.includes('weak-password')
          ? 'Password too weak'
          : 'Authentication failed'
      );
    }
    setLoading(false);
  };

  return (
    <div className="wrapper min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/a.jpg')" }}>
      {/* Logo in top left */}
      <img
        src="/coshedule.png"
        alt="Logo"
        style={{ position: 'absolute', top: '135px', left: '150px', width: '100px', height: '100px', zIndex: 10 }}
      />
      <div className="card-switch bg-white/80 dark:bg-gray-900/90 rounded-3xl shadow-2xl p-8 backdrop-blur-md">
        <label className="switch">
          <input
            type="checkbox"
            className="toggle"
            checked={isSignup}
            onChange={handleToggle}
          />
          <span className="slider" />
          <div className="card-side" />

          <div className="flip-card__inner">
            
            {/* LOGIN SIDE */}
            <div className="flip-card__front">
              <div className="title">Welcome Back</div>
              {error && <div className="error">{error}</div>}
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <div className="password-field">
                  <input
                    className="flip-card__input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button
                  className="flip-card__btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Signing in…' : `Let’s go!`}
                </button>
              </form>
            </div>

            {/* SIGN UP SIDE */}
            <div className="flip-card__back">
              <div className="title">Create Account</div>
              {error && <div className="error">{error}</div>}
              <form className="flip-card__form" onSubmit={handleSubmit}>
                <input
                  className="flip-card__input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <div className="password-field">
                  <input
                    className="flip-card__input"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="show-password-btn"
                    onClick={() => setShowPassword(v => !v)}
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
                <button
                  className="flip-card__btn"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Signing up…' : 'Sign Up'}
                </button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
