import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { openWhatsApp } from '../lib/whatsapp';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ whatsappNumber }) => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Reassurance Tooltip Bubble */}
      {showTooltip && (
        <div className="bg-white text-[#071B38] text-xs font-semibold py-2 px-3.5 rounded-xl shadow-xl border border-[#DCE7F3] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
          <span>Need restoration advice? Chat with us!</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-[#75849A] hover:text-[#071B38] ml-1"
            aria-label="Dismiss tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main WhatsApp Button */}
      <button
        onClick={() => openWhatsApp(null, undefined, whatsappNumber)}
        className="relative bg-[#25D366] hover:bg-[#20ba59] text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        aria-label="Chat with REVIORA RESTORATION on WhatsApp"
      >
        {/* Pulsing halo */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-30 animate-ping pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white relative z-10" />
      </button>
    </div>
  );
};
