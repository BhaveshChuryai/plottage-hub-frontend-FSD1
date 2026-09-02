import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Explore Plots', path: '/explore' },
  { label: 'About', path: '/#about' },
  { label: 'How It Works', path: '/#how-it-works' },
  { label: 'Contact', path: '/#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  const { isLoggedIn, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 25);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/' && !location.hash;
    if (path.startsWith('/#')) return location.pathname === '/' && location.hash === path.substring(1);
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#070707]/95 backdrop-blur-xl border-b border-[rgba(201,163,74,0.22)] shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
            : 'bg-[#070707]/80 backdrop-blur-md border-b border-[rgba(201,163,74,0.12)]'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              {!logoError ? (
                <img
                  src="/assets/plottage-hub-logo.png"
                  alt="Plottage Hub"
                  onError={() => setLogoError(true)}
                  className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C9A34A] to-[#8F6D27] flex items-center justify-center shadow-[0_0_15px_rgba(201,163,74,0.3)]">
                    <span className="text-[#080808] font-black text-base tracking-tighter">PH</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-['Playfair_Display'] text-xl font-black text-[#F5F5F5] tracking-wider">
                      PLOTTAGE <span className="text-[#C9A34A]">HUB</span>
                    </span>
                    <span className="text-[9px] tracking-[0.2em] text-[#A3A3A3] uppercase -mt-1">
                      Land Investment
                    </span>
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => {
                const active = isActive(link.path);
                return (
                  <Link
                    key={link.label}
                    to={link.path}
                    className={`relative py-2 text-sm font-medium tracking-wide transition-colors duration-200 ${
                      active ? 'text-[#C9A34A]' : 'text-[#A3A3A3] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {link.label}
                    {active ? (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A34A] to-transparent rounded-full" />
                    ) : (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#C9A34A] rounded-full transition-all duration-300 group-hover:w-full opacity-0 hover:opacity-100" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl border border-[rgba(201,163,74,0.22)] bg-[rgba(255,255,255,0.03)] flex items-center justify-center text-[#A3A3A3] hover:text-[#C9A34A] hover:border-[rgba(201,163,74,0.5)] transition-all duration-200"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              </button>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 text-sm font-semibold text-[#A3A3A3] hover:text-[#C9A34A] transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-5 py-2.5 rounded-xl border border-[rgba(201,163,74,0.35)] text-sm font-semibold text-[#C9A34A] hover:bg-[rgba(201,163,74,0.08)] hover:border-[rgba(201,163,74,0.6)] transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-semibold text-[#A3A3A3] hover:text-[#C9A34A] transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    className="btn-gold px-5 py-2.5 rounded-xl text-sm font-bold tracking-wide flex items-center gap-1.5"
                  >
                    <span>List Your Property</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg border border-[rgba(201,163,74,0.2)] flex items-center justify-center text-[#A3A3A3] hover:text-[#C9A34A]"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>
              <button
                className="p-2 text-[#A3A3A3] hover:text-[#C9A34A] focus:outline-none"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-[rgba(201,163,74,0.18)] shadow-2xl px-5 py-6 space-y-4 animate-fade-in-up">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'text-[#C9A34A] bg-[rgba(201,163,74,0.10)] font-semibold'
                      : 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} className="opacity-50" />
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[rgba(201,163,74,0.12)] space-y-3">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 text-sm font-medium text-[#F5F5F5] bg-[rgba(255,255,255,0.05)] rounded-xl border border-[rgba(255,255,255,0.08)]"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="block w-full text-center px-4 py-3 text-sm font-medium text-red-400 bg-red-500/10 rounded-xl border border-red-500/20"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="block w-full text-center px-4 py-3 text-sm font-semibold text-[#A3A3A3] hover:text-[#F5F5F5] border border-[rgba(201,163,74,0.25)] rounded-xl"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="btn-gold block w-full text-center px-4 py-3 rounded-xl text-sm font-bold"
                  >
                    <span>List Your Property</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Fixed Navbar Spacer */}
      <div className="h-20" />
    </>
  );
}
