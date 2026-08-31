import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import useAuth from '../hooks/useAuth';
import { useTheme } from '../context/ThemeContext';

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
  const location = useLocation();

  // useContext: Consumes AuthContext via useAuth hook for dynamic nav actions
  const { isLoggedIn, logout } = useAuth();

  // useContext: Consumes ThemeContext for theme toggle
  const { theme, toggleTheme } = useTheme();

  // useEffect: Listens for scroll events to change navbar appearance
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect: Closes mobile menu on route change
  useEffect(() => setMobileOpen(false), [location]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path.split('#')[0]) && path.split('#')[0] !== '/';
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#080808]/95 backdrop-blur-xl border-b border-[rgba(201,163,74,0.2)] shadow-2xl shadow-black/50'
            : 'bg-[#080808]/70 backdrop-blur-md border-b border-[rgba(201,163,74,0.08)]'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0 group">
              <img
                src="/assets/plottage-hub-logo.png"
                alt="Plottage Hub"
                className="h-10 md:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                style={{ maxWidth: '180px' }}
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium tracking-wide transition-all duration-200 rounded-md relative group ${
                    isActive(link.path)
                      ? 'text-[#C9A34A]'
                      : 'text-[#A5A5A5] hover:text-[#F5F5F5]'
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#C9A34A] rounded-full" />
                  )}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#C9A34A] rounded-full transition-all duration-300 group-hover:w-4 opacity-0 group-hover:opacity-100" />
                </Link>
              ))}
            </div>

            {/* Desktop Right Actions — dynamically reflects auth state */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-full border border-[rgba(201,163,74,0.2)] flex items-center justify-center text-[#A5A5A5] hover:text-[#C9A34A] hover:border-[rgba(201,163,74,0.5)] transition-all duration-200"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
              </button>

              {isLoggedIn ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-2 text-sm font-medium text-[#A5A5A5] hover:text-[#C9A34A] transition-colors duration-200"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-5 py-2.5 rounded-lg border border-[rgba(201,163,74,0.3)] text-sm font-semibold text-[#C9A34A] hover:bg-[rgba(201,163,74,0.05)] hover:border-[rgba(201,163,74,0.5)] transition-all duration-200"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-[#A5A5A5] hover:text-[#C9A34A] transition-colors duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    className="btn-gold px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide"
                  >
                    <span>List Your Property</span>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-[#A5A5A5] hover:text-[#C9A34A] transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mobile-menu-open bg-[#0d0d0d] border-t border-[rgba(201,163,74,0.12)]">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-[#C9A34A] bg-[rgba(201,163,74,0.08)] border-l-2 border-[#C9A34A]'
                      : 'text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Theme toggle — mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-[#A5A5A5] hover:text-[#C9A34A] rounded-lg transition-all duration-200"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>

              <div className="pt-3 border-t border-[rgba(201,163,74,0.08)] space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      to="/dashboard"
                      className="block w-full text-center px-4 py-3 text-sm font-medium text-[#A5A5A5] hover:text-[#C9A34A] transition-colors border border-[rgba(201,163,74,0.2)] rounded-lg"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-center px-4 py-3 text-sm font-medium text-red-400 hover:text-red-300 transition-colors border border-red-500/20 rounded-lg"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="block w-full text-center px-4 py-3 text-sm font-medium text-[#A5A5A5] hover:text-[#C9A34A] transition-colors border border-[rgba(201,163,74,0.2)] rounded-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/login"
                      className="btn-gold block w-full text-center px-4 py-3 rounded-lg text-sm font-semibold"
                    >
                      <span>List Your Property</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
}
