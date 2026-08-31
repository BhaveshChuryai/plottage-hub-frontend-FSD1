import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, Shield, Globe, Compass, CheckCircle,
  Star, ChevronRight, Sparkles, MapPin
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';
import useCountUp from '../hooks/useCountUp';

// Custom Hook: Reveal-on-scroll using IntersectionObserver
// useEffect: Sets up IntersectionObserver to add 'visible' class when element enters viewport
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    // useEffect cleanup: Disconnect observer to prevent memory leaks
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Component using useCountUp custom hook for animated statistics
function AnimatedCounter({ target, suffix = '' }) {
  // Custom Hook: useCountUp handles IntersectionObserver + counting animation
  const { count, ref } = useCountUp(target, suffix);
  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 372, suffix: '+', label: 'Acres', sublabel: 'Land Opportunities' },
  { value: 25,  suffix: '+', label: 'Locations', sublabel: 'Premium Destinations' },
  { value: 100, suffix: '+', label: 'Enquiries', sublabel: 'Property Enquiries' },
  { value: null, label: 'Verified', sublabel: 'Property Discovery', special: true },
];

const features = [
  { icon: Compass,   title: 'DISCOVER',  desc: 'Explore curated land opportunities tailored to your requirements, location preferences, and investment goals.' },
  { icon: TrendingUp, title: 'EVALUATE', desc: 'Understand pricing, infrastructure, location advantages, and key property characteristics with detailed insights.' },
  { icon: Star,      title: 'INVEST',    desc: "Identify high-potential land with long-term appreciation in Maharashtra's fastest growing corridors." },
  { icon: Globe,     title: 'CONNECT',   desc: 'Send direct enquiries to property professionals and schedule site visits with a single click.' },
];

const steps = [
  { num: '01', title: 'Search',  desc: 'Find properties based on your location, budget, and property type preferences.' },
  { num: '02', title: 'Explore', desc: 'Review detailed property information, location insights, and investment potential.' },
  { num: '03', title: 'Compare', desc: 'Evaluate multiple opportunities side by side to make an informed decision.' },
  { num: '04', title: 'Connect', desc: 'Send an enquiry and connect directly with our property team for guidance.' },
];

