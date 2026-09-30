import React from 'react';
import { useApp } from '../../context/AppContext';
import { HERO_IMAGE } from '../../data/mockData';
import { Zap, Clock, ShieldCheck, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setActiveView, setSearchQuery, selectedLocation } = useApp();

  const handleQuickSearch = (term: string) => {
    setSearchQuery(term);
    setActiveView('search');
  };

  return (
    <section className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Value Proposition & Proof */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Promise Tag */}
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold tracking-wide">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <span>HYPERLOCAL B2B FULFILLMENT</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-slate-300">Live Darkstore at {selectedLocation.industrialArea}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Industrial essentials. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                At your job site in 30 minutes.
              </span>
            </h1>

            <p className="text-slate-300 text-base max-w-xl leading-relaxed">
              Eliminate costly construction and factory downtime. From Bosch rotary hammer bits and Polycab FR cables to Karam safety harnesses and SKF bearings—dispatched from local micro-warehouses with instant GST tax invoices.
            </p>

            {/* Quick Keyword Hotlist */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Site Urgent:</span>
              {[
                '10mm drill bit',
                'Polycab 2.5mm red',
                '63A 4-Pole MCB',
                'Safety Harness PN56',
                'Loctite 243',
                'M10x50 Bolts',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => handleQuickSearch(term)}
                  className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded border border-slate-700 transition-colors cursor-pointer"
                >
                  {term}
                </button>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveView('search')}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-lg flex items-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <span>Browse Full Industrial Catalog</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleQuickSearch('Bosch')}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                Power Tools & Bits
              </button>
            </div>

            {/* Adjacent Social Proof Metrics */}
            <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-lg font-bold text-white tabular-nums">24 Mins</div>
                <div className="text-xs text-slate-400">Average Delivery SLA</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white tabular-nums">100%</div>
                <div className="text-xs text-slate-400">GST Input Credit Ready</div>
              </div>
              <div>
                <div className="text-lg font-bold text-white tabular-nums">40+ Brands</div>
                <div className="text-xs text-slate-400">OEM Direct Sourced</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Image with Live Darkstore HUD */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-800">
              <img
                src={HERO_IMAGE}
                alt="IndusQuick automated darkstore warehouse with rapid picker dispatch"
                className="w-full h-80 lg:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

              {/* Overlay card for quick commerce verification */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700 text-xs text-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>Active Darkstore: {selectedLocation.industrialArea}</span>
                  </div>
                  <span className="text-emerald-400 font-bold tabular-nums">● 98.4% On-Time</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                  <span>⚡ 3-minute picker staging</span>
                  <span>·</span>
                  <span>🚛 EV cargo dispatch</span>
                  <span>·</span>
                  <span>📋 Tax invoice included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
