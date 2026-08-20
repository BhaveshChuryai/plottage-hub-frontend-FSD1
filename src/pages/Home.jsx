import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, TrendingUp, Shield, Globe, Compass, Zap, CheckCircle, Star, MapPin, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';

// Reveal on scroll hook
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Animated counter
function AnimatedCounter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1500;
        const step = (target / duration) * 16;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: 372, suffix: '+', label: 'Acres', sublabel: 'Land Opportunities' },
  { value: 25, suffix: '+', label: 'Locations', sublabel: 'Premium Destinations' },
  { value: 100, suffix: '+', label: 'Enquiries', sublabel: 'Property Enquiries' },
  { value: null, label: 'Verified', sublabel: 'Property Discovery', special: true },
];

const features = [
  {
    icon: Compass,
    title: 'DISCOVER',
    desc: 'Explore curated land opportunities tailored to your requirements, location preferences, and investment goals.',
  },
  {
    icon: TrendingUp,
    title: 'EVALUATE',
    desc: 'Understand pricing, infrastructure, location advantages, and key property characteristics with detailed insights.',
  },
  {
    icon: Star,
    title: 'INVEST',
    desc: 'Identify high-potential land with long-term appreciation in Maharashtra\'s fastest growing corridors.',
  },
  {
    icon: Globe,
    title: 'CONNECT',
    desc: 'Send direct enquiries to property professionals and schedule site visits with a single click.',
  },
];

const steps = [
  { num: '01', title: 'Search', desc: 'Find properties based on your location, budget, and property type preferences.' },
  { num: '02', title: 'Explore', desc: 'Review detailed property information, location insights, and investment potential.' },
  { num: '03', title: 'Compare', desc: 'Evaluate multiple opportunities side by side to make an informed decision.' },
  { num: '04', title: 'Connect', desc: 'Send an enquiry and connect directly with our property team for guidance.' },
];

