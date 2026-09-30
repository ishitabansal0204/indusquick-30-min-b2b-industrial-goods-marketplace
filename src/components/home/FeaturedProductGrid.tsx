import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import { ArrowRight, Filter, ShieldCheck, Zap } from 'lucide-react';

export const FeaturedProductGrid: React.FC = () => {
  const { products, setActiveView, setActiveCategory, activeCategory } = useApp();
  const [selectedTab, setSelectedTab] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Catalog' },
    { id: 'powertools', label: 'Power Tools' },
    { id: 'electrical', label: 'Electrical & Cables' },
    { id: 'safety', label: 'Safety & PPE' },
    { id: 'hardware', label: 'Hardware & Fasteners' },
    { id: 'adhesives', label: 'Adhesives & Lubricants' },
  ];

  const filteredProducts =
    selectedTab === 'all'
      ? products
      : products.filter((p) => p.categoryId === selectedTab);

  return (
    <section className="py-10 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
              <span>DARKSTORE ASSORTMENT</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-600 font-bold">100% Ready for Instant Dispatch</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Featured Industrial Supplies & Equipment
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedTab(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedTab === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* B2B Trust Banner */}
        <div className="mt-12 p-6 bg-white rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <Zap className="w-5 h-5 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">30-Minute Job Site SLA</h3>
              <p className="text-xs text-slate-500 mt-1">
                Local darkstore hubs strategically positioned in major industrial corridors for 20-30 min delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Verified OEM Authenticity</h3>
              <p className="text-xs text-slate-500 mt-1">
                Direct supply chains with Bosch, Polycab, 3M, SKF, and Taparia. Zero grey market or counterfeit goods.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
              <span className="font-extrabold text-sm text-emerald-700">GST</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Automated GST Tax Invoices</h3>
              <p className="text-xs text-slate-500 mt-1">
                Full 18% / 28% GST input tax credit pass-through with HSN line items and monthly consolidated statements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
