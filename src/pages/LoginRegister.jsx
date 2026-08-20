import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, CheckCircle, AlertCircle, User, Mail, Phone, Lock, Building } from 'lucide-react';

function InputField({ label, type = 'text', placeholder, value, onChange, error, icon: Icon, rightEl }) {
  return (
    <div>
      <label className="block text-[#A5A5A5] text-xs font-medium mb-1.5 uppercase tracking-wider">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5] z-10">
            <Icon size={16} />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full input-premium ${Icon ? 'pl-10' : 'pl-4'} ${rightEl ? 'pr-10' : 'pr-4'} py-3.5 rounded-xl text-sm transition-all duration-200 ${error ? 'border-red-500/60 focus:border-red-500' : ''}`}
        />
        {rightEl && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2">{rightEl}</div>
        )}
      </div>
      {error && (
        <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1">
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
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1500);
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 rounded-full bg-[rgba(201,163,74,0.1)] border border-[rgba(201,163,74,0.4)] flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-[#C9A34A]" />
        </div>
        <h3 className="text-[#F5F5F5] font-bold text-xl mb-2">Welcome Back!</h3>
        <p className="text-[#A5A5A5] mb-6">You have successfully signed in.</p>
        <Link to="/dashboard" className="btn-gold px-8 py-3.5 rounded-xl font-semibold text-sm">
          <span>Go to Dashboard</span>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <InputField
        label="Email Address"
        type="email"
        placeholder="your@email.com"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        error={errors.email}
        icon={Mail}
      />
      <InputField
        label="Password"
        type={showPw ? 'text' : 'password'}
        placeholder="Enter your password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
        icon={Lock}
        rightEl={
          <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#A5A5A5] hover:text-[#C9A34A] transition-colors">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div
            className={`w-4 h-4 rounded border transition-all ${form.remember ? 'bg-[#C9A34A] border-[#C9A34A]' : 'border-[rgba(201,163,74,0.4)] group-hover:border-[rgba(201,163,74,0.7)]'} flex items-center justify-center`}
            onClick={() => setForm({ ...form, remember: !form.remember })}
          >
            {form.remember && <CheckCircle size={10} className="text-[#080808]" />}
          </div>
          <span className="text-[#A5A5A5] text-sm">Remember Me</span>
        </label>
        <button type="button" className="text-[#C9A34A] text-sm hover:text-[#E3C269] transition-colors">
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase disabled:opacity-70 transition-all"
      >
        <span>{loading ? 'Signing In...' : 'SIGN IN'}</span>
      </button>

      <p className="text-center text-[#A5A5A5] text-sm">
        Don't have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-[#C9A34A] font-semibold hover:text-[#E3C269] transition-colors">
          Create Account
        </button>
      </p>
    </form>
  );
}

function RegisterForm({ onSwitch }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPw: '', accountType: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1800);
  };

  if (success) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 rounded-full bg-[rgba(201,163,74,0.1)] border border-[rgba(201,163,74,0.4)] flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={36} className="text-[#C9A34A]" />
        </div>
        <h3 className="text-[#F5F5F5] font-bold text-xl mb-2">Account Created!</h3>
        <p className="text-[#A5A5A5] mb-6">Welcome to Plottage Hub. Start exploring.</p>
        <Link to="/explore" className="btn-gold px-8 py-3.5 rounded-xl font-semibold text-sm">
          <span>Explore Properties</span>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField label="Full Name" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} icon={User} />
      <InputField label="Email Address" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} icon={Mail} />
      <InputField label="Mobile Number" type="tel" placeholder="10-digit mobile number" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} icon={Phone} />

      <InputField
        label="Password"
        type={showPw ? 'text' : 'password'}
        placeholder="Minimum 8 characters"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        error={errors.password}
        icon={Lock}
        rightEl={
          <button type="button" onClick={() => setShowPw(!showPw)} className="text-[#A5A5A5] hover:text-[#C9A34A]">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      <InputField
        label="Confirm Password"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Re-enter password"
        value={form.confirmPw}
        onChange={(e) => setForm({ ...form, confirmPw: e.target.value })}
        error={errors.confirmPw}
        icon={Lock}
        rightEl={
          <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="text-[#A5A5A5] hover:text-[#C9A34A]">
            {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        }
      />

      <div>
        <label className="block text-[#A5A5A5] text-xs font-medium mb-1.5 uppercase tracking-wider">Account Type</label>
        <div className="grid grid-cols-3 gap-3">
          {['Buyer / Investor', 'Property Owner', 'Agent'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setForm({ ...form, accountType: type })}
              className={`py-3 text-xs font-semibold rounded-xl border transition-all duration-200 ${
                form.accountType === type
                  ? 'bg-[rgba(201,163,74,0.15)] border-[rgba(201,163,74,0.6)] text-[#C9A34A]'
                  : 'border-[rgba(201,163,74,0.15)] text-[#A5A5A5] hover:border-[rgba(201,163,74,0.35)]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        {errors.accountType && <p className="text-red-400 text-xs mt-1.5 flex items-center gap-1"><AlertCircle size={11} /> {errors.accountType}</p>}
      </div>

      <button type="submit" disabled={loading} className="btn-gold w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase disabled:opacity-70 mt-2">
        <span>{loading ? 'Creating Account...' : 'CREATE ACCOUNT'}</span>
      </button>

      <p className="text-center text-[#A5A5A5] text-sm">
        Already have an account?{' '}
        <button type="button" onClick={onSwitch} className="text-[#C9A34A] font-semibold hover:text-[#E3C269] transition-colors">
          Sign In
        </button>
      </p>
    </form>
  );
}

