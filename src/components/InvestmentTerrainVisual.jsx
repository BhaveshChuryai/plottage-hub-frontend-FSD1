import { useState } from 'react';
import { CheckCircle2, TrendingUp, Layers } from 'lucide-react';

const parcels = [
  { id: 'A-101', name: 'Coastal Sector A', area: '12,000 sq.ft', growth: '+18.2%', status: 'Hot Investment', x: 75, y: 70 },
  { id: 'B-204', name: 'Valley View Highlands', area: '25,000 sq.ft', growth: '+15.4%', status: 'RERA Approved', x: 210, y: 55 },
  { id: 'C-305', name: 'Expressway Gateway', area: '43,560 sq.ft', growth: '+21.0%', status: 'Prime Commercial', x: 140, y: 130 },
];

export default function InvestmentTerrainVisual() {
  const [selectedParcel, setSelectedParcel] = useState(parcels[0]);

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-[rgba(201,163,74,0.3)] bg-gradient-to-br from-[#121212] via-[#0d0d0d] to-[#070707] p-6 sm:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.8)]">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[rgba(255,255,255,0.07)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.3)] flex items-center justify-center text-[#C9A34A]">
            <Layers size={18} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#F5F5F5] tracking-wide">3D Land Masterplan</h4>
            <p className="text-xs text-[#A3A3A3]">Interactive Parcel Demarcation</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <CheckCircle2 size={13} />
          <span>RERA Master Approved</span>
        </div>
      </div>

      {/* Isometric Interactive Map Canvas */}
      <div className="relative my-6 aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl bg-[#090909] border border-[rgba(201,163,74,0.15)] overflow-hidden flex items-center justify-center p-2">
        {/* Isometric Grid Background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(201,163,74,0.3) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* SVG Isometric Terrain & Parcels */}
        <svg viewBox="0 0 320 200" className="w-full h-full drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]">
          <defs>
            <linearGradient id="plotActive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C9A34A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#8F6D27" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="plotInactive" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
            </linearGradient>
            <linearGradient id="roadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(201,163,74,0.1)" />
              <stop offset="50%" stopColor="rgba(201,163,74,0.6)" />
              <stop offset="100%" stopColor="rgba(201,163,74,0.1)" />
            </linearGradient>
          </defs>

          {/* Master Base Layer */}
          <polygon
            points="160,20 300,90 160,180 20,100"
            fill="#0f0f0f"
            stroke="rgba(201,163,74,0.3)"
            strokeWidth="1.5"
          />

          {/* Contour Lines */}
          <path d="M 50,90 Q 160,35 270,80" fill="none" stroke="rgba(201,163,74,0.18)" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 60,110 Q 160,55 260,100" fill="none" stroke="rgba(201,163,74,0.18)" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 70,130 Q 160,75 250,120" fill="none" stroke="rgba(201,163,74,0.18)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Main 40ft Access Corridor / Road */}
          <path
            d="M 30,105 Q 160,135 290,95"
            fill="none"
            stroke="url(#roadGrad)"
            strokeWidth="4"
          />

          {/* Parcel 1 (A-101) */}
          <polygon
            points="45,85 105,55 125,75 65,105"
            fill={selectedParcel.id === 'A-101' ? 'url(#plotActive)' : 'url(#plotInactive)'}
            stroke={selectedParcel.id === 'A-101' ? '#E3C269' : 'rgba(201,163,74,0.35)'}
            strokeWidth={selectedParcel.id === 'A-101' ? '2' : '1'}
            className="cursor-pointer transition-all duration-300"
            onClick={() => setSelectedParcel(parcels[0])}
          />
          <text x="75" y="85" fill="#E3C269" fontSize="7" fontWeight="bold" fontFamily="monospace">A-101</text>

          {/* Parcel 2 (B-204) */}
          <polygon
            points="175,40 245,70 225,95 155,65"
            fill={selectedParcel.id === 'B-204' ? 'url(#plotActive)' : 'url(#plotInactive)'}
            stroke={selectedParcel.id === 'B-204' ? '#E3C269' : 'rgba(201,163,74,0.35)'}
            strokeWidth={selectedParcel.id === 'B-204' ? '2' : '1'}
            className="cursor-pointer transition-all duration-300"
            onClick={() => setSelectedParcel(parcels[1])}
          />
          <text x="195" y="70" fill="#E3C269" fontSize="7" fontWeight="bold" fontFamily="monospace">B-204</text>

          {/* Parcel 3 (C-305) */}
          <polygon
            points="105,120 175,90 205,115 135,145"
            fill={selectedParcel.id === 'C-305' ? 'url(#plotActive)' : 'url(#plotInactive)'}
            stroke={selectedParcel.id === 'C-305' ? '#E3C269' : 'rgba(201,163,74,0.35)'}
            strokeWidth={selectedParcel.id === 'C-305' ? '2' : '1'}
            className="cursor-pointer transition-all duration-300"
            onClick={() => setSelectedParcel(parcels[2])}
          />
          <text x="145" y="125" fill="#E3C269" fontSize="7" fontWeight="bold" fontFamily="monospace">C-305</text>

          {/* Active Location Pin */}
          <circle cx={selectedParcel.x} cy={selectedParcel.y - 12} r="5" fill="#C9A34A" className="animate-pulse" />
          <circle cx={selectedParcel.x} cy={selectedParcel.y - 12} r="2.5" fill="#FFFFFF" />
        </svg>

        {/* Floating Controls / Selector Tabs */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-1.5 bg-[#141414]/90 backdrop-blur-md p-1.5 rounded-xl border border-[rgba(201,163,74,0.2)]">
          {parcels.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedParcel(p)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                selectedParcel.id === p.id
                  ? 'bg-[#C9A34A] text-[#080808] shadow-md'
                  : 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[rgba(255,255,255,0.05)]'
              }`}
            >
              Plot {p.id}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Parcel Intelligence Card */}
      <div className="p-4 rounded-2xl bg-[rgba(255,255,255,0.02)] border border-[rgba(201,163,74,0.18)] flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-[#F5F5F5]">{selectedParcel.name}</span>
            <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-[rgba(201,163,74,0.12)] text-[#E3C269] border border-[rgba(201,163,74,0.25)]">
              {selectedParcel.status}
            </span>
          </div>
          <p className="text-xs text-[#A3A3A3] mt-0.5">Plot Size: {selectedParcel.area} · 100% Freehold</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[#A3A3A3] block">CAGR Forecast</span>
            <span className="text-base font-black text-[#C9A34A]">{selectedParcel.growth}</span>
          </div>
          <div className="w-8 h-8 rounded-lg bg-[rgba(201,163,74,0.15)] flex items-center justify-center text-[#C9A34A]">
            <TrendingUp size={16} />
          </div>
        </div>
      </div>
    </div>
  );
}
