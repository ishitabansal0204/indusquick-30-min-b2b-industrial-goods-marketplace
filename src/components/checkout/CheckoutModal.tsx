import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  CheckCircle2,
  Building,
  CreditCard,
  QrCode,
  Truck,
  ShieldCheck,
  ArrowRight,
  FileCheck,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cart,
    cartSubtotal,
    cartGstTotal,
    cartTotal,
    selectedLocation,
    businessProfile,
    placeOrder,
    setActiveView,
    showToast,
  } = useApp();

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'credit_line' | 'netbanking' | 'corporate_card' | 'cod'>('upi');
  const [poNumber, setPoNumber] = useState('PO-2026/SEW/0492');
  const [costCenter, setCostCenter] = useState('CC-CIVIL-04');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutModalOpen) return null;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newOrder = placeOrder({
        poNumber,
        costCenter,
        paymentMethod,
        deliverySpeed: '30min',
      });
      setActiveView('tracking');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-slate-200 my-auto">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-amber-500 text-slate-950 px-2 py-0.5 rounded text-xs font-black">
                30-MIN DISPATCH
              </span>
              <h2 className="text-lg font-bold text-slate-900">B2B Quick Checkout</h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review destination site, GST credentials & authorized payment
            </p>
          </div>
          <button
            onClick={() => setIsCheckoutModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Step 1: Delivery Job Site */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>1. Job Site Delivery Destination</span>
              </span>
              <span className="text-emerald-700 font-bold">⚡ Guaranteed 30-Min Arrival</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">{selectedLocation.title}</div>
              <div className="text-slate-600 mt-0.5">{selectedLocation.addressLine}</div>
              <div className="text-[11px] text-slate-400 mt-1">
                Area: {selectedLocation.industrialArea} · Contact: {selectedLocation.contactPerson} ({selectedLocation.phone})
              </div>
              {selectedLocation.gateInstructions && (
                <div className="mt-2 text-[11px] text-amber-800 bg-amber-50 px-2 py-1 rounded border border-amber-200">
                  Gate Protocol: {selectedLocation.gateInstructions}
                </div>
              )}
            </div>
          </div>

          {/* Step 2: GSTIN & PO Billing Information */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-blue-600" />
                <span>2. GST Tax Invoice & PO Information</span>
              </span>
              <span className="text-blue-700 font-bold">100% Tax Credit Verified</span>
            </div>
            <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{businessProfile.companyName}</div>
                  <div className="text-slate-500 font-mono text-[11px]">GSTIN: {businessProfile.gstin}</div>
                </div>
                <span className="text-[11px] bg-emerald-50 text-emerald-700 font-bold px-2 py-1 rounded border border-emerald-200">
                  Active Taxpayer
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Purchase Order (PO) Number</label>
                  <input
                    type="text"
                    value={poNumber}
                    onChange={(e) => setPoNumber(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 font-medium">Cost Center / Job Tag</label>
                  <input
                    type="text"
                    value={costCenter}
                    onChange={(e) => setCostCenter(e.target.value)}
                    className="w-full px-2 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Step 3: Payment Method Selection */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>3. Select B2B Payment Authorization</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {/* UPI */}
              <div
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <QrCode className="w-4 h-4 text-amber-600" />
                  <span>Instant UPI (Auto-verified)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Google Pay, PhonePe, Paytm, BHIM. Zero surcharge.
                </div>
              </div>

              {/* Corporate Credit Line */}
              <div
                onClick={() => setPaymentMethod('credit_line')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'credit_line'
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <div className="flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-blue-600" />
                    <span>30-Day B2B Credit Line</span>
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Avail. Credit: <strong className="text-emerald-700">₹{businessProfile.availableCredit.toLocaleString('en-IN')}</strong>
                </div>
              </div>

              {/* Corporate NetBanking */}
              <div
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Building className="w-4 h-4 text-slate-700" />
                  <span>Corporate NetBanking</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  HDFC, ICICI, SBI, Axis Corporate approval chains.
                </div>
              </div>

              {/* Cash / Pay on Delivery */}
              <div
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <Truck className="w-4 h-4 text-slate-700" />
                  <span>Pay on Site Delivery (POD)</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-1">
                  Pay courier driver via UPI QR or company cheque.
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Breakdown */}
          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Items Total ({cart.length} SKUs):</span>
              <span className="tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>GST Tax (18% / 28%):</span>
              <span className="tabular-nums">₹{cartGstTotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>30-Minute Priority Cargo Courier:</span>
              <span className="text-emerald-400 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-white font-black text-base pt-2 border-t border-slate-800">
              <span>Grand Total Payable:</span>
              <span className="text-amber-400 tabular-nums">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Clicking place order dispatches cargo van in 5 minutes.
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={isProcessing}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-75 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing & Assigning Hub...</span>
              </>
            ) : (
              <>
                <span>Place Order & Dispatch 30M</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
