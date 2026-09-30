import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Printer, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export const InvoiceModal: React.FC = () => {
  const {
    isInvoiceModalOpen,
    setIsInvoiceModalOpen,
    selectedInvoiceOrder,
    businessProfile,
    showToast,
  } = useApp();

  if (!isInvoiceModalOpen || !selectedInvoiceOrder) return null;

  const order = selectedInvoiceOrder;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast('Tax invoice PDF generated and saved', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden border border-slate-200 my-auto max-h-[92vh] flex flex-col">
        {/* Top Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              ORIGINAL FOR RECIPIENT
            </span>
            <span className="text-sm font-bold text-slate-900">
              Tax Invoice - {order.orderNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={() => setIsInvoiceModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-xs text-slate-800 print:p-0">
          {/* Company & Invoice Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-4">
            <div>
              <div className="text-2xl font-black tracking-tight text-slate-900">
                IndusQuick Technologies Pvt Ltd
              </div>
              <div className="text-slate-500 mt-1">
                Fulfillment Hub #04, Okhla Phase-III Industrial Area, New Delhi - 110020
              </div>
              <div className="text-slate-600 mt-0.5 font-mono">
                GSTIN: 07AAACI8492K1Z8 · State Code: 07 (Delhi)
              </div>
              <div className="text-slate-500">Corporate PAN: AAACI8492K</div>
            </div>

            <div className="text-right">
              <div className="text-lg font-bold text-slate-900">TAX INVOICE</div>
              <div className="text-slate-500 mt-0.5">Rule 46 of CGST Rules, 2017</div>
              <div className="mt-2 font-mono font-bold text-slate-900 text-sm">
                INV-2026/{order.orderNumber}
              </div>
              <div className="text-slate-500">Date: {order.placedAt}</div>
              <div className="text-slate-700 font-semibold mt-1">PO #: {order.poNumber || 'N/A'}</div>
            </div>
          </div>

          {/* Billed To & Shipped To Grid */}
          <div className="grid grid-cols-2 gap-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                Billed To (Customer Details):
              </div>
              <div className="font-bold text-slate-900 text-sm">{order.companyName}</div>
              <div className="text-slate-600 mt-0.5">{order.billingAddress.addressLine}</div>
              <div className="text-slate-600">{order.billingAddress.city} - {order.billingAddress.pincode}</div>
              <div className="mt-1 font-mono font-bold text-slate-800">
                GSTIN: {order.gstin}
              </div>
              <div className="text-slate-500">State: Haryana (06)</div>
            </div>

            <div>
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                Delivered / Shipped To (Site Office):
              </div>
              <div className="font-bold text-slate-900 text-sm">{order.shippingAddress.title}</div>
              <div className="text-slate-600 mt-0.5">{order.shippingAddress.addressLine}</div>
              <div className="text-slate-600">{order.shippingAddress.industrialArea}, {order.shippingAddress.city}</div>
              <div className="mt-1 text-slate-700">
                Site Supervisor: {order.shippingAddress.contactPerson} ({order.shippingAddress.phone})
              </div>
              <div className="text-emerald-700 font-semibold">⚡ 30-Min Fast Darkstore Fulfillment</div>
            </div>
          </div>

          {/* Items Table with HSN & Taxes */}
          <div className="border border-slate-200 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">#</th>
                  <th className="p-2.5">Item Description & Brand</th>
                  <th className="p-2.5">HSN Code</th>
                  <th className="p-2.5 text-center">Qty</th>
                  <th className="p-2.5 text-right">Unit Rate (₹)</th>
                  <th className="p-2.5 text-right">Taxable (₹)</th>
                  <th className="p-2.5 text-right">GST (18%)</th>
                  <th className="p-2.5 text-right">Total (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {order.items.map((item, idx) => {
                  const lineTaxable = item.unitPrice * item.quantity;
                  const lineGst = Math.round(lineTaxable * (item.product.gstRate / 100));
                  return (
                    <tr key={item.product.id} className="hover:bg-slate-50">
                      <td className="p-2.5 text-slate-400">{idx + 1}</td>
                      <td className="p-2.5">
                        <div className="font-bold text-slate-900">{item.product.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {item.product.brand} · SKU: {item.product.sku}
                        </div>
                      </td>
                      <td className="p-2.5 font-mono text-slate-600">{item.product.hsnCode}</td>
                      <td className="p-2.5 text-center font-bold tabular-nums">{item.quantity}</td>
                      <td className="p-2.5 text-right tabular-nums">{item.unitPrice.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-medium tabular-nums">{lineTaxable.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right text-slate-600 tabular-nums">{lineGst.toLocaleString('en-IN')}</td>
                      <td className="p-2.5 text-right font-bold text-slate-900 tabular-nums">
                        {(lineTaxable + lineGst).toLocaleString('en-IN')}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Tax Summary & Authorized Signature */}
          <div className="grid grid-cols-2 gap-6 pt-2">
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                <div className="font-bold text-slate-800 text-[11px] mb-1">
                  Tax Summary Declaration (IGST / CGST / SGST):
                </div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  We declare that this invoice shows the actual price of the goods described and that all particulars are true and correct. Input tax credit is available to buyer in GSTR-2B.
                </div>
              </div>
              <div className="text-[11px] text-slate-500">
                Payment Authorized Via: <strong className="uppercase text-slate-800">{order.paymentMethod}</strong> (Status: PAID)
              </div>
            </div>

            <div className="space-y-2 text-right">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Value:</span>
                <span className="font-medium tabular-nums">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Central GST (CGST 9%):</span>
                <span className="tabular-nums">₹{Math.round(order.gstTotal / 2).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>State GST (SGST 9%):</span>
                <span className="tabular-nums">₹{Math.round(order.gstTotal / 2).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-900 font-extrabold text-base pt-2 border-t border-slate-200">
                <span>Invoice Total:</span>
                <span className="text-amber-800 tabular-nums">₹{order.total.toLocaleString('en-IN')}</span>
              </div>

              <div className="pt-6">
                <div className="text-slate-400 text-[10px]">For IndusQuick Technologies Pvt Ltd</div>
                <div className="font-bold text-slate-800 text-xs mt-4">Authorized Signatory / Digitally Signed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
