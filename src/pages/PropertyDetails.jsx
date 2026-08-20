import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin, Square, CheckCircle, ArrowLeft, Heart, Share2, Phone, Mail,
  TrendingUp, Car, Landmark, Wifi, Building, Compass, ChevronLeft, ChevronRight, Star
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { properties } from '../data/properties';

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
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-[rgba(201,163,74,0.1)] border border-[rgba(201,163,74,0.4)] flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-[#C9A34A]" />
        </div>
        <h3 className="text-[#F5F5F5] font-semibold mb-2">Enquiry Submitted!</h3>
        <p className="text-[#A5A5A5] text-sm">Our team will contact you shortly.</p>
        <button onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', message: '' }); }}
          className="mt-4 text-[#C9A34A] text-sm hover:text-[#E3C269] underline">
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {[
        { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your full name' },
        { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '10-digit mobile number' },
        { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com' },
      ].map(({ key, label, type, placeholder }) => (
        <div key={key}>
          <label className="block text-[#A5A5A5] text-xs font-medium mb-1.5">{label}</label>
          <input
            type={type}
            placeholder={placeholder}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className={`w-full input-premium px-4 py-3 rounded-lg text-sm ${errors[key] ? 'border-red-500/60' : ''}`}
          />
          {errors[key] && <p className="text-red-400 text-xs mt-1">{errors[key]}</p>}
        </div>
      ))}
      <div>
        <label className="block text-[#A5A5A5] text-xs font-medium mb-1.5">Message</label>
        <textarea
          placeholder="Tell us your requirements..."
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          rows={3}
          className={`w-full input-premium px-4 py-3 rounded-lg text-sm resize-none ${errors.message ? 'border-red-500/60' : ''}`}
        />
        {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-gold w-full py-3.5 rounded-lg font-semibold text-sm disabled:opacity-70"
      >
        <span>{loading ? 'Sending...' : 'SEND ENQUIRY'}</span>
      </button>
      <button
        type="button"
        className="w-full py-3.5 rounded-lg border border-[rgba(201,163,74,0.3)] text-[#C9A34A] text-sm font-semibold hover:bg-[rgba(201,163,74,0.05)] transition-all flex items-center justify-center gap-2"
      >
        <Phone size={16} /> SCHEDULE A CALL
      </button>
    </form>
  );
}

export default function PropertyDetails() {
  const { id } = useParams();
  const property = properties.find((p) => p.id === parseInt(id)) || properties[0];
  const [currentImg, setCurrentImg] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);

  // Extra images for gallery
  const galleryImages = [
    property.image,
    `https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=900&q=80`,
    `https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80`,
    `https://images.unsplash.com/photo-1501854140801-50d01698950b?w=900&q=80`,
  ];

  const insights = [
    { label: 'Location Advantage', value: Math.min(99, property.potential + 2), icon: Compass },
    { label: 'Road Connectivity', value: Math.max(60, property.potential - 8), icon: Car },
    { label: 'Tourism Potential', value: Math.min(99, property.potential + 5), icon: Landmark },
    { label: 'Infrastructure', value: Math.max(55, property.potential - 15), icon: Building },
    { label: 'Long-Term Growth', value: Math.min(99, property.potential + 1), icon: TrendingUp },
  ];

  const highlights = [
    { label: 'Plot Size', value: property.sizeDisplay, icon: Square },
    { label: 'Road Access', value: property.roadAccess, icon: Car },
    { label: 'Location', value: property.location, icon: MapPin },
    { label: 'Connectivity', value: property.connectivity, icon: Wifi },
  ];

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#A5A5A5] mb-6">
          <Link to="/" className="hover:text-[#C9A34A] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/explore" className="hover:text-[#C9A34A] transition-colors">Explore</Link>
          <span>/</span>
          <span className="text-[#F5F5F5]">{property.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left/Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="relative rounded-2xl overflow-hidden bg-[#101010] border border-[rgba(201,163,74,0.12)]">
              <div className="aspect-[16/9] relative">
                <img
                  src={galleryImages[currentImg]}
                  alt={property.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />

                {/* Nav arrows */}
                <button
                  onClick={() => setCurrentImg((i) => (i - 1 + galleryImages.length) % galleryImages.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#080808]/70 backdrop-blur-sm border border-[rgba(201,163,74,0.3)] flex items-center justify-center text-[#C9A34A] hover:bg-[rgba(201,163,74,0.1)] transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentImg((i) => (i + 1) % galleryImages.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#080808]/70 backdrop-blur-sm border border-[rgba(201,163,74,0.3)] flex items-center justify-center text-[#C9A34A] hover:bg-[rgba(201,163,74,0.1)] transition-all"
                >
                  <ChevronRight size={20} />
                </button>

                {/* Image counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-[#080808]/70 backdrop-blur-sm text-[#A5A5A5] text-xs">
                  {currentImg + 1} / {galleryImages.length}
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.verified && (
                    <span className="badge-verified flex items-center gap-1 text-xs">
                      <CheckCircle size={10} /> VERIFIED
                    </span>
                  )}
                  <span className="px-2 py-1 text-xs font-semibold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    AVAILABLE
                  </span>
                </div>
              </div>

              {/* Thumbnail strip */}
              <div className="flex gap-2 p-3">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={`flex-1 aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all ${i === currentImg ? 'border-[#C9A34A]' : 'border-transparent opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#F5F5F5] mb-2">
                  {property.title}
                </h1>
                <div className="flex items-center gap-2 text-[#A5A5A5]">
                  <MapPin size={16} className="text-[#C9A34A]" />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${wishlisted ? 'bg-[#C9A34A] border-[#C9A34A] text-[#080808]' : 'border-[rgba(201,163,74,0.3)] text-[#A5A5A5] hover:text-[#C9A34A]'}`}
                >
                  <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
                <button className="w-10 h-10 rounded-full border border-[rgba(201,163,74,0.3)] flex items-center justify-center text-[#A5A5A5] hover:text-[#C9A34A] transition-colors">
                  <Share2 size={16} />
                </button>
              </div>
            </div>

            {/* Price & Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)]">
                <p className="text-[#A5A5A5] text-xs mb-1">Price</p>
                <p className="text-[#C9A34A] font-bold text-xl">{property.priceDisplay}</p>
              </div>
              <div className="p-4 bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)]">
                <p className="text-[#A5A5A5] text-xs mb-1">Plot Size</p>
                <p className="text-[#F5F5F5] font-semibold">{property.sizeDisplay}</p>
              </div>
              <div className="p-4 bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)]">
                <p className="text-[#A5A5A5] text-xs mb-1">Type</p>
                <p className="text-[#F5F5F5] font-semibold">{property.type}</p>
              </div>
              <div className="p-4 bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)]">
                <p className="text-[#A5A5A5] text-xs mb-1">Status</p>
                <p className="text-emerald-400 font-semibold">Available</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)] p-6">
              <h2 className="text-[#F5F5F5] font-semibold mb-3">About This Property</h2>
              <p className="text-[#A5A5A5] leading-relaxed">{property.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {property.tags.map((tag) => (
                  <span key={tag} className="badge-verified text-xs">{tag}</span>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div>
              <h2 className="text-[#F5F5F5] font-semibold mb-4">Property Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-start gap-3 p-4 bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)]">
                    <div className="w-9 h-9 rounded-lg bg-[rgba(201,163,74,0.08)] border border-[rgba(201,163,74,0.2)] flex items-center justify-center flex-shrink-0">
                      <Icon size={16} className="text-[#C9A34A]" />
                    </div>
                    <div>
                      <p className="text-[#A5A5A5] text-xs mb-0.5">{label}</p>
                      <p className="text-[#F5F5F5] font-medium text-sm">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Attractions */}
            <div className="bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)] p-6">
              <h2 className="text-[#F5F5F5] font-semibold mb-4">Nearby Attractions</h2>
              <div className="space-y-3">
                {property.nearbyAttractions.map((place) => (
                  <div key={place} className="flex items-center gap-3 text-sm text-[#A5A5A5]">
                    <Star size={12} className="text-[#C9A34A]" />
                    {place}
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div>
              <h2 className="text-[#F5F5F5] font-semibold mb-4">Location Map</h2>
              <div className="map-container rounded-xl h-64 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,163,74,0.03)] to-transparent" />
                {/* Grid */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(201,163,74,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,163,74,0.05) 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
                }} />
                {/* Pin */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-[rgba(201,163,74,0.15)] border-2 border-[#C9A34A] flex items-center justify-center animate-pulse">
                    <MapPin size={24} className="text-[#C9A34A]" />
                  </div>
                  <div className="mt-2 px-3 py-1.5 bg-[#101010] border border-[rgba(201,163,74,0.3)] rounded-lg text-[#C9A34A] text-xs font-semibold">
                    {property.location}
                  </div>
                </div>
                {/* Road lines */}
                <div className="absolute left-0 right-0 top-1/2 h-px bg-[rgba(201,163,74,0.1)]" />
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[rgba(201,163,74,0.1)]" />
                <div className="absolute bottom-3 right-3 text-[#A5A5A5] text-xs">
                  * Illustrative map placeholder
                </div>
              </div>
            </div>

            {/* Investment Insights */}
            <div className="bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)] p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-[#F5F5F5] font-semibold">Investment Insights</h2>
                <span className="text-[#A5A5A5] text-xs">* Illustrative / Demo Data</span>
              </div>
              <p className="text-[#A5A5A5] text-sm mb-6">Why this property stands out as an investment opportunity.</p>
              <div className="space-y-5">
                {insights.map(({ label, value, icon: Icon }) => (
                  <div key={label}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-sm text-[#A5A5A5]">
                        <Icon size={14} className="text-[#C9A34A]" />
                        {label}
                      </div>
                      <span className="text-[#C9A34A] font-semibold text-sm">{value}%</span>
                    </div>
                    <div className="h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden">
                      <div className="progress-bar" style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Enquiry */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.2)] p-6 gold-glow">
                <div className="text-center pb-5 border-b border-[rgba(201,163,74,0.1)] mb-5">
                  <p className="text-[#C9A34A] font-bold text-2xl">{property.priceDisplay}</p>
                  <p className="text-[#A5A5A5] text-sm">{property.sizeDisplay} · {property.type}</p>
                </div>
                <h3 className="text-[#F5F5F5] font-semibold mb-4">Send Enquiry</h3>
                <EnquiryForm />
              </div>

              {/* Agent Card */}
              <div className="mt-4 bg-[#101010] rounded-xl border border-[rgba(201,163,74,0.12)] p-4 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-[rgba(201,163,74,0.15)] border border-[rgba(201,163,74,0.3)] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#C9A34A] font-bold text-sm">PH</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#F5F5F5] text-sm font-medium">Plottage Hub Team</p>
                  <p className="text-[#A5A5A5] text-xs">Property Expert</p>
                </div>
                <a href="tel:+919876543210" className="text-[#C9A34A] hover:text-[#E3C269] transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-10">
          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-[#A5A5A5] hover:text-[#C9A34A] transition-colors text-sm"
          >
            <ArrowLeft size={16} /> Back to Explore
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
