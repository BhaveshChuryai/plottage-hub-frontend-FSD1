import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, TrendingUp, ShieldCheck, CheckCircle2,
  Sparkles, ChevronRight, BarChart3, Building2, UserCheck
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import PropertyCard from '../components/PropertyCard';
import Hero3DVisual from '../components/Hero3DVisual';
import InvestmentTerrainVisual from '../components/InvestmentTerrainVisual';
import { properties } from '../data/properties';
import useCountUp from '../hooks/useCountUp';

// Custom Hook: Reveal-on-scroll using IntersectionObserver
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add('visible');
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// Component using useCountUp custom hook for animated statistics
function AnimatedCounter({ target, suffix = '' }) {
  const { count, ref } = useCountUp(target, suffix);
  return <span ref={ref}>{count}{suffix}</span>;
}

const statsData = [
  { value: 372, suffix: '+', label: 'Acres Listed', sublabel: 'Prime Land Inventory' },
  { value: 25, suffix: '+', label: 'Strategic Locations', sublabel: 'High-Growth Corridors' },
  { value: 100, suffix: '+', label: 'Verified Enquiries', sublabel: 'Active Investor Network' },
  { value: 100, suffix: '%', label: 'Verified Discovery', sublabel: 'Due Diligence & Title Clear' },
];

const howItWorksSteps = [
  {
    num: '01',
    title: 'DISCOVER',
    desc: 'Explore high-potential, RERA-verified plots filtered by your budget, size, and location criteria.',
  },
  {
    num: '02',
    title: 'ANALYZE',
    desc: 'Review zoning data, price appreciation metrics, connectivity analysis, and master development plans.',
  },
  {
    num: '03',
    title: 'CONNECT',
    desc: 'Engage directly with verified property owners and schedule on-ground inspections with full transparency.',
  },
  {
    num: '04',
    title: 'INVEST',
    desc: 'Finalize your land acquisition with complete legal clarity, title verification, and zero brokerage.',
  },
];

const trustFeatures = [
  {
    icon: ShieldCheck,
    title: 'RERA VERIFIED',
    desc: 'Every parcel is independently validated for legal clear titles, zoning approvals, and government records.',
  },
  {
    icon: BarChart3,
    title: 'LOCATION INTELLIGENCE',
    desc: 'Comprehensive data on infrastructure growth, road connectivity, future highways, and historical appreciation.',
  },
  {
    icon: UserCheck,
    title: 'DIRECT OWNER CONNECT',
    desc: 'Seamless direct communication with property owners without intermediaries or inflated commissions.',
  },
  {
    icon: Building2,
    title: 'ZERO BROKERAGE',
    desc: 'Transparent pricing with direct deal structuring, saving you substantial transaction costs.',
  },
];

