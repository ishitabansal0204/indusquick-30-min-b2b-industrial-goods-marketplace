import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, PackageCheck, ShoppingCart, Building2 } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeView, setActiveView, cartItemCount, setIsCartOpen, setIsAuthModalOpen } = useApp();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 px-3 py-2 flex items-center justify-around shadow-lg">
      <button
        onClick={() => setActiveView('home')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
          activeView === 'home' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className="w-5 h-5" />
        <span>Home</span>
      </button>

      <button
        onClick={() => setActiveView('search')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
          activeView === 'search' ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Search className="w-5 h-5" />
        <span>Catalog</span>
      </button>

      <button
        onClick={() => setActiveView('orders')}
        className={`flex flex-col items-center gap-1 text-[11px] font-medium transition-colors cursor-pointer ${
          activeView === 'orders' || activeView === 'tracking'
            ? 'text-amber-600 font-bold'
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <PackageCheck className="w-5 h-5" />
        <span>Orders</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 relative transition-colors cursor-pointer"
      >
        <div className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1.5 -right-2 bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center tabular-nums">
              {cartItemCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      <button
        onClick={() => setIsAuthModalOpen(true)}
        className="flex flex-col items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
      >
        <Building2 className="w-5 h-5" />
        <span>Profile</span>
      </button>
    </div>
  );
};
