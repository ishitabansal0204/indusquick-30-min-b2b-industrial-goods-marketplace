import React from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { Zap, Clock, ShieldAlert, ArrowRight } from 'lucide-react';

export const UrgentReorderSection: React.FC = () => {
  const { products, setActiveView, setSearchQuery } = useApp();

  const urgentProducts = products.filter((p) => p.isUrgentNeed || p.isLowStock).slice(0, 4);

  return (
    <section className="py-8 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 shrink-0">
              <Zap className="w-5 h-5 fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                  Urgent Breakdown & Replacement Dispatch
                </h2>
                <span className="text-xs bg-rose-50 text-rose-700 font-semibold px-2 py-0.5 rounded border border-rose-200">
                  Priority 20-min slot
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Critical items kept pre-staged in electric cargo vans for zero machine downtime
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSearchQuery('drill bit');
              setActiveView('search');
            }}
            className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>View All Breakdown Essentials</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {urgentProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
