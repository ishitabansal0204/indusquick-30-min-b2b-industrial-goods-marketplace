import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Store,
  X,
  Package,
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Boxes,
  Truck,
  ArrowUpRight,
  ShieldCheck,
} from 'lucide-react';

export const SellerDashboardModal: React.FC = () => {
  const { setActiveView, products, orders, showToast } = useApp();

  const [activeTab, setActiveTab] = useState<'orders' | 'inventory' | 'analytics'>('orders');

  const handleRestock = (productName: string) => {
    showToast(`PO generated to Bosch central logistics for 200 units of ${productName}`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-blue-500 text-slate-950 font-black px-2 py-0.5 rounded">
                DARKSTORE HUB #04
              </span>
              <h1 className="text-xl font-bold">Okhla Industrial Micro-Fulfillment Operations</h1>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live Picker Queue · Fleet Dispatch Control · Automated Darkstore Restocking
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveView('home')}
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-lg border border-slate-700 transition-colors self-start sm:self-auto cursor-pointer"
        >
          Exit to Buyer View
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Today's Fulfillment</div>
          <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">48 Orders</div>
          <div className="text-[11px] text-emerald-600 font-bold mt-1">98.2% on 30-min SLA</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Daily Hub GMV</div>
          <div className="text-2xl font-black text-slate-900 mt-1 tabular-nums">₹4,28,450</div>
          <div className="text-[11px] text-slate-400 mt-1">Avg Ticket: ₹8,920</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Average Picker Time</div>
          <div className="text-2xl font-black text-amber-600 mt-1 tabular-nums">3m 12s</div>
          <div className="text-[11px] text-slate-400 mt-1">Shelf scan to EV loading</div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200">
          <div className="text-xs text-slate-500 font-medium">Active EV Fleet</div>
          <div className="text-2xl font-black text-emerald-700 mt-1 tabular-nums">12 Vans</div>
          <div className="text-[11px] text-slate-400 mt-1">Mahindra & Bajaj EV 3W</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
            activeTab === 'orders' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Active Picker Queue ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
            activeTab === 'inventory' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900 bg-slate-100'
          }`}
        >
          Inventory & Reorder Alerts (2 Critical)
        </button>
      </div>

      {/* Tab 1: Orders Dispatch Queue */}
      {activeTab === 'orders' && (
        <div className="space-y-3">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">{ord.orderNumber}</span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                    PO: {ord.poNumber || 'Urgent Direct'}
                  </span>
                  <span className="font-bold text-emerald-700 uppercase">{ord.status}</span>
                </div>
                <div className="text-slate-500 mt-1">
                  Buyer: <strong className="text-slate-800">{ord.companyName}</strong> · Dest: {ord.shippingAddress.title} ({ord.shippingAddress.industrialArea})
                </div>
                <div className="text-slate-600 mt-1 font-medium">
                  {ord.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right">
                  <div className="font-extrabold text-sm text-slate-900 tabular-nums">
                    ₹{ord.total.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-slate-400">EV Driver: {ord.driver.name}</div>
                </div>

                <button
                  onClick={() => showToast(`Picker manifest printed for Order ${ord.orderNumber}`, 'info')}
                  className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg border border-slate-200 cursor-pointer"
                >
                  Print Shelf Tag
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Inventory & Reorder Alerts */}
      {activeTab === 'inventory' && (
        <div className="space-y-4">
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 flex items-start gap-3 text-xs text-rose-900">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Low Stock Alarm (30-Min Darkstore Buffer):</span>
              <p className="mt-0.5 text-rose-800">
                Bosch 10mm SDS-Plus Bits has fallen to 8 units in Okhla Hub #4. Automated restock PO ready.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="p-3">Product Name & SKU</th>
                  <th className="p-3">Current Stock</th>
                  <th className="p-3">Buffer Threshold</th>
                  <th className="p-3">Supplier Brand</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">
                      {p.name}
                      <div className="text-[10px] text-slate-400 font-mono">{p.sku}</div>
                    </td>
                    <td className="p-3 font-bold tabular-nums">
                      <span className={p.isLowStock ? 'text-rose-600' : 'text-slate-900'}>
                        {p.stock} {p.unit}
                      </span>
                    </td>
                    <td className="p-3 text-slate-500 tabular-nums">15 units</td>
                    <td className="p-3 font-medium text-slate-700">{p.brand}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleRestock(p.name)}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded text-[11px] cursor-pointer"
                      >
                        Trigger Restock PO
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
