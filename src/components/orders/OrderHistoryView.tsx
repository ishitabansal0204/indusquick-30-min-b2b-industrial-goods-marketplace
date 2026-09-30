import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  RotateCcw,
  FileText,
  Truck,
  CheckCircle2,
  Clock,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
} from 'lucide-react';
import { Order } from '../../types';

export const OrderHistoryView: React.FC = () => {
  const {
    orders,
    reorderPastOrder,
    openInvoice,
    openReturn,
    setActiveOrder,
    setActiveView,
    activeOrder,
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'active' | 'delivered'>('all');

  const filteredOrders = orders.filter((order) => {
    if (filter === 'active') return order.status !== 'delivered' && order.status !== 'cancelled';
    if (filter === 'delivered') return order.status === 'delivered';
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title & Filter Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Job Site Orders & Reorders
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Track live dispatches, download official GST tax invoices, and reorder routine consumables in 1 click
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filter === 'active'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Active 30M ({orders.filter((o) => o.status !== 'delivered').length})
          </button>
          <button
            onClick={() => setFilter('delivered')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              filter === 'delivered'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Delivered ({orders.filter((o) => o.status === 'delivered').length})
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.map((order) => {
          const isDelivered = order.status === 'delivered';
          return (
            <div
              key={order.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-slate-300 transition-all space-y-4"
            >
              {/* Order Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs ${
                      isDelivered
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200 animate-pulse'
                    }`}
                  >
                    {isDelivered ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm text-slate-900">
                        Order #{order.orderNumber}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        PO: {order.poNumber || 'N/A'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Placed: {order.placedAt} · Destination: {order.shippingAddress.title}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-slate-900 tabular-nums">
                      ₹{order.total.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Incl. GST ₹{order.gstTotal.toLocaleString('en-IN')}
                    </div>
                  </div>

                  {!isDelivered ? (
                    <button
                      onClick={() => {
                        setActiveOrder(order);
                        setActiveView('tracking');
                      }}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>Live Track ({order.etaMinutes}m)</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => reorderPastOrder(order)}
                      className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Buy Again</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Items in Order */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {order.items.map((item) => (
                  <div
                    key={item.product.id}
                    className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3 text-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-slate-200 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        Qty: {item.quantity} · ₹{item.unitPrice}/unit
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        HSN {item.product.hsnCode}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer with invoice and issue buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-between text-xs gap-3 border-t border-slate-100">
                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  <span>Fulfillment: 30-Min Electric Van</span>
                  <span>·</span>
                  <span>Driver: {order.driver.name} ({order.driver.vehicleNumber})</span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openInvoice(order)}
                    className="font-semibold text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-amber-600" />
                    <span>GST Tax Invoice</span>
                  </button>

                  {isDelivered && (
                    <button
                      onClick={() => openReturn(order)}
                      className="font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Report Issue / Return</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
