import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  SlidersHorizontal,
  X,
  Search,
  Filter,
  Layers,
  MapPin,
  Building2,
  Target,
  IndianRupee,
  Maximize2,
  ArrowUpDown,
  RotateCcw,
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import PageContainer from '../components/PageContainer';
import CustomSelect from '../components/CustomSelect';
import { properties } from '../data/properties';
import useDebounce from '../hooks/useDebounce';

const locations = [
  'All',
  'Shrivardhan',
  'Diveagar',
  'Harihareshwar',
  'Khopoli',
  'Pali',
  'Alibaug',
  'Panvel',
  'Raigad',
  'Kolad',
];

const types = [
  'All',
  'Residential',
  'Agricultural',
  'Commercial',
  'Coastal',
  'Hill Station',
  'Mixed Use',
];

const purposes = [
  'All',
  'Investment',
  'Residential',
  'Agricultural',
  'Commercial',
];

const budgets = [
  'All',
  'Under ₹25 Lakh',
  '₹25L – ₹50L',
  '₹50L – ₹1 Cr',
  'Above ₹1 Cr',
];

const sizes = [
  'All',
  'Under 5,000 sq.ft.',
  '5,000 – 10,000 sq.ft.',
  '10,000 – 20,000 sq.ft.',
  '20,000+ sq.ft.',
];

const sortOptions = [
  'Recommended',
  'Price: Low to High',
  'Price: High to Low',
  'Size: Low to High',
  'Size: High to Low',
  'Newest',
];

function PriceRangeInputs({ min, max, onMinChange, onMaxChange }) {
  return (
    <div>
      <label className="block text-[#A5A5A5] text-xs font-bold uppercase tracking-widest mb-2">
        Custom Price (₹ Lakhs)
      </label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min ₹L"
          value={min}
          onChange={(e) => onMinChange(e.target.value)}
          className="w-full input-premium px-3.5 py-2.5 text-xs rounded-xl"
          aria-label="Minimum price in lakhs"
          min="0"
        />
        <span className="text-[#8A8A8A] text-xs font-bold flex-shrink-0">to</span>
        <input
          type="number"
          placeholder="Max ₹L"
          value={max}
          onChange={(e) => onMaxChange(e.target.value)}
          className="w-full input-premium px-3.5 py-2.5 text-xs rounded-xl"
          aria-label="Maximum price in lakhs"
          min="0"
        />
      </div>
    </div>
  );
}

function FilterPanel({
  filters,
  updateFilter,
  debouncedSearch,
  hasActiveFilters,
  clearFilters,
}) {
  return (
    <div className="space-y-4.5">
      {/* Search Bar Input */}
      <div>
        <label className="block text-[#A5A5A5] text-xs font-bold uppercase tracking-widest mb-2">
          Search
        </label>
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9A34A] pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search title, location, tag..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full input-premium pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-xl"
            aria-label="Search properties"
          />
          {filters.search && (
            <button
              onClick={() => updateFilter('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5A5A5] hover:text-[#F5F5F5] transition-colors"
              aria-label="Clear search text"
            >
              <X size={13} />
            </button>
          )}
        </div>
        {filters.search && debouncedSearch !== filters.search && (
          <p className="text-[#C9A34A] text-[10px] mt-1 flex items-center gap-1 opacity-75">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A34A] animate-ping" />
            Updating results…
          </p>
        )}
      </div>

      {/* Location */}
      <CustomSelect
        icon={MapPin}
        label="Location"
        placeholder="All Locations"
        value={filters.location}
        onChange={(v) => updateFilter('location', v)}
        options={locations}
        compact
      />

      {/* Property Type */}
      <CustomSelect
        icon={Building2}
        label="Property Type"
        placeholder="All Types"
        value={filters.type}
        onChange={(v) => updateFilter('type', v)}
        options={types}
        compact
      />

      {/* Purpose */}
      <CustomSelect
        icon={Target}
        label="Purpose"
        placeholder="All Purposes"
        value={filters.purpose}
        onChange={(v) => updateFilter('purpose', v)}
        options={purposes}
        compact
      />

      {/* Budget */}
      <CustomSelect
        icon={IndianRupee}
        label="Budget Range"
        placeholder="All Budgets"
        value={filters.budget}
        onChange={(v) => updateFilter('budget', v)}
        options={budgets}
        compact
      />

      {/* Plot Size */}
      <CustomSelect
        icon={Maximize2}
        label="Plot Size"
        placeholder="All Sizes"
        value={filters.size}
        onChange={(v) => updateFilter('size', v)}
        options={sizes}
        compact
      />

      {/* Custom Min / Max Price */}
      <PriceRangeInputs
        min={filters.minPrice}
        max={filters.maxPrice}
        onMinChange={(v) => updateFilter('minPrice', v)}
        onMaxChange={(v) => updateFilter('maxPrice', v)}
      />

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 mt-2 text-xs sm:text-sm text-[#C9A34A] border border-[rgba(201,163,74,0.35)] rounded-xl hover:bg-[rgba(201,163,74,0.1)] transition-all duration-200 flex items-center justify-center gap-2 font-bold cursor-pointer"
        >
          <RotateCcw size={13} /> Reset All Filters
        </button>
      )}
    </div>
  );
}

