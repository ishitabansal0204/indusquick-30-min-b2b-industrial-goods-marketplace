import React from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { Zap, Plus, Minus, Check, AlertTriangle, Layers } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateCartQuantity, setSelectedProduct } = useApp();

  const cartItem = cart.find((i) => i.product.id === product.id);
  const qtyInCart = cartItem ? cartItem.quantity : 0;

  // Best tier discount savings
  const bestTier = product.bulkTiers && product.bulkTiers.length > 1 ? product.bulkTiers[product.bulkTiers.length - 1] : null;

  return (
    <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
      {/* Clickable Card Body */}
      <div
        onClick={() => setSelectedProduct(product)}
        className="p-4 cursor-pointer flex-1 flex flex-col"
      >
        {/* Product Image Slot with Styled Resilient Fallback */}
        <div className="relative w-full h-44 bg-slate-50 rounded-lg overflow-hidden flex items-center justify-center p-3 mb-3 border border-slate-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
            loading="lazy"
          />

          {/* Quick ETA overlay tag */}
          <div className="absolute top-2 left-2 flex items-center gap-1 text-[11px] font-bold bg-white/95 text-slate-800 px-2 py-0.5 rounded shadow-xs border border-slate-200">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{product.darkstoreETA}</span>
          </div>

          {/* Low stock alert text */}
          {product.isLowStock && (
            <div className="absolute top-2 right-2 text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
              Only {product.stock} Left
            </div>
          )}
        </div>

        {/* Clean Metadata: Brand & SKU */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
          <span className="font-semibold text-slate-700 uppercase tracking-wider">{product.brand}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono text-[11px]">{product.sku}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-amber-700 transition-colors line-clamp-2 leading-snug mb-2">
          {product.name}
        </h3>

        {/* Pack and HSN info */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <span>{product.unit}</span>
          <span aria-hidden="true">·</span>
          <span>HSN {product.hsnCode}</span>
        </div>

        {/* Key Specification Preview */}
        <div className="mt-auto pt-2 border-t border-slate-100 text-[11px] text-slate-600 line-clamp-1">
          {Object.entries(product.specs).slice(0, 2).map(([k, v]) => `${k}: ${v}`).join(' · ')}
        </div>
      </div>

      {/* Card Action & Price Footer */}
      <div className="p-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-extrabold text-slate-900 tabular-nums">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-slate-400 line-through tabular-nums">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center gap-1">
            <span>+{product.gstRate}% GST</span>
            {bestTier && (
              <>
                <span>·</span>
                <span className="text-emerald-700 font-semibold">
                  Bulk: ₹{bestTier.pricePerUnit} ({bestTier.minQty}+)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Cart Stepper or Quick Add Button */}
        {qtyInCart > 0 ? (
          <div className="flex items-center bg-amber-500 text-slate-950 rounded-lg p-0.5 shadow-xs">
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateCartQuantity(product.id, qtyInCart - 1);
              }}
              className="p-1.5 hover:bg-amber-600 rounded text-slate-950 transition-colors cursor-pointer"
              title="Reduce quantity"
            >
              <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
            <span className="px-2 text-xs font-bold tabular-nums min-w-[24px] text-center">
              {qtyInCart}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateCartQuantity(product.id, qtyInCart + 1);
              }}
              className="p-1.5 hover:bg-amber-600 rounded text-slate-950 transition-colors cursor-pointer"
              title="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>
        ) : (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product, product.moq);
            }}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        )}
      </div>
    </div>
  );
};
