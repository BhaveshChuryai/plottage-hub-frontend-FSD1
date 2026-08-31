import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Heart, MessageSquare, TrendingUp, User, Settings, LogOut,
  Bell, Search, Menu, X, ChevronRight, ArrowUpRight, Eye, Bookmark,
  MapPin, Home
} from 'lucide-react';
import { properties, enquiriesMock, chartData } from '../data/properties';
import useAuth from '../hooks/useAuth';
import useWishlist from '../hooks/useWishlist';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: Heart, label: 'Saved Properties', id: 'saved' },
  { icon: MessageSquare, label: 'My Enquiries', id: 'enquiries' },
  { icon: TrendingUp, label: 'My Investments', id: 'investments' },
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

function StatusBadge({ status }) {
  const map = {
    'Pending': 'status-pending',
    'Contacted': 'status-contacted',
    'Site Visit': 'status-sitevisit',
    'Closed': 'status-closed',
  };
  return (
    <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${map[status] || 'status-pending'}`}>
      {status}
    </span>
  );
}

// Bar chart with improved spacing
function BarChart() {
  const max = Math.max(...chartData.map((d) => d.value));
  return (
    <div className="flex items-end justify-between gap-4 h-32 pt-4">
      {chartData.map((d) => (
        <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
          <span className="text-[#A5A5A5] text-xs font-medium">{d.value}</span>
          <div
            className="w-full rounded-t transition-all duration-700"
            style={{
              height: `${(d.value / max) * 80}px`,
              background: 'linear-gradient(to top, #C9A34A, #E3C269)',
              opacity: d.month === 'Aug' ? 1 : 0.4,
              minHeight: '4px',
            }}
          />
          <span className="text-[#A5A5A5] text-xs">{d.month}</span>
        </div>
      ))}
    </div>
  );
}

const recommended = properties.slice(4, 7);

export default function Dashboard() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    { label: 'Saved Properties', value: savedProperties.length, icon: Bookmark, trend: wishlist.length > 0 ? `${wishlist.length} saved` : 'None saved', color: 'text-[#C9A34A]' },
    { label: 'Active Enquiries', value: 4, icon: MessageSquare, trend: '2 awaiting response', color: 'text-blue-400' },
    { label: 'Properties Viewed', value: 28, icon: Eye, trend: '+8 this month', color: 'text-purple-400' },
    { label: 'Opportunities', value: 8, icon: TrendingUp, trend: 'High potential', color: 'text-emerald-400' },
  ];

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col h-full ${mobile ? '' : 'w-64'}`}>
      {/* Logo */}
      <div className="p-5 border-b border-[rgba(255,255,255,0.06)]">
        <Link to="/" onClick={() => setSidebarOpen(false)}>
          <img
            src="/assets/plottage-hub-logo.png"
            alt="Plottage Hub"
            className="h-12 w-auto object-contain"
          />
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
                ? 'sidebar-active pl-3'
                : 'text-[#A5A5A5] hover:text-[#F5F5F5] hover:bg-[rgba(255,255,255,0.03)]'
            }`}
          >
            <Icon size={18} />
            {label}
          </button>
        ))}
      </nav>

      {/* User card — uses AuthContext data */}
      <div className="p-4 border-t border-[rgba(255,255,255,0.06)]">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(201,163,74,0.05)] border border-[rgba(201,163,74,0.1)]">
          <div className="w-9 h-9 rounded-full bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.25)] flex items-center justify-center flex-shrink-0">
            <span className="text-[#C9A34A] font-bold text-sm">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#F5F5F5] text-sm font-medium truncate">{user?.name || 'User'}</p>
            <p className="text-[#A5A5A5] text-xs">Premium Member</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full mt-2 flex items-center gap-2 px-4 py-2.5 text-sm text-[#A5A5A5] hover:text-red-400 transition-colors rounded-xl hover:bg-red-500/5"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#080808] flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 flex-shrink-0 bg-[#0d0d0d] border-r border-[rgba(255,255,255,0.06)] min-h-screen sticky top-0">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-[#0d0d0d] border-r border-[rgba(255,255,255,0.06)] mobile-menu-open flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-[rgba(255,255,255,0.06)]">
              <span className="text-[#F5F5F5] font-semibold">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="text-[#A5A5A5] hover:text-[#F5F5F5]" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)] px-4 sm:px-6 h-16 flex items-center gap-4">
          <button
            className="lg:hidden text-[#A5A5A5] hover:text-[#C9A34A] transition-colors"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo on mobile top */}
          <div className="lg:hidden">
            <img src="/assets/plottage-hub-logo.png" alt="Plottage Hub" className="h-9 w-auto object-contain" />
          </div>

          <div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A5A5A5]" />
              <input
                type="text"
                placeholder="Search properties..."
                className="w-full input-premium pl-9 py-2 text-sm rounded-xl"
                aria-label="Search dashboard"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative w-9 h-9 rounded-full bg-[rgba(201,163,74,0.06)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center text-[#A5A5A5] hover:text-[#C9A34A] transition-colors" aria-label="Notifications">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C9A34A] rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[rgba(201,163,74,0.12)] border border-[rgba(201,163,74,0.25)] flex items-center justify-center">
              <span className="text-[#C9A34A] font-bold text-sm">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {/* Header — uses AuthContext for user name */}
          <div className="mb-8">
            <p className="text-[#C9A34A] text-xs font-semibold tracking-widest uppercase mb-1">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
            <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-[#F5F5F5]">
              WELCOME, {user?.name?.toUpperCase() || 'INVESTOR'}.
            </h1>
            <p className="text-[#A5A5A5] mt-1">Here's an overview of your property activity.</p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {kpis.map((kpi) => (
              <div key={kpi.label} className="bg-[#101010] rounded-xl border border-[rgba(255,255,255,0.06)] p-5 hover:border-[rgba(201,163,74,0.2)] transition-all duration-200 group">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-[rgba(201,163,74,0.06)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center ${kpi.color}`}>
                    <kpi.icon size={18} />
                  </div>
                  <ArrowUpRight size={16} className="text-[#A5A5A5] group-hover:text-[#C9A34A] transition-colors" />
                </div>
                <p className={`text-3xl font-bold font-['Playfair_Display'] ${kpi.color} mb-1`}>{kpi.value}</p>
                <p className="text-[#F5F5F5] text-sm font-medium">{kpi.label}</p>
                <p className="text-[#A5A5A5] text-xs mt-0.5">{kpi.trend}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Activity Chart */}
            <div className="lg:col-span-2 bg-[#101010] rounded-xl border border-[rgba(255,255,255,0.06)] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[#F5F5F5] font-semibold">Investment Activity</h2>
                  <p className="text-[#A5A5A5] text-xs mt-0.5">Monthly enquiry trend</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#C9A34A]" />
                  <span className="text-[#A5A5A5] text-xs">Enquiries</span>
                </div>
              </div>
              <BarChart />
            </div>

            {/* Quick Stats */}
            <div className="bg-[#101010] rounded-xl border border-[rgba(255,255,255,0.06)] p-6">
              <h2 className="text-[#F5F5F5] font-semibold mb-4">Portfolio Summary</h2>
              <div className="space-y-4">
                {[
                  { label: 'Total Interest Value', value: '₹1.62 Cr', trend: 'combined saved', color: 'text-[#C9A34A]' },
                  { label: 'Response Rate', value: '75%', trend: '3 of 4 responded', color: 'text-blue-400' },
                  { label: 'Avg. Plot Size', value: '14,833 sqft', trend: 'across 3 properties', color: 'text-purple-400' },
                  { label: 'Top Location', value: 'Shrivardhan', trend: 'Most viewed', color: 'text-emerald-400' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.04)] last:border-0">
                    <div>
                      <p className="text-[#A5A5A5] text-xs">{item.label}</p>
                      <p className="text-[#F5F5F5] text-xs mt-0.5 opacity-60">{item.trend}</p>
                    </div>
                    <span className={`font-bold text-sm ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
            {/* Saved Properties — uses global WishlistContext */}
            <div className="bg-[#101010] rounded-xl border border-[rgba(255,255,255,0.06)] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#F5F5F5] font-semibold">Saved Properties</h2>
                <button onClick={() => setActive('saved')} className="text-[#C9A34A] text-xs hover:text-[#E3C269] flex items-center gap-1">
                  View All <ChevronRight size={12} />
                </button>
              </div>
              {savedProperties.length === 0 ? (
                <div className="text-center py-8">
                  <Heart size={24} className="text-[#A5A5A5] mx-auto mb-2 opacity-40" />
                  <p className="text-[#A5A5A5] text-sm">No saved properties yet.</p>
                  <Link to="/explore" className="text-[#C9A34A] text-xs hover:text-[#E3C269] mt-1 inline-block">Explore properties →</Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {savedProperties.slice(0, 3).map((p) => (
                    <Link key={p.id} to={`/property/${p.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] hover:border-[rgba(201,163,74,0.15)] transition-all group">
                      <img src={p.image} alt={p.title} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#F5F5F5] text-sm font-medium truncate">{p.title}</p>
                        <div className="flex items-center gap-1 text-[#A5A5A5] text-xs">
                          <MapPin size={10} />
                          <span className="truncate">{p.location}</span>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[#C9A34A] font-semibold text-sm">{p.priceDisplay}</p>
                        <span className="text-emerald-400 text-xs">Available</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Enquiries */}
            <div className="bg-[#101010] rounded-xl border border-[rgba(255,255,255,0.06)] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-[#F5F5F5] font-semibold">Recent Enquiries</h2>
                <button onClick={() => setActive('enquiries')} className="text-[#C9A34A] text-xs hover:text-[#E3C269] flex items-center gap-1">
                  View All <ChevronRight size={12} />
                </button>
              </div>
              <div className="space-y-3">
                {enquiriesMock.map((e) => (
                  <div key={e.id} className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
                    <div className="w-9 h-9 rounded-xl bg-[rgba(201,163,74,0.06)] border border-[rgba(255,255,255,0.06)] flex items-center justify-center flex-shrink-0">
                      <Home size={14} className="text-[#C9A34A]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#F5F5F5] text-sm font-medium truncate">{e.property}</p>
                      <p className="text-[#A5A5A5] text-xs">{e.date}</p>
                    </div>
                    <StatusBadge status={e.status} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommended Properties */}
          <div className="bg-[#101010] rounded-xl border border-[rgba(255,255,255,0.06)] p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-[#F5F5F5] font-semibold">Recommended For You</h2>
                <p className="text-[#A5A5A5] text-xs mt-0.5">Based on your search history</p>
              </div>
              <Link to="/explore" className="text-[#C9A34A] text-xs hover:text-[#E3C269] flex items-center gap-1">
                Explore More <ChevronRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommended.map((p) => (
                <Link key={p.id} to={`/property/${p.id}`} className="group block">
                  <div className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.04)] hover:border-[rgba(201,163,74,0.2)] transition-all duration-200">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                    <div className="p-3">
                      <p className="text-[#F5F5F5] text-sm font-medium truncate">{p.title}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-[#A5A5A5] text-xs truncate">{p.location}</p>
                        <p className="text-[#C9A34A] text-sm font-semibold flex-shrink-0 ml-2">{p.priceDisplay}</p>
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
