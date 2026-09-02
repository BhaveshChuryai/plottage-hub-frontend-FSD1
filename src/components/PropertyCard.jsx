import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Maximize2, Heart, CheckCircle2, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';

export default function PropertyCard({ property }) {
  const [imgError, setImgError] = useState(false);
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState('');
  const [shineStyle, setShineStyle] = useState({ opacity: 0 });

  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(property.id);

  const fallbackImg = 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80';

  // 3D Tilt calculation
  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
    const rotateY = ((x - centerX) / centerX) * 6; // max 6 deg

    setTransformStyle(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
    setShineStyle({
      opacity: 0.15,
      background: `radial-gradient(circle at ${x}px ${y}px, rgba(201,163,74,0.4) 0%, transparent 60%)`,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setShineStyle({ opacity: 0 });
  }, []);

  const potentialScore = property.potential || 85;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      className="tilt-card relative flex flex-col h-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#121212] border border-[rgba(255,255,255,0.08)] group transition-all duration-300"
    >
      {/* Dynamic specular light layer */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-20"
        style={shineStyle}
      />

      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0a0a]">
        <img
          src={imgError ? fallbackImg : property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/30 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(201,163,74,0.12)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5 z-10">
          {property.verified && (
            <span className="badge-verified flex items-center gap-1 backdrop-blur-md shadow-md">
              <CheckCircle2 size={11} className="text-[#C9A34A]" />
              VERIFIED
            </span>
          )}
          {property.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-bold rounded-md bg-gradient-to-r from-[#C9A34A] to-[#E3C269] text-[#080808] shadow-[0_2px_10px_rgba(201,163,74,0.4)]">
              <Sparkles size={10} />
              FEATURED
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(property.id);
          }}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 z-10 ${
            wishlisted
              ? 'bg-[#C9A34A] text-[#080808] shadow-[0_0_15px_rgba(201,163,74,0.6)] scale-105'
              : 'bg-[#080808]/70 backdrop-blur-md text-[#A3A3A3] hover:text-[#C9A34A] hover:bg-[#080808] border border-[rgba(255,255,255,0.15)]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={wishlisted ? 0 : 2} />
        </button>

        {/* Floating Bottom Metadata in Image */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-lg bg-[#070707]/80 text-[#E3C269] border border-[rgba(201,163,74,0.3)] backdrop-blur-md">
            {property.type}
          </span>
          <span className="flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#070707]/80 text-[#34D399] border border-emerald-500/30 backdrop-blur-md">
            <TrendingUp size={11} />
            {potentialScore}% Growth
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-[#F5F5F5] font-bold text-base md:text-lg leading-snug mb-1.5 group-hover:text-[#E3C269] transition-colors duration-200 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-[#A3A3A3] text-xs mb-3">
          <MapPin size={13} className="text-[#C9A34A] flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {property.tags && property.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-[rgba(255,255,255,0.04)] text-[#A3A3A3] border border-[rgba(255,255,255,0.08)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer: Price, Size & CTA */}
        <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.07)] flex items-end justify-between gap-2">
          <div>
            <p className="text-[#C9A34A] font-black text-xl md:text-2xl leading-none mb-1 font-['Playfair_Display']">
              {property.priceDisplay}
            </p>
            <div className="flex items-center gap-1 text-[#A3A3A3] text-xs">
              <Maximize2 size={11} className="text-[#C9A34A]" />
              <span>{property.sizeDisplay}</span>
            </div>
          </div>

          <Link
            to={`/property/${property.id}`}
            className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold text-[#C9A34A] bg-[rgba(201,163,74,0.08)] border border-[rgba(201,163,74,0.25)] hover:bg-[#C9A34A] hover:text-[#080808] transition-all duration-200 group/btn shadow-sm"
          >
            <span>View Details</span>
            <ArrowRight size={13} className="transition-transform duration-200 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
