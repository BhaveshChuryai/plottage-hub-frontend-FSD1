import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Heart, MessageSquare, TrendingUp, User, Settings, LogOut,
  Bell, Search, Menu, X, ChevronRight, ArrowUpRight, Eye, Bookmark,
  MapPin, Home, Sparkles
} from 'lucide-react';
import { properties, enquiriesMock, chartData } from '../data/properties';
import useAuth from '../hooks/useAuth';
import useWishlist from '../hooks/useWishlist';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard',         id: 'dashboard' },
  { icon: Heart,           label: 'Saved Properties',  id: 'saved' },
  { icon: MessageSquare,   label: 'My Enquiries',      id: 'enquiries' },
  { icon: TrendingUp,      label: 'My Investments',    id: 'investments' },
  { icon: User,            label: 'Profile',            id: 'profile' },
  { icon: Settings,        label: 'Settings',           id: 'settings' },
];

function StatusBadge({ status }) {
  const map = {
    'Pending':    'status-pending',
    'Contacted':  'status-contacted',
    'Site Visit': 'status-sitevisit',
    'Closed':     'status-closed',
  };
  return (
    <span className={`px-3 py-1 text-xs font-bold rounded-lg ${map[status] || 'status-pending'}`}>
      {status}
    </span>
  );
}

// Improved bar chart with proper spacing and proportions
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

