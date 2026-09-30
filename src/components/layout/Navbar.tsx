import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Search,
  ShoppingCart,
  Building2,
  Bell,
  Clock,
  ChevronDown,
  Layers,
  History,
  ShieldCheck,
  UserCheck,
  Store,
  HelpCircle,
  Menu,
  X,
  FileDown,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    cartItemCount,
    setIsCartOpen,
    setIsLocationModalOpen,
    selectedLocation,
    businessProfile,
    setIsAuthModalOpen,
    setIsNotificationOpen,
    notifications,
    activeView,
    setActiveView,
    setIsProcurementModalOpen,
    setIsSupportModalOpen,
    searchQuery,
    setSearchQuery,
    orders,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;
  const activeOrder = orders.find((o) => o.status !== 'delivered' && o.status !== 'cancelled');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeView !== 'search') {
      setActiveView('search');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      {/* Utility Alert Top Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-amber-400 font-medium">
            <Clock className="w-3.5 h-3.5" />
            30-Min Darkstore Delivery Active
          </span>
          <span className="hidden md:inline text-slate-500">·</span>
          <span className="hidden md:inline text-slate-300">
            Current Hub: <span className="text-white font-medium">{selectedLocation.industrialArea}</span>
          </span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4 text-xs">
          <a
            href="/IndusQuick_Product_Requirements_Document.docx"
            download="IndusQuick_Product_Requirements_Document.docx"
            className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1 font-semibold"
            title="Download PM Product Requirements Document in .docx"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>PRD (.docx)</span>
          </a>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setIsProcurementModalOpen(true)}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">PO Approvals</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setActiveView('seller')}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">Darkstore Operations</span>
          </button>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setIsSupportModalOpen(true)}
            className="hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Support</span>
          </button>
        </div>
      </div>

      {/* Main Top Navigation: strictly conforming to 3-zone contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveView('home')}
              className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-lg font-black tracking-normal">
                30M
              </span>
              <span>IndusQuick</span>
            </button>
          </div>

          {/* Central Zone 2: Navigation Links & Search */}
          <div className="hidden lg:flex items-center gap-6 flex-1 max-w-xl mx-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (activeView !== 'search' && e.target.value.length > 0) {
                    setActiveView('search');
                  }
                }}
                placeholder="Search 10mm drill bit, Polycab 2.5mm wire, MCB, SKF bearing..."
                className="w-full pl-10 pr-24 py-2 bg-slate-100 hover:bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800 transition-colors"
              >
                Search
              </button>
            </form>

            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600 whitespace-nowrap">
              <button
                onClick={() => setActiveView('search')}
                className={`hover:text-slate-900 transition-colors cursor-pointer ${
                  activeView === 'search' ? 'text-slate-900 font-semibold' : ''
                }`}
              >
                Catalog
              </button>
              <button
                onClick={() => setActiveView('orders')}
                className={`hover:text-slate-900 transition-colors cursor-pointer ${
                  activeView === 'orders' ? 'text-slate-900 font-semibold' : ''
                }`}
              >
                Orders
              </button>
              {activeOrder && (
                <button
                  onClick={() => setActiveView('tracking')}
                  className="flex items-center gap-1.5 text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md text-xs font-semibold hover:bg-amber-100 transition-colors cursor-pointer animate-pulse"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Live Track ({activeOrder.etaMinutes}m)
                </button>
              )}
            </nav>
          </div>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Location selector button */}
            <button
              onClick={() => setIsLocationModalOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-left transition-colors cursor-pointer"
              title="Change Delivery Site"
            >
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <div className="text-xs leading-tight">
                <div className="font-semibold text-slate-900 truncate max-w-[120px]">
                  {selectedLocation.title}
                </div>
                <div className="text-slate-500 truncate max-w-[120px]">
                  {selectedLocation.industrialArea}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* Business Profile Button */}
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-xs font-semibold text-slate-800 transition-colors cursor-pointer"
              title="Business GST Profile"
            >
              <Building2 className="w-4 h-4 text-slate-600" />
              <span className="hidden md:inline truncate max-w-[140px]">
                {businessProfile.companyName}
              </span>
            </button>

            {/* Notifications */}
            <button
              onClick={() => setIsNotificationOpen(true)}
              className="relative p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-slate-900 text-white px-3.5 py-2 rounded-lg hover:bg-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4 text-amber-400" />
              <span className="tabular-nums">{cartItemCount}</span>
              <span className="hidden sm:inline">Items</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="lg:hidden pb-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (activeView !== 'search' && e.target.value.length > 0) {
                  setActiveView('search');
                }
              }}
              placeholder="Search drill bits, wires, safety gears, fasteners..."
              className="w-full pl-10 pr-20 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-slate-900 text-white text-xs font-semibold rounded"
            >
              Search
            </button>
          </form>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 py-3 space-y-2">
            <button
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Home
            </button>
            <button
              onClick={() => {
                setActiveView('search');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Full Catalog & Filters
            </button>
            <button
              onClick={() => {
                setActiveView('orders');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
            >
              Order History & Reorders
            </button>
            {activeOrder && (
              <button
                onClick={() => {
                  setActiveView('tracking');
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-md flex items-center justify-between"
              >
                <span>Live 30-Min Tracking</span>
                <span>{activeOrder.etaMinutes} min left</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsLocationModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md flex items-center justify-between"
            >
              <span>Current Site</span>
              <span className="text-xs text-slate-500">{selectedLocation.title}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
