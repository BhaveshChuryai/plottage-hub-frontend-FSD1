import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Share2, AtSign, Globe, ArrowRight, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-[rgba(201,163,74,0.15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <img
                src="/assets/plottage-hub-logo.png"
                alt="Plottage Hub"
                className="h-14 w-auto object-contain mb-4"
              />
            </Link>
            <p className="text-[#A5A5A5] text-sm leading-relaxed mb-6">
              Plottage Hub is your trusted partner for discovering, evaluating, and investing in premium land opportunities across Maharashtra and beyond.
            </p>
            <div className="flex items-center gap-3">
              {[AtSign, Globe, Share2, MessageCircle].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-[rgba(201,163,74,0.2)] flex items-center justify-center text-[#A5A5A5] hover:text-[#C9A34A] hover:border-[rgba(201,163,74,0.6)] transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#F5F5F5] font-semibold text-sm tracking-widest uppercase mb-6">Quick Links</h3>
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
                    className="text-[#A5A5A5] hover:text-[#C9A34A] text-sm transition-colors duration-200 flex items-center gap-2 group"
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
            <h3 className="text-[#F5F5F5] font-semibold text-sm tracking-widest uppercase mb-6">Explore</h3>
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
                    className="text-[#A5A5A5] hover:text-[#C9A34A] text-sm transition-colors duration-200 flex items-center gap-2 group"
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
            <h3 className="text-[#F5F5F5] font-semibold text-sm tracking-widest uppercase mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#C9A34A] mt-0.5 flex-shrink-0" />
                <span className="text-[#A5A5A5] text-sm">Office No. 12, Prestige Tower,<br />Bandra (W), Mumbai - 400050</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#C9A34A] flex-shrink-0" />
                <a href="tel:+919876543210" className="text-[#A5A5A5] hover:text-[#C9A34A] text-sm transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#C9A34A] flex-shrink-0" />
                <a href="mailto:info@plottagehub.com" className="text-[#A5A5A5] hover:text-[#C9A34A] text-sm transition-colors">info@plottagehub.com</a>
              </li>
            </ul>

            <div className="mt-6 p-4 border border-[rgba(201,163,74,0.15)] rounded-lg bg-[#101010]">
              <p className="text-[#C9A34A] text-xs font-semibold uppercase tracking-wider mb-1">Working Hours</p>
              <p className="text-[#A5A5A5] text-sm">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-[#A5A5A5] text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="divider-gold my-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A5A5A5] text-sm">
            © 2026 Plottage Hub. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a key={item} href="#" className="text-[#A5A5A5] hover:text-[#C9A34A] text-xs transition-colors duration-200">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
