import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Eye, EyeOff, CheckCircle, AlertCircle,
  User, Mail, Phone, Lock, ArrowLeft, Sparkles,
} from 'lucide-react';
import useAuth from '../hooks/useAuth';

/* ─────────────────────────────────────────────────────────────
   SHARED INPUT FIELD — flex siblings, zero absolute positioning
   Icon | Input | RightEl — no overlap possible
───────────────────────────────────────────────────────────── */
function InputField({ id, label, type = 'text', placeholder, value, onChange, error, icon: Icon, rightEl }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      {/* Label */}
      <label htmlFor={id} style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: 500,
        color: '#8A8A8A',
        marginBottom: '8px',
        letterSpacing: '0.01em',
      }}>
        {label}
      </label>

      {/* Input row — pure flex, no absolute positioning */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        height: '52px',
        padding: '0 16px',
        borderRadius: '12px',
        border: error
          ? '1.5px solid rgba(220,38,38,0.6)'
          : focused
            ? '1.5px solid rgba(201,163,74,0.65)'
            : '1.5px solid rgba(255,255,255,0.08)',
        backgroundColor: 'rgba(255,255,255,0.03)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: focused
          ? '0 0 0 3px rgba(201,163,74,0.10)'
          : error
            ? '0 0 0 3px rgba(220,38,38,0.08)'
            : 'none',
      }}>
        {/* Left icon — fixed width, never overlaps text */}
        {Icon && (
          <div style={{
            flexShrink: 0,
            width: '18px', height: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: focused ? '#C9A34A' : '#5A5A5A',
            transition: 'color 0.2s ease',
          }}>
            <Icon size={17} strokeWidth={1.75} />
          </div>
        )}

        {/* Input takes remaining space */}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            flex: 1,
            minWidth: 0,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: '14px',
            fontWeight: 400,
            color: '#F0F0F0',
            fontFamily: 'inherit',
            caretColor: '#C9A34A',
          }}
          autoComplete={type === 'password' ? 'current-password' : 'on'}
        />

        {/* Right element (e.g. eye toggle) */}
        {rightEl && (
          <div style={{ flexShrink: 0 }}>
            {rightEl}
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          fontSize: '12px', color: '#f87171', marginTop: '6px',
        }}>
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EYE TOGGLE BUTTON
───────────────────────────────────────────────────────────── */
function EyeButton({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={show ? 'Hide password' : 'Show password'}
      style={{
        background: 'none', border: 'none', cursor: 'pointer',
        padding: '2px',
        color: '#5A5A5A',
        display: 'flex', alignItems: 'center',
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A34A'; }}
      onMouseLeave={(e) => { e.currentTarget.style.color = '#5A5A5A'; }}
    >
      {show ? <EyeOff size={16} strokeWidth={1.75} /> : <Eye size={16} strokeWidth={1.75} />}
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   SIGN IN FORM
───────────────────────────────────────────────────────────── */
function LoginForm({ onSwitch }) {
  const [form, setForm]     = useState({ email: '', password: '', remember: false });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email address';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ name: form.email.split('@')[0], email: form.email });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <InputField
          id="login-email" label="Email Address" type="email"
          placeholder="you@example.com" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email} icon={Mail}
        />

        <InputField
          id="login-password" label="Password"
          type={showPw ? 'text' : 'password'}
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password} icon={Lock}
          rightEl={<EyeButton show={showPw} onToggle={() => setShowPw(!showPw)} />}
        />

        {/* Remember me + Forgot password */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
            <div
              onClick={() => setForm({ ...form, remember: !form.remember })}
              style={{
                width: '18px', height: '18px', borderRadius: '5px', flexShrink: 0,
                border: form.remember ? '2px solid #C9A34A' : '2px solid rgba(255,255,255,0.15)',
                backgroundColor: form.remember ? 'rgba(201,163,74,0.15)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s ease',
              }}
            >
              {form.remember && <CheckCircle size={10} color="#C9A34A" strokeWidth={3} />}
            </div>
            <span style={{ fontSize: '13px', color: '#8A8A8A' }}>Remember Me</span>
          </label>
          <button
            type="button"
            style={{ fontSize: '13px', color: '#C9A34A', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E3C269'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#C9A34A'; }}
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign In button */}
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', height: '52px',
            background: loading ? 'rgba(201,163,74,0.4)' : 'linear-gradient(135deg, #C9A34A, #E3C269 50%, #C9A34A)',
            border: '1px solid rgba(245,215,142,0.3)',
            borderRadius: '12px',
            color: '#080808',
            fontSize: '13px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
            boxShadow: '0 6px 20px rgba(201,163,74,0.25)',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(201,163,74,0.4)'; } }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,163,74,0.25)'; }}
        >
          {loading ? 'Signing In…' : 'Sign In'}
        </button>

        {/* Switch to register */}
        <p style={{ textAlign: 'center', fontSize: '13px', color: '#737373', margin: 0 }}>
          Don't have an account?{' '}
          <button
            type="button" onClick={onSwitch}
            style={{ color: '#C9A34A', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', padding: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E3C269'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#C9A34A'; }}
          >
            Create Account
          </button>
        </p>
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   CREATE ACCOUNT FORM
───────────────────────────────────────────────────────────── */
function RegisterForm({ onSwitch }) {
  const [form, setForm]         = useState({ name: '', email: '', phone: '', password: '', confirmPw: '', accountType: '' });
  const [showPw, setShowPw]     = useState(false);
  const [showCPw, setShowCPw]   = useState(false);
  const [errors, setErrors]     = useState({});
  const [loading, setLoading]   = useState(false);
  const { login }  = useAuth();
  const navigate   = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter a valid 10-digit mobile number';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPw) e.confirmPw = 'Passwords do not match';
    if (!form.accountType) e.accountType = 'Please select an account type';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      login({ name: form.name, email: form.email });
      navigate('/dashboard');
    }, 1800);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <InputField
          id="reg-name" label="Full Name" placeholder="Your full name"
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
          error={errors.name} icon={User}
        />
        <InputField
          id="reg-email" label="Email Address" type="email" placeholder="you@example.com"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
          error={errors.email} icon={Mail}
        />
        <InputField
          id="reg-phone" label="Mobile Number" type="tel" placeholder="10-digit mobile number"
          value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
          error={errors.phone} icon={Phone}
        />
        <InputField
          id="reg-password" label="Password" type={showPw ? 'text' : 'password'}
          placeholder="Minimum 8 characters" value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          error={errors.password} icon={Lock}
          rightEl={<EyeButton show={showPw} onToggle={() => setShowPw(!showPw)} />}
        />
        <InputField
          id="reg-confirm" label="Confirm Password" type={showCPw ? 'text' : 'password'}
          placeholder="Re-enter password" value={form.confirmPw}
          onChange={(e) => setForm({ ...form, confirmPw: e.target.value })}
          error={errors.confirmPw} icon={Lock}
          rightEl={<EyeButton show={showCPw} onToggle={() => setShowCPw(!showCPw)} />}
        />

        {/* Account Type */}
        <div>
          <p style={{ fontSize: '12px', fontWeight: 500, color: '#8A8A8A', marginBottom: '10px' }}>Account Type</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            {['Buyer / Investor', 'Property Owner', 'Agent'].map((t) => (
              <button
                key={t} type="button"
                onClick={() => setForm({ ...form, accountType: t })}
                style={{
                  padding: '10px 6px',
                  fontSize: '11px', fontWeight: form.accountType === t ? 700 : 500,
                  borderRadius: '10px',
                  border: form.accountType === t
                    ? '1.5px solid rgba(201,163,74,0.55)'
                    : '1.5px solid rgba(255,255,255,0.07)',
                  background: form.accountType === t ? 'rgba(201,163,74,0.12)' : 'rgba(255,255,255,0.02)',
                  color: form.accountType === t ? '#C9A34A' : '#8A8A8A',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {errors.accountType && (
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#f87171', marginTop: '6px' }}>
              <AlertCircle size={11} /> {errors.accountType}
            </p>
          )}
        </div>

        {/* Create Account button */}
        <button
          type="submit" disabled={loading}
          style={{
            width: '100%', height: '52px',
            background: loading ? 'rgba(201,163,74,0.4)' : 'linear-gradient(135deg, #C9A34A, #E3C269 50%, #C9A34A)',
            border: '1px solid rgba(245,215,142,0.3)',
            borderRadius: '12px',
            color: '#080808', fontSize: '13px', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0 6px 20px rgba(201,163,74,0.25)', fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-1px) scale(1.01)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(201,163,74,0.4)'; } }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0) scale(1)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(201,163,74,0.25)'; }}
        >
          {loading ? 'Creating Account…' : 'Create Account'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '13px', color: '#737373', margin: 0 }}>
          Already have an account?{' '}
          <button
            type="button" onClick={onSwitch}
            style={{ color: '#C9A34A', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '13px', padding: 0 }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#E3C269'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#C9A34A'; }}
          >
            Sign In
          </button>
        </p>
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT — Two-column layout
───────────────────────────────────────────────────────────── */
export default function LoginRegister() {
  const [mode, setMode] = useState('login');
  const { isLoggedIn }  = useAuth();
  const navigate        = useNavigate();

  useEffect(() => {
    document.title = `Plottage Hub — ${mode === 'login' ? 'Sign In' : 'Create Account'}`;
  }, [mode]);

  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#070707' }}>

      {/* ── LEFT — Cinematic image panel ── */}
      <div style={{
        display: 'none',
        position: 'relative',
        overflow: 'hidden',
        flex: '0 0 50%',
      }} className="login-left-panel">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85"
          alt="Premium Maharashtra landscape"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        {/* Overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(7,7,7,0.65) 0%, rgba(7,7,7,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7,7,7,0.92) 0%, rgba(7,7,7,0.1) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 40% at 30% 40%, rgba(201,163,74,0.07) 0%, transparent 70%)' }} />

        {/* Badge */}
        <div style={{ position: 'absolute', top: '40px', left: '40px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '8px 16px', borderRadius: '100px',
            border: '1px solid rgba(201,163,74,0.35)',
            background: 'rgba(7,7,7,0.6)', backdropFilter: 'blur(12px)',
          }}>
            <Sparkles size={13} color="#C9A34A" />
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#C9A34A', textTransform: 'uppercase' }}>
              Premium Platform
            </span>
          </div>
        </div>

        {/* Bottom content */}
        <div style={{ position: 'absolute', bottom: '48px', left: '40px', right: '40px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C9A34A', marginBottom: '14px' }}>
            Premium Real Estate
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 900,
            color: '#FFFFFF', lineHeight: 1.2, marginBottom: '16px',
          }}>
            Discover Your<br />Next Investment
          </h2>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: '320px', marginBottom: '32px' }}>
            Access curated land opportunities across Maharashtra's most promising destinations.
          </p>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '32px', marginBottom: '28px' }}>
            {[{ value: '372+', label: 'Acres Listed' }, { value: '25+', label: 'Locations' }, { value: '100%', label: 'Verified' }].map(({ value, label }) => (
              <div key={label}>
                <p style={{ fontSize: '24px', fontWeight: 900, color: '#C9A34A', lineHeight: 1 }}>{value}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>{label}</p>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', background: 'linear-gradient(to right, rgba(201,163,74,0.5), transparent)' }} />
        </div>
      </div>

      {/* ── RIGHT — Authentication panel ── */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        overflowY: 'auto',
        background: '#070707',
      }}>
        <div style={{ width: '100%', maxWidth: '440px' }}>

          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <Link to="/">
              <img
                src="/assets/plottage-hub-logo.png"
                alt="Plottage Hub"
                style={{ height: '56px', width: 'auto', objectFit: 'contain', display: 'inline-block', opacity: 0.95 }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.95'; }}
              />
            </Link>
          </div>

          {/* Segmented tab control */}
          <div style={{
            display: 'flex',
            padding: '4px',
            borderRadius: '14px',
            border: '1px solid rgba(255,255,255,0.07)',
            background: '#0D0D0D',
            marginBottom: '24px',
          }}>
            {[
              { id: 'login',    label: 'Sign In' },
              { id: 'register', label: 'Create Account' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                style={{
                  flex: 1,
                  height: '44px',
                  borderRadius: '11px',
                  border: mode === id ? '1px solid rgba(201,163,74,0.30)' : '1px solid transparent',
                  background: mode === id ? 'rgba(201,163,74,0.12)' : 'transparent',
                  color: mode === id ? '#C9A34A' : '#737373',
                  fontSize: '13px',
                  fontWeight: mode === id ? 700 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit',
                }}
                onMouseEnter={(e) => { if (mode !== id) e.currentTarget.style.color = '#C0C0C0'; }}
                onMouseLeave={(e) => { if (mode !== id) e.currentTarget.style.color = '#737373'; }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form card */}
          <div style={{
            background: '#101010',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            padding: '28px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}>
            {/* Form heading */}
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '28px', fontWeight: 700,
              color: '#F5F5F5', marginBottom: '6px',
            }}>
              {mode === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p style={{ fontSize: '14px', color: '#737373', marginBottom: '24px', lineHeight: 1.6 }}>
              {mode === 'login'
                ? 'Sign in to your Plottage Hub account to continue.'
                : 'Join thousands of property investors on Plottage Hub.'}
            </p>

            {mode === 'login'
              ? <LoginForm onSwitch={() => setMode('register')} />
              : <RegisterForm onSwitch={() => setMode('login')} />
            }
          </div>

          {/* Back to home */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Link
              to="/"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontSize: '13px', color: '#5A5A5A', textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#C9A34A'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#5A5A5A'; }}
            >
              <ArrowLeft size={14} strokeWidth={1.75} />
              Back to Home
            </Link>
          </div>

        </div>
      </div>

      {/* Responsive: show left panel on lg+ */}
      <style>{`
        @media (min-width: 1024px) {
          .login-left-panel { display: block !important; }
        }
        /* Placeholder styling */
        input::placeholder { color: #4A4A4A; }
        input:focus::placeholder { color: #3A3A3A; }
        /* Remove browser autofill yellow */
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #F0F0F0;
          -webkit-box-shadow: 0 0 0px 1000px #101010 inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>
    </div>
  );
}
