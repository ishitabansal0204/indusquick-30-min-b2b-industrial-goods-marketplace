import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Upload, CheckCircle2, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

export const ReturnModal: React.FC = () => {
  const {
    isReturnModalOpen,
    setIsReturnModalOpen,
    selectedReturnOrder,
    showToast,
  } = useApp();

  const [selectedItemId, setSelectedItemId] = useState<string>('');
  const [reason, setReason] = useState<string>('Damaged during transit');
  const [resolution, setResolution] = useState<'replacement' | 'credit_refund'>('replacement');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isReturnModalOpen || !selectedReturnOrder) return null;

  const order = selectedReturnOrder;
  const currentItem = order.items.find((i) => i.product.id === selectedItemId) || order.items[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Return ticket logged. Cargo van scheduled for pickup in 25 mins.', 'success');
  };

  const handleClose = () => {
    setIsReturnModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 my-auto">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Report Issue / Return - Order #{order.orderNumber}
            </h2>
            <div className="text-xs text-slate-500">
              Instant 30-min doorstep pickup or replacement
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            {/* Choose item */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Select Item with Defect or Discrepancy
              </label>
              <select
                value={selectedItemId || currentItem.product.id}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white text-xs font-medium focus:outline-none focus:border-amber-500"
              >
                {order.items.map((i) => (
                  <option key={i.product.id} value={i.product.id}>
                    {i.product.name} (Qty: {i.quantity})
                  </option>
                ))}
              </select>
            </div>

            {/* Reason */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Reason for Return
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg bg-white text-xs font-medium focus:outline-none focus:border-amber-500"
              >
                <option value="Damaged during transit">Damaged during transit / broken casing</option>
                <option value="Wrong specifications delivered">Wrong specifications delivered / incorrect drill size</option>
                <option value="Defective / Failed inspection">Defective on job site / failed initial run</option>
                <option value="Missing accessories">Missing accessories / parts in box</option>
                <option value="Over-ordered">Over-ordered project quantity</option>
              </select>
            </div>

            {/* Desired Resolution */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Desired Resolution
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setResolution('replacement')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    resolution === 'replacement'
                      ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500 font-bold text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <div>⚡ 30-Min Fast Replacement</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Courier swaps item immediately
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setResolution('credit_refund')}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                    resolution === 'credit_refund'
                      ? 'border-amber-500 bg-amber-50/50 ring-1 ring-amber-500 font-bold text-slate-900'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  <div>Instant Wallet / Credit Refund</div>
                  <div className="text-[10px] text-slate-500 font-normal mt-0.5">
                    Credit note credited to GSTIN
                  </div>
                </button>
              </div>
            </div>

            {/* Photo Upload Mock */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Attach Inspection Photo (Job Site Evidence)
              </label>
              <div className="border border-dashed border-slate-300 rounded-lg p-4 text-center hover:bg-slate-50 cursor-pointer">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="text-slate-600">Click to upload photo of damaged packaging or part</span>
                <div className="text-[10px] text-slate-400 mt-0.5">PNG, JPG up to 10MB</div>
              </div>
            </div>

            {/* Comments */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Detailed Remarks for Quality Engineering Team
              </label>
              <textarea
                rows={2}
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="e.g. Carbide tip was chipped upon box opening at Sector 6 workshop."
                className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
            >
              Submit Ticket & Dispatch Return Van
            </button>
          </form>
        ) : (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Return Request Registered (#RET-8941)
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Our electric cargo pickup van has been notified. Estimated pickup at{' '}
              <strong>{order.shippingAddress.title}</strong> is within 25 minutes.
            </p>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-left text-xs space-y-1">
              <div><strong>Resolution:</strong> {resolution === 'replacement' ? 'Immediate Replacement' : 'Credit Refund'}</div>
              <div><strong>Item:</strong> {currentItem.product.name}</div>
              <div><strong>Status:</strong> Courier Out for Pickup</div>
            </div>

            <button
              onClick={handleClose}
              className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs hover:bg-slate-800 transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
