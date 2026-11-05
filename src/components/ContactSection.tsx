import React, { useState } from 'react';
import { MapPin, MessageCircle, Phone, Instagram, Facebook, Send, Clock, Sparkles } from 'lucide-react';
import { SiteSettings } from '../types';
import { openWhatsApp } from '../lib/whatsapp';

interface ContactSectionProps {
  settings: SiteSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [itemName, setItemName] = useState('');
  const [itemCategory, setItemCategory] = useState('Shoes');
  const [itemIssue, setItemIssue] = useState('');

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello REVIORA RESTORATION, I would like to enquire about restoring my ${itemCategory}: "${itemName || 'Item'}". Details/Issue: ${itemIssue || 'General cleaning and restoration assessment'}. Location: Dubai.`;
    openWhatsApp(null, msg, settings.whatsappNumber);
  };

  return (
    <section id="contact" className="py-20 bg-[#071B38] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102B50] text-[#DCE7F3] text-xs font-semibold uppercase tracking-wider border border-[#DCE7F3]/20">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Direct WhatsApp Concierge</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            CONTACT REVIORA RESTORATION
          </h2>
          <p className="text-base text-[#DCE7F3]/80 leading-relaxed font-light">
            All customer bookings, quotes, and restoration consultations are handled personally via WhatsApp. Send us photos of your items for an immediate intake evaluation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white text-[#071B38] rounded-2xl p-6 sm:p-8 border border-[#DCE7F3] shadow-xl space-y-6 text-left">
            <div>
              <span className="text-xs uppercase font-bold text-[#75849A] tracking-wider">
                Official Business
              </span>
              <h3 className="text-2xl font-bold text-[#071B38] font-serif mt-1">
                {settings.businessName || 'REVIORA RESTORATION'}
              </h3>
              <p className="text-xs text-[#25D366] font-semibold mt-1">
                {settings.tagline || 'RESTORE. REVIVE. RELIVE.'}
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#172B45]">
              {/* Location */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3]">
                <MapPin className="w-5 h-5 text-[#071B38] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#071B38]">Studio Location</div>
                  <div className="text-xs text-[#75849A] mt-0.5 font-medium">
                    {settings.address || 'Bur Dubai, Dubai, UAE'}
                  </div>
                </div>
              </div>

              {/* WhatsApp Phone */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3]">
                <Phone className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#071B38]">WhatsApp Helpline</div>
                  <div className="text-xs text-[#75849A] font-mono mt-0.5 font-bold">
                    {settings.whatsappNumber || '+971 55 941 6729'}
                  </div>
                  <div className="text-[11px] text-[#25D366] font-semibold mt-1">
                    Direct Master Consultation
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3]">
                <Clock className="w-5 h-5 text-[#102B50] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-[#071B38]">Business Hours</div>
                  <div className="text-xs text-[#75849A] mt-0.5">
                    Monday – Saturday: 9:00 AM – 8:00 PM (GST)
                  </div>
                  <div className="text-[11px] text-[#75849A]">
                    Sunday: Consultation by WhatsApp appointment
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links (Configurable via admin settings) */}
            <div className="pt-4 border-t border-[#DCE7F3]">
              <span className="text-xs font-semibold text-[#75849A] uppercase tracking-wider block mb-3">
                Connect With Us
              </span>
              <div className="flex items-center gap-3">
                {/* WhatsApp */}
                <button
                  onClick={() => openWhatsApp(null, undefined, settings.whatsappNumber)}
                  className="p-3 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] transition-transform hover:scale-105 shadow-sm"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                </button>

                {/* Facebook */}
                {settings.facebookUrl ? (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-[#1877F2] text-white hover:opacity-90 transition-transform hover:scale-105 shadow-sm"
                    title="Facebook"
                  >
                    <Facebook className="w-5 h-5 fill-white" />
                  </a>
                ) : (
                  <div
                    className="p-3 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3] text-[#75849A] cursor-not-allowed opacity-60"
                    title="Facebook (Configurable in Admin Settings)"
                  >
                    <Facebook className="w-5 h-5" />
                  </div>
                )}

                {/* Instagram */}
                {settings.instagramUrl ? (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white hover:opacity-90 transition-transform hover:scale-105 shadow-sm"
                    title="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                ) : (
                  <div
                    className="p-3 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3] text-[#75849A] cursor-not-allowed opacity-60"
                    title="Instagram (Configurable in Admin Settings)"
                  >
                    <Instagram className="w-5 h-5" />
                  </div>
                )}

                <span className="text-[11px] text-[#75849A] italic">
                  {!settings.facebookUrl && !settings.instagramUrl
                    ? 'Social profiles can be added in Admin Settings'
                    : ''}
                </span>
              </div>
            </div>
          </div>

          {/* Interactive Fast WhatsApp Inquiry Builder */}
          <div className="lg:col-span-7 bg-white text-[#071B38] rounded-2xl p-6 sm:p-8 border border-[#DCE7F3] shadow-xl text-left">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#75849A] tracking-wider">
                  Quick Consultation Form
                </span>
                <h3 className="text-xl font-bold text-[#071B38] font-serif mt-0.5">
                  Start Your WhatsApp Consultation
                </h3>
              </div>
              <div className="bg-[#25D366]/15 text-[#25D366] text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1 font-mono">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Pre-fill</span>
              </div>
            </div>

            <p className="text-xs text-[#75849A] mb-6 leading-relaxed">
              Fill out your item details below. Clicking "Launch WhatsApp Consultation" will pre-populate your WhatsApp chat with all the details ready to send with your item photos.
            </p>

            <form onSubmit={handleSubmitInquiry} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1.5">
                    Item Category
                  </label>
                  <select
                    value={itemCategory}
                    onChange={(e) => setItemCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE7F3] bg-[#F4F7FB] text-sm text-[#172B45] focus:outline-none focus:ring-2 focus:ring-[#071B38] focus:bg-white"
                  >
                    <option value="Shoes">Shoes &amp; Boots</option>
                    <option value="Bags">Luxury Bags &amp; Pouches</option>
                    <option value="Jackets">Leather / Suede Jackets</option>
                    <option value="Belts">Belts</option>
                    <option value="Caps">Caps &amp; Hats</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1.5">
                    Item Brand / Model
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Chanel Flap, Louboutin Sneaker..."
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE7F3] bg-[#F4F7FB] text-sm text-[#172B45] focus:outline-none focus:ring-2 focus:ring-[#071B38] focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1.5">
                  Current Condition &amp; Desired Treatment
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe stains, color fading, scuffs, worn corners, or cleaning requirements..."
                  value={itemIssue}
                  onChange={(e) => setItemIssue(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#DCE7F3] bg-[#F4F7FB] text-sm text-[#172B45] focus:outline-none focus:ring-2 focus:ring-[#071B38] focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-xl font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Launch WhatsApp Consultation</span>
              </button>

              <div className="text-center">
                <span className="text-[11px] text-[#75849A]">
                  Direct Link: <a href="https://wa.me/971559416729" target="_blank" rel="noopener noreferrer" className="text-[#071B38] font-bold underline underline-offset-2">wa.me/971559416729</a>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