export default function Home() {
  const featuredProps = properties.filter((p) => p.featured).slice(0, 4);

  useEffect(() => {
    document.title = 'Plottage Hub — Find. Invest. Grow. | Premium Land Platform';
  }, []);

  const heroRef = useReveal();
  const statsRef = useReveal();
  const featuredRef = useReveal();
  const investRef = useReveal();
  const howRef = useReveal();
  const trustRef = useReveal();
  const ctaRef = useReveal();

  // Subtle Mouse Parallax on Hero
  const [heroOffset, setHeroOffset] = useState({ x: 0, y: 0 });
  const handleHeroMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 12;
    const y = (e.clientY / window.innerHeight - 0.5) * 12;
    setHeroOffset({ x, y });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Navbar />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: CINEMATIC 3D HERO
      ───────────────────────────────────────────────────────────── */}
      <section
        onMouseMove={handleHeroMouseMove}
        className="relative min-h-[90vh] lg:min-h-[96vh] flex items-center justify-center overflow-hidden pt-8 pb-16"
      >
        {/* Layered Cinematic Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=2400&q=85"
            alt="Scenic Premium Land Horizon"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out scale-105"
            style={{
              transform: `translate3d(${heroOffset.x * 0.4}px, ${heroOffset.y * 0.4}px, 0) scale(1.05)`,
            }}
          />

          {/* Controlled Cinematic Lighting Overlays (Preserves green land visibility) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#070707]/80 via-[#070707]/50 to-[#070707]" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070707]/70 via-transparent to-[#070707]/70" />
          <div className="absolute inset-0 hero-glow" />
        </div>

        {/* Floating Ambient Gold Orbs */}
        <div
          className="absolute top-1/4 left-1/12 w-96 h-96 rounded-full pointer-events-none animate-pulse-gold opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(201,163,74,0.18) 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/12 w-80 h-80 rounded-full pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, rgba(201,163,74,0.15) 0%, transparent 70%)' }}
        />

        {/* Hero Grid Container */}
        <div
          ref={heroRef}
          className="reveal relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full border border-[rgba(201,163,74,0.35)] bg-[rgba(201,163,74,0.08)] backdrop-blur-md mb-6 shadow-[0_4px_20px_rgba(201,163,74,0.12)]">
                <span className="w-2 h-2 rounded-full bg-[#C9A34A] animate-ping" />
                <Sparkles size={13} className="text-[#C9A34A]" />
                <span className="text-[#E3C269] text-xs font-bold tracking-widest uppercase">
                  Premium Land Investment Platform
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-['Playfair_Display'] text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-black text-[#F5F5F5] leading-none tracking-tight mb-6">
                FIND.{' '}
                <span className="text-shimmer">INVEST.</span>{' '}
                GROW.
              </h1>

              {/* Subtitle */}
              <p className="text-xl sm:text-2xl md:text-3xl text-[#E3C269] font-light tracking-wide mb-4">
                Discover land. Understand its potential. Invest with confidence.
              </p>

              {/* Supporting Paragraph */}
              <p className="text-[#A3A3A3] text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed">
                Plottage Hub connects discerning investors to high-growth, verified land parcels across Maharashtra with complete location intelligence and transparent due diligence.
              </p>

              {/* Hero Action CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
                <Link
                  to="/explore"
                  className="btn-gold w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold shadow-[0_8px_30px_rgba(201,163,74,0.35)]"
                >
                  <span className="flex items-center justify-center gap-2.5">
                    EXPLORE PLOTS <ArrowRight size={18} />
                  </span>
                </Link>

                <Link
                  to="/login"
                  className="btn-gold-outline w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-semibold"
                >
                  <span>LIST YOUR PROPERTY</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-[#A3A3A3]">
                {[
                  'RERA Verified Properties',
                  'Direct Owner Connect',
                  'Zero Brokerage',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-[#C9A34A] flex-shrink-0" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: 3D Holographic Terrain Mesh */}
            <div className="lg:col-span-5 hidden lg:block">
              <Hero3DVisual />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: PREMIUM SEARCH / FILTER BAR
          — Normal document flow. No negative margins.
          — Clear breathing room between hero and stats.
      ───────────────────────────────────────────────────────────── */}
      <section className="w-full bg-[#070707] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <SearchBar />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: NUMBERS THAT SPEAK (UNIFORM 4-CARD METRICS)
      ───────────────────────────────────────────────────────────── */}
      <section ref={statsRef} className="reveal py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-2">Our Track Record</p>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5]">
            Numbers That Speak
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, i) => (
            <div
              key={i}
              className="group relative flex flex-col justify-between p-8 rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#101010] hover:border-[rgba(201,163,74,0.4)] transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Background ambient glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'radial-gradient(circle at center, rgba(201,163,74,0.08) 0%, transparent 70%)' }}
              />

              {/* Number with Count-Up */}
              <div className="relative z-10 mb-4">
                <span className="font-['Playfair_Display'] text-4xl sm:text-5xl lg:text-5xl font-black text-[#C9A34A] leading-none tracking-tight block group-hover:scale-105 transition-transform duration-300">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </span>
              </div>

              {/* Labels */}
              <div className="relative z-10 border-t border-[rgba(255,255,255,0.06)] pt-4">
                <p className="text-[#F5F5F5] font-bold text-base mb-1">{stat.label}</p>
                <p className="text-[#A3A3A3] text-xs">{stat.sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider-gold max-w-7xl mx-auto px-6" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: FEATURED OPPORTUNITIES (4-COL RESPONSIVE GRID)
      ───────────────────────────────────────────────────────────── */}
      <section ref={featuredRef} className="reveal py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Proper Non-Overlapping Header Layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-2">HAND-PICKED FOR YOU</p>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5]">
              Featured Opportunities
            </h2>
          </div>
          <p className="text-[#A3A3A3] max-w-md text-sm sm:text-base leading-relaxed md:text-right">
            Curated plots in high-potential destinations across Maharashtra, selected for superior connectivity and appreciation.
          </p>
        </div>

        {/* 4-Card Responsive Grid with 3D Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProps.map((p) => (
            <div key={p.id} className="h-full">
              <PropertyCard property={p} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/explore"
            className="btn-gold-outline px-10 py-4 rounded-2xl font-bold text-sm tracking-wide inline-flex items-center gap-2"
          >
            <span>VIEW ALL PROPERTIES</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: INVESTMENT INTELLIGENCE (DASHBOARD + 3D MASTERPLAN)
      ───────────────────────────────────────────────────────────── */}
      <section ref={investRef} className="reveal py-20 md:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }} id="about">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Interactive 3D Terrain Masterplan */}
            <div className="lg:col-span-6">
              <InvestmentTerrainVisual />
            </div>

            {/* Right Column: Investment Intelligence Metrics & Content */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(201,163,74,0.1)] border border-[rgba(201,163,74,0.25)] text-[#C9A34A] text-xs font-bold uppercase tracking-wider mb-4">
                <TrendingUp size={13} />
                <span>INVESTMENT INTELLIGENCE</span>
              </div>

              <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5] leading-tight mb-5">
                LAND ISN'T JUST PROPERTY.{' '}
                <span className="text-gold-gradient">IT'S GENERATIONAL WEALTH.</span>
              </h2>

              <p className="text-[#A3A3A3] text-sm sm:text-base leading-relaxed mb-8">
                Every land opportunity on Plottage Hub undergoes multi-vector assessment — analyzing road connectivity, infrastructure expansions, zoning compliance, and historical appreciation trajectories.
              </p>

              {/* Progress Metrics Container */}
              <div className="space-y-5 mb-10">
                {[
                  { label: 'Location Score', value: 92 },
                  { label: 'Long-Term Development', value: 88 },
                  { label: 'Demand Index', value: 86 },
                  { label: 'Infrastructure Growth', value: 85 },
                ].map((item) => (
                  <div key={item.label} className="w-full">
                    <div className="flex justify-between text-xs sm:text-sm font-semibold mb-2">
                      <span className="text-[#A3A3A3]">{item.label}</span>
                      <span className="text-[#C9A34A]">{item.value}%</span>
                    </div>
                    <div className="progress-track w-full">
                      <div className="progress-bar" style={{ width: `${item.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Separate CTA Button (NO OVERLAP) */}
              <Link
                to="/explore"
                className="btn-gold px-8 py-4 rounded-2xl font-bold text-sm tracking-wide inline-flex items-center gap-2.5"
              >
                <span>EXPLORE INVESTMENT OPPORTUNITIES</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: HOW IT WORKS (HORIZONTAL TIMELINE)
      ───────────────────────────────────────────────────────────── */}
      <section ref={howRef} className="reveal py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="how-it-works">
        <div className="text-center mb-16">
          <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-2">STREAMLINED PROCESS</p>
          <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5]">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {howItWorksSteps.map((step, i) => (
            <div
              key={step.num}
              className="relative p-7 rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.08)] bg-[#101010] hover:border-[rgba(201,163,74,0.35)] transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="text-5xl font-black font-['Playfair_Display'] text-[rgba(201,163,74,0.15)] group-hover:text-[rgba(201,163,74,0.35)] transition-colors mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-[#F5F5F5] mb-2">{step.title}</h3>
                <p className="text-[#A3A3A3] text-sm leading-relaxed">{step.desc}</p>
              </div>

              {i < howItWorksSteps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 text-[#C9A34A] opacity-30">
                  <ChevronRight size={22} />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: TRUST SECTION (PROPERTY DISCOVERY YOU CAN TRUST)
      ───────────────────────────────────────────────────────────── */}
      <section ref={trustRef} className="reveal py-20 md:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-2">OUR ADVANTAGE</p>
            <h2 className="font-['Playfair_Display'] text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F5F5]">
              Property Discovery You Can Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-8 rounded-2xl md:rounded-3xl border border-[rgba(255,255,255,0.07)] bg-[#111111] hover:border-[rgba(201,163,74,0.35)] transition-all duration-300 text-center group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[rgba(201,163,74,0.1)] border border-[rgba(201,163,74,0.25)] flex items-center justify-center mx-auto mb-6 text-[#C9A34A] group-hover:scale-110 transition-transform">
                  <feat.icon size={26} />
                </div>
                <h3 className="text-sm font-bold tracking-widest uppercase text-[#F5F5F5] mb-3">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: FINAL CTA SECTION
      ───────────────────────────────────────────────────────────── */}
      <section ref={ctaRef} className="reveal py-24 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="contact">
        {/* Background glow and subtle borders */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,163,74,0.08) 0%, transparent 70%)' }}
        />
        <div className="absolute inset-0 border-y border-[rgba(201,163,74,0.12)] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-4">BEGIN YOUR JOURNEY</p>

          <h2 className="font-['Playfair_Display'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#F5F5F5] leading-tight mb-6">
            YOUR NEXT INVESTMENT COULD START WITH ONE PLOT.
          </h2>

          <p className="text-[#A3A3A3] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Join hundreds of forward-thinking investors and families securing high-growth land assets with Plottage Hub.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/explore"
              className="btn-gold w-full sm:w-auto px-10 py-5 rounded-2xl text-base font-black tracking-widest shadow-[0_10px_35px_rgba(201,163,74,0.4)]"
            >
              <span className="flex items-center justify-center gap-2.5">
                EXPLORE PLOTS <ArrowRight size={20} />
              </span>
            </Link>

            <Link
              to="/login"
              className="btn-gold-outline w-full sm:w-auto px-10 py-5 rounded-2xl text-base font-semibold"
            >
              <span>LIST YOUR PROPERTY</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
