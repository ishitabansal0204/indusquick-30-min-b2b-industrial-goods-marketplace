import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Zap,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Check,
  FileText,
  RotateCcw,
  Layers,
  ArrowRight,
  HelpCircle,
  Share2,
  Bookmark,
  Star,
} from 'lucide-react';
import { Product } from '../../types';
import { DEMO_REVIEWS } from '../../data/mockData';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    cart,
    addToCart,
    updateCartQuantity,
    setIsCartOpen,
    setIsQuoteModalOpen,
    products,
    selectedLocation,
    showToast,
  } = useApp();

  const [quantity, setQuantity] = useState<number>(selectedProduct?.moq || 1);
  const [activeTab, setActiveTab] = useState<'specs' | 'tiers' | 'reviews'>('specs');

  if (!selectedProduct) return null;

  // Find if in cart
  const cartItem = cart.find((i) => i.product.id === selectedProduct.id);

  // Compute tier price for chosen quantity
  const getTierPrice = (qty: number) => {
    if (!selectedProduct.bulkTiers || selectedProduct.bulkTiers.length === 0) return selectedProduct.price;
    const sorted = [...selectedProduct.bulkTiers].sort((a, b) => b.minQty - a.minQty);
    for (const tier of sorted) {
      if (qty >= tier.minQty) return tier.pricePerUnit;
    }
    return selectedProduct.price;
  };

  const currentUnitPrice = getTierPrice(quantity);
  const lineSubtotal = currentUnitPrice * quantity;
  const lineGst = Math.round(lineSubtotal * (selectedProduct.gstRate / 100));
  const lineTotal = lineSubtotal + lineGst;

  // Substitute products
  const substitutes: Product[] = (selectedProduct.substituteIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, quantity);
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link & SKU copied to clipboard', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="px-6 py-3.5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3 text-xs text-slate-500">
            <span className="font-bold text-slate-800 uppercase tracking-wide">
              {selectedProduct.brand}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">SKU: {selectedProduct.sku}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">HSN: {selectedProduct.hsnCode}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
              title="Share SKU"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedProduct(null)}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split PDP */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Visual Gallery & Specs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Main Product Image Container */}
            <div className="w-full h-72 sm:h-84 bg-slate-50 rounded-xl border border-slate-200 p-6 flex items-center justify-center relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
                referrerPolicy="no-referrer"
              />

              {/* 30-min guarantee pill */}
              <div className="absolute top-3 left-3 bg-white px-2.5 py-1 rounded-md shadow-xs border border-slate-200 flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <span>30-Min Delivery Ready</span>
              </div>

              {selectedProduct.isLowStock && (
                <div className="absolute top-3 right-3 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md border border-rose-200 text-xs font-bold">
                  Low Stock ({selectedProduct.stock} left)
                </div>
              )}
            </div>

            {/* Title & Rating */}
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {selectedProduct.name}
              </h2>

              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-500">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-slate-900">{selectedProduct.rating}</span>
                  <span className="text-slate-500">({selectedProduct.reviewCount} business ratings)</span>
                </div>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">100% Verified Genuine</span>
                <span aria-hidden="true">·</span>
                <span>Package: {selectedProduct.unit}</span>
              </div>
            </div>

            {/* Product Tabs: Specs, Bulk Pricing, Verified Reviews */}
            <div>
              <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab('tiers')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'tiers'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  Bulk Quantity Slab Rates
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-600 hover:text-slate-900 bg-slate-100'
                  }`}
                >
                  Contractor Reviews
                </button>
              </div>

              {/* Tab 1: Technical Specs */}
              {activeTab === 'specs' && (
                <div className="mt-4 space-y-3">
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <table className="w-full text-xs text-left">
                      <tbody className="divide-y divide-slate-100">
                        {Object.entries(selectedProduct.specs).map(([key, val]) => (
                          <tr key={key} className="hover:bg-slate-50">
                            <td className="px-3.5 py-2 font-medium text-slate-500 w-1/3 bg-slate-50/50">
                              {key}
                            </td>
                            <td className="px-3.5 py-2 font-semibold text-slate-800">
                              {val}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {selectedProduct.certifications && selectedProduct.certifications.length > 0 && (
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                        Compliance & Certifications
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs text-slate-700">
                        {selectedProduct.certifications.map((c) => (
                          <span key={c} className="px-2.5 py-1 bg-slate-100 rounded border border-slate-200 font-medium">
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Bulk Pricing Tiers */}
              {activeTab === 'tiers' && (
                <div className="mt-4 space-y-3">
                  <div className="text-xs text-slate-600">
                    Tiered pricing automatically updates based on your job site or project order volume:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {selectedProduct.bulkTiers.map((tier) => {
                      const isActive = quantity >= tier.minQty && (!tier.maxQty || quantity <= tier.maxQty);
                      return (
                        <div
                          key={tier.label}
                          onClick={() => setQuantity(tier.minQty)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                            isActive
                              ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50/50'
                          }`}
                        >
                          <div className="text-xs text-slate-500 font-medium">{tier.label}</div>
                          <div className="text-base font-extrabold text-slate-900 mt-1 tabular-nums">
                            ₹{tier.pricePerUnit.toLocaleString('en-IN')}
                            <span className="text-xs font-normal text-slate-500"> / unit</span>
                          </div>
                          <div className="text-[11px] text-slate-500 mt-1">
                            +{selectedProduct.gstRate}% GST applicable
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-3 bg-slate-100 rounded-lg text-xs text-slate-700 flex items-center justify-between">
                    <span>Need container load or 500+ pieces for institutional projects?</span>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setIsQuoteModalOpen(true);
                      }}
                      className="font-bold text-amber-700 hover:underline cursor-pointer"
                    >
                      Request Bulk RFQ
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Verified Contractor Reviews */}
              {activeTab === 'reviews' && (
                <div className="mt-4 space-y-3">
                  {DEMO_REVIEWS.map((rev) => (
                    <div key={rev.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">{rev.userName}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500">{rev.company}</span>
                        </div>
                        <span className="text-slate-400 tabular-nums">{rev.date}</span>
                      </div>
                      <div className="font-semibold text-slate-800 mb-1">{rev.title}</div>
                      <p className="text-slate-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Smart Product Substitution (Crucial B2B Feature) */}
            {substitutes.length > 0 && (
              <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-200/80">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                    <Layers className="w-4 h-4 text-amber-600" />
                    <span>Instant Smart Substitutes (Same Spec & Available in 20 min)</span>
                  </div>
                  <span className="text-[11px] text-slate-500">In stock at Okhla Darkstore</span>
                </div>
                <div className="space-y-2">
                  {substitutes.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-amber-200"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={sub.image}
                          alt={sub.name}
                          className="w-10 h-10 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{sub.name}</div>
                          <div className="text-[11px] text-slate-500">
                            {sub.brand} · ₹{sub.price} · {sub.darkstoreETA} delivery
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setSelectedProduct(sub)}
                        className="px-2.5 py-1 text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 rounded transition-colors cursor-pointer"
                      >
                        Switch
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contiguous Purchase Module */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
              {/* Delivery Hub & Speed */}
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    Delivering in 30 Minutes
                  </span>
                  <span className="text-emerald-700 font-bold">● Active Hub</span>
                </div>
                <div className="text-slate-500">
                  To: <strong className="text-slate-800">{selectedLocation.title}</strong> ({selectedLocation.industrialArea})
                </div>
                <div className="text-[11px] text-slate-400">
                  Dispatched from local darkstore micro-hub within 5 minutes of PO confirmation.
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="space-y-1">
                <div className="text-xs text-slate-500 font-medium">Applied Unit Rate</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900 tabular-nums">
                    ₹{currentUnitPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    ₹{selectedProduct.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                    Save ₹{selectedProduct.mrp - currentUnitPrice}/unit
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  +{selectedProduct.gstRate}% GST applicable ({selectedProduct.hsnCode})
                </div>
              </div>

              {/* Quantity Stepper with MOQ check */}
              <div>
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <label className="font-semibold text-slate-700">Order Quantity ({selectedProduct.unit}):</label>
                  <span className="text-slate-500">MOQ: {selectedProduct.moq} pcs</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-slate-300 bg-white rounded-lg p-1 shadow-xs">
                    <button
                      onClick={() => setQuantity(Math.max(selectedProduct.moq || 1, quantity - 1))}
                      className="p-2 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={selectedProduct.moq || 1}
                      max={selectedProduct.stock * 3}
                      onChange={(e) => setQuantity(Math.max(selectedProduct.moq || 1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center text-sm font-bold text-slate-900 focus:outline-none tabular-nums"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-slate-100 rounded text-slate-700 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-bold tabular-nums">{quantity}</span> units selected
                  </div>
                </div>
              </div>

              {/* Subtotal & GST Summary */}
              <div className="pt-3 border-t border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Taxable Subtotal:</span>
                  <span className="font-semibold tabular-nums">₹{lineSubtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST ({selectedProduct.gstRate}%):</span>
                  <span className="font-semibold tabular-nums">₹{lineGst.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-sm pt-1 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-amber-800 font-extrabold tabular-nums">
                    ₹{lineTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={handleAddToCart}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Job Site Cart</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
                >
                  Instant 30-Min Checkout
                </button>
              </div>

              {/* Extra B2B Options */}
              <div className="pt-2 flex items-center justify-around text-xs text-slate-600 border-t border-slate-200">
                <button
                  onClick={() => {
                    setSelectedProduct(null);
                    setIsQuoteModalOpen(true);
                  }}
                  className="hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-600" />
                  <span>Request Custom RFQ</span>
                </button>
                <span>·</span>
                <button
                  onClick={() => showToast('Technical team connected: response in 3 mins', 'info')}
                  className="hover:text-slate-900 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ask Technical Question</span>
                </button>
              </div>
            </div>

            {/* B2B Invoicing & Returns Guarantee */}
            <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>IndusQuick Enterprise Buyer Shield</span>
              </div>
              <ul className="text-slate-500 space-y-1 list-disc list-inside">
                <li>Instant 100% GST input tax invoice with correct HSN.</li>
                <li>7-day no-questions-asked replacement for damaged goods.</li>
                <li>Credit terms & 30-day payment ledger available.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