export default function ExplorePlots() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() => ({
    location: searchParams.get('location') || 'All',
    type: searchParams.get('type') || 'All',
    purpose: searchParams.get('purpose') || 'All',
    budget: searchParams.get('budget') || 'All',
    size: searchParams.get('size') || 'All',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sort: searchParams.get('sort') || 'Recommended',
    search: searchParams.get('search') || '',
  }));
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Plottage Hub — Explore Plots & Land Opportunities';
  }, []);

  // Quick initial load simulation
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  const debouncedSearch = useDebounce(filters.search, 250);

  const updateFilter = (key, val) => {
    setFilters((prev) => {
      const next = { ...prev, [key]: val };
      // Sync back to URL query params
      const params = new URLSearchParams();
      Object.entries(next).forEach(([k, v]) => {
        if (v && v !== 'All' && v !== 'Recommended') {
          params.set(k, v);
        }
      });
      setSearchParams(params, { replace: true });
      return next;
    });
  };

  const clearFilters = () => {
    const defaultFilters = {
      location: 'All',
      type: 'All',
      purpose: 'All',
      budget: 'All',
      size: 'All',
      minPrice: '',
      maxPrice: '',
      sort: 'Recommended',
      search: '',
    };
    setFilters(defaultFilters);
    setSearchParams(new URLSearchParams(), { replace: true });
  };

  // Real filtering calculation across all dimensions
  const filtered = useMemo(() => {
    return properties
      .filter((p) => {
        // Location
        const matchLoc =
          filters.location === 'All' ||
          p.location.toLowerCase().includes(filters.location.toLowerCase());

        // Property Type
        const matchType =
          filters.type === 'All' ||
          p.type.toLowerCase() === filters.type.toLowerCase() ||
          (filters.type === 'Coastal' && p.tags?.some((t) => /sea|beach|coastal/i.test(t))) ||
          (filters.type === 'Hill Station' && p.tags?.some((t) => /hill|mountain/i.test(t))) ||
          (filters.type === 'Mixed Use' && (p.type === 'Commercial' || p.type === 'Residential'));

        // Purpose
        const matchPurpose =
          filters.purpose === 'All' ||
          p.purpose.toLowerCase() === filters.purpose.toLowerCase();

        // Budget preset
        let matchBudget = true;
        if (filters.budget && filters.budget !== 'All') {
          if (filters.budget === 'Under ₹25 Lakh') matchBudget = p.price < 2500000;
          else if (filters.budget === '₹25L – ₹50L') matchBudget = p.price >= 2500000 && p.price <= 5000000;
          else if (filters.budget === '₹50L – ₹1 Cr') matchBudget = p.price >= 5000000 && p.price <= 10000000;
          else if (filters.budget === 'Above ₹1 Cr') matchBudget = p.price > 10000000;
        }

        // Size preset
        let matchSize = true;
        if (filters.size && filters.size !== 'All') {
          if (filters.size.includes('Under 5,000')) matchSize = p.size < 5000;
          else if (filters.size.includes('5,000 – 10,000') || filters.size.includes('5K – 10K')) matchSize = p.size >= 5000 && p.size <= 10000;
          else if (filters.size.includes('10,000 – 20,000') || filters.size.includes('10K – 20K')) matchSize = p.size >= 10000 && p.size <= 20000;
          else if (filters.size.includes('20,000+') || filters.size.includes('Above 20K')) matchSize = p.size > 20000;
        }

        // Custom Min/Max price (in Lakhs)
        const priceInLakh = p.price / 100000;
        const matchMin = !filters.minPrice || priceInLakh >= parseFloat(filters.minPrice);
        const matchMax = !filters.maxPrice || priceInLakh <= parseFloat(filters.maxPrice);

        // Search text
        const s = debouncedSearch.trim().toLowerCase();
        const matchSearch =
          !s ||
          p.title.toLowerCase().includes(s) ||
          p.location.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(s)));

        return (
          matchLoc &&
          matchType &&
          matchPurpose &&
          matchBudget &&
          matchSize &&
          matchMin &&
          matchMax &&
          matchSearch
        );
      })
      .sort((a, b) => {
        if (filters.sort === 'Price: Low to High') return a.price - b.price;
        if (filters.sort === 'Price: High to Low') return b.price - a.price;
        if (filters.sort === 'Size: Low to High') return a.size - b.size;
        if (filters.sort === 'Size: High to Low') return b.size - a.size;
        if (filters.sort === 'Newest') return b.id - a.id;
        return (b.potential || 0) - (a.potential || 0); // Recommended
      });
  }, [
    filters.location,
    filters.type,
    filters.purpose,
    filters.budget,
    filters.size,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
    debouncedSearch,
  ]);

  const hasActiveFilters =
    filters.location !== 'All' ||
    filters.type !== 'All' ||
    filters.purpose !== 'All' ||
    filters.budget !== 'All' ||
    filters.size !== 'All' ||
    !!filters.minPrice ||
    !!filters.maxPrice ||
    !!filters.search;

  return (
    <div className="min-h-screen w-full overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* Page Hero Header */}
      <div
        className="relative border-b border-[rgba(255,255,255,0.06)] py-12 md:py-16 overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 100% at 0% 50%, rgba(201,163,74,0.08) 0%, transparent 60%)',
          }}
        />
        <PageContainer>
          <div className="flex items-center gap-2 mb-3">
            <Layers size={15} className="text-[#C9A34A]" />
            <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase">
              Curated Property Portfolio
            </p>
          </div>
          <h1 className="font-['Playfair_Display'] text-[clamp(2rem,4vw,3.5rem)] font-black text-[#F5F5F5] leading-tight tracking-tight mb-3">
            EXPLORE LAND OPPORTUNITIES
          </h1>
          <p className="text-[#A3A3A3] max-w-2xl text-[clamp(0.95rem,1.2vw,1.1rem)] leading-relaxed">
            Discover verified parcels across high-growth corridors in Maharashtra. Filter by budget, dimensions, and zoning.
          </p>
        </PageContainer>
      </div>

      <PageContainer className="py-8 md:py-10">
        {/* Mobile Filter Toggle Button & Count Bar */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="text-[#A5A5A5] text-sm font-medium">
            <span className="text-[#C9A34A] font-black text-xl">{filtered.length}</span>
            <span className="ml-1.5">properties found</span>
          </p>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-[rgba(201,163,74,0.35)] text-[#C9A34A] rounded-xl text-xs font-bold hover:bg-[rgba(201,163,74,0.08)] transition-all cursor-pointer"
            aria-label="Open filters drawer"
          >
            <Filter size={14} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 bg-[#C9A34A] rounded-full animate-pulse" />
            )}
          </button>
        </div>

        <div className="flex gap-8 items-start">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div
              className="sticky top-28 rounded-2xl p-5 border border-[rgba(255,255,255,0.08)] shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              style={{ background: 'var(--bg-card)' }}
            >
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-[rgba(255,255,255,0.06)]">
                <h3 className="text-[#F5F5F5] font-bold text-sm flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-[#C9A34A]" />
                  <span>Filter Properties</span>
                </h3>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-[#C9A34A] text-xs hover:text-[#E3C269] font-semibold cursor-pointer transition-colors"
                  >
                    Reset All
                  </button>
                )}
              </div>
              <FilterPanel
                filters={filters}
                updateFilter={updateFilter}
                debouncedSearch={debouncedSearch}
                hasActiveFilters={hasActiveFilters}
                clearFilters={clearFilters}
              />
            </div>
          </aside>

          {/* Main Property Results Content */}
          <div className="flex-1 min-w-0">
            {/* Header: Found count + Sort Dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center gap-2.5">
                <span className="text-[#C9A34A] font-black text-2xl font-['Playfair_Display']">
                  {filtered.length}
                </span>
                <span className="text-[#A3A3A3] text-sm font-medium">
                  {filtered.length === 1 ? 'property available' : 'properties available'}
                </span>
                {hasActiveFilters && (
                  <span className="text-[11px] font-bold text-[#C9A34A] bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.25)] px-2.5 py-0.5 rounded-full">
                    Filtered
                  </span>
                )}
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-2.5 sm:ml-auto w-full sm:w-auto">
                <span className="text-[#A5A5A5] text-xs font-semibold whitespace-nowrap flex items-center gap-1">
                  <ArrowUpDown size={12} className="text-[#C9A34A]" />
                  Sort By:
                </span>
                <div className="w-full sm:w-48">
                  <CustomSelect
                    value={filters.sort}
                    onChange={(v) => updateFilter('sort', v)}
                    options={sortOptions}
                    compact
                  />
                </div>
              </div>
            </div>

            {/* Active Filter Tags (Quick Clear) */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-[#8A8A8A] font-medium mr-1">Active:</span>

                {filters.location !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.3)] text-[#E3C269]">
                    📍 {filters.location}
                    <button
                      onClick={() => updateFilter('location', 'All')}
                      className="hover:text-white cursor-pointer ml-0.5"
                      aria-label="Remove location filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {filters.type !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.3)] text-[#E3C269]">
                    🏗 {filters.type}
                    <button
                      onClick={() => updateFilter('type', 'All')}
                      className="hover:text-white cursor-pointer ml-0.5"
                      aria-label="Remove type filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {filters.purpose !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.3)] text-[#E3C269]">
                    🎯 {filters.purpose}
                    <button
                      onClick={() => updateFilter('purpose', 'All')}
                      className="hover:text-white cursor-pointer ml-0.5"
                      aria-label="Remove purpose filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {filters.budget !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.3)] text-[#E3C269]">
                    💰 {filters.budget}
                    <button
                      onClick={() => updateFilter('budget', 'All')}
                      className="hover:text-white cursor-pointer ml-0.5"
                      aria-label="Remove budget filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {filters.size !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.3)] text-[#E3C269]">
                    📐 {filters.size}
                    <button
                      onClick={() => updateFilter('size', 'All')}
                      className="hover:text-white cursor-pointer ml-0.5"
                      aria-label="Remove size filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {(filters.minPrice || filters.maxPrice) && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.3)] text-[#E3C269]">
                    ₹ {filters.minPrice || '0'}L – {filters.maxPrice || '∞'}L
                    <button
                      onClick={() => {
                        updateFilter('minPrice', '');
                        updateFilter('maxPrice', '');
                      }}
                      className="hover:text-white cursor-pointer ml-0.5"
                      aria-label="Remove price filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                {filters.search && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.3)] text-[#E3C269]">
                    🔍 "{filters.search}"
                    <button
                      onClick={() => updateFilter('search', '')}
                      className="hover:text-white cursor-pointer ml-0.5"
                      aria-label="Remove search filter"
                    >
                      <X size={11} />
                    </button>
                  </span>
                )}

                <button
                  onClick={clearFilters}
                  className="text-xs text-[#A3A3A3] hover:text-[#C9A34A] underline underline-offset-2 ml-1 cursor-pointer transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Property Cards Grid */}
            {loading ? (
              <div className="text-center py-28">
                <div className="w-12 h-12 border-2 border-[#C9A34A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#A5A5A5] text-sm font-medium">
                  Loading verified properties…
                </p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24 px-4 rounded-3xl border border-[rgba(255,255,255,0.06)] bg-[#101010]/80">
                <div className="w-18 h-18 rounded-full bg-[rgba(201,163,74,0.08)] border border-[rgba(201,163,74,0.25)] flex items-center justify-center mx-auto mb-4 text-[#C9A34A]">
                  <Search size={26} />
                </div>
                <h3 className="font-['Playfair_Display'] text-[#F5F5F5] font-bold text-2xl mb-2">
                  No Matching Properties Found
                </h3>
                <p className="text-[#A5A5A5] text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  No properties matched your exact criteria. Try widening your budget, selecting "All Locations", or clearing active filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="btn-gold px-8 py-3.5 rounded-xl text-sm font-bold shadow-md cursor-pointer inline-flex items-center gap-2"
                >
                  <RotateCcw size={15} />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <div key={p.id} className="h-full">
                    <PropertyCard property={p} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </PageContainer>

      {/* Mobile Filters Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div
            className="absolute right-0 top-0 bottom-0 w-84 max-w-[85vw] border-l border-[rgba(201,163,74,0.2)] p-6 overflow-y-auto animate-fade-in-right"
            style={{ background: '#0d0d0d' }}
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(255,255,255,0.08)]">
              <h3 className="text-[#F5F5F5] font-bold text-base flex items-center gap-2">
                <SlidersHorizontal size={17} className="text-[#C9A34A]" />
                Filters
              </h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="text-[#A5A5A5] hover:text-[#F5F5F5] p-1 cursor-pointer"
                aria-label="Close filters drawer"
              >
                <X size={20} />
              </button>
            </div>
            <FilterPanel
              filters={filters}
              updateFilter={updateFilter}
              debouncedSearch={debouncedSearch}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
            />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full btn-gold mt-6 py-3.5 rounded-xl font-bold text-sm cursor-pointer shadow-lg"
            >
              <span>Show {filtered.length} Properties</span>
            </button>
          </div>
        </div>
      )}

      {/* Spacing & Divider before Footer */}
      <div className="border-t border-[rgba(255,255,255,0.08)] mt-16" />
      <Footer />
    </div>
  );
}
