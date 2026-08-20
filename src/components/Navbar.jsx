import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
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
            : 'bg-[#080808]/70 backdrop-blur-md border-b border-[rgba(201,163,74,0.1)]'
        }`}
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

            {/* Desktop Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-[#A5A5A5] hover:text-[#C9A34A] transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/login"
                className="btn-gold px-5 py-2.5 rounded-md text-sm font-semibold tracking-wide"
              >
                <span>List Your Property</span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-[#A5A5A5] hover:text-[#C9A34A] transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mobile-menu-open bg-[#0d0d0d] border-t border-[rgba(201,163,74,0.15)]">
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.path}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                    isActive(link.path)
                      ? 'text-[#C9A34A] bg-[rgba(201,163,74,0.08)] border-l-2 border-[#C9A34A]'
                      : 'text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-[rgba(255,255,255,0.03)]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-[rgba(201,163,74,0.1)] space-y-2">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-3 text-sm font-medium text-[#A5A5A5] hover:text-[#C9A34A] transition-colors border border-[rgba(201,163,74,0.2)] rounded-md"
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  className="btn-gold block w-full text-center px-4 py-3 rounded-md text-sm font-semibold"
                >
                  <span>List Your Property</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Spacer */}
      <div className="h-16 md:h-20" />
    </>
  );
}
