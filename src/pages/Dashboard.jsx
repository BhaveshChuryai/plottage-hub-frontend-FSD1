import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Heart,
  MessageSquare,
  TrendingUp,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  Eye,
  Bookmark,
  MapPin,
  Home,
  Sparkles,
  Clock,
  Trash2,
} from 'lucide-react';
import { properties, enquiriesMock, chartData } from '../data/properties';
import useAuth from '../hooks/useAuth';
import useWishlist from '../hooks/useWishlist';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',        id: 'dashboard' },
  { icon: Heart,           label: 'Saved Properties', id: 'saved' },
  { icon: MessageSquare,   label: 'My Enquiries',     id: 'enquiries' },
  { icon: TrendingUp,      label: 'My Investments',   id: 'investments' },
  { icon: User,            label: 'Profile',          id: 'profile' },
  { icon: Settings,        label: 'Settings',         id: 'settings' },
];

function StatusBadge({ status }) {
  const map = {
    Pending:    'status-pending',
    Contacted:  'status-contacted',
    'Site Visit': 'status-sitevisit',
    Closed:     'status-closed',
  };
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-lg ${map[status] || 'status-pending'}`}>
      {status}
    </span>
  );
}

function BarChart() {
  const max = Math.max(...chartData.map((d) => d.value));
  const currentMonth = chartData[chartData.length - 1]?.month;
  return (
    <div className="flex items-end gap-3 h-36 pt-4">
      {chartData.map((d) => {
        const isActive = d.month === currentMonth;
        const barH = Math.max(8, (d.value / max) * 96);
        return (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-2 group">
            <span className={`text-xs font-bold transition-colors ${isActive ? 'text-[#C9A34A]' : 'text-[#A5A5A5] group-hover:text-[#F5F5F5]'}`}>
              {d.value}
            </span>
            <div
              className="w-full rounded-t-lg transition-all duration-500 group-hover:opacity-100 relative overflow-hidden"
              style={{
                height: `${barH}px`,
                background: isActive
                  ? 'linear-gradient(to top, #C9A34A, #E3C269, #F5D78E)'
                  : 'linear-gradient(to top, rgba(201,163,74,0.25), rgba(201,163,74,0.15))',
                opacity: isActive ? 1 : 0.7,
                minHeight: '6px',
                boxShadow: isActive ? '0 -4px 20px rgba(201,163,74,0.3)' : 'none',
              }}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white/20 animate-pulse" />
              )}
            </div>
            <span className={`text-xs font-medium ${isActive ? 'text-[#C9A34A]' : 'text-[#A5A5A5]'}`}>
              {d.month}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function DashboardSidebar({ mobile = false, active, setActive, setSidebarOpen, wishlist, user, logout, navigate }) {
  return (
    <div className={`flex flex-col h-full ${mobile ? '' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-5 border-b border-[rgba(255,255,255,0.06)]">
        <Link to="/" onClick={() => setSidebarOpen(false)} className="block hover:opacity-85 transition-opacity">
          <img src="/assets/plottage-hub-logo.png" alt="Plottage Hub" className="h-12 w-auto object-contain" />
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto" aria-label="Dashboard navigation">
        {navItems.map(({ icon: Icon, label, id }) => (
          <button
            key={id}
            onClick={() => { setActive(id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left cursor-pointer ${
              active === id
                ? 'sidebar-active pl-3.5 bg-[rgba(201,163,74,0.12)] text-[#C9A34A] border border-[rgba(201,163,74,0.35)] font-bold'
                : 'text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-[rgba(255,255,255,0.03)]'
            }`}
          >
            <Icon size={17} />
            <span>{label}</span>
            {id === 'saved' && wishlist.length > 0 && (
              <span className="ml-auto w-5 h-5 rounded-full bg-[#C9A34A] text-[#080808] text-[10px] font-black flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* User card */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(201,163,74,0.05)] border border-[rgba(201,163,74,0.12)] mb-2">
          <div className="w-9 h-9 rounded-full bg-[rgba(201,163,74,0.15)] border border-[rgba(201,163,74,0.35)] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(201,163,74,0.2)]">
            <span className="text-[#C9A34A] font-black text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#F5F5F5] text-sm font-semibold truncate">{user?.name || 'Investor'}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles size={9} className="text-[#C9A34A]" />
              <p className="text-[#A5A5A5] text-xs">Premium Member</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#A5A5A5] hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/10 font-medium cursor-pointer"
        >
          <LogOut size={15} /> Logout
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { user, logout } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();

  // Get actual saved properties from wishlist
  const savedProperties = properties.filter((p) => wishlist.includes(p.id));

  useEffect(() => {
    document.title = `Plottage Hub — Dashboard (${active.charAt(0).toUpperCase() + active.slice(1)})`;
  }, [active]);

  const kpis = [
    { label: 'Saved Properties',  value: savedProperties.length, icon: Bookmark,      trend: wishlist.length > 0 ? `${wishlist.length} saved` : 'None saved', color: 'text-[#C9A34A]', bg: 'bg-[rgba(201,163,74,0.08)] border-[rgba(201,163,74,0.15)]' },
    { label: 'Active Enquiries',  value: enquiriesMock.length,   icon: MessageSquare, trend: '2 awaiting response',                                           color: 'text-blue-400',   bg: 'bg-blue-500/8 border-blue-500/15' },
    { label: 'Properties Viewed', value: 28,                     icon: Eye,           trend: '+8 this month',                                                 color: 'text-purple-400', bg: 'bg-purple-500/8 border-purple-500/15' },
    { label: 'Opportunities',     value: 8,                      icon: TrendingUp,    trend: 'High appreciation',                                              color: 'text-emerald-400', bg: 'bg-emerald-500/8 border-emerald-500/15' },
  ];

  return (
    <div className="min-h-screen w-full flex overflow-x-hidden" style={{ background: 'var(--bg-primary)' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 border-r border-[rgba(255,255,255,0.06)] min-h-screen sticky top-0" style={{ background: '#0a0a0a' }}>
        <DashboardSidebar
          active={active}
          setActive={setActive}
          setSidebarOpen={setSidebarOpen}
          wishlist={wishlist}
          user={user}
          logout={logout}
          navigate={navigate}
        />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 border-r border-[rgba(255,255,255,0.06)] flex flex-col animate-fade-in-left" style={{ background: '#0a0a0a' }}>
            <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#F5F5F5] font-bold text-sm">Dashboard Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-[#A5A5A5] hover:text-[#F5F5F5] p-1 cursor-pointer" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <DashboardSidebar
              mobile
              active={active}
              setActive={setActive}
              setSidebarOpen={setSidebarOpen}
              wishlist={wishlist}
              user={user}
              logout={logout}
              navigate={navigate}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Header Bar */}
        <header
          className="sticky top-0 z-40 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] px-4 sm:px-6 h-16 flex items-center gap-4"
          style={{ background: 'rgba(10,10,10,0.95)' }}
        >
          <button
            className="lg:hidden text-[#A5A5A5] hover:text-[#C9A34A] transition-colors cursor-pointer"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          <div className="lg:hidden">
            <img src="/assets/plottage-hub-logo.png" alt="Plottage Hub" className="h-9 w-auto object-contain" />
          </div>

          <div className="hidden sm:flex items-center gap-3 flex-1 max-w-sm">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A5A5A5]" />
              <input
                type="text"
                placeholder="Search portfolio..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full input-premium pl-10 pr-3 py-2 text-xs rounded-xl"
                aria-label="Search dashboard"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Link
              to="/explore"
              className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[rgba(201,163,74,0.3)] text-xs text-[#C9A34A] font-bold hover:bg-[rgba(201,163,74,0.1)] transition-colors"
            >
              <span>Explore Plots</span>
            </Link>
            <button className="relative w-9 h-9 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#A5A5A5] hover:text-[#C9A34A] transition-colors cursor-pointer" aria-label="Notifications">
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A34A] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[rgba(201,163,74,0.15)] border border-[rgba(201,163,74,0.35)] flex items-center justify-center shadow-[0_0_12px_rgba(201,163,74,0.2)]">
              <span className="text-[#C9A34A] font-black text-sm">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Tab Views */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {active === 'dashboard' && (
            <div>
              {/* Header Greeting */}
              <div className="mb-8">
                <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-1">
                  {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <h1 className="font-['Playfair_Display'] text-[clamp(1.75rem,3vw,2.5rem)] font-black text-[#F5F5F5] leading-tight">
                  WELCOME, {user?.name?.toUpperCase() || 'INVESTOR'}.
                </h1>
                <p className="text-[#A5A5A5] text-sm mt-1">Here is a live overview of your verified land investments and enquiries.</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                {kpis.map((kpi) => (
                  <div
                    key={kpi.label}
                    className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-5 hover:border-[rgba(201,163,74,0.25)] transition-all duration-200 group cursor-default shadow-md"
                    style={{ background: 'var(--bg-card)' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${kpi.bg} ${kpi.color}`}>
                        <kpi.icon size={18} />
                      </div>
                      <ArrowUpRight size={15} className="text-[#A5A5A5] group-hover:text-[#C9A34A] transition-colors" />
                    </div>
                    <p className={`text-3xl font-black font-['Playfair_Display'] ${kpi.color} mb-1`}>
                      {kpi.value}
                    </p>
                    <p className="text-[#F5F5F5] text-sm font-semibold mb-0.5">{kpi.label}</p>
                    <p className="text-[#A5A5A5] text-xs">{kpi.trend}</p>
                  </div>
                ))}
              </div>

              {/* Activity Chart & Portfolio Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2 rounded-2xl border border-[rgba(255,255,255,0.07)] p-6 sm:p-7 shadow-md" style={{ background: 'var(--bg-card)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-[#F5F5F5] font-bold text-base md:text-lg">Investment Activity</h2>
                      <p className="text-[#A5A5A5] text-xs mt-0.5">Monthly enquiry volume</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(201,163,74,0.20)] bg-[rgba(201,163,74,0.06)]">
                      <div className="w-2 h-2 rounded-full bg-[#C9A34A]" />
                      <span className="text-[#A5A5A5] text-xs font-medium">Enquiries</span>
                    </div>
                  </div>
                  <BarChart />
                </div>

                <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-6 sm:p-7 shadow-md" style={{ background: 'var(--bg-card)' }}>
                  <h2 className="text-[#F5F5F5] font-bold text-base md:text-lg mb-5">Portfolio Summary</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'Total Interest Value', value: '₹1.62 Cr',    trend: 'saved plots value', color: 'text-[#C9A34A]' },
                      { label: 'Response Rate',        value: '75%',         trend: '3 of 4 responded',  color: 'text-blue-400' },
                      { label: 'Avg. Plot Size',       value: '14,833 sqft', trend: 'prime parcels',     color: 'text-purple-400' },
                      { label: 'Top Location',         value: 'Shrivardhan', trend: 'high appreciation',  color: 'text-emerald-400' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between py-2.5 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                        <div>
                          <p className="text-[#A5A5A5] text-xs font-medium">{item.label}</p>
                          <p className="text-[#8A8A8A] text-[11px]">{item.trend}</p>
                        </div>
                        <span className={`font-black text-sm md:text-base ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Saved & Enquiries Previews */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                {/* Saved Properties Box */}
                <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-6 sm:p-7 shadow-md" style={{ background: 'var(--bg-card)' }}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-[#F5F5F5] font-bold text-base md:text-lg">Saved Properties</h2>
                      <p className="text-[#A5A5A5] text-xs mt-0.5">From your wishlist ({savedProperties.length})</p>
                    </div>
                    <button onClick={() => setActive('saved')} className="text-[#C9A34A] text-xs hover:text-[#E3C269] flex items-center gap-1 font-semibold cursor-pointer">
                      View All <ChevronRight size={12} />
                    </button>
                  </div>
                  {savedProperties.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart size={24} className="text-[#A5A5A5] opacity-30 mx-auto mb-2" />
                      <p className="text-[#A5A5A5] text-xs mb-3">No saved properties yet.</p>
                      <Link to="/explore" className="text-[#C9A34A] text-xs hover:underline font-bold">
                        Browse Properties →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {savedProperties.slice(0, 3).map((p) => (
                        <Link
                          key={p.id}
                          to={`/property/${p.id}`}
                          className="flex items-center gap-3.5 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(201,163,74,0.25)] transition-all group"
                        >
                          <img src={p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
                          <div className="flex-1 min-w-0">
                            <p className="text-[#F5F5F5] text-xs font-bold truncate group-hover:text-[#E3C269]">{p.title}</p>
                            <p className="text-[#8A8A8A] text-[11px] truncate flex items-center gap-1 mt-0.5">
                              <MapPin size={9} className="text-[#C9A34A]" /> {p.location}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-[#C9A34A] font-bold text-xs">{p.priceDisplay}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Recent Enquiries Box */}
                <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-6 sm:p-7 shadow-md" style={{ background: 'var(--bg-card)' }}>
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-[#F5F5F5] font-bold text-base md:text-lg">Recent Enquiries</h2>
                      <p className="text-[#A5A5A5] text-xs mt-0.5">Active conversations</p>
                    </div>
                    <button onClick={() => setActive('enquiries')} className="text-[#C9A34A] text-xs hover:text-[#E3C269] flex items-center gap-1 font-semibold cursor-pointer">
                      View All <ChevronRight size={12} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    {enquiriesMock.map((e) => (
                      <div key={e.id} className="flex items-center gap-3.5 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(201,163,74,0.15)] transition-all">
                        <div className="w-9 h-9 rounded-lg bg-[rgba(201,163,74,0.08)] flex items-center justify-center flex-shrink-0 text-[#C9A34A]">
                          <Home size={14} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#F5F5F5] text-xs font-bold truncate">{e.property}</p>
                          <p className="text-[#8A8A8A] text-[11px] mt-0.5">{e.date} · {e.location}</p>
                        </div>
                        <StatusBadge status={e.status} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Saved Properties Full Tab */}
          {active === 'saved' && (
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <div>
                  <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#F5F5F5]">
                    Saved Properties ({savedProperties.length})
                  </h1>
                  <p className="text-[#A5A5A5] text-xs mt-1">Land parcels you have added to your wishlist.</p>
                </div>
                <Link to="/explore" className="btn-gold px-4 py-2 rounded-xl text-xs font-bold">
                  Browse More Plots
                </Link>
              </div>

              {savedProperties.length === 0 ? (
                <div className="text-center py-20 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[#101010]">
                  <Heart size={36} className="text-[#A5A5A5] opacity-30 mx-auto mb-3" />
                  <h3 className="text-[#F5F5F5] font-bold text-lg mb-1">Your Wishlist is Empty</h3>
                  <p className="text-[#A5A5A5] text-xs max-w-sm mx-auto mb-5">
                    Click the heart icon on any property card while exploring to bookmark plots for quick comparison.
                  </p>
                  <Link to="/explore" className="btn-gold px-6 py-2.5 rounded-xl text-xs font-bold">
                    Explore Land Opportunities
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {savedProperties.map((p) => (
                    <div key={p.id} className="relative group">
                      <div className="rounded-2xl overflow-hidden border border-[rgba(255,255,255,0.08)] bg-[#121212] flex flex-col h-full shadow-md hover:border-[rgba(201,163,74,0.35)] transition-all">
                        <div className="aspect-[16/10] relative">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                          <button
                            onClick={() => toggleWishlist(p.id)}
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#080808]/80 text-red-400 hover:text-white flex items-center justify-center cursor-pointer transition-colors"
                            aria-label="Remove from wishlist"
                            title="Remove from wishlist"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="p-5 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-[#F5F5F5] font-bold text-base mb-1">{p.title}</h3>
                            <p className="text-[#A5A5A5] text-xs flex items-center gap-1 mb-3">
                              <MapPin size={12} className="text-[#C9A34A]" /> {p.location}
                            </p>
                          </div>
                          <div className="pt-3 border-t border-[rgba(255,255,255,0.06)] flex items-center justify-between">
                            <p className="text-[#C9A34A] font-black text-lg">{p.priceDisplay}</p>
                            <Link to={`/property/${p.id}`} className="text-xs text-[#C9A34A] font-bold hover:underline flex items-center gap-1">
                              View Details <ChevronRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Enquiries Full Tab */}
          {active === 'enquiries' && (
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <div>
                  <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#F5F5F5]">
                    My Enquiries ({enquiriesMock.length})
                  </h1>
                  <p className="text-[#A5A5A5] text-xs mt-1">Status of all direct inquiries submitted for land parcels.</p>
                </div>
              </div>

              <div className="space-y-4">
                {enquiriesMock.map((e) => (
                  <div
                    key={e.id}
                    className="p-5 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#121212] flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[rgba(201,163,74,0.1)] border border-[rgba(201,163,74,0.2)] flex items-center justify-center text-[#C9A34A] flex-shrink-0">
                        <Home size={20} />
                      </div>
                      <div>
                        <h3 className="text-[#F5F5F5] font-bold text-base">{e.property}</h3>
                        <p className="text-[#A5A5A5] text-xs mt-0.5 flex items-center gap-2">
                          <MapPin size={11} className="text-[#C9A34A]" /> {e.location}
                          <span>•</span>
                          <Clock size={11} /> {e.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:ml-auto">
                      <StatusBadge status={e.status} />
                      <a
                        href="tel:+918855908374"
                        className="px-3.5 py-1.5 rounded-xl border border-[rgba(201,163,74,0.3)] text-xs text-[#C9A34A] font-bold hover:bg-[rgba(201,163,74,0.1)] transition-colors"
                      >
                        Contact Team
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Investments Tab */}
          {active === 'investments' && (
            <div>
              <div className="mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#F5F5F5]">
                  Investment Opportunities
                </h1>
                <p className="text-[#A5A5A5] text-xs mt-1">High-yield land parcels with projected 3-year growth over 85%.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.filter((p) => p.potential >= 85).map((p) => (
                  <div key={p.id} className="rounded-2xl border border-[rgba(255,255,255,0.08)] bg-[#121212] overflow-hidden shadow-md flex flex-col justify-between">
                    <div className="aspect-[16/10] relative">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <TrendingUp size={12} /> {p.potential}% Potential
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-[#F5F5F5] font-bold text-base mb-1">{p.title}</h3>
                      <p className="text-[#A5A5A5] text-xs flex items-center gap-1 mb-4">
                        <MapPin size={11} className="text-[#C9A34A]" /> {p.location}
                      </p>
                      <div className="flex items-center justify-between pt-3 border-t border-[rgba(255,255,255,0.06)]">
                        <p className="text-[#C9A34A] font-bold text-lg">{p.priceDisplay}</p>
                        <Link to={`/property/${p.id}`} className="btn-gold px-3.5 py-1.5 rounded-lg text-xs font-bold">
                          Invest
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {active === 'profile' && (
            <div className="max-w-2xl">
              <div className="mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#F5F5F5]">
                  Investor Profile
                </h1>
                <p className="text-[#A5A5A5] text-xs mt-1">Manage your account information and preferences.</p>
              </div>

              <div className="p-6 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#121212] space-y-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A5A5A5] mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || 'Investor'}
                    className="w-full input-premium px-4 py-3 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A5A5A5] mb-2">Email Address</label>
                  <input
                    type="email"
                    defaultValue={user?.email || 'investor@plottagehub.com'}
                    className="w-full input-premium px-4 py-3 text-sm rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A5A5A5] mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue="+91 8855908374"
                    className="w-full input-premium px-4 py-3 text-sm rounded-xl"
                  />
                </div>
                <button
                  type="button"
                  className="btn-gold px-6 py-3 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {active === 'settings' && (
            <div className="max-w-2xl">
              <div className="mb-6 pb-4 border-b border-[rgba(255,255,255,0.06)]">
                <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#F5F5F5]">
                  Account Settings
                </h1>
                <p className="text-[#A5A5A5] text-xs mt-1">Configure notifications, security, and verification preferences.</p>
              </div>

              <div className="p-6 rounded-2xl border border-[rgba(255,255,255,0.07)] bg-[#121212] space-y-4">
                {[
                  { title: 'Email Notifications', desc: 'Receive instant alerts for new property matches and price updates.' },
                  { title: 'SMS Verification', desc: 'Secure high-value enquiry submissions with two-factor SMS.' },
                  { title: 'Direct Owner Messaging', desc: 'Allow verified owners to initiate discussions for matched criteria.' },
                ].map((s) => (
                  <div key={s.title} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <div>
                      <p className="text-[#F5F5F5] text-sm font-bold">{s.title}</p>
                      <p className="text-[#A5A5A5] text-xs mt-0.5">{s.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#C9A34A] w-4 h-4 cursor-pointer" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
