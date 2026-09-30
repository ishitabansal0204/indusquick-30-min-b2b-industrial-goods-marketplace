import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  Clock,
  Phone,
  MessageSquare,
  Truck,
  MapPin,
  Package,
  FileText,
  ChevronRight,
  ShieldCheck,
  Star,
  RefreshCw,
  Building,
  RotateCcw,
} from 'lucide-react';

export const OrderTrackingView: React.FC = () => {
  const {
    activeOrder,
    advanceOrderStep,
    markOrderDelivered,
    openInvoice,
    openReview,
    openReturn,
    setActiveView,
    showToast,
  } = useApp();

  if (!activeOrder) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto mb-4">
          <Truck className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No active delivery in progress</h2>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          All your orders have been fulfilled or you have not placed a 30-min order yet.
        </p>
        <button
          onClick={() => setActiveView('search')}
          className="mt-4 px-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-lg hover:bg-slate-800 transition-colors"
        >
          Explore Industrial Catalog
        </button>
      </div>
    );
  }

  const steps = [
    { title: 'Order Confirmed', time: '09:18 AM', desc: 'Assigned to Okhla Darkstore Hub #4' },
    { title: 'Picking Items', time: '09:21 AM', desc: 'Warehouse picker scanned all SKUs' },
    { title: 'Packed & Sealed', time: '09:24 AM', desc: 'Security tamper-proof seal #TK-8891' },
    { title: 'Out for Delivery', time: '09:26 AM', desc: 'Electric Cargo Van dispatched' },
    { title: 'Arriving at Site Gate', time: '09:38 AM', desc: 'Driver within 800m of security boom barrier' },
    { title: 'Delivered & Handed Over', time: '09:42 AM', desc: 'Received by Supervisor Ramesh Patel' },
  ];

  const currentStep = activeOrder.currentStepProgress;
  const isDelivered = activeOrder.status === 'delivered';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner with ETA */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>HYPERLOCAL 30-MINUTES DISPATCH LIVE</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span className="text-slate-400">Order #{activeOrder.orderNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {isDelivered ? (
              <span className="text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-8 h-8" />
                Delivered at Job Site in Record Time!
              </span>
            ) : (
              <span>
                Arriving in{' '}
                <span className="text-amber-400 tabular-nums">
                  ~{activeOrder.etaMinutes} minutes
                </span>
              </span>
            )}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Destination: {activeOrder.shippingAddress.title} · {activeOrder.shippingAddress.industrialArea}
          </p>
        </div>

        {/* Demo Fast Simulator Controls (Section 34 Demo Requirement) */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-800/80 p-3 rounded-xl border border-slate-700">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider w-full mb-1">
            Interactive Prototype Simulator:
          </div>
          {!isDelivered ? (
            <>
              <button
                onClick={() => advanceOrderStep(activeOrder.id)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Advance Next Stage</span>
              </button>
              <button
                onClick={() => markOrderDelivered(activeOrder.id)}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded transition-colors cursor-pointer"
              >
                Mark as Delivered
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openReview(activeOrder)}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors cursor-pointer flex items-center gap-1"
              >
                <Star className="w-3.5 h-3.5 fill-slate-950" />
                <span>Rate Product & Delivery</span>
              </button>
              <button
                onClick={() => openInvoice(activeOrder)}
                className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded transition-colors cursor-pointer flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Download Tax Invoice</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Grid: Map & Order Steps */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Mock Live Map Experience */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {/* Mock Visual Map Canvas */}
            <div className="relative h-72 sm:h-80 bg-slate-900 overflow-hidden flex items-center justify-center p-6">
              {/* Map grid lines simulation */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    'radial-gradient(circle, #38bdf8 1px, transparent 1px), linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Road / Route Polyline simulation */}
              <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M 80 180 Q 200 80 340 140 T 560 120"
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="5"
                  strokeDasharray="8 8"
                  className="animate-pulse"
                />
              </svg>

              {/* Darkstore Pin */}
              <div className="absolute left-16 sm:left-20 top-36 sm:top-40 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-slate-900 border-2 border-amber-400 flex items-center justify-center text-amber-400 shadow-lg">
                  <Package className="w-4 h-4" />
                </div>
                <div className="mt-1 bg-slate-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap">
                  Okhla Hub #4 (Darkstore)
                </div>
              </div>

              {/* Moving Van Pin */}
              <div
                className="absolute transition-all duration-700 flex flex-col items-center z-10"
                style={{
                  left: isDelivered ? '75%' : `${30 + currentStep * 10}%`,
                  top: isDelivered ? '30%' : `${48 - currentStep * 3}%`,
                }}
              >
                <div className="w-12 h-12 rounded-full bg-amber-500 border-2 border-white flex items-center justify-center text-slate-950 shadow-xl animate-bounce">
                  <Truck className="w-6 h-6" />
                </div>
                <div className="mt-1 bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded shadow whitespace-nowrap">
                  {isDelivered ? 'Delivered at Gate' : `ETA ${activeOrder.etaMinutes}m`}
                </div>
              </div>

              {/* Destination Pin */}
              <div className="absolute right-12 sm:right-20 top-20 sm:top-24 flex flex-col items-center">
                <div className="w-9 h-9 rounded-full bg-emerald-600 border-2 border-white flex items-center justify-center text-white shadow-lg">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="mt-1 bg-slate-950/90 text-white text-[10px] font-bold px-2 py-0.5 rounded border border-slate-700 whitespace-nowrap">
                  {activeOrder.shippingAddress.title}
                </div>
              </div>

              {/* Map Footer HUD */}
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/90 backdrop-blur-md rounded-xl p-3 border border-slate-700 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="font-semibold">Electric Cargo Van: {activeOrder.driver.vehicleNumber}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  Telemetry: Active GPS 5G Beacon
                </div>
              </div>
            </div>

            {/* Delivery Partner Profile Card */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700 text-base border border-slate-300">
                  {activeOrder.driver.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-slate-900">{activeOrder.driver.name}</h3>
                    <span className="flex items-center text-xs font-bold text-amber-600">
                      ★ {activeOrder.driver.rating}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">{activeOrder.driver.vehicle}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => showToast(`Calling delivery partner ${activeOrder.driver.name}...`, 'info')}
                  className="p-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button
                  onClick={() => showToast(`Opened WhatsApp chat with courier partner`, 'info')}
                  className="p-2.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  title="Message Driver"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Special Gate Instructions Card */}
          {activeOrder.shippingAddress.gateInstructions && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
              <Building className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Plant Security / Gate Entry Protocol:</span>
                <p className="mt-0.5 text-amber-800">{activeOrder.shippingAddress.gateInstructions}</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Timeline Stepper & Package Summary */}
        <div className="lg:col-span-5 space-y-6">
          {/* Order Progress Stepper */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <h2 className="text-sm font-bold text-slate-900 mb-4 flex items-center justify-between">
              <span>Order Dispatch Timeline</span>
              <span className="text-xs text-slate-400 font-normal">SLA: 30 Mins</span>
            </h2>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {steps.map((st, idx) => {
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;
                return (
                  <div key={st.title} className="relative text-xs">
                    <div
                      className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-colors ${
                        isPassed
                          ? 'bg-amber-500 border-amber-500 text-slate-950 font-bold'
                          : 'bg-white border-slate-300 text-slate-400'
                      }`}
                    >
                      {isPassed ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isCurrent ? 'text-amber-800 text-sm' : isPassed ? 'text-slate-900' : 'text-slate-400'}`}>
                        {st.title}
                      </span>
                      <span className="text-[11px] text-slate-400 tabular-nums">{st.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{st.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Package Items & Invoicing Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-bold text-slate-900">
                Package Contents ({activeOrder.items.length} SKUs)
              </span>
              <button
                onClick={() => openInvoice(activeOrder)}
                className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Tax Invoice</span>
              </button>
            </div>

            <div className="space-y-3">
              {activeOrder.items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-10 h-10 object-contain bg-slate-50 rounded border border-slate-100 p-1"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-semibold text-slate-900 line-clamp-1">{item.product.name}</div>
                      <div className="text-[11px] text-slate-500">
                        Qty: {item.quantity} · {item.product.brand}
                      </div>
                    </div>
                  </div>
                  <div className="font-bold text-slate-900 tabular-nums shrink-0">
                    ₹{(item.unitPrice * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Totals */}
            <div className="pt-3 border-t border-slate-100 text-xs space-y-1">
              <div className="flex justify-between text-slate-500">
                <span>Taxable Amount:</span>
                <span className="tabular-nums">₹{activeOrder.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>GST (18% / 28%):</span>
                <span className="tabular-nums">₹{activeOrder.gstTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold text-sm pt-1 border-t border-slate-100">
                <span>Total Invoiced:</span>
                <span className="text-amber-800 tabular-nums">
                  ₹{activeOrder.total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Post-delivery Actions */}
            {isDelivered && (
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => openReturn(activeOrder)}
                  className="flex-1 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Report Issue / Return
                </button>
                <button
                  onClick={() => openReview(activeOrder)}
                  className="flex-1 py-2 text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 rounded-lg transition-colors cursor-pointer text-center"
                >
                  Rate Delivery
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