export default function Home() {
  const featuredProps = properties.filter((p) => p.featured).slice(0, 4);

  // useEffect: Sets route-specific document title
  useEffect(() => {
    document.title = 'Plottage Hub — Home';
  }, []);

  const heroRef    = useReveal();
  const statsRef   = useReveal();
  const featuredRef = useReveal();
  const whyRef     = useReveal();
  const howRef     = useReveal();
  const investRef  = useReveal();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85"
            alt="Premium Land"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/75 via-[#080808]/55 to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 via-transparent to-transparent" />
          {/* Gold radial glow */}
          <div className="absolute inset-0 hero-glow" />
        </div>

        {/* Floating orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,163,74,0.06) 0%, transparent 70%)' }}
        />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,163,74,0.04) 0%, transparent 70%)' }}
        />

        {/* Hero Content */}
        <div ref={heroRef} className="reveal relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 pt-8">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-[rgba(201,163,74,0.30)] bg-[rgba(201,163,74,0.07)] backdrop-blur-sm mb-10 shadow-[0_4px_20px_rgba(201,163,74,0.1)]">
            <span className="w-2 h-2 bg-[#C9A34A] rounded-full animate-pulse" />
            <Sparkles size={12} className="text-[#C9A34A]" />
            <span className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase">Premium Land Investment Platform</span>
          </div>

          <h1 className="font-['Playfair_Display'] text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tight mb-8">
            FIND.{' '}
            <span className="text-shimmer">INVEST.</span>{' '}
            GROW.
          </h1>

          <p className="text-xl md:text-2xl text-[#E3C269] font-light mb-4 tracking-wide">
            Discover land. Understand its potential. Invest with confidence.
          </p>
          <p className="text-[#A5A5A5] text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
            Plottage Hub brings property discovery, location insights and buyer enquiries together in one premium platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <Link
              to="/explore"
              className="btn-gold px-10 py-4 rounded-2xl text-base font-bold flex items-center gap-2.5 shadow-[0_8px_30px_rgba(201,163,74,0.35)]"
            >
              <span className="flex items-center gap-2.5">
                Explore Plots <ArrowRight size={18} />
              </span>
            </Link>
            <Link
              to="/login"
              className="px-10 py-4 rounded-2xl border border-[rgba(201,163,74,0.30)] text-white text-base font-semibold backdrop-blur-sm hover:border-[rgba(201,163,74,0.60)] hover:bg-[rgba(201,163,74,0.06)] transition-all duration-300"
            >
              List Your Property
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#A5A5A5]">
            {['RERA Verified Properties', 'Direct Owner Connect', 'Zero Brokerage'].map((t) => (
              <div key={t} className="flex items-center gap-2">
                <CheckCircle size={14} className="text-[#C9A34A]" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
          <div className="w-px h-10 bg-gradient-to-b from-transparent to-[rgba(201,163,74,0.5)]" />
          <div className="w-1.5 h-1.5 bg-[#C9A34A] rounded-full" />
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <SearchBar />
      </section>

      {/* ── TRUST STATS ── */}
      <section ref={statsRef} className="reveal py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-3">Our Track Record</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#F5F5F5]">
            Numbers That Speak
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative text-center p-8 md:p-10 rounded-2xl border overflow-hidden transition-all duration-500 hover:border-[rgba(201,163,74,0.35)]"
              style={{ background: '#0f0f0f', borderColor: 'rgba(255,255,255,0.07)' }}
            >
              {/* Background glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at center, rgba(201,163,74,0.06) 0%, transparent 70%)' }}
              />
              {stat.special ? (
                <div className="relative text-4xl md:text-5xl font-bold text-[#C9A34A] font-['Playfair_Display'] mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield size={44} className="mx-auto text-[#C9A34A] filter drop-shadow-[0_0_12px_rgba(201,163,74,0.5)]" />
                </div>
              ) : (
                <div className="relative text-4xl md:text-5xl lg:text-6xl font-black text-[#C9A34A] font-['Playfair_Display'] mb-4 stat-number group-hover:scale-110 transition-transform duration-300"
                  style={{ textShadow: '0 0 40px rgba(201,163,74,0.3)' }}
                >
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
              )}
              <p className="relative text-[#F5F5F5] font-bold text-lg mb-1">{stat.label}</p>
              <p className="relative text-[#A5A5A5] text-sm">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold max-w-7xl mx-auto px-6" />

      {/* ── FEATURED PROPERTIES ── */}
      <section ref={featuredRef} className="reveal py-20 md:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div>
            <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-3">Hand-Picked For You</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
              Featured Opportunities
            </h2>
          </div>
          <p className="text-[#A5A5A5] max-w-xs leading-relaxed text-sm md:text-right">
            Selected land opportunities across promising destinations in Maharashtra.
          </p>
        </div>

        {/* PropertyCard now uses WishlistContext internally — no prop drilling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredProps.map((p, i) => (
            <div key={p.id} className={`animate-fade-in-up animate-delay-${(i + 1) * 100}`}>
              <PropertyCard property={p} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2.5 px-10 py-4 border border-[rgba(201,163,74,0.30)] text-[#C9A34A] rounded-2xl hover:bg-[rgba(201,163,74,0.07)] hover:border-[rgba(201,163,74,0.55)] transition-all duration-300 font-semibold tracking-wide"
          >
            View All Properties <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── WHY PLOTTAGE HUB ── */}
      <section ref={whyRef} className="reveal py-20 md:py-28" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-3">Our Advantage</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
              Why Plottage Hub?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="relative p-8 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#101010] hover:border-[rgba(201,163,74,0.35)] transition-all duration-400 group overflow-hidden text-center"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,163,74,0.07) 0%, transparent 70%)' }}
                />
                <div className="relative w-16 h-16 rounded-2xl bg-[rgba(201,163,74,0.08)] border border-[rgba(201,163,74,0.18)] flex items-center justify-center mx-auto mb-6 group-hover:bg-[rgba(201,163,74,0.15)] group-hover:border-[rgba(201,163,74,0.35)] transition-all duration-300 group-hover:scale-110">
                  <f.icon size={26} className="text-[#C9A34A]" />
                </div>
                <h3 className="relative text-[#F5F5F5] font-black text-sm tracking-widest mb-4">{f.title}</h3>
                <p className="relative text-[#A5A5A5] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={howRef} className="reveal py-20 md:py-28 px-4 sm:px-6" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-3">Simple Process</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5]">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="p-7 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#101010] hover:border-[rgba(201,163,74,0.3)] transition-all duration-300 h-full">
                  <div className="text-6xl font-black text-[rgba(201,163,74,0.10)] font-['Playfair_Display'] mb-5 group-hover:text-[rgba(201,163,74,0.25)] transition-colors duration-300 leading-none">
                    {s.num}
                  </div>
                  <h3 className="text-[#F5F5F5] font-bold text-xl mb-3">{s.title}</h3>
                  <p className="text-[#A5A5A5] text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ChevronRight size={20} className="text-[rgba(201,163,74,0.30)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTMENT PHILOSOPHY ── */}
      <section ref={investRef} className="reveal py-20 md:py-28" style={{ background: 'var(--bg-secondary)' }} id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

            {/* Left Image */}
            <div className="relative rounded-3xl overflow-hidden h-80 lg:h-[520px] shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80"
                alt="Land investment landscape"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#080808]/80 to-transparent" />

              {/* Floating badge */}
              <div className="absolute top-6 left-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(201,163,74,0.35)] bg-[rgba(8,8,8,0.7)] backdrop-blur-md">
                  <MapPin size={14} className="text-[#C9A34A]" />
                  <span className="text-[#C9A34A] text-xs font-semibold">Maharashtra, India</span>
                </div>
              </div>

              {/* Floating appreciation stat */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-5 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A5A5A5] text-xs mb-1">Average Appreciation</p>
                    <p className="text-[#C9A34A] font-black text-2xl">12–18%<span className="text-sm font-normal ml-1">/ Year</span></p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[rgba(201,163,74,0.15)] border border-[rgba(201,163,74,0.35)] flex items-center justify-center">
                    <TrendingUp size={22} className="text-[#C9A34A]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-5">Investment Philosophy</p>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5] leading-tight mb-6">
                LAND ISN'T JUST PROPERTY.{' '}
                <span className="text-gold-gradient">IT'S POTENTIAL.</span>
              </h2>
              <p className="text-[#A5A5A5] mb-10 leading-relaxed text-base">
                Each plot we list is evaluated across multiple dimensions — location, connectivity, infrastructure development, tourism potential, and long-term growth trajectory.
              </p>

              {/* Metrics */}
              <div className="space-y-6">
                {[
                  { label: 'Location Advantage',    value: 90 },
                  { label: 'Connectivity',           value: 78 },
                  { label: 'Infrastructure Growth',  value: 85 },
                  { label: 'Tourism Potential',      value: 92 },
                  { label: 'Long-Term Development',  value: 88 },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-2.5">
                      <span className="text-[#A5A5A5]">{item.label}</span>
                      <span className="text-[#C9A34A] font-bold">{item.value}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/explore"
                className="inline-flex items-center gap-2.5 mt-12 btn-gold px-9 py-4 rounded-2xl font-bold tracking-wide"
              >
                <span className="flex items-center gap-2.5">
                  Explore Investment Opportunities <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 md:py-32 px-4 sm:px-6 relative overflow-hidden" id="contact">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,163,74,0.06) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 border-y border-[rgba(201,163,74,0.08)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-8">Begin Your Journey</p>
          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl font-black text-[#F5F5F5] leading-tight mb-8">
            YOUR NEXT INVESTMENT COULD START WITH ONE PLOT.
          </h2>
          <p className="text-[#A5A5A5] mb-12 max-w-lg mx-auto text-base leading-relaxed">
            Join hundreds of investors who have already discovered their next opportunity on Plottage Hub.
          </p>
          <Link
            to="/explore"
            className="btn-gold inline-flex items-center gap-3 px-12 py-5 rounded-2xl text-lg font-black tracking-widest shadow-[0_12px_40px_rgba(201,163,74,0.35)]"
          >
            <span className="flex items-center gap-3">
              EXPLORE PLOTS <ArrowRight size={22} />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