export default function Home() {
  const [wishlisted, setWishlisted] = useState([]);
  const featuredProps = properties.filter((p) => p.featured).slice(0, 4);

  const toggleWishlist = (id) => {
    setWishlisted((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const heroRef = useReveal();
  const statsRef = useReveal();
  const featuredRef = useReveal();
  const whyRef = useReveal();
  const howRef = useReveal();
  const investRef = useReveal();

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden -mt-16 md:-mt-20 pt-16 md:pt-20">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1920&q=85"
            alt="Premium Land"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#080808]/80 via-[#080808]/60 to-[#080808]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/40 to-transparent" />
        </div>

        {/* Hero Content */}
        <div ref={heroRef} className="reveal relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 pt-16 md:pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(201,163,74,0.3)] bg-[rgba(201,163,74,0.05)] mb-8">
            <span className="w-2 h-2 bg-[#C9A34A] rounded-full animate-pulse" />
            <span className="text-[#C9A34A] text-xs font-medium tracking-widest uppercase">Premium Land Investment Platform</span>
          </div>

          <h1 className="font-['Playfair_Display'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F5F5] leading-tight mb-6">
            FIND.{' '}
            <span className="text-shimmer">INVEST.</span>{' '}
            GROW.
          </h1>

          <p className="text-xl md:text-2xl text-[#C9A34A] font-light mb-4">
            Discover land. Understand its potential. Invest with confidence.
          </p>

          <p className="text-[#A5A5A5] text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Plottage Hub brings property discovery, location insights and buyer enquiries together in one simple platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Link to="/explore" className="btn-gold px-8 py-4 rounded-lg text-base font-semibold flex items-center gap-2">
              <span className="flex items-center gap-2">
                Explore Plots <ArrowRight size={18} />
              </span>
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 rounded-lg border border-[rgba(201,163,74,0.3)] text-[#F5F5F5] text-base font-semibold hover:border-[rgba(201,163,74,0.6)] hover:bg-[rgba(201,163,74,0.05)] transition-all duration-300"
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

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[rgba(201,163,74,0.5)]" />
          <div className="w-1.5 h-1.5 bg-[#C9A34A] rounded-full" />
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <section className="relative z-20 max-w-6xl mx-auto px-4 sm:px-6 -mt-8 mb-20">
        <SearchBar />
      </section>

      {/* ── TRUST STATS ── */}
      <section ref={statsRef} className="reveal py-16 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center p-6 md:p-8 rounded-xl border border-[rgba(201,163,74,0.12)] bg-[#101010] hover:border-[rgba(201,163,74,0.3)] transition-all duration-300 group"
            >
              {stat.special ? (
                <div className="text-4xl md:text-5xl font-bold text-[#C9A34A] font-['Playfair_Display'] mb-2 group-hover:scale-110 transition-transform duration-300">
                  <Shield size={42} className="mx-auto text-[#C9A34A]" />
                </div>
              ) : (
                <div className="text-4xl md:text-5xl font-bold text-[#C9A34A] font-['Playfair_Display'] mb-2 stat-number group-hover:scale-110 transition-transform duration-300">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
              )}
              <p className="text-[#F5F5F5] font-semibold text-lg">{stat.label}</p>
              <p className="text-[#A5A5A5] text-sm">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold max-w-7xl mx-auto px-6" />

      {/* ── FEATURED PROPERTIES ── */}
      <section ref={featuredRef} className="reveal py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase mb-3">Hand-Picked For You</p>
          <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-4">
            Featured Opportunities
          </h2>
          <p className="text-[#A5A5A5] max-w-xl mx-auto">
            Explore selected land opportunities across promising destinations in Maharashtra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredProps.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isWishlisted={wishlisted.includes(p.id)}
              onWishlistToggle={toggleWishlist}
            />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[rgba(201,163,74,0.3)] text-[#C9A34A] rounded-lg hover:bg-[rgba(201,163,74,0.05)] hover:border-[rgba(201,163,74,0.6)] transition-all duration-300 font-semibold"
          >
            View All Properties <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── WHY PLOTTAGE HUB ── */}
      <section ref={whyRef} className="reveal py-20 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <p className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase mb-3">Our Advantage</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#F5F5F5]">
              Why Plottage Hub?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="p-8 rounded-xl border border-[rgba(201,163,74,0.12)] bg-[#101010] hover:border-[rgba(201,163,74,0.35)] hover:bg-[#111] transition-all duration-300 group text-center"
              >
                <div className="w-14 h-14 rounded-xl bg-[rgba(201,163,74,0.08)] border border-[rgba(201,163,74,0.2)] flex items-center justify-center mx-auto mb-5 group-hover:bg-[rgba(201,163,74,0.15)] transition-colors duration-300">
                  <f.icon size={24} className="text-[#C9A34A]" />
                </div>
                <h3 className="text-[#F5F5F5] font-bold text-sm tracking-widest mb-3">{f.title}</h3>
                <p className="text-[#A5A5A5] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section ref={howRef} className="reveal py-20 px-4 sm:px-6" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase mb-3">Simple Process</p>
            <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#F5F5F5]">
              How It Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={i} className="relative group">
                <div className="p-6 rounded-xl border border-[rgba(201,163,74,0.12)] bg-[#101010] hover:border-[rgba(201,163,74,0.3)] transition-all duration-300 h-full">
                  <div className="text-5xl font-bold text-[rgba(201,163,74,0.15)] font-['Playfair_Display'] mb-4 group-hover:text-[rgba(201,163,74,0.3)] transition-colors">
                    {s.num}
                  </div>
                  <h3 className="text-[#F5F5F5] font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-[#A5A5A5] text-sm leading-relaxed">{s.desc}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                    <ChevronRight size={20} className="text-[rgba(201,163,74,0.3)]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INVESTMENT SECTION ── */}
      <section ref={investRef} className="reveal py-20 bg-[#0a0a0a]" id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="relative rounded-2xl overflow-hidden h-80 lg:h-[500px]">
              <img
                src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80"
                alt="Investment"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[#080808]/80 to-transparent" />
              {/* Floating stat */}
              <div className="absolute bottom-6 left-6 right-6 glass-card p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A5A5A5] text-xs mb-1">Average Appreciation</p>
                    <p className="text-[#C9A34A] font-bold text-xl">12–18% / Year</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[rgba(201,163,74,0.15)] border border-[rgba(201,163,74,0.3)] flex items-center justify-center">
                    <TrendingUp size={20} className="text-[#C9A34A]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div>
              <p className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase mb-4">Investment Philosophy</p>
              <h2 className="font-['Playfair_Display'] text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F5F5] leading-tight mb-6">
                LAND ISN'T JUST PROPERTY.{' '}
                <span className="text-gold-gradient">IT'S POTENTIAL.</span>
              </h2>
              <p className="text-[#A5A5A5] mb-8 leading-relaxed">
                Each plot we list is evaluated across multiple dimensions — location, connectivity, infrastructure development, tourism potential, and long-term growth trajectory.
              </p>

              {[
                { label: 'Location Advantage', value: 90 },
                { label: 'Connectivity', value: 78 },
                { label: 'Infrastructure Growth', value: 85 },
                { label: 'Tourism Potential', value: 92 },
                { label: 'Long-Term Development', value: 88 },
              ].map((item) => (
                <div key={item.label} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#A5A5A5]">{item.label}</span>
                    <span className="text-[#C9A34A] font-semibold">{item.value}%</span>
                  </div>
                  <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                    <div
                      className="progress-bar"
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                </div>
              ))}

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 mt-8 btn-gold px-8 py-4 rounded-lg font-semibold"
              >
                <span className="flex items-center gap-2">
                  Explore Investment Opportunities <ArrowRight size={18} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden" id="contact">
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,163,74,0.05)] to-transparent" />
        <div className="absolute inset-0 border-y border-[rgba(201,163,74,0.1)]" />
        <div className="relative max-w-4xl mx-auto text-center">
          <p className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase mb-6">Begin Your Journey</p>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] leading-tight mb-6">
            YOUR NEXT INVESTMENT COULD START WITH ONE PLOT.
          </h2>
          <p className="text-[#A5A5A5] mb-10 max-w-lg mx-auto">
            Join hundreds of investors who have already discovered their next opportunity on Plottage Hub.
          </p>
          <Link to="/explore" className="btn-gold inline-flex items-center gap-2 px-10 py-5 rounded-xl text-lg font-bold tracking-wide">
            <span className="flex items-center gap-2">
              EXPLORE PLOTS <ArrowRight size={20} />
            </span>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
