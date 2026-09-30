import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, Upload, CheckCircle2, Building, ShieldCheck } from 'lucide-react';

export const QuoteRequestModal: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen, businessProfile, showToast } = useApp();

  const [productTitle, setProductTitle] = useState('Bosch SDS Plus 10mm Drill Bits (500 units) / Polycab 2.5mm Wire (100 Coils)');
  const [targetDate, setTargetDate] = useState('Within 48 Hours');
  const [targetPrice, setTargetPrice] = useState('180');
  const [notes, setNotes] = useState('Institutional purchase for Noida Metro Expansion Project. Delivery split across 2 site locations.');
  const [submitted, setSubmitted] = useState(false);

  if (!isQuoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Bulk RFQ submitted to OEM Key Account Desk', 'success');
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 my-auto">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              Request Institutional Bulk Quote (RFQ)
            </h2>
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
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
              Direct factory procurement for bulk project volumes (100+ to 10,000+ units) with mill test certificates.
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Product Details & Target Volume
              </label>
              <textarea
                rows={2}
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Target Price per Unit (₹)
                </label>
                <input
                  type="text"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Required Site Delivery
                </label>
                <select
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs bg-white focus:outline-none focus:border-amber-500"
                >
                  <option value="Same Day (Priority Cargo)">Same Day (Priority Cargo)</option>
                  <option value="Within 48 Hours">Within 48 Hours</option>
                  <option value="Scheduled Monthly Staggered">Scheduled Monthly Staggered</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Upload BOQ / Purchase Requisition Sheet (Optional)
              </label>
              <div className="border border-dashed border-slate-300 rounded-lg p-3 text-center hover:bg-slate-50 cursor-pointer">
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <span className="text-slate-600">Drop PDF, Excel or CAD Drawing</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Project Site Delivery Requirements
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
            >
              Submit RFQ for Instant Corporate Pricing
            </button>
          </form>
        ) : (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Bulk RFQ Submitted (#RFQ-9921)
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Our B2B Corporate Desk has matched your inquiry with authorized OEM distributors. Estimated institutional pricing quote will be shared on <strong>{businessProfile.email}</strong> within 15 minutes.
            </p>
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
