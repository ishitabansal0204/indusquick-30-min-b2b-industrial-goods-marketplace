import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Truck, Clock, HelpCircle, Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveCategory, setActiveView } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 pb-16 md:pb-8 pt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Proposition */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-white font-extrabold text-lg">
              <span className="bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded text-sm font-black">
                30M
              </span>
              <span>IndusQuick</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              India's first B2B industrial quick-commerce marketplace. Combining the catalog depth of IndiaMART with the 30-minute hyper-local delivery promise of darkstores.
            </p>
            <div className="text-[11px] text-slate-500">
              CIN: U72900DL2025PTC849201 · ISO 9001:2015 Certified
            </div>
          </div>

          {/* Core Categories */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Industrial Catalog
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('powertools');
                    setActiveView('search');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Power Tools & SDS Drill Bits
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('electrical');
                    setActiveView('search');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FR Wires, Cables & MCBs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('safety');
                    setActiveView('search');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Safety PPE & Fall Harnesses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('hardware');
                    setActiveView('search');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Grade 8.8 High Tensile Bolts
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveCategory('bearings');
                    setActiveView('search');
                  }}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  SKF Industrial Bearings
                </button>
              </li>
            </ul>
          </div>

          {/* Active Darkstore Hubs */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              30-Min Micro-Hub Network
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Okhla Phase-III Industrial Hub (Delhi)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>IMT Manesar Automotive Cluster (HR)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Noida Expressway Industrial Sector (UP)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Peenya Industrial Estate (Bengaluru)</span>
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Sanand GIDC Engineering Hub (Gujarat)</span>
              </li>
            </ul>
          </div>

          {/* Enterprise Capabilities */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Enterprise Features
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>100% Verified GST Invoicing (GSTR-2B)</li>
              <li>Revolving 30-Day B2B Credit Limits</li>
              <li>Multi-User PO Approval Thresholds</li>
              <li>Batch Test Certificates (MTC / PGM)</li>
              <li>Doorstep 30-Min Defect Replacement</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 IndusQuick Technologies Pvt Ltd. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>GSTIN: 07AAACI8492K1Z8</span>
            <span>·</span>
            <span>Made for Indian Industrialists, Fabricators & Contractors</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
