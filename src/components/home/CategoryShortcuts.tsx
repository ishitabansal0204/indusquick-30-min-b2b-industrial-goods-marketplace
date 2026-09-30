import React from 'react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../data/mockData';
import {
  Wrench,
  Zap,
  Shield,
  Layers,
  Flame,
  Cpu,
  Package,
  ArrowUpRight,
} from 'lucide-react';

export const CategoryShortcuts: React.FC = () => {
  const { setActiveCategory, setActiveView } = useApp();

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'powertools':
        return <Wrench className="w-5 h-5 text-amber-600" />;
      case 'electrical':
        return <Zap className="w-5 h-5 text-blue-600" />;
      case 'hardware':
        return <Layers className="w-5 h-5 text-slate-700" />;
      case 'safety':
        return <Shield className="w-5 h-5 text-emerald-600" />;
      case 'plumbing':
        return <Flame className="w-5 h-5 text-cyan-600" />;
      case 'bearings':
        return <Cpu className="w-5 h-5 text-purple-600" />;
      case 'adhesives':
        return <Flame className="w-5 h-5 text-rose-600" />;
      case 'packaging':
        return <Package className="w-5 h-5 text-amber-700" />;
      default:
        return <Wrench className="w-5 h-5 text-slate-700" />;
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveView('search');
  };

  return (
    <section className="py-8 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">
              B2B Industrial Catalog
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified OEM specifications with immediate 30-minute job site dispatch
            </p>
          </div>
          <button
            onClick={() => {
              setActiveCategory('all');
              setActiveView('search');
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat.id)}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-400 hover:shadow-md transition-all text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center mb-2 group-hover:bg-amber-50 group-hover:border-amber-200 transition-colors">
                {getCategoryIcon(cat.id)}
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <div className="text-[11px] text-slate-400 mt-0.5 tabular-nums">
                  {cat.itemCount}+ items
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
