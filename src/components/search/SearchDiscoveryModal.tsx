import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../product/ProductCard';
import {
  Search,
  SlidersHorizontal,
  X,
  Zap,
  Mic,
  ScanBarcode,
  ArrowUpDown,
  Filter,
  Check,
} from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';

export const SearchDiscoveryModal: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    activeCategory,
    setActiveCategory,
    showToast,
  } = useApp();

  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [only30Min, setOnly30Min] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'relevance' | 'price_low' | 'price_high' | 'fastest' | 'rating'>('relevance');
  const [maxPrice, setMaxPrice] = useState<number>(10000);

  // Available unique brands
  const allBrands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand))).sort();
  }, [products]);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search query
        if (searchQuery.trim().length > 0) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchHsn = p.hsnCode.includes(q);
          const matchSub = p.subCategory.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchSku && !matchHsn && !matchSub) {
            return false;
          }
        }

        // Category filter
        if (activeCategory !== 'all' && p.categoryId !== activeCategory) {
          return false;
        }

        // Brand filter
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // 30 min filter
        if (only30Min && !p.darkstoreETA.includes('min')) {
          return false;
        }

        // Price filter
        if (p.price > maxPrice) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price_low') return a.price - b.price;
        if (sortBy === 'price_high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'fastest') {
          const etaA = parseInt(a.darkstoreETA) || 30;
          const etaB = parseInt(b.darkstoreETA) || 30;
          return etaA - etaB;
        }
        return 0; // relevance
      });
  }, [products, searchQuery, activeCategory, selectedBrand, only30Min, maxPrice, sortBy]);

  const recentSearches = ['10mm drill bit', 'Polycab 2.5mm wire', 'Havells 63A MCB', 'Karam PN56 harness', 'Loctite 243'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Search Input Bar with Voice & Barcode buttons */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-slate-400 absolute left-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search industrial products, exact brand, SKU (e.g., BSH-SDS-10-160), or HSN code..."
            className="w-full pl-12 pr-28 py-3 bg-slate-50 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-xl text-sm font-medium text-slate-900 focus:outline-none transition-all"
          />

          <div className="absolute right-3 flex items-center gap-1">
            <button
              onClick={() => {
                showToast('Voice search listening: Speak industrial part name', 'info');
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              title="Voice Search"
            >
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                showToast('Barcode scanner ready: Aim camera at OEM box', 'info');
              }}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              title="Scan Barcode / SKU"
            >
              <ScanBarcode className="w-4 h-4" />
            </button>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Recent & Suggested keywords */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Frequent Site Searches:</span>
          {recentSearches.map((term) => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-800 text-slate-600 rounded-md transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Main Catalog View: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Filter Sidebar */}
        <div className="lg:col-span-3 bg-white p-5 rounded-2xl border border-slate-200 space-y-6 text-xs sticky top-24">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-amber-600" />
              <span>Catalog Filters</span>
            </span>
            {(activeCategory !== 'all' || selectedBrand !== 'all' || only30Min || searchQuery) && (
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSelectedBrand('all');
                  setOnly30Min(false);
                  setSearchQuery('');
                  setMaxPrice(10000);
                }}
                className="text-[11px] text-amber-700 font-bold hover:underline cursor-pointer"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Quick 30-Min toggle */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600 fill-amber-500" />
              <span className="font-bold text-slate-900">30-Min Delivery Only</span>
            </div>
            <input
              type="checkbox"
              checked={only30Min}
              onChange={(e) => setOnly30Min(e.target.checked)}
              className="w-4 h-4 accent-amber-500 rounded cursor-pointer"
            />
          </div>

          {/* Categories */}
          <div>
            <div className="font-bold text-slate-800 mb-2">Category</div>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setActiveCategory('all')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>All Categories</span>
                <span className="tabular-nums opacity-70">{products.length}</span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center justify-between ${
                    activeCategory === cat.id
                      ? 'bg-slate-900 text-white font-bold'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <span className="tabular-nums opacity-70">
                    {products.filter((p) => p.categoryId === cat.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div>
            <div className="font-bold text-slate-800 mb-2">OEM Brand</div>
            <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand('all')}
                className={`w-full text-left px-2.5 py-1 rounded transition-colors cursor-pointer ${
                  selectedBrand === 'all'
                    ? 'bg-slate-100 text-slate-950 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                All Brands
              </button>
              {allBrands.map((b) => (
                <button
                  key={b}
                  onClick={() => setSelectedBrand(b)}
                  className={`w-full text-left px-2.5 py-1 rounded transition-colors cursor-pointer flex items-center justify-between ${
                    selectedBrand === b
                      ? 'bg-slate-100 text-slate-950 font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{b}</span>
                  <span className="tabular-nums text-[10px] text-slate-400">
                    {products.filter((p) => p.brand === b).length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between font-bold text-slate-800 mb-1.5">
              <span>Max Price</span>
              <span className="text-amber-800 font-extrabold tabular-nums">
                ₹{maxPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min={200}
              max={10000}
              step={200}
              value={maxPrice}
              onChange={(e) => setMaxPrice(parseInt(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>₹200</span>
              <span>₹10,000+</span>
            </div>
          </div>
        </div>

        {/* Results Area */}
        <div className="lg:col-span-9 space-y-5">
          {/* Sorting and Results count header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-600">
              Showing <strong className="text-slate-900 tabular-nums">{filteredProducts.length}</strong> matching industrial products
              {searchQuery && (
                <span> for "<span className="font-semibold text-slate-900">{searchQuery}</span>"</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-500 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-semibold text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="relevance">Most Relevant</option>
                <option value="fastest">⚡ Fastest 30-Min Delivery</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Highest Contractor Rating</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No exact match found for "{searchQuery}"
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for related keywords like "drill", "cable", "safety", or reset your price and brand filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setSelectedBrand('all');
                  setMaxPrice(10000);
                }}
                className="px-4 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors"
              >
                Clear All Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
