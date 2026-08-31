import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2, AtSign, Globe, ArrowRight, MessageCircle } from 'lucide-react';
import useTheme from '../hooks/useTheme';

// useContext: Consumes ThemeContext to demonstrate context consumption in Footer
export default function Footer() {
  // useContext: Reads current theme from ThemeContext
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <footer
      className="border-t transition-colors duration-300"
      style={{
        backgroundColor: isLight ? '#EDE8DF' : '#080808',
        borderColor: isLight ? 'rgba(154,115,37,0.15)' : 'rgba(201,163,74,0.12)',
      }}
      role="contentinfo"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img
                src="/assets/plottage-hub-logo.png"
                alt="Plottage Hub"
                className="h-14 w-auto object-contain mb-5"
              />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}>
              Plottage Hub is your trusted partner for discovering, evaluating, and investing in premium land
              opportunities across Maharashtra and beyond.
            </p>

            {/* Theme indicator — subtle acknowledgement of ThemeContext consumption */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5 text-xs font-medium"
              style={{
                background: isLight ? 'rgba(154,115,37,0.10)' : 'rgba(201,163,74,0.08)',
                border: `1px solid ${isLight ? 'rgba(154,115,37,0.25)' : 'rgba(201,163,74,0.20)'}`,
                color: isLight ? '#9A7325' : '#C9A34A',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: isLight ? '#9A7325' : '#C9A34A' }}
              />
              {isLight ? 'Light Mode' : 'Dark Mode'} — Premium Experience
            </div>

            <div className="flex items-center gap-3">
              {[AtSign, Globe, Share2, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    border: `1px solid ${isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)'}`,
                    color: isLight ? '#6B5E40' : '#A5A5A5',
                  }}
                  aria-label="Social media link"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = isLight ? '#9A7325' : '#C9A34A';
                    e.currentTarget.style.borderColor = isLight ? 'rgba(154,115,37,0.5)' : 'rgba(201,163,74,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = isLight ? '#6B5E40' : '#A5A5A5';
                    e.currentTarget.style.borderColor = isLight ? 'rgba(0,0,0,0.10)' : 'rgba(255,255,255,0.08)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="font-semibold text-sm tracking-widest uppercase mb-6"
              style={{ color: isLight ? '#1A1408' : '#F5F5F5' }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', path: '/' },
                { label: 'Explore Plots', path: '/explore' },
                { label: 'About Us', path: '/#about' },
                { label: 'How It Works', path: '/#how-it-works' },
                { label: 'List Your Property', path: '/login' },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = isLight ? '#9A7325' : '#C9A34A'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isLight ? '#6B5E40' : '#A5A5A5'; }}
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3
              className="font-semibold text-sm tracking-widest uppercase mb-6"
              style={{ color: isLight ? '#1A1408' : '#F5F5F5' }}
            >
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                'Residential Plots',
                'Agricultural Land',
                'Commercial Land',
                'Investment Opportunities',
                'Coastal Properties',
                'Hill Station Plots',
              ].map((item) => (
                <li key={item}>
                  <Link
                    to="/explore"
                    className="text-sm transition-colors duration-200 flex items-center gap-2 group"
                    style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = isLight ? '#9A7325' : '#C9A34A'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = isLight ? '#6B5E40' : '#A5A5A5'; }}
                  >
                    <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="font-semibold text-sm tracking-widest uppercase mb-6"
              style={{ color: isLight ? '#1A1408' : '#F5F5F5' }}
            >
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" style={{ color: isLight ? '#9A7325' : '#C9A34A' }} />
                <span className="text-sm" style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}>
                  Office No. 12, Prestige Tower,<br />Bandra (W), Mumbai – 400050
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="flex-shrink-0" style={{ color: isLight ? '#9A7325' : '#C9A34A' }} />
                <a
                  href="tel:+919876543210"
                  className="text-sm transition-colors"
                  style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="flex-shrink-0" style={{ color: isLight ? '#9A7325' : '#C9A34A' }} />
                <a
                  href="mailto:info@plottagehub.com"
                  className="text-sm transition-colors"
                  style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}
                >
                  info@plottagehub.com
                </a>
              </li>
            </ul>

            <div
              className="mt-6 p-4 rounded-xl"
              style={{
                border: `1px solid ${isLight ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.06)'}`,
                background: isLight ? '#F7F3EC' : '#101010',
              }}
            >
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: isLight ? '#9A7325' : '#C9A34A' }}>
                Working Hours
              </p>
              <p className="text-sm" style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}>Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-sm" style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="divider-gold my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm" style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}>
            © 2026 Plottage Hub. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: isLight ? '#6B5E40' : '#A5A5A5' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = isLight ? '#9A7325' : '#C9A34A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = isLight ? '#6B5E40' : '#A5A5A5'; }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
