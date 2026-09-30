import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Trash2,
  Zap,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
  FileSpreadsheet,
  AlertCircle,
  Truck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartBulkSavings,
    cartGstTotal,
    cartTotal,
    cartItemCount,
    selectedLocation,
    businessProfile,
    setIsCheckoutModalOpen,
    setActiveView,
  } = useApp();

  const [deliverySpeed, setDeliverySpeed] = useState<'30min' | '60min' | 'tomorrow'>('30min');
  const [poNumber, setPoNumber] = useState('PO-2026/SEW/0492');
  const [costCenter, setCostCenter] = useState('CC-OKHLA-MAIN');
  const [instructions, setInstructions] = useState(selectedLocation.gateInstructions || '');

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white shadow-2xl h-full flex flex-col border-l border-slate-200">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Job Site Cart</h2>
              <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-bold tabular-nums">
                {cartItemCount} items
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Fulfilling to: <strong className="text-slate-700">{selectedLocation.title}</strong>
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Body */}
        {cart.length === 0 ? (
          <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
              <Truck className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Your site cart is empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Add industrial drill bits, power cables, switchgear, or safety gear for 30-min site delivery.
            </p>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setActiveView('search');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors"
            >
              Browse Industrial Catalog
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Delivery Speed Selector */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  Select Fulfillment Speed
                </span>
                <span className="text-[11px] text-amber-800 font-semibold">Live Darkstore SLA</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliverySpeed('30min')}
                  className={`p-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                    deliverySpeed === '30min'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-[11px] uppercase font-bold">⚡ 30 Mins</div>
                  <div className="text-[10px] opacity-80">Immediate</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySpeed('60min')}
                  className={`p-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                    deliverySpeed === '60min'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-[11px] uppercase font-bold">60 Mins</div>
                  <div className="text-[10px] opacity-80">Standard</div>
                </button>

                <button
                  type="button"
                  onClick={() => setDeliverySpeed('tomorrow')}
                  className={`p-2 rounded-lg text-left text-xs transition-all cursor-pointer ${
                    deliverySpeed === 'tomorrow'
                      ? 'bg-slate-900 text-white font-bold'
                      : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="text-[11px] uppercase font-bold">Tomorrow</div>
                  <div className="text-[10px] opacity-80">Scheduled</div>
                </button>
              </div>
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              {cart.map((item) => {
                const lineTotal = item.unitPrice * item.quantity;
                return (
                  <div
                    key={item.product.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex gap-3 text-xs"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-contain bg-slate-50 rounded-lg p-1 border border-slate-100 shrink-0"
                      referrerPolicy="no-referrer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-semibold text-slate-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-slate-400 hover:text-rose-600 p-0.5 cursor-pointer"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5">
                          {item.product.brand} · HSN {item.product.hsnCode}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                        {/* Stepper */}
                        <div className="flex items-center border border-slate-200 rounded bg-slate-50">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold tabular-nums text-slate-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 hover:bg-slate-200 text-slate-700 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-bold text-slate-900 tabular-nums">
                            ₹{lineTotal.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] text-slate-400 tabular-nums">
                            ₹{item.unitPrice}/unit +{item.product.gstRate}% GST
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* B2B Procurement Fields */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                <span>B2B Purchase Order Metadata</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">PO Reference #</label>
                  <input
                    type="text"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    placeholder="e.g. PO-2026/049"
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Cost Center / Job Code</label>
                  <input
                    type="text"
                    value={costCenter}
                    onChange={(e) => setCostCenter(e.target.value)}
                    placeholder="e.g. CC-CIVIL-01"
                    className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] text-slate-500 font-medium">Site Entry / Gate Instruction</label>
                <input
                  type="text"
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="e.g. Handover to security supervisor Ramesh Patel at Gate 2"
                  className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Savings Callout */}
            {cartBulkSavings > 0 && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800 flex items-center justify-between">
                <span>Total Bulk Slab Savings Applied:</span>
                <span className="font-bold tabular-nums">₹{cartBulkSavings.toLocaleString('en-IN')}</span>
              </div>
            )}
          </div>
        )}

        {/* Footer Billing & Checkout Action */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="text-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Subtotal</span>
                <span className="font-medium tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>GST Tax (CGST 9% + SGST 9%)</span>
                <span className="font-medium tabular-nums">₹{cartGstTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>30-Min Fast Courier Dispatch</span>
                <span className="text-emerald-700 font-bold">FREE (B2B Priority)</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold text-base pt-2 border-t border-slate-200">
                <span>Total Amount</span>
                <span className="text-amber-800 tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>GST Input Credit Eligible · {businessProfile.gstin}</span>
            </div>

            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <span>Proceed to Fast B2B Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
