import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Square, Heart, CheckCircle, ArrowRight, TrendingUp } from 'lucide-react';
import useWishlist from '../hooks/useWishlist';

// useContext: Consumes WishlistContext via useWishlist hook for global wishlist state
export default function PropertyCard({ property }) {
  const [imgError, setImgError] = useState(false);

  // useContext: Shared wishlist state — same across Home, Explore, PropertyDetails, Dashboard
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(property.id);

  const fallbackImg = `https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80`;

  const potentialColor = property.potential >= 90
    ? 'text-emerald-400'
    : property.potential >= 75
    ? 'text-[#C9A34A]'
    : 'text-[#A5A5A5]';

  return (
    <div className="card-hover rounded-xl overflow-hidden bg-[#151515] border border-[rgba(255,255,255,0.06)] group flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={imgError ? fallbackImg : property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={() => setImgError(true)}
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent opacity-60" />

        {/* Top badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {property.verified && (
            <span className="badge-verified flex items-center gap-1 text-[10px] font-semibold">
              <CheckCircle size={10} />
              VERIFIED
            </span>
          )}
          {property.featured && (
            <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-[#C9A34A] text-[#080808]">
              FEATURED
            </span>
          )}
        </div>

        {/* Wishlist — uses global WishlistContext */}
        <button
          onClick={() => toggleWishlist(property.id)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
            wishlisted
              ? 'bg-[#C9A34A] text-[#080808]'
              : 'bg-[#080808]/60 backdrop-blur-sm text-[#A5A5A5] hover:text-[#C9A34A] hover:bg-[#080808]/80'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={15} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Property type badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 text-[10px] font-semibold rounded bg-[#080808]/70 text-[#C9A34A] border border-[rgba(201,163,74,0.25)] backdrop-blur-sm uppercase tracking-wider">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="text-[#F5F5F5] font-semibold text-base leading-tight">{property.title}</h3>
          <div className={`flex items-center gap-1 text-xs font-semibold ${potentialColor} flex-shrink-0`}>
            <TrendingUp size={12} />
            <span>{property.potential}%</span>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[#A5A5A5] text-xs mb-3">
          <MapPin size={12} className="text-[#C9A34A] flex-shrink-0" />
          <span>{property.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {property.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="px-2 py-0.5 text-[10px] rounded bg-[rgba(255,255,255,0.04)] text-[#A5A5A5] border border-[rgba(255,255,255,0.06)]">
              {tag}
            </span>
          ))}
        </div>

        {/* Price & Size */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <div>
            <p className="text-[#C9A34A] font-bold text-lg">{property.priceDisplay}</p>
            <div className="flex items-center gap-1 text-[#A5A5A5] text-xs">
              <Square size={10} />
              <span>{property.sizeDisplay}</span>
            </div>
          </div>
          <Link
            to={`/property/${property.id}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#C9A34A] hover:text-[#E3C269] transition-colors group/btn"
          >
            View Details
            <ArrowRight size={14} className="transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
