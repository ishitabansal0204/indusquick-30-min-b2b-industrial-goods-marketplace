import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Bell, Truck, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const {
    isNotificationOpen,
    setIsNotificationOpen,
    notifications,
    markNotificationRead,
    setActiveView,
  } = useApp();

  if (!isNotificationOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-sm bg-white shadow-2xl h-full flex flex-col border-l border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <h2 className="text-sm font-bold text-slate-900">Notifications & Alerts</h2>
          </div>
          <button
            onClick={() => setIsNotificationOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
          {notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                markNotificationRead(n.id);
                if (n.orderId) {
                  setIsNotificationOpen(false);
                  setActiveView('tracking');
                }
              }}
              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                !n.read ? 'bg-amber-50/50 border-amber-200' : 'bg-white border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400">{n.timestamp}</span>
              </div>
              <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
