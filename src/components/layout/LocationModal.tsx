import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, MapPin, Check, Plus, Factory, Building, Wrench } from 'lucide-react';
import { Address } from '../../types';

export const LocationModal: React.FC = () => {
  const {
    isLocationModalOpen,
    setIsLocationModalOpen,
    selectedLocation,
    setSelectedLocation,
    businessProfile,
    setBusinessProfile,
    showToast,
  } = useApp();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newContact, setNewContact] = useState('');
  const [newPhone, setNewPhone] = useState('');

  if (!isLocationModalOpen) return null;

  const handleSelectAddress = (addr: Address) => {
    setSelectedLocation(addr);
    setIsLocationModalOpen(false);
    showToast(`Delivery location switched to ${addr.title} (${addr.industrialArea})`, 'info');
  };

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAddress) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      title: newTitle,
      siteType: 'Job Site',
      contactPerson: newContact || businessProfile.contactPerson,
      phone: newPhone || businessProfile.phone,
      addressLine: newAddress,
      industrialArea: newArea || 'Industrial Hub',
      city: 'Delhi NCR',
      pincode: '110020',
      gateInstructions: 'Standard job-site safety check at main gate.',
    };

    setBusinessProfile((prev) => ({
      ...prev,
      deliveryAddresses: [...prev.deliveryAddresses, newAddr],
    }));

    setSelectedLocation(newAddr);
    setIsAddingNew(false);
    setIsLocationModalOpen(false);
    showToast(`New site "${newTitle}" added and selected for 30-min delivery`, 'success');
  };

  const getIconForType = (type: string) => {
    switch (type) {
      case 'Factory':
        return <Factory className="w-4 h-4 text-amber-600" />;
      case 'Workshop':
        return <Wrench className="w-4 h-4 text-blue-600" />;
      default:
        return <Building className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">Select Job Site / Plant Delivery Address</h2>
          </div>
          <button
            onClick={() => {
              setIsLocationModalOpen(false);
              setIsAddingNew(false);
            }}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 max-h-[70vh] overflow-y-auto">
          <div className="mb-3 text-xs text-slate-500 flex items-center justify-between">
            <span>Linked to GSTIN: <strong className="text-slate-800">{businessProfile.gstin}</strong></span>
            <span className="text-emerald-600 font-semibold">⚡ All within 30-min radius</span>
          </div>

          {!isAddingNew ? (
            <div className="space-y-2.5">
              {businessProfile.deliveryAddresses.map((addr) => {
                const isSelected = selectedLocation.id === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => handleSelectAddress(addr)}
                    className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-amber-500 bg-amber-50/40 ring-1 ring-amber-500'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {getIconForType(addr.siteType)}
                        <span className="text-sm font-bold text-slate-900">{addr.title}</span>
                        <span className="text-[11px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                          {addr.siteType}
                        </span>
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-slate-950 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-slate-600">{addr.addressLine}</p>
                    <div className="mt-1 text-[11px] text-slate-500 flex items-center gap-2">
                      <span>Area: <strong className="text-slate-700">{addr.industrialArea}</strong></span>
                      <span>·</span>
                      <span>Pin: {addr.pincode}</span>
                      <span>·</span>
                      <span>Site Contact: {addr.contactPerson}</span>
                    </div>
                    {addr.gateInstructions && (
                      <div className="mt-2 text-[11px] text-amber-800 bg-amber-100/60 px-2 py-1 rounded">
                        Gate Pass: {addr.gateInstructions}
                      </div>
                    )}
                  </div>
                );
              })}

              <button
                onClick={() => setIsAddingNew(true)}
                className="w-full mt-3 py-2.5 px-3 border border-dashed border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-900 hover:border-slate-400 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add New Site Office or Factory Gate
              </button>
            </div>
          ) : (
            <form onSubmit={handleAddNewAddress} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Site / Facility Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Greater Noida Fabrication Yard"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Detailed Street Address & Gate</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Plot 108, Ecotech 3, Gate #1"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Industrial Zone</label>
                  <input
                    type="text"
                    placeholder="e.g. Ecotech III"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Site Receiver Phone</label>
                  <input
                    type="tel"
                    placeholder="+91 98..."
                    value={newPhone}
                    onChange={(e) => setNewPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  Save & Switch Delivery Site
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3 py-2 border border-slate-200 text-xs font-medium text-slate-600 rounded-lg hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
