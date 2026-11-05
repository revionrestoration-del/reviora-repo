import React from 'react';
import { X, MessageCircle, CheckCircle2, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import { ServiceItem } from '../types';
import { formatPriceDisplay, openWhatsApp } from '../lib/whatsapp';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  whatsappNumber: string;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  service,
  onClose,
  whatsappNumber,
}) => {
  if (!service) return null;

  const displayPrice = formatPriceDisplay(service.price, service.priceType);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#DCE7F3] overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-[#172B45] p-2 rounded-full shadow-md transition-transform hover:scale-110"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* 1:1 Aspect Ratio Image Column */}
          <div className="relative bg-[#071B38] aspect-square overflow-hidden">
            <img
              src={service.imageUrl}
              alt={service.name}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071B38]/50 via-transparent to-transparent md:hidden" />
            <div className="absolute bottom-3 left-3 bg-[#071B38]/90 text-white text-xs px-3 py-1 rounded backdrop-blur-sm uppercase font-mono tracking-wider font-semibold">
              {service.category}
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-[#75849A] uppercase tracking-widest">
                  Reviora Restoration Menu
                </span>
                <h3 className="text-2xl font-bold text-[#071B38] mt-1 font-serif">
                  {service.name}
                </h3>
              </div>

              {/* Price Banner */}
              <div className="bg-[#F4F7FB] p-3.5 rounded-lg border border-[#DCE7F3] flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#75849A] block">
                    Restoration Fee
                  </span>
                  <span className="text-xl font-bold text-[#071B38] font-mono">
                    {displayPrice}
                  </span>
                </div>
                <div className="text-right text-[11px] text-[#75849A] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>Bur Dubai Studio</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#172B45]/90 leading-relaxed">
                {service.description}
              </p>

              {/* Included Services List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#071B38] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Services Included:</span>
                </h4>
                <ul className="space-y-2 text-xs text-[#172B45]">
                  {service.features && service.features.length > 0 ? (
                    service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feature}</span>
                      </li>
                    ))
                  ) : (
                    <li className="text-[#75849A]">Detailed assessment and deep restoration.</li>
                  )}
                </ul>
              </div>

              {/* Notes */}
              {service.notes && (
                <div className="bg-amber-50 border border-amber-200/80 p-3 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{service.notes}</span>
                </div>
              )}
            </div>

            {/* Action CTA: Enquire via WhatsApp */}
            <div className="pt-2">
              <button
                onClick={() => {
                  openWhatsApp(service, undefined, whatsappNumber);
                }}
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-4 rounded-lg font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Enquire via WhatsApp</span>
              </button>
              <p className="text-center text-[10px] text-[#75849A] mt-2">
                All transactions &amp; intake discussions are coordinated directly through WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
