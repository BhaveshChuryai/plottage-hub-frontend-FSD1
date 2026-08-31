import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search, ChevronDown, Filter } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import { properties } from '../data/properties';
import useDebounce from '../hooks/useDebounce';

const locations = ['All', 'Shrivardhan', 'Diveagar', 'Harihareshwar', 'Khopoli', 'Pali', 'Alibaug', 'Panvel', 'Raigad'];
const types = ['All', 'Residential', 'Agricultural', 'Commercial'];
const purposes = ['All', 'Investment', 'Residential', 'Agricultural', 'Commercial'];
const sortOptions = ['Recommended', 'Price: Low to High', 'Price: High to Low', 'Newest'];

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div>
      <label className="block text-[#A5A5A5] text-xs font-medium uppercase tracking-wider mb-2">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full input-premium px-3 py-2.5 text-sm rounded-xl appearance-none cursor-pointer pr-8"
          aria-label={label}
        >
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5A5A5] pointer-events-none" />
      </div>
    </div>
  );
}

function PriceRange({ min, max, onMinChange, onMaxChange }) {
  return (
    <div>
      <label className="block text-[#A5A5A5] text-xs font-medium uppercase tracking-wider mb-2">Price Range</label>
      <div className="flex items-center gap-2">
        <input
          type="number"
          placeholder="Min (₹L)"
          value={min}
          onChange={(e) => onMinChange(e.target.value)}
          className="w-full input-premium px-3 py-2.5 text-sm rounded-xl"
          aria-label="Minimum price in lakhs"
        />
        <span className="text-[#A5A5A5] text-xs flex-shrink-0">to</span>
        <input
          type="number"
          placeholder="Max (₹L)"
          value={max}
          onChange={(e) => onMaxChange(e.target.value)}
          className="w-full input-premium px-3 py-2.5 text-sm rounded-xl"
          aria-label="Maximum price in lakhs"
        />
      </div>
    </div>
  );
}

