import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Square, Heart, CheckCircle, ArrowRight, TrendingUp, Zap } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';

// useContext: Consumes WishlistContext via useWishlist hook for global wishlist state
export default function PropertyCard({ property }) {
  const [imgError, setImgError] = useState(false);

  // useContext: Shared wishlist state — same across Home, Explore, PropertyDetails, Dashboard
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(property.id);

  const fallbackImg = `https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80`;

  const potentialColor =
    property.potential >= 90 ? 'text-emerald-400' :
    property.potential >= 75 ? 'text-[#C9A34A]' :
    'text-[#A5A5A5]';

  const potentialBg =
    property.potential >= 90 ? 'bg-emerald-500/10 border-emerald-500/20' :
    property.potential >= 75 ? 'bg-[rgba(201,163,74,0.10)] border-[rgba(201,163,74,0.25)]' :
    'bg-white/5 border-white/10';

  return (
    <div className="card-hover rounded-2xl overflow-hidden bg-[#111111] border border-[rgba(255,255,255,0.07)] group flex flex-col h-full relative">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imgError ? fallbackImg : property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={() => setImgError(true)}
          loading="lazy"
        />

        {/* Multi-layer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(201,163,74,0.06)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          {property.verified && (
            <span className="badge-verified flex items-center gap-1 text-[10px]">
              <CheckCircle size={9} />
              VERIFIED
            </span>
          )}
          {property.featured && (
            <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-md bg-[#C9A34A] text-[#080808] shadow-lg shadow-[rgba(201,163,74,0.3)]">
              <Zap size={9} />
              FEATURED
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => toggleWishlist(property.id)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
            wishlisted
              ? 'bg-[#C9A34A] text-[#080808] shadow-lg shadow-[rgba(201,163,74,0.4)]'
              : 'bg-[#080808]/65 backdrop-blur-sm text-[#A5A5A5] hover:bg-[rgba(201,163,74,0.15)] hover:text-[#C9A34A] border border-[rgba(255,255,255,0.12)]'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} strokeWidth={wishlisted ? 0 : 1.5} />
        </button>

        {/* Property type + potential — bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-3 pb-3">
          <span className="px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#080808]/75 text-[#C9A34A] border border-[rgba(201,163,74,0.3)] backdrop-blur-sm uppercase tracking-widest">
            {property.type}
          </span>
          <span className={`flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold rounded-lg border backdrop-blur-sm ${potentialBg} ${potentialColor}`}>
            <TrendingUp size={10} />
            {property.potential}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[#F5F5F5] font-semibold text-[15px] leading-snug mb-2 group-hover:text-[#E3C269] transition-colors duration-300 line-clamp-2">
          {property.title}
        </h3>

        <div className="flex items-center gap-1.5 text-[#A5A5A5] text-xs mb-3">
          <MapPin size={11} className="text-[#C9A34A] flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-md bg-[rgba(255,255,255,0.04)] text-[#A5A5A5] border border-[rgba(255,255,255,0.07)] tracking-wide"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Price & Size + CTA */}
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-[rgba(255,255,255,0.06)]">
          <div>
            <p className="text-[#C9A34A] font-bold text-xl leading-none mb-1">{property.priceDisplay}</p>
            <div className="flex items-center gap-1 text-[#A5A5A5] text-xs">
              <Square size={10} />
              <span>{property.sizeDisplay}</span>
            </div>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 bg-[rgba(201,163,74,0.08)] text-[#C9A34A] border border-[rgba(201,163,74,0.2)] hover:bg-[rgba(201,163,74,0.15)] hover:border-[rgba(201,163,74,0.4)] group/btn"
          >
            View Details
            <ArrowRight size={13} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Gold border glow on hover */}
      <div className="absolute inset-0 rounded-2xl border border-[rgba(201,163,74,0)] group-hover:border-[rgba(201,163,74,0.25)] transition-all duration-500 pointer-events-none" />
    </div>
  );
}
