import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  Check,
  Ban,
  Clock,
  UserCheck,
  Building,
  AlertCircle,
  FileText,
} from 'lucide-react';

export const ProcurementModal: React.FC = () => {
  const {
    isProcurementModalOpen,
    setIsProcurementModalOpen,
    procurementApprovals,
    approveRequest,
    rejectRequest,
    businessProfile,
    showToast,
  } = useApp();

  if (!isProcurementModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                B2B Multi-User Procurement & PO Approvals
              </h2>
              <div className="text-xs text-slate-500">
                {businessProfile.companyName} · Role: <strong>Director of Works (Admin)</strong>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsProcurementModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policy Notice Strip */}
        <div className="px-5 py-3 bg-amber-50 border-b border-amber-200 text-xs text-amber-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Policy: Purchase requests exceeding <strong>₹15,000</strong> require Plant Director sign-off before 30-min courier dispatch.</span>
          </div>
          <span className="font-bold text-amber-800">Auto-Enforced</span>
        </div>

        {/* Requests List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
            Pending Purchase Requisitions ({procurementApprovals.filter((a) => a.status === 'pending').length})
          </div>

          {procurementApprovals.map((req) => (
            <div
              key={req.id}
              className={`p-4 rounded-xl border text-xs transition-all space-y-3 ${
                req.status === 'pending'
                  ? 'bg-white border-slate-300 shadow-xs'
                  : req.status === 'approved'
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : 'bg-rose-50/40 border-rose-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{req.orderNumber}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 font-semibold">{req.requestedBy}</span>
                  <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                    {req.role}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">{req.requestedAt}</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] uppercase ${
                      req.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : req.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
              </div>

              <div>
                <div className="text-slate-700 font-medium">{req.summary}</div>
                <div className="text-slate-400 mt-1 flex items-center gap-3">
                  <span>Site: <strong>{req.department}</strong></span>
                  <span>·</span>
                  <span>Items: {req.itemsCount} units</span>
                  <span>·</span>
                  <span>Approval Threshold: ₹{req.approvalLimit.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase">PO Requisition Amount</div>
                  <div className="text-base font-black text-slate-900 tabular-nums">
                    ₹{req.amount.toLocaleString('en-IN')}
                  </div>
                </div>

                {req.status === 'pending' ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => rejectRequest(req.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-rose-50 text-slate-700 hover:text-rose-700 font-bold rounded-lg border border-slate-200 transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => approveRequest(req.id)}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Authorize & Dispatch</span>
                    </button>
                  </div>
                ) : (
                  <div className="text-xs font-semibold text-slate-500">
                    {req.status === 'approved' ? 'Dispatched to Job Site via 30M Cargo' : 'Requisition Closed'}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Team Roles Summary */}
          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Authorized Team Members & Procurement Limits
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">Sunil Sharma</div>
                <div className="text-[11px] text-slate-500">Owner / Director</div>
                <div className="text-[11px] font-semibold text-emerald-700 mt-1">Unlimited Spend</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">Amitabh Joshi</div>
                <div className="text-[11px] text-slate-500">Works Manager (Manesar)</div>
                <div className="text-[11px] font-semibold text-slate-700 mt-1">Limit: ₹25,000 / order</div>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-900">Rahul Verma</div>
                <div className="text-[11px] text-slate-500">Site Electrical Engg (Noida)</div>
                <div className="text-[11px] font-semibold text-slate-700 mt-1">Limit: ₹15,000 / order</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