export default function ExplorePlots() {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    location: 'All',
    type: 'All',
    purpose: 'All',
    minPrice: '',
    maxPrice: '',
    sort: 'Recommended',
    search: '',
  });
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // useEffect: Sets route-specific document title
  useEffect(() => {
    document.title = 'Plottage Hub — Explore Plots';
  }, []);

  // useEffect: Apply URL search params to filters on mount
  useEffect(() => {
    const loc = searchParams.get('location');
    const type = searchParams.get('type');
    setFilters((prev) => ({
      ...prev,
      location: loc || 'All',
      type: type || 'All',
    }));
  }, [searchParams]);

  // useEffect: Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Custom Hook: useDebounce prevents filtering on every keystroke
  const debouncedSearch = useDebounce(filters.search, 300);

  const updateFilter = (key, val) => setFilters((prev) => ({ ...prev, [key]: val }));

  // useMemo: Filters and sorts properties using the debounced search value
  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const priceInLakh = p.price / 100000;
      const matchLoc = filters.location === 'All' || p.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchType = filters.type === 'All' || p.type === filters.type;
      const matchPurpose = filters.purpose === 'All' || p.purpose === filters.purpose;
      const matchMin = !filters.minPrice || priceInLakh >= parseFloat(filters.minPrice);
      const matchMax = !filters.maxPrice || priceInLakh <= parseFloat(filters.maxPrice);
      const matchSearch = !debouncedSearch || p.title.toLowerCase().includes(debouncedSearch.toLowerCase()) || p.location.toLowerCase().includes(debouncedSearch.toLowerCase());
      return matchLoc && matchType && matchPurpose && matchMin && matchMax && matchSearch;
    }).sort((a, b) => {
      if (filters.sort === 'Price: Low to High') return a.price - b.price;
      if (filters.sort === 'Price: High to Low') return b.price - a.price;
      if (filters.sort === 'Newest') return b.id - a.id;
      return b.potential - a.potential;
    });
  }, [filters.location, filters.type, filters.purpose, filters.minPrice, filters.maxPrice, filters.sort, debouncedSearch]);

  const clearFilters = () => {
    setFilters({ location: 'All', type: 'All', purpose: 'All', minPrice: '', maxPrice: '', sort: 'Recommended', search: '' });
  };

  const hasActiveFilters = filters.location !== 'All' || filters.type !== 'All' || filters.purpose !== 'All' || filters.minPrice || filters.maxPrice || filters.search;

  const FilterPanel = () => (
    <div className="space-y-5">
      <div>
        <label className="block text-[#A5A5A5] text-xs font-medium uppercase tracking-wider mb-2">Search</label>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A5A5A5]" />
          <input
            type="text"
            placeholder="Property name or area..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="w-full input-premium pl-9 pr-3 py-2.5 text-sm rounded-xl"
            aria-label="Search properties"
          />
        </div>
      </div>

      <FilterSelect label="Location" value={filters.location} onChange={(v) => updateFilter('location', v)} options={locations} />
      <FilterSelect label="Property Type" value={filters.type} onChange={(v) => updateFilter('type', v)} options={types} />
      <FilterSelect label="Purpose" value={filters.purpose} onChange={(v) => updateFilter('purpose', v)} options={purposes} />
      <PriceRange
        min={filters.minPrice}
        max={filters.maxPrice}
        onMinChange={(v) => updateFilter('minPrice', v)}
        onMaxChange={(v) => updateFilter('maxPrice', v)}
      />

      {hasActiveFilters && (
        <button
          onClick={clearFilters}
          className="w-full py-2.5 text-sm text-[#C9A34A] border border-[rgba(201,163,74,0.25)] rounded-xl hover:bg-[rgba(201,163,74,0.05)] transition-all duration-200 flex items-center justify-center gap-2"
        >
          <X size={14} /> Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar />

      {/* Page Header */}
      <div className="bg-[#0a0a0a] border-b border-[rgba(255,255,255,0.06)] py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase mb-3">Property Discovery</p>
          <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold text-[#F5F5F5] mb-3">
            EXPLORE LAND OPPORTUNITIES
          </h1>
          <p className="text-[#A5A5A5] max-w-xl">
            Find properties that match your goals, location and budget.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Mobile Filter Toggle */}
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <p className="text-[#A5A5A5] text-sm">
            <span className="text-[#C9A34A] font-bold text-lg">{filtered.length}</span> properties found
          </p>
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 border border-[rgba(201,163,74,0.25)] text-[#C9A34A] rounded-xl text-sm font-semibold"
            aria-label="Open filters"
          >
            <Filter size={16} /> Filters {hasActiveFilters && <span className="w-2 h-2 bg-[#C9A34A] rounded-full" />}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-[#101010] border border-[rgba(255,255,255,0.06)] rounded-xl p-5">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-[#F5F5F5] font-semibold flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-[#C9A34A]" /> Filters
                </h3>
                {hasActiveFilters && (
                  <button onClick={clearFilters} className="text-[#C9A34A] text-xs hover:text-[#E3C269]">Clear</button>
                )}
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Sort + Count Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <p className="text-[#A5A5A5] text-sm hidden lg:block">
                <span className="text-[#C9A34A] font-bold text-lg">{filtered.length}</span> properties found
              </p>
              <div className="flex items-center gap-3 sm:ml-auto">
                <span className="text-[#A5A5A5] text-sm">Sort:</span>
                <div className="relative">
                  <select
                    value={filters.sort}
                    onChange={(e) => updateFilter('sort', e.target.value)}
                    className="input-premium px-4 py-2 text-sm rounded-xl appearance-none pr-8 cursor-pointer"
                    aria-label="Sort properties"
                  >
                    {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5A5A5] pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Active filter tags */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filters.location !== 'All' && (
                  <span className="badge-verified flex items-center gap-1.5 px-3 py-1.5 text-xs">
                    {filters.location}
                    <button onClick={() => updateFilter('location', 'All')} aria-label="Remove location filter"><X size={10} /></button>
                  </span>
                )}
                {filters.type !== 'All' && (
                  <span className="badge-verified flex items-center gap-1.5 px-3 py-1.5 text-xs">
                    {filters.type}
                    <button onClick={() => updateFilter('type', 'All')} aria-label="Remove type filter"><X size={10} /></button>
                  </span>
                )}
                {filters.purpose !== 'All' && (
                  <span className="badge-verified flex items-center gap-1.5 px-3 py-1.5 text-xs">
                    {filters.purpose}
                    <button onClick={() => updateFilter('purpose', 'All')} aria-label="Remove purpose filter"><X size={10} /></button>
                  </span>
                )}
              </div>
            )}

            {/* Grid */}
            {loading ? (
              <div className="text-center py-24">
                <div className="w-8 h-8 border-2 border-[#C9A34A] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-[#A5A5A5] text-sm">Loading properties...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-24">
                <div className="w-16 h-16 rounded-full bg-[rgba(201,163,74,0.08)] border border-[rgba(201,163,74,0.15)] flex items-center justify-center mx-auto mb-4">
                  <Search size={24} className="text-[#C9A34A]" />
                </div>
                <h3 className="text-[#F5F5F5] font-semibold mb-2">No properties found</h3>
                <p className="text-[#A5A5A5] text-sm mb-4">Try adjusting your filters.</p>
                <button onClick={clearFilters} className="btn-gold px-6 py-2.5 rounded-xl text-sm font-semibold">
                  <span>Clear Filters</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filtered.map((p) => (
                  <PropertyCard key={p.id} property={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileFilterOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-[#0d0d0d] border-l border-[rgba(201,163,74,0.12)] p-6 overflow-y-auto mobile-menu-open">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#F5F5F5] font-semibold flex items-center gap-2">
                <SlidersHorizontal size={16} className="text-[#C9A34A]" /> Filters
              </h3>
              <button onClick={() => setMobileFilterOpen(false)} className="text-[#A5A5A5] hover:text-[#F5F5F5]" aria-label="Close filters">
                <X size={20} />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full btn-gold mt-6 py-3 rounded-xl font-semibold text-sm"
            >
              <span>Show {filtered.length} Properties</span>
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