const recommended = properties.slice(4, 7);

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
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left ${
              active === id
                ? 'sidebar-active pl-3.5'
                : 'text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-[rgba(255,255,255,0.03)]'
            }`}
          >
            <Icon size={17} />
            {label}
            {id === 'saved' && wishlist.length > 0 && (
              <span className="ml-auto w-5 h-5 rounded-full bg-[#C9A34A] text-[#080808] text-[10px] font-black flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* User card — uses AuthContext data */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(201,163,74,0.05)] border border-[rgba(201,163,74,0.12)] mb-2">
          <div className="w-9 h-9 rounded-full bg-[rgba(201,163,74,0.15)] border border-[rgba(201,163,74,0.35)] flex items-center justify-center flex-shrink-0 shadow-[0_0_12px_rgba(201,163,74,0.2)]">
            <span className="text-[#C9A34A] font-black text-sm">
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#F5F5F5] text-sm font-semibold truncate">{user?.name || 'User'}</p>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles size={9} className="text-[#C9A34A]" />
              <p className="text-[#A5A5A5] text-xs">Premium Member</p>
            </div>
          </div>
        </div>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#A5A5A5] hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/5 font-medium"
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
  const navigate = useNavigate();

  // useContext: Consumes AuthContext via useAuth hook for greeting
  const { user, logout } = useAuth();

  // useContext: Consumes WishlistContext — shows globally saved properties
  const { wishlist } = useWishlist();

  // Get actual saved properties from wishlist context
  const savedProperties = properties.filter((p) => wishlist.includes(p.id));

  // useEffect: Sets route-specific document title
  useEffect(() => {
    document.title = 'Plottage Hub — Dashboard';
  }, []);

  // KPI data — dynamically reflects wishlist count
  const kpis = [
    { label: 'Saved Properties', value: savedProperties.length, icon: Bookmark,      trend: wishlist.length > 0 ? `${wishlist.length} saved` : 'None saved', color: 'text-[#C9A34A]', bg: 'bg-[rgba(201,163,74,0.08)] border-[rgba(201,163,74,0.15)]' },
    { label: 'Active Enquiries', value: 4,                       icon: MessageSquare, trend: '2 awaiting response',                                           color: 'text-blue-400',   bg: 'bg-blue-500/8 border-blue-500/15' },
    { label: 'Properties Viewed', value: 28,                     icon: Eye,           trend: '+8 this month',                                                 color: 'text-purple-400', bg: 'bg-purple-500/8 border-purple-500/15' },
    { label: 'Opportunities',    value: 8,                       icon: TrendingUp,    trend: 'High potential',                                                 color: 'text-emerald-400', bg: 'bg-emerald-500/8 border-emerald-500/15' },
  ];

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg-primary)' }}>
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
          <div className="absolute left-0 top-0 bottom-0 w-72 border-r border-[rgba(255,255,255,0.06)] mobile-menu-open flex flex-col" style={{ background: '#0a0a0a' }}>
            <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#F5F5F5] font-bold">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-[#A5A5A5] hover:text-[#F5F5F5]" aria-label="Close menu">
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

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] px-4 sm:px-6 h-16 flex items-center gap-4"
          style={{ background: 'rgba(10,10,10,0.95)' }}
        >
          <button
            className="lg:hidden text-[#A5A5A5] hover:text-[#C9A34A] transition-colors"
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
                placeholder="Search properties..."
                className="w-full input-premium pl-10 py-2.5 text-sm rounded-xl"
                aria-label="Search dashboard"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#A5A5A5] hover:text-[#C9A34A] transition-colors" aria-label="Notifications">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A34A] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[rgba(201,163,74,0.15)] border border-[rgba(201,163,74,0.35)] flex items-center justify-center shadow-[0_0_12px_rgba(201,163,74,0.2)]">
              <span className="text-[#C9A34A] font-black text-sm">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Header — uses AuthContext for user name */}
          <div className="mb-10">
            <p className="text-[#C9A34A] text-xs font-bold tracking-widest uppercase mb-2">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="font-['Playfair_Display'] text-3xl md:text-4xl font-black text-[#F5F5F5]">
              WELCOME, {user?.name?.toUpperCase() || 'INVESTOR'}.
            </h1>
            <p className="text-[#A5A5A5] mt-2">Here's an overview of your property activity.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-5 hover:border-[rgba(201,163,74,0.25)] transition-all duration-200 group cursor-default"
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Activity Chart */}
            <div className="lg:col-span-2 rounded-2xl border border-[rgba(255,255,255,0.07)] p-7" style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-[#F5F5F5] font-bold text-lg">Investment Activity</h2>
                  <p className="text-[#A5A5A5] text-xs mt-0.5">Monthly enquiry trend</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(201,163,74,0.20)] bg-[rgba(201,163,74,0.06)]">
                  <div className="w-2 h-2 rounded-full bg-[#C9A34A]" />
                  <span className="text-[#A5A5A5] text-xs font-medium">Enquiries</span>
                </div>
              </div>
              <BarChart />
            </div>

            {/* Quick Stats */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-7" style={{ background: 'var(--bg-card)' }}>
              <h2 className="text-[#F5F5F5] font-bold text-lg mb-6">Portfolio Summary</h2>
              <div className="space-y-5">
                {[
                  { label: 'Total Interest Value', value: '₹1.62 Cr',     trend: 'combined saved',        color: 'text-[#C9A34A]' },
                  { label: 'Response Rate',         value: '75%',          trend: '3 of 4 responded',      color: 'text-blue-400' },
                  { label: 'Avg. Plot Size',        value: '14,833 sqft',  trend: 'across 3 properties',  color: 'text-purple-400' },
                  { label: 'Top Location',          value: 'Shrivardhan',  trend: 'Most viewed',           color: 'text-emerald-400' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <div>
                      <p className="text-[#A5A5A5] text-xs font-medium">{item.label}</p>
                      <p className="text-[#F5F5F5] text-xs mt-0.5 opacity-50">{item.trend}</p>
                    </div>
                    <span className={`font-black text-base ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            {/* Saved Properties — uses global WishlistContext */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-7" style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[#F5F5F5] font-bold text-lg">Saved Properties</h2>
                  <p className="text-[#A5A5A5] text-xs mt-0.5">From your wishlist</p>
                </div>
                <button onClick={() => setActive('saved')} className="text-[#C9A34A] text-xs hover:text-[#E3C269] flex items-center gap-1 font-semibold">
                  View All <ChevronRight size={12} />
                </button>
              </div>
              {savedProperties.length === 0 ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-[rgba(201,163,74,0.06)] border border-[rgba(201,163,74,0.15)] flex items-center justify-center mx-auto mb-3">
                    <Heart size={22} className="text-[#A5A5A5] opacity-40" />
                  </div>
                  <p className="text-[#A5A5A5] text-sm mb-3">No saved properties yet.</p>
                  <Link to="/explore" className="text-[#C9A34A] text-xs hover:text-[#E3C269] font-semibold">
                    Explore properties →
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedProperties.slice(0, 3).map((p) => (
                    <Link
                      key={p.id}
                      to={`/property/${p.id}`}
                      className="flex items-center gap-4 p-3.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(201,163,74,0.20)] transition-all group"
                    >
                      <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#F5F5F5] text-sm font-semibold truncate">{p.title}</p>
                        <div className="flex items-center gap-1 text-[#A5A5A5] text-xs mt-0.5">
                          <MapPin size={10} />
                          <span className="truncate">{p.location}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[#C9A34A] font-bold text-sm">{p.priceDisplay}</p>
                        <span className="text-emerald-400 text-xs">Available</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Enquiries */}
            <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-7" style={{ background: 'var(--bg-card)' }}>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[#F5F5F5] font-bold text-lg">Recent Enquiries</h2>
                  <p className="text-[#A5A5A5] text-xs mt-0.5">Your submitted enquiries</p>
                </div>
                <button onClick={() => setActive('enquiries')} className="text-[#C9A34A] text-xs hover:text-[#E3C269] flex items-center gap-1 font-semibold">
                  View All <ChevronRight size={12} />
                </button>
              </div>
              <div className="space-y-3">
                {enquiriesMock.map((e) => (
                  <div key={e.id} className="flex items-center gap-3.5 p-3.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(201,163,74,0.12)] transition-all">
                    <div className="w-10 h-10 rounded-xl bg-[rgba(201,163,74,0.06)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center flex-shrink-0">
                      <Home size={14} className="text-[#C9A34A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F5] text-sm font-semibold truncate">{e.property}</p>
                      <p className="text-[#A5A5A5] text-xs mt-0.5">{e.date}</p>
                    </div>
                    <StatusBadge status={e.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Properties */}
          <div className="rounded-2xl border border-[rgba(255,255,255,0.07)] p-7" style={{ background: 'var(--bg-card)' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[#F5F5F5] font-bold text-lg">Recommended For You</h2>
                <p className="text-[#A5A5A5] text-xs mt-0.5">Based on your activity</p>
              </div>
              <Link to="/explore" className="text-[#C9A34A] text-xs hover:text-[#E3C269] flex items-center gap-1 font-semibold">
                Explore More <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommended.map((p) => (
                <Link key={p.id} to={`/property/${p.id}`} className="group block">
                  <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.04)] hover:border-[rgba(201,163,74,0.25)] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)]">
                    <div className="aspect-[16/9] overflow-hidden relative">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
                    </div>
                    <div className="p-4" style={{ background: '#111' }}>
                      <p className="text-[#F5F5F5] text-sm font-semibold truncate group-hover:text-[#E3C269] transition-colors">{p.title}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[#A5A5A5] text-xs truncate flex items-center gap-1">
                          <MapPin size={10} className="text-[#C9A34A]" />
                          {p.location}
                        </p>
                        <p className="text-[#C9A34A] text-sm font-bold flex-shrink-0 ml-2">{p.priceDisplay}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