export default function LoginRegister() {
  const [mode, setMode] = useState('login');

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Left Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85"
          alt="Premium Property"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 to-[#080808]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 to-transparent" />

        {/* Overlay text */}
        <div className="absolute bottom-16 left-10 right-10">
          <p className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase mb-3">Premium Real Estate</p>
          <h2 className="font-['Playfair_Display'] text-3xl font-bold text-white leading-tight mb-4">
            Discover Your<br />Next Investment
          </h2>
          <p className="text-white/70 text-sm leading-relaxed max-w-xs">
            Access curated land opportunities across Maharashtra's most promising destinations.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-8 mt-6">
            <div className="text-center">
              <p className="text-[#C9A34A] font-bold text-2xl">372+</p>
              <p className="text-white/60 text-xs">Acres Listed</p>
            </div>
            <div className="text-center">
              <p className="text-[#C9A34A] font-bold text-2xl">25+</p>
              <p className="text-white/60 text-xs">Locations</p>
            </div>
            <div className="text-center">
              <p className="text-[#C9A34A] font-bold text-2xl">100%</p>
              <p className="text-white/60 text-xs">Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/">
              <img
                src="/assets/plottage-hub-logo.png"
                alt="Plottage Hub"
                className="h-16 w-auto object-contain mx-auto mb-2"
              />
            </Link>
          </div>

          {/* Tab Switch */}
          <div className="flex rounded-xl border border-[rgba(201,163,74,0.2)] p-1 mb-8 bg-[#101010]">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                mode === 'login'
                  ? 'bg-[rgba(201,163,74,0.15)] text-[#C9A34A] border border-[rgba(201,163,74,0.3)]'
                  : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 ${
                mode === 'register'
                  ? 'bg-[rgba(201,163,74,0.15)] text-[#C9A34A] border border-[rgba(201,163,74,0.3)]'
                  : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <div className="bg-[#101010] rounded-2xl border border-[rgba(201,163,74,0.15)] p-6 md:p-8">
            <h2 className="font-['Playfair_Display'] text-2xl font-bold text-[#F5F5F5] mb-1">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-[#A5A5A5] text-sm mb-6">
              {mode === 'login'
                ? 'Sign in to your Plottage Hub account.'
                : 'Join thousands of property investors on Plottage Hub.'}
            </p>

            {mode === 'login'
              ? <LoginForm onSwitch={() => setMode('register')} />
              : <RegisterForm onSwitch={() => setMode('login')} />
            }
          </div>

          <p className="text-center text-[#A5A5A5] text-xs mt-6">
            <Link to="/" className="hover:text-[#C9A34A] transition-colors">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
