import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, IndianRupee, Maximize2, Search } from 'lucide-react';
import CustomSelect from './CustomSelect';

/* ─────────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────────── */
const locations = [
  'Shrivardhan', 'Diveagar', 'Harihareshwar', 'Khopoli',
  'Pali', 'Alibaug', 'Panvel', 'Raigad',
];
const types   = ['Residential', 'Agricultural', 'Commercial', 'Coastal', 'Hill Station', 'Mixed Use'];
const budgets = ['Under ₹25 Lakh', '₹25L – ₹50L', '₹50L – ₹1 Cr', 'Above ₹1 Cr'];
const sizes   = [
  'Under 5,000 sq.ft.',
  '5,000 – 10,000 sq.ft.',
  '10,000 – 20,000 sq.ft.',
  '20,000+ sq.ft.',
];

/* ─────────────────────────────────────────────────────────────
   SHARED FIELD WRAPPER
───────────────────────────────────────────────────────────── */
function FieldWrapper({ children, focused }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        height: '60px',
        padding: '0 18px',
        borderRadius: '14px',
        border: focused
          ? '1.5px solid rgba(201,163,74,0.75)'
          : '1.5px solid rgba(201,163,74,0.22)',
        backgroundColor: 'rgba(18,18,18,0.98)',
        boxShadow: focused
          ? '0 0 0 3px rgba(201,163,74,0.12), 0 4px 20px rgba(0,0,0,0.5)'
          : '0 2px 12px rgba(0,0,0,0.4)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        width: '100%',
        minWidth: 0,
        position: 'relative',
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   LOCATION TEXT INPUT — flex-based, icon never overlaps text
───────────────────────────────────────────────────────────── */
function LocationField({ value, onChange }) {
  const [focused, setFocused] = useState(false);

  return (
    <FieldWrapper focused={focused}>
      {/* Icon */}
      <div style={{
        flexShrink: 0, width: '20px', height: '20px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: focused || value ? '#E3C269' : '#C9A34A',
        transition: 'color 0.2s ease',
      }}>
        <MapPin size={20} strokeWidth={1.75} />
      </div>

      {/* Text content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: '#C9A34A',
          marginBottom: '2px', lineHeight: 1,
        }}>
          Location
        </p>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search city or region…"
          list="sb-locations"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-label="Search city or region"
          style={{
            display: 'block', width: '100%',
            background: 'transparent', border: 'none', outline: 'none',
            fontSize: '14px', fontWeight: 500,
            color: value ? '#F5F5F5' : '#737373',
            padding: 0, margin: 0, lineHeight: 1.2, fontFamily: 'inherit',
          }}
        />
        <datalist id="sb-locations">
          {locations.map((l) => <option key={l} value={l} />)}
        </datalist>
      </div>
    </FieldWrapper>
  );
}

/* ─────────────────────────────────────────────────────────────
   SEARCH BUTTON
───────────────────────────────────────────────────────────── */
function SearchButton({ compact }) {
  return (
    <button
      type="submit"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        height: '60px',
        padding: compact ? '0 20px' : '0 28px',
        borderRadius: '14px',
        background: 'linear-gradient(135deg, #C9A34A 0%, #E3C269 50%, #C9A34A 100%)',
        border: '1px solid rgba(245,215,142,0.4)',
        color: '#080808',
        fontSize: compact ? '12px' : '13px',
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.25s ease',
        boxShadow: '0 6px 24px rgba(201,163,74,0.3), 0 2px 8px rgba(0,0,0,0.4)',
        width: '100%',
        fontFamily: 'inherit',
        userSelect: 'none',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
        e.currentTarget.style.boxShadow = '0 12px 35px rgba(201,163,74,0.45), 0 2px 8px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0) scale(1)';
        e.currentTarget.style.boxShadow = '0 6px 24px rgba(201,163,74,0.3), 0 2px 8px rgba(0,0,0,0.4)';
      }}
    >
      <Search size={18} strokeWidth={2.5} />
      <span>{compact ? 'Search' : 'Search Properties'}</span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────────────────────── */
export default function SearchBar({ compact = false }) {
  const [location, setLocation] = useState('');
  const [type, setType]         = useState('');
  const [budget, setBudget]     = useState('');
  const [size, setSize]         = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type)     params.set('type', type);
    if (budget)   params.set('budget', budget);
    if (size)     params.set('size', size);
    navigate(`/explore?${params.toString()}`);
  };

  const shellStyle = compact
    ? { width: '100%' }
    : {
        width: '100%',
        background: 'rgba(10,10,10,0.95)',
        border: '1px solid rgba(201,163,74,0.28)',
        borderRadius: '20px',
        padding: '16px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7), 0 0 40px rgba(201,163,74,0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      };

  return (
    <form onSubmit={handleSearch} style={shellStyle}>
      {/*
        RESPONSIVE GRID:
        Mobile  (default) : 1 column — all stacked
        Tablet  (sm 640+) : 2 columns — button full-width
        Desktop (lg 1024+): 5 columns — Location | Type | Budget | Size | Button
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_1.3fr_1.3fr_auto] gap-3">

        <LocationField value={location} onChange={setLocation} />

        {/*
          CustomSelect renders its dropdown via position:fixed so it always
          appears above every other section regardless of z-index stacking.
        */}
        <CustomSelect
          icon={Building2}
          label="Property Type"
          placeholder="Select type"
          value={type}
          onChange={setType}
          options={types}
        />

        <CustomSelect
          icon={IndianRupee}
          label="Budget"
          placeholder="Select budget"
          value={budget}
          onChange={setBudget}
          options={budgets}
        />

        <CustomSelect
          icon={Maximize2}
          label="Plot Size"
          placeholder="Select size"
          value={size}
          onChange={setSize}
          options={sizes}
        />

        {/* Button — full-width on mobile/tablet, auto on desktop */}
        <div className="sm:col-span-2 lg:col-span-1">
          <SearchButton compact={compact} />
        </div>

      </div>
    </form>
  );
}
