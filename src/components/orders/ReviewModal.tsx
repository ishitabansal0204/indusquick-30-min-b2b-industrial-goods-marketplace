import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, CheckCircle2, ThumbsUp, Truck } from 'lucide-react';

export const ReviewModal: React.FC = () => {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    selectedReviewOrder,
    showToast,
  } = useApp();

  const [productRating, setProductRating] = useState(5);
  const [deliveryRating, setDeliveryRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('Superfast 30-min delivery on job site');
  const [reviewText, setReviewText] = useState('Carbide bit and drill delivered right on time. Genuine Bosch parts with official warranty and invoice.');
  const [submitted, setSubmitted] = useState(false);

  if (!isReviewModalOpen || !selectedReviewOrder) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Thank you! Business review published to community ledger', 'success');
  };

  const handleClose = () => {
    setIsReviewModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 my-auto">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Contractor Feedback - Order #{selectedReviewOrder.orderNumber}
            </h2>
            <div className="text-xs text-slate-500">
              Help other industrial buyers & engineers verify quality
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
            {/* 1. Product Quality Rating */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-bold text-slate-900">
                1. Product Quality & Specification Authenticity
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setProductRating(star)}
                    className="p-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= productRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 font-bold text-slate-700">{productRating} / 5 Stars</span>
              </div>
            </div>

            {/* 2. Delivery Speed Rating */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <label className="block font-bold text-slate-900 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>2. 30-Minute Delivery Speed & Courier Professionalism</span>
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setDeliveryRating(star)}
                    className="p-1 text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= deliveryRating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 font-bold text-slate-700">{deliveryRating} / 5 Stars</span>
              </div>
              <div className="text-[11px] text-slate-500">
                Courier: {selectedReviewOrder.driver.name} ({selectedReviewOrder.driver.vehicle})
              </div>
            </div>

            {/* Review Title & Comments */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Headline Summary
              </label>
              <input
                type="text"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Detailed Feedback (Reinforcement, Durability, Packing, Gate Handover)
              </label>
              <textarea
                rows={3}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
            >
              Post Verified Contractor Review
            </button>
          </form>
        ) : (
          <div className="p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              Review Submitted Successfully!
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Your feedback helps engineers across Delhi NCR find reliable industrial supplies.
            </p>
            <button
              onClick={handleClose}
              className="px-5 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
