import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Home, DollarSign, SquareDot, Search, ChevronDown } from 'lucide-react';

const locations = ['Shrivardhan', 'Diveagar', 'Harihareshwar', 'Khopoli', 'Pali', 'Alibaug', 'Panvel', 'Raigad'];
const types = ['All Types', 'Residential', 'Agricultural', 'Commercial'];
const budgets = ['Any Budget', 'Under ₹20 Lakh', '₹20L – ₹40L', '₹40L – ₹60L', 'Above ₹60 Lakh'];
const sizes = ['Any Size', 'Under 5,000 sq.ft', '5K – 10K sq.ft', '10K – 20K sq.ft', 'Above 20K sq.ft'];

export default function SearchBar({ compact = false }) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [budget, setBudget] = useState('');
  const [size, setSize] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (type && type !== 'All Types') params.set('type', type);
    if (budget && budget !== 'Any Budget') params.set('budget', budget);
    if (size && size !== 'Any Size') params.set('size', size);
    navigate(`/explore?${params.toString()}`);
  };

  const SelectField = ({ icon: Icon, placeholder, value, onChange, options }) => (
    <div className="relative group">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A34A] z-10">
        <Icon size={16} />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full appearance-none input-premium ${compact ? 'pl-9 pr-8 py-2.5 text-sm' : 'pl-10 pr-9 py-3.5'} rounded-xl cursor-pointer`}
        aria-label={placeholder}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A5A5A5] pointer-events-none" />
    </div>
  );

  return (
    <form onSubmit={handleSearch} className={compact ? '' : 'glass-card rounded-2xl p-4 md:p-6'}>
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${compact ? 'lg:grid-cols-4 gap-3' : 'lg:grid-cols-5 gap-4'}`}>
        {/* Location Input */}
        <div className="relative sm:col-span-2 lg:col-span-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9A34A] z-10">
            <MapPin size={16} />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search city or region..."
            className={`w-full input-premium ${compact ? 'pl-9 py-2.5 text-sm' : 'pl-10 py-3.5'} rounded-xl`}
            list="location-list"
            aria-label="Search location"
          />
          <datalist id="location-list">
            {locations.map((l) => <option key={l} value={l} />)}
          </datalist>
        </div>

        <SelectField icon={Home} placeholder="Property Type" value={type} onChange={setType} options={types} />
        <SelectField icon={DollarSign} placeholder="Select Budget" value={budget} onChange={setBudget} options={budgets} />
        <SelectField icon={SquareDot} placeholder="Select Size" value={size} onChange={setSize} options={sizes} />

        {/* Search Button */}
        <button
          type="submit"
          className={`btn-gold rounded-xl font-semibold tracking-wide flex items-center justify-center gap-2 ${compact ? 'px-4 py-2.5 text-sm' : 'px-6 py-3.5'}`}
        >
          <Search size={compact ? 14 : 18} />
          <span>{compact ? 'Search' : 'SEARCH PROPERTIES'}</span>
        </button>
      </div>
    </form>
  );
}
