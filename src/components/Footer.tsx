import React from 'react';
import { MapPin, Phone, MessageCircle, Instagram, Facebook, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types';
import { openWhatsApp } from '../lib/whatsapp';

interface FooterProps {
  settings: SiteSettings;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-white text-[#071B38] border-t border-[#DCE7F3] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
          {/* Brand Column */}
          <div className="space-y-4">
            {/* Logo on Light Theme */}
            <div className="inline-block">
              <img
                src={settings.logoUrl || '/assets/aistudio/Reviora_Logo__Dark__82b47f73.png'}
                alt="REVIORA RESTORATION"
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="text-sm font-bold tracking-widest text-[#071B38] font-serif">
              {settings.tagline || 'RESTORE. REVIVE. RELIVE.'}
            </p>
            <p className="text-xs text-[#75849A] leading-relaxed">
              Professional cleaning and restoration services for shoes, bags, jackets, belts, and caps in Bur Dubai, Dubai, UAE.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => openWhatsApp(null, undefined, settings.whatsappNumber)}
                className="p-2.5 rounded-lg bg-[#25D366] text-white hover:bg-[#20ba59] transition-transform hover:scale-105 shadow-sm"
                title="WhatsApp"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
              </button>
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#1877F2] text-white hover:opacity-90 transition-transform hover:scale-105 shadow-sm"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4 fill-white" />
                </a>
              )}
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white hover:opacity-90 transition-transform hover:scale-105 shadow-sm"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#071B38] border-b border-[#DCE7F3] pb-2">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#556882]">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Service Catalog &amp; Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Before &amp; After Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Service Categories */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#071B38] border-b border-[#DCE7F3] pb-2">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-[#556882]">
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Shoe Restoration &amp; Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Bag Cleaning &amp; Restoration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Jacket Dry Cleaning
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Belt Cleaning &amp; Punching
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-[#071B38] transition-colors"
                >
                  Cap &amp; Cowboy Hat Care
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#071B38] border-b border-[#DCE7F3] pb-2">
              Bur Dubai Studio
            </h4>
            <div className="space-y-3 text-xs text-[#556882]">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span>{settings.address || 'Bur Dubai, Dubai, UAE'}</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#25D366] shrink-0 mt-0.5" />
                <span className="font-mono font-bold text-[#071B38]">{settings.whatsappNumber || '+971 55 941 6729'}</span>
              </div>
              <div className="pt-2">
                <button
                  onClick={() => openWhatsApp(null, undefined, settings.whatsappNumber)}
                  className="w-full bg-[#071B38] hover:bg-[#102B50] text-white py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 mt-12 border-t border-[#DCE7F3] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#75849A]">
          <p>© {new Date().getFullYear()} REVIORA RESTORATION. All rights reserved. Bur Dubai, Dubai, UAE.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="text-[#75849A] hover:text-[#071B38] flex items-center gap-1 transition-colors font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#071B38]" />
              <span>Admin Control Panel</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
