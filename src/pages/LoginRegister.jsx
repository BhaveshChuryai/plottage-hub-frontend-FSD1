import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, AlertCircle, User, Mail, Phone, Lock, Sparkles } from 'lucide-react';
import useAuth from '../hooks/useAuth';

function InputField({ id, label, type = 'text', placeholder, value, onChange, error, icon: Icon, rightEl }) {
  return (
    <div>
      <label htmlFor={id} className="block text-[#A5A5A5] text-xs font-semibold mb-2 uppercase tracking-widest">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5A5A5] z-10">
            <Icon size={15} />
          </div>
        )}
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full input-premium ${Icon ? 'pl-11' : 'pl-4'} ${rightEl ? 'pr-11' : 'pr-4'} py-4 rounded-xl text-sm transition-all duration-200 ${error ? 'border-red-500/60' : ''}`}
        />
        {rightEl && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">{rightEl}</div>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

function LoginForm({ onSwitch }) {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // useContext: Consumes AuthContext via useAuth hook
  const { login } = useAuth();
  const navigate = useNavigate();

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
    // Simulate async login, then update global AuthContext
    setTimeout(() => {
      setLoading(false);
      // useContext: Updates global auth state — reflected in Navbar and Dashboard
      login({ name: form.email.split('@')[0], email: form.email });
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        id="login-email" label="Email Address" type="email"
        placeholder="your@email.com" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email} icon={Mail}
      />
      <InputField
        id="login-password" label="Password"
        type={showPw ? 'text' : 'password'} placeholder="Enter your password"
        value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password} icon={Lock}
        rightEl={
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="text-[#A5A5A5] hover:text-[#C9A34A] transition-colors"
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      <div className="flex items-center justify-between pt-1">
        <label className="flex items-center gap-2.5 cursor-pointer group select-none">
          <input type="checkbox" checked={form.remember}
            onChange={() => setForm({ ...form, remember: !form.remember })} className="sr-only" />
          <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${
            form.remember
              ? 'bg-[#C9A34A] border-[#C9A34A] shadow-[0_0_10px_rgba(201,163,74,0.4)]'
              : 'border-[rgba(201,163,74,0.40)] group-hover:border-[rgba(201,163,74,0.70)]'
          }`}>
            {form.remember && <CheckCircle size={12} className="text-[#080808]" strokeWidth={3} />}
          </div>
          <span className="text-[#A5A5A5] text-sm">Remember Me</span>
        </label>
        <button type="button" className="text-[#C9A34A] text-sm hover:text-[#E3C269] transition-colors font-medium">
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase disabled:opacity-60 mt-2"
      >
        <span>{loading ? 'Signing In...' : 'SIGN IN'}</span>
      </button>

      <p className="text-center text-[#A5A5A5] text-sm pt-1">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-[#C9A34A] font-bold hover:text-[#E3C269] transition-colors">
          Create Account
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPw: '', accountType: '' });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // useContext: Consumes AuthContext via useAuth hook
  const { login } = useAuth();
  const navigate = useNavigate();

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
    // Simulate async registration, then update global AuthContext
    setTimeout(() => {
      setLoading(false);
      login({ name: form.name, email: form.email });
      navigate('/dashboard');
    }, 1800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField id="reg-name" label="Full Name" placeholder="Your full name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} icon={User} />
      <InputField id="reg-email" label="Email Address" type="email" placeholder="your@email.com" value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} icon={Mail} />
      <InputField id="reg-phone" label="Mobile Number" type="tel" placeholder="10-digit mobile number" value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} icon={Phone} />

      <InputField
        id="reg-password" label="Password" type={showPw ? 'text' : 'password'}
        placeholder="Minimum 8 characters" value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password} icon={Lock}
        rightEl={
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="text-[#A5A5A5] hover:text-[#C9A34A]"
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />
      <InputField
        id="reg-confirm" label="Confirm Password" type={showConfirm ? 'text' : 'password'}
        placeholder="Re-enter password" value={form.confirmPw}
        onChange={(e) => setForm({ ...form, confirmPw: e.target.value })}
        error={errors.confirmPw} icon={Lock}
        rightEl={
          <button type="button" onClick={() => setShowConfirm(!showConfirm)}
            className="text-[#A5A5A5] hover:text-[#C9A34A]"
            aria-label={showConfirm ? 'Hide password' : 'Show password'}
          >
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      <div>
        <label className="block text-[#A5A5A5] text-xs font-semibold mb-3 uppercase tracking-widest">Account Type</label>
        <div className="grid grid-cols-3 gap-3">
          {['Buyer / Investor', 'Property Owner', 'Agent'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm({ ...form, accountType: type })}
              className={`py-3.5 text-xs font-bold rounded-xl border-2 transition-all duration-200 ${
                form.accountType === type
                  ? 'bg-[rgba(201,163,74,0.15)] border-[rgba(201,163,74,0.60)] text-[#C9A34A] shadow-[0_0_15px_rgba(201,163,74,0.15)]'
                  : 'border-[rgba(255,255,255,0.08)] text-[#A5A5A5] hover:border-[rgba(201,163,74,0.35)] hover:text-[#F5F5F5]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.accountType && (
          <p className="text-red-400 text-xs mt-2 flex items-center gap-1.5">
            <AlertCircle size={11} /> {errors.accountType}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full py-4 rounded-xl font-black text-sm tracking-widest uppercase disabled:opacity-60 mt-2"
      >
        <span>{loading ? 'Creating Account...' : 'CREATE ACCOUNT'}</span>
      </button>

      <p className="text-center text-[#A5A5A5] text-sm pt-1">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-[#C9A34A] font-bold hover:text-[#E3C269] transition-colors">
          Sign In
        </button>
      </p>
    </form>
  );
}

export default function LoginRegister() {
  const [mode, setMode] = useState('login');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // useEffect: Sets route-specific document title
  useEffect(() => {
    document.title = `Plottage Hub — ${mode === 'login' ? 'Login' : 'Create Account'}`;
  }, [mode]);

  // useEffect: Redirect to dashboard if already logged in
  useEffect(() => {
    if (isLoggedIn) navigate('/dashboard', { replace: true });
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen flex" style={{ background: '#080808' }}>
      {/* Left Image Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85"
          alt="Premium real estate property"
          className="w-full h-full object-cover"
        />
        {/* Rich overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 50% 40% at 30% 40%, rgba(201,163,74,0.08) 0%, transparent 70%)' }} />

        {/* Top left badge */}
        <div className="absolute top-10 left-10">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-[rgba(201,163,74,0.35)] bg-[rgba(8,8,8,0.6)] backdrop-blur-md">
            <Sparkles size={14} className="text-[#C9A34A]" />
            <span className="text-[#C9A34A] text-xs font-bold tracking-widest">PREMIUM PLATFORM</span>
          </div>
        </div>

        {/* Overlay content */}
        <div className="absolute bottom-14 left-10 right-10">
          <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-4">Premium Real Estate</p>
          <h2 className="font-['Playfair_Display'] text-4xl font-black text-white leading-tight mb-5">
            Discover Your<br />Next Investment
          </h2>
          <p className="text-white/65 text-sm leading-relaxed max-w-xs mb-8">
            Access curated land opportunities across Maharashtra's most promising destinations.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8">
            {[
              { value: '372+', label: 'Acres Listed' },
              { value: '25+',  label: 'Locations' },
              { value: '100%', label: 'Verified' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-[#C9A34A] font-black text-2xl">{value}</p>
                <p className="text-white/55 text-xs mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Decorative gold line */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-[rgba(201,163,74,0.5)] to-transparent" />
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto" style={{ background: '#080808' }}>
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/">
              <img
                src="/assets/plottage-hub-logo.png"
                alt="Plottage Hub"
                className="h-16 w-auto object-contain mx-auto mb-1 hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>

          {/* Mode Toggle */}
          <div className="flex rounded-2xl border border-[rgba(255,255,255,0.08)] p-1.5 mb-8 bg-[#0d0d0d]">
            {[
              { id: 'login',    label: 'Sign In' },
              { id: 'register', label: 'Create Account' },
            ].map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setMode(id)}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all duration-250 ${
                  mode === id
                    ? 'bg-[rgba(201,163,74,0.12)] text-[#C9A34A] border border-[rgba(201,163,74,0.30)] shadow-[0_2px_12px_rgba(201,163,74,0.10)]'
                    : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Form Card */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-7 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)]" style={{ background: '#101010' }}>
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#F5F5F5] mb-1.5">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-[#A5A5A5] text-sm mb-7 leading-relaxed">
              {mode === 'login'
                ? 'Sign in to your Plottage Hub account to continue.'
                : 'Join thousands of property investors on Plottage Hub.'}
            </p>

            {mode === 'login'
              ? <LoginForm onSwitch={() => setMode('register')} />
              : <RegisterForm onSwitch={() => setMode('login')} />
            }
          </div>

          <p className="text-center text-[#A5A5A5] text-xs mt-6">
            <Link to="/" className="hover:text-[#C9A34A] transition-colors font-medium">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
