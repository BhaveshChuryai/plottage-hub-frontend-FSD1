import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Square, CheckCircle, Heart, Share2, Phone,
  TrendingUp, Car, Landmark, Wifi, Building, Compass,
  ChevronLeft, ChevronRight, Star, ArrowRight
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { properties } from '../data/properties';
import useWishlist from '../hooks/useWishlist';

function EnquiryForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Enter a valid 10-digit mobile number';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Enter a valid email';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1500);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 rounded-full bg-[rgba(201,163,74,0.1)] border-2 border-[rgba(201,163,74,0.40)] flex items-center justify-center mx-auto mb-5 animate-float">
          <CheckCircle size={32} className="text-[#C9A34A]" />
        </div>
        <h3 className="text-[#F5F5F5] font-bold text-lg mb-2">Enquiry Submitted!</h3>
        <p className="text-[#A5A5A5] text-sm mb-5">Our team will contact you shortly.</p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
          className="text-[#C9A34A] text-sm hover:text-[#E3C269] font-semibold underline underline-offset-4"
        >
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { key: 'name',  label: 'Full Name',      type: 'text',  placeholder: 'Your full name' },
        { key: 'phone', label: 'Phone Number',   type: 'tel',   placeholder: '10-digit mobile number' },
        { key: 'email', label: 'Email Address',  type: 'email', placeholder: 'your@email.com' },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key}>
          <label htmlFor={`enquiry-${key}`} className="block text-[#A5A5A5] text-xs font-semibold mb-2 uppercase tracking-wider">{label}</label>
          <input
            id={`enquiry-${key}`}
            type={type}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className={`w-full input-premium px-4 py-3.5 rounded-xl text-sm ${errors[key] ? 'border-red-500/70' : ''}`}
          />
          {errors[key] && <p className="text-red-400 text-xs mt-1.5">{errors[key]}</p>}
        </div>
      ))}
      <div>
        <label htmlFor="enquiry-message" className="block text-[#A5A5A5] text-xs font-semibold mb-2 uppercase tracking-wider">Message</label>
        <textarea
          id="enquiry-message"
          placeholder="Tell us your requirements..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className={`w-full input-premium px-4 py-3.5 rounded-xl text-sm resize-none ${errors.message ? 'border-red-500/70' : ''}`}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1.5">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase disabled:opacity-60"
      >
        <span>{loading ? 'Sending...' : 'SEND ENQUIRY'}</span>
      </button>
      <button
        type="button"
        className="w-full py-4 rounded-xl border border-[rgba(201,163,74,0.30)] text-[#C9A34A] text-sm font-semibold hover:bg-[rgba(201,163,74,0.07)] transition-all flex items-center justify-center gap-2"
      >
        <Phone size={15} /> SCHEDULE A CALL
      </button>
    </form>
  );
}

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id)) || properties[0];
  const [currentImg, setCurrentImg] = useState(0);

  // useContext: Consumes WishlistContext via useWishlist hook — same state everywhere
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(property.id);

  // useEffect: Sets route-specific document title with property name
  useEffect(() => {
    document.title = `Plottage Hub — ${property.title}`;
  }, [property.title]);

  const galleryImages = [
    property.image,
    `https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80`,
    `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80`,
    `https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80`,
  ];

  const insights = [
    { label: 'Location Advantage',  value: Math.min(99, property.potential + 2),  icon: Compass },
    { label: 'Road Connectivity',   value: Math.max(60, property.potential - 8),  icon: Car },
    { label: 'Tourism Potential',   value: Math.min(99, property.potential + 5),  icon: Landmark },
    { label: 'Infrastructure',      value: Math.max(55, property.potential - 15), icon: Building },
    { label: 'Long-Term Growth',    value: Math.min(99, property.potential + 1),  icon: TrendingUp },
  ];

  const highlights = [
    { label: 'Plot Size',     value: property.sizeDisplay,  icon: Square },
    { label: 'Road Access',   value: property.roadAccess,   icon: Car },
    { label: 'Location',      value: property.location,     icon: MapPin },
    { label: 'Connectivity',  value: property.connectivity, icon: Wifi },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[#A5A5A5] mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#C9A34A] transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link to="/explore" className="hover:text-[#C9A34A] transition-colors">Explore</Link>
          <ChevronRight size={14} />
          <span className="text-[#F5F5F5] font-medium truncate max-w-[200px]">{property.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left/Main */}
          <div className="lg:col-span-2 space-y-8">

            {/* Gallery */}
            <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.07)] shadow-[0_20px_60px_rgba(0,0,0,0.5)]" style={{ background: 'var(--bg-card)' }}>
              <div className="aspect-[16/9] relative group">
                <img
                  src={galleryImages[currentImg]}
                  alt={property.title}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/50 to-transparent" />

                {/* Nav arrows */}
                <button
                  onClick={() => setCurrentImg((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#080808]/75 backdrop-blur-sm border border-[rgba(201,163,74,0.30)] flex items-center justify-center text-[#C9A34A] hover:bg-[rgba(201,163,74,0.15)] hover:scale-110 transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImg((i) => (i + 1) % galleryImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#080808]/75 backdrop-blur-sm border border-[rgba(201,163,74,0.30)] flex items-center justify-center text-[#C9A34A] hover:bg-[rgba(201,163,74,0.15)] hover:scale-110 transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#080808]/75 backdrop-blur-sm text-[#A5A5A5] text-xs font-medium border border-[rgba(255,255,255,0.08)]">
                  {currentImg + 1} / {galleryImages.length}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.verified && (
                    <span className="badge-verified flex items-center gap-1 text-xs">
                      <CheckCircle size={11} /> VERIFIED
                    </span>
                  )}
                  <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    AVAILABLE
                  </span>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 p-3" style={{ background: 'var(--bg-card-alt, #111)' }}>
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`flex-1 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all duration-200 hover:opacity-100 ${i === currentImg ? 'border-[#C9A34A] shadow-[0_0_12px_rgba(201,163,74,0.35)]' : 'border-transparent opacity-50'}`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              <div>
                <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl lg:text-4xl font-bold text-[#F5F5F5] mb-3 leading-tight">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-[#A5A5A5]">
                  <MapPin size={16} className="text-[#C9A34A]" />
                  <span className="text-base">{property.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Wishlist — uses global WishlistContext */}
                <button
                  onClick={() => toggleWishlist(property.id)}
                  className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    wishlisted
                      ? 'bg-[#C9A34A] border-[#C9A34A] text-[#080808] shadow-[0_4px_20px_rgba(201,163,74,0.4)]'
                      : 'border-[rgba(201,163,74,0.30)] text-[#A5A5A5] hover:text-[#C9A34A] hover:border-[rgba(201,163,74,0.6)]'
                  }`}
                  aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <Heart size={17} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
                <button
                  className="w-11 h-11 rounded-full border-2 border-[rgba(201,163,74,0.30)] flex items-center justify-center text-[#A5A5A5] hover:text-[#C9A34A] hover:border-[rgba(201,163,74,0.6)] transition-all duration-200"
                  aria-label="Share property"
                >
                  <Share2 size={17} />
                </button>
              </div>
            </div>

            {/* Price & Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Price',   value: property.priceDisplay, accent: true },
                { label: 'Plot Size', value: property.sizeDisplay },
                { label: 'Type',    value: property.type },
                { label: 'Status',  value: 'Available', green: true },
              ].map(({ label, value, accent, green }) => (
                <div key={label} className="p-5 rounded-2xl border border-[rgba(255,255,255,0.07)] transition-all hover:border-[rgba(201,163,74,0.20)]" style={{ background: 'var(--bg-card)' }}>
                  <p className="text-[#A5A5A5] text-xs mb-1.5 font-medium uppercase tracking-wider">{label}</p>
                  <p className={`font-bold text-lg ${accent ? 'text-[#C9A34A]' : green ? 'text-emerald-400' : 'text-[#F5F5F5]'}`}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-7" style={{ background: 'var(--bg-card)' }}>
              <h2 className="text-[#F5F5F5] font-bold text-lg mb-4">About This Property</h2>
              <p className="text-[#A5A5A5] leading-relaxed text-[15px]">{property.description}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {property.tags.map((tag) => (
                  <span key={tag} className="badge-verified text-xs">{tag}</span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-[#F5F5F5] font-bold text-lg mb-5">Property Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-4 p-5 rounded-2xl border border-[rgba(255,255,255,0.07)] hover:border-[rgba(201,163,74,0.20)] transition-all" style={{ background: 'var(--bg-card)' }}>
                    <div className="w-10 h-10 rounded-xl bg-[rgba(201,163,74,0.09)] border border-[rgba(201,163,74,0.20)] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#C9A34A]" />
                    </div>
                    <div>
                      <p className="text-[#A5A5A5] text-xs mb-0.5 font-medium">{label}</p>
                      <p className="text-[#F5F5F5] font-semibold text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-7" style={{ background: 'var(--bg-card)' }}>
              <h2 className="text-[#F5F5F5] font-bold text-lg mb-5">Nearby Attractions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.nearbyAttractions.map((place) => (
                  <div key={place} className="flex items-center gap-3 text-sm text-[#A5A5A5] p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                    <Star size={12} className="text-[#C9A34A] flex-shrink-0" />
                    {place}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-[#F5F5F5] font-bold text-lg mb-5">Location Map</h2>
              <div className="map-container rounded-2xl h-72 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,163,74,0.04)] to-transparent" />
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(201,163,74,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,163,74,0.04) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-[rgba(201,163,74,0.15)] border-2 border-[#C9A34A] flex items-center justify-center animate-pulse shadow-[0_0_30px_rgba(201,163,74,0.3)]">
                    <MapPin size={26} className="text-[#C9A34A]" />
                  </div>
                  <div className="mt-3 px-4 py-2 bg-[#101010] border border-[rgba(201,163,74,0.35)] rounded-xl text-[#C9A34A] text-xs font-bold shadow-lg">
                    {property.location}
                  </div>
                </div>
                <div className="absolute left-0 right-0 top-1/2 h-px bg-[rgba(201,163,74,0.06)]" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[rgba(201,163,74,0.06)]" />
                <div className="absolute bottom-3 right-4 text-[#A5A5A5] text-[10px] opacity-50">* Illustrative map placeholder</div>
              </div>
            </div>

            {/* Investment Insights */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-7" style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[#F5F5F5] font-bold text-lg">Investment Insights</h2>
                <span className="text-[#A5A5A5] text-xs border border-[rgba(255,255,255,0.06)] px-2 py-1 rounded-lg">Demo Data</span>
              </div>
              <p className="text-[#A5A5A5] text-sm mb-8">Why this property stands out as an investment opportunity.</p>
              <div className="space-y-6">
                {insights.map(({ label, value, icon: Icon }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2.5 text-sm text-[#A5A5A5]">
                        <div className="w-7 h-7 rounded-lg bg-[rgba(201,163,74,0.08)] border border-[rgba(201,163,74,0.15)] flex items-center justify-center">
                          <Icon size={13} className="text-[#C9A34A]" />
                        </div>
                        {label}
                      </div>
                      <span className="text-[#C9A34A] font-bold text-sm">{value}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-bar" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Enquiry */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-2xl border border-[rgba(201,163,74,0.20)] p-7 shadow-[0_20px_60px_rgba(0,0,0,0.4)]" style={{ background: 'var(--bg-card)' }}>
                <div className="text-center pb-6 border-b border-[rgba(255,255,255,0.06)] mb-6">
                  <p className="text-[#C9A34A] font-black text-3xl mb-1">{property.priceDisplay}</p>
                  <p className="text-[#A5A5A5] text-sm">{property.sizeDisplay} · {property.type}</p>
                </div>
                <h3 className="text-[#F5F5F5] font-bold text-lg mb-5">Send Enquiry</h3>
                <EnquiryForm />
              </div>

              {/* Agent Card */}
              <div className="mt-5 rounded-2xl border border-[rgba(255,255,255,0.07)] p-5 flex items-center gap-4" style={{ background: 'var(--bg-card)' }}>
                <div className="w-12 h-12 rounded-full bg-[rgba(201,163,74,0.12)] border-2 border-[rgba(201,163,74,0.30)] flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(201,163,74,0.15)]">
                  <span className="text-[#C9A34A] font-black text-sm">PH</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F5] text-sm font-semibold">Plottage Hub Team</p>
                  <p className="text-[#A5A5A5] text-xs">Property Expert</p>
                </div>
                <a href="tel:+918855908374" className="text-[#C9A34A] hover:text-[#E3C269] transition-colors p-2" aria-label="Call agent">
                  <Phone size={18} />
                </a>
              </div>

              {/* Explore more */}
              <Link
                to="/explore"
                className="mt-5 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[rgba(201,163,74,0.20)] text-[#C9A34A] text-sm font-semibold hover:bg-[rgba(201,163,74,0.07)] transition-all"
              >
                <ArrowRight size={15} /> View Similar Properties
              </Link>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.06)]">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-[#A5A5A5] hover:text-[#C9A34A] transition-colors text-sm font-medium"
          >
            <ChevronLeft size={16} /> Back to Explore
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
