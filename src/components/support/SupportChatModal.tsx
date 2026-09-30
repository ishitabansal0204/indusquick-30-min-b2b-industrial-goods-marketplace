import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Send, Bot, User, PhoneCall, HelpCircle } from 'lucide-react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const SupportChatModal: React.FC = () => {
  const { isSupportModalOpen, setIsSupportModalOpen, activeOrder, showToast } = useApp();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'bot',
      text: `Hello! I am IndusQuick's 24x7 Job Site Desk. How can I assist Sharma Engineering Works today?`,
      time: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');

  if (!isSupportModalOpen) return null;

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Generate intelligent simulated response
    setTimeout(() => {
      let reply = "Our local hub logistics team has acknowledged your request. An engineer will respond shortly.";
      const lower = text.toLowerCase();
      if (lower.includes('where') || lower.includes('status') || lower.includes('track')) {
        reply = `Order #${activeOrder?.orderNumber || 'IND-10482'} is currently in ${activeOrder?.status.replace(/_/g, ' ') || 'transit'}. Driver ${activeOrder?.driver.name || 'Rameshwar Kumar'} is arriving in ~${activeOrder?.etaMinutes || 18} mins to Shed B-14.`;
      } else if (lower.includes('invoice') || lower.includes('gst')) {
        reply = "GST Tax Invoices are automatically generated upon dispatch with HSN codes and CGST/SGST breakdown. You can download or print directly from your Orders tab.";
      } else if (lower.includes('damage') || lower.includes('return') || lower.includes('broken')) {
        reply = "We apologize for the inconvenience! We provide immediate 30-minute replacement for damaged goods. Please click 'Report Issue / Return' in your Order history to trigger instant pickup.";
      } else if (lower.includes('credit') || lower.includes('limit')) {
        reply = "Your company credit line is currently ₹2,50,000 with ₹1,82,400 available balance on 30-day payment cycle. For limit expansion to ₹10,00,000, please upload latest audited balance sheet.";
      } else if (lower.includes('prd') || lower.includes('document') || lower.includes('spec')) {
        reply = "The complete Product Requirements Document (PRD) detailing all 15 core features, SLA metrics, and architecture is available for download at /IndusQuick_Product_Requirements_Document.docx";
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: reply,
          time: 'Just now',
        },
      ]);
    }, 600);
  };

  const quickQuestions = [
    'Where is my 30-min order #IND-10482?',
    'Download Product PRD (.docx)',
    'Need urgent GST Tax Invoice',
    'Report damaged item / fast replacement',
    'Increase credit line limit',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 my-auto h-[600px] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold">IndusQuick Priority Support</h2>
              <div className="text-[11px] text-emerald-400 font-medium">● Connected to Okhla Logistics Desk</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Calling toll-free B2B helpline: 1800-209-4829', 'info')}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
              title="Direct Toll-free Call"
            >
              <PhoneCall className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsSupportModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-2 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'bot' && (
                <div className="w-6 h-6 rounded bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 text-[10px] font-bold">
                  IQ
                </div>
              )}
              <div
                className={`max-w-[80%] p-3 rounded-xl ${
                  m.sender === 'user'
                    ? 'bg-slate-900 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                }`}
              >
                <p className="leading-relaxed">{m.text}</p>
                <span className="block text-[9px] text-slate-400 mt-1 text-right">{m.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-white border-t border-slate-200 overflow-x-auto flex gap-1.5 whitespace-nowrap">
          {quickQuestions.map((q) => (
            <button
              key={q}
              onClick={() => handleSend(q)}
              className="px-2.5 py-1 bg-slate-100 hover:bg-amber-50 hover:text-amber-900 text-slate-700 text-[11px] font-medium rounded-full border border-slate-200 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question or query..."
            className="flex-1 px-3 py-2 bg-slate-100 border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-amber-500"
          />
          <button
            onClick={() => handleSend()}
            className="p-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
