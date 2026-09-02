import { useEffect, useRef, useState } from 'react';
import { TrendingUp, ShieldCheck } from 'lucide-react';

export default function Hero3DVisual() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      if (window.innerWidth < 1024) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 16;
      const y = (e.clientY / window.innerHeight - 0.5) * 16;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-lg mx-auto aspect-square select-none pointer-events-none hidden lg:block"
      style={{ perspective: '1200px' }}
    >
      {/* 3D Floating Holographic Land Parcel Frame */}
      <div
        className="w-full h-full relative transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${20 - mousePos.y}deg) rotateY(${-15 + mousePos.x}deg) rotateZ(3deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Ambient Back Glow */}
        <div
          className="absolute inset-4 rounded-3xl opacity-40 blur-2xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(201,163,74,0.4) 0%, transparent 70%)' }}
        />

        {/* Base Layer - Isometric Terrain Grid */}
        <div
          className="absolute inset-6 rounded-3xl border border-[rgba(201,163,74,0.35)] backdrop-blur-xl p-6 flex flex-col justify-between overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.8)]"
          style={{
            background: 'linear-gradient(145deg, rgba(18,18,18,0.85) 0%, rgba(10,10,10,0.92) 100%)',
            transform: 'translateZ(0px)',
          }}
        >
          {/* Subtle Grid Lines Overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(201,163,74,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(201,163,74,0.3) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Top Bar of Card */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#C9A34A] animate-pulse" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#C9A34A]">
                TERRAIN MATRIX v2.4
              </span>
            </div>
            <span className="text-[10px] font-mono text-[#A3A3A3]">LAT 18.52° N</span>
          </div>

          {/* Isometric Land Contour Vector Representation */}
          <div className="relative z-10 my-auto py-2">
            <svg viewBox="0 0 340 180" className="w-full h-auto drop-shadow-[0_10px_20px_rgba(201,163,74,0.2)]">
              <defs>
                <linearGradient id="terrainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A34A" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#E3C269" stopOpacity="0.05" />
                </linearGradient>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8F6D27" />
                  <stop offset="50%" stopColor="#E3C269" />
                  <stop offset="100%" stopColor="#C9A34A" />
                </linearGradient>
              </defs>

              {/* Contour 1 */}
              <path
                d="M 20 140 Q 90 90, 170 120 T 320 100 L 320 160 L 20 160 Z"
                fill="url(#terrainGrad)"
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
              />

              {/* Contour 2 */}
              <path
                d="M 30 110 Q 110 60, 190 90 T 310 70"
                fill="none"
                stroke="#C9A34A"
                strokeWidth="1.8"
                strokeDasharray="4 3"
              />

              {/* Contour 3 - Peak */}
              <path
                d="M 60 80 Q 130 30, 210 60 T 290 40"
                fill="none"
                stroke="#E3C269"
                strokeWidth="2"
              />

              {/* Plot Parcel Coordinates & Nodes */}
              <circle cx="130" cy="50" r="4" fill="#C9A34A" className="animate-ping" />
              <circle cx="130" cy="50" r="3" fill="#FFFFFF" />

              <circle cx="210" cy="60" r="4" fill="#C9A34A" />
              <circle cx="270" cy="110" r="4" fill="#E3C269" />
              <circle cx="90" cy="100" r="4" fill="#8F6D27" />

              {/* Parcel boundary box */}
              <polygon
                points="110,65 190,45 250,85 170,110"
                fill="rgba(201,163,74,0.12)"
                stroke="#C9A34A"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Bottom Coordinates */}
          <div className="flex items-center justify-between text-[11px] font-mono text-[#A3A3A3] pt-2 border-t border-[rgba(201,163,74,0.15)] relative z-10">
            <span>SECTOR 4B · HIGH CONTOUR</span>
            <span className="text-[#E3C269] font-bold">100% CLEAR TITLE</span>
          </div>
        </div>

        {/* Elevated 3D Floating Badge 1 - Top Right */}
        <div
          className="absolute -top-4 -right-4 p-3.5 rounded-2xl border border-[rgba(201,163,74,0.4)] backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] animate-float-slow"
          style={{
            background: 'rgba(18,18,18,0.92)',
            transform: 'translateZ(50px)',
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(201,163,74,0.15)] border border-[rgba(201,163,74,0.3)] flex items-center justify-center text-[#C9A34A]">
              <TrendingUp size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3]">Appreciation Index</p>
              <p className="text-base font-black text-[#C9A34A] leading-tight">+18.4% / yr</p>
            </div>
          </div>
        </div>

        {/* Elevated 3D Floating Badge 2 - Bottom Left */}
        <div
          className="absolute -bottom-5 -left-5 p-3.5 rounded-2xl border border-[rgba(201,163,74,0.4)] backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
          style={{
            background: 'rgba(18,18,18,0.92)',
            transform: 'translateZ(35px)',
          }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#A3A3A3]">Verification</p>
              <p className="text-sm font-bold text-[#F5F5F5] leading-tight">RERA Registered</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
