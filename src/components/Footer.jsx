import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowRight, MessageCircle } from 'lucide-react';
import useTheme from '../hooks/useTheme';

// Custom SVG Icons for authentic social media branding
function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function TwitterIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

export default function Footer() {
  const { theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <footer
      className="border-t transition-colors duration-300 relative overflow-hidden"
      style={{
        backgroundColor: isLight ? '#EDE8DF' : '#070707',
        borderColor: isLight ? 'rgba(154,115,37,0.18)' : 'rgba(201,163,74,0.15)',
      }}
      role="contentinfo"
    >
      {/* Background ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(201,163,74,0.15) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-block group">
              <img
                src="/assets/plottage-hub-logo.png"
                alt="Plottage Hub"
                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-sm leading-relaxed" style={{ color: isLight ? '#6B5E40' : '#A3A3A3' }}>
              Your trusted partner for discovering, evaluating, and investing in premium land opportunities across Maharashtra and high-growth corridors.
            </p>

            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: InstagramIcon, label: 'Instagram', href: '#' },
                { icon: TwitterIcon, label: 'Twitter / X', href: '#' },
                { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
                { icon: MessageCircle, label: 'Community', href: '#' },
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={item.href}
                  aria-label={item.label}
                  className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: isLight ? '#F7F3EC' : 'rgba(255,255,255,0.03)',
                    borderColor: isLight ? 'rgba(154,115,37,0.25)' : 'rgba(201,163,74,0.20)',
                    color: isLight ? '#9A7325' : '#C9A34A',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = isLight ? '#9A7325' : '#E3C269';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(201,163,74,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = isLight ? 'rgba(154,115,37,0.25)' : 'rgba(201,163,74,0.20)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <item.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2"
              style={{ color: isLight ? '#9A7325' : '#C9A34A' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C9A34A]" />
              Quick Links
            </h3>
            <ul className="space-y-3.5">
              {[
                { label: 'Home', path: '/' },
                { label: 'Explore Plots', path: '/explore' },
                { label: 'About Us', path: '/#about' },
                { label: 'How It Works', path: '/#how-it-works' },
                { label: 'List Your Property', path: '/login' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="text-sm transition-all duration-200 flex items-center gap-2 group"
                    style={{ color: isLight ? '#6B5E40' : '#A3A3A3' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = isLight ? '#1A1408' : '#F5F5F5';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isLight ? '#6B5E40' : '#A3A3A3';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <ArrowRight size={13} className="text-[#C9A34A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2"
              style={{ color: isLight ? '#9A7325' : '#C9A34A' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C9A34A]" />
              Explore
            </h3>
            <ul className="space-y-3.5">
              {[
                'Residential Plots',
                'Agricultural Land',
                'Commercial Land',
                'Investment Opportunities',
                'Coastal Properties',
                'Hill Station Plots',
              ].map((category) => (
                <li key={category}>
                  <Link
                    to="/explore"
                    className="text-sm transition-all duration-200 flex items-center gap-2 group"
                    style={{ color: isLight ? '#6B5E40' : '#A3A3A3' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = isLight ? '#1A1408' : '#F5F5F5';
                      e.currentTarget.style.transform = 'translateX(4px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = isLight ? '#6B5E40' : '#A3A3A3';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <ArrowRight size={13} className="text-[#C9A34A] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Working Hours */}
          <div>
            <h3
              className="text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2"
              style={{ color: isLight ? '#9A7325' : '#C9A34A' }}
            >
              <span className="w-2 h-2 rounded-full bg-[#C9A34A]" />
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 flex-shrink-0 text-[#C9A34A]" />
                <span className="text-sm leading-relaxed" style={{ color: isLight ? '#6B5E40' : '#A3A3A3' }}>
                  Office No. 12, Prestige Tower,<br />
                  Bandra (W), Mumbai – 400050
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={17} className="flex-shrink-0 text-[#C9A34A]" />
                <a
                  href="tel:+918855908374"
                  className="text-sm font-medium hover:text-[#C9A34A] transition-colors"
                  style={{ color: isLight ? '#6B5E40' : '#F5F5F5' }}
                >
                  +91 8855908374
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={17} className="flex-shrink-0 text-[#C9A34A]" />
                <a
                  href="mailto:plottagehub@gmail.com"
                  className="text-sm font-medium hover:text-[#C9A34A] transition-colors"
                  style={{ color: isLight ? '#6B5E40' : '#F5F5F5' }}
                >
                  plottagehub@gmail.com
                </a>
              </li>
            </ul>

            {/* Working Hours Card */}
            <div
              className="mt-6 p-4 rounded-2xl border"
              style={{
                backgroundColor: isLight ? '#F7F3EC' : 'rgba(255,255,255,0.03)',
                borderColor: isLight ? 'rgba(154,115,37,0.2)' : 'rgba(201,163,74,0.18)',
              }}
            >
              <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#C9A34A]">
                <Clock size={13} />
                <span>Working Hours</span>
              </div>
              <p className="text-xs font-medium" style={{ color: isLight ? '#6B5E40' : '#A3A3A3' }}>
                Mon – Sat: 9:00 AM – 7:00 PM
              </p>
              <p className="text-xs font-medium" style={{ color: isLight ? '#6B5E40' : '#A3A3A3' }}>
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="divider-gold my-12" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs" style={{ color: isLight ? '#6B5E40' : '#737373' }}>
          <p>© 2026 Plottage Hub. All Rights Reserved. RERA Verified Platform.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Investment Disclaimer'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-[#C9A34A] transition-colors"
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
