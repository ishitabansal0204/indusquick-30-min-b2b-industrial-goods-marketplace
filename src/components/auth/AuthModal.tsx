import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Building2,
  CheckCircle2,
  FileCheck,
  CreditCard,
  Phone,
  ShieldCheck,
  ArrowRight,
  Loader2,
} from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    businessProfile,
    setBusinessProfile,
    showToast,
  } = useApp();

  const [step, setStep] = useState<'profile' | 'otp' | 'new_gstin'>('profile');
  const [mobileNumber, setMobileNumber] = useState('9810234892');
  const [otpCode, setOtpCode] = useState('8842');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setStep('profile');
      showToast('GSTIN verified via GSTN Portal & MCA API', 'success');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 my-auto">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">
              B2B Business Account & GST Profile
            </h2>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5 text-xs">
          {step === 'profile' ? (
            <>
              {/* Business Overview */}
              <div className="p-4 bg-slate-900 text-white rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm">{businessProfile.companyName}</span>
                  <span className="text-[11px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded border border-emerald-500/30">
                    GST Active
                  </span>
                </div>
                <div className="text-slate-400 font-mono text-[11px]">
                  GSTIN: {businessProfile.gstin} · PAN: {businessProfile.pan}
                </div>
                <div className="text-slate-300 text-[11px]">
                  Category: <strong>{businessProfile.businessType}</strong>
                </div>
              </div>

              {/* B2B Revolving Credit Line */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>30-Day B2B Credit Line</span>
                  </span>
                  <span className="text-emerald-700 font-extrabold text-sm tabular-nums">
                    ₹{businessProfile.availableCredit.toLocaleString('en-IN')} Available
                  </span>
                </div>
                <div className="w-full bg-emerald-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-600 h-full rounded-full"
                    style={{ width: `${(businessProfile.availableCredit / businessProfile.creditLimit) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Credit Utilized: ₹{(businessProfile.creditLimit - businessProfile.availableCredit).toLocaleString('en-IN')}</span>
                  <span>Total Approved: ₹{businessProfile.creditLimit.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-2 text-slate-700">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Authorized Contact:</span>
                  <span className="font-semibold text-slate-900">{businessProfile.contactPerson}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Direct Phone:</span>
                  <span className="font-semibold text-slate-900">{businessProfile.phone}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Official Invoicing Email:</span>
                  <span className="font-semibold text-slate-900">{businessProfile.email}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Head Office:</span>
                  <span className="font-semibold text-slate-900 text-right max-w-[200px] truncate">
                    {businessProfile.billingAddress.addressLine}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setStep('otp')}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Verify Another Mobile / OTP
                </button>
                <button
                  onClick={() => {
                    setIsAuthModalOpen(false);
                    showToast('Business credentials in sync with GSTN', 'info');
                  }}
                  className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Confirm & Done
                </button>
              </div>
            </>
          ) : (
            /* OTP Verification Flow */
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Business Mobile Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 border border-r-0 border-slate-300 rounded-l-lg bg-slate-50 text-slate-500 font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-r-lg font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="font-semibold text-slate-700">Enter 4-Digit Demo OTP</label>
                  <span className="text-slate-400">Demo Code: 8842</span>
                </div>
                <input
                  type="text"
                  maxLength={4}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-center tracking-widest font-mono text-base font-bold focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying with GSTN...</span>
                  </>
                ) : (
                  <>
                    <span>Verify & Continue as Sharma Engineering</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
