import React from 'react';
import { ArrowRight, MessageCircle, MapPin, Sparkles, CheckCircle2, Shield } from 'lucide-react';
import { SiteSettings } from '../types';
import { openWhatsApp } from '../lib/whatsapp';

interface HeroProps {
  settings: SiteSettings;
  onExploreClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ settings, onExploreClick }) => {
  return (
    <section id="hero" className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-white text-[#071B38]">
      {/* Light Luxury Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F4F7FB]/70 via-white to-[#F4F7FB]/40 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#DCE7F3]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#DCE7F3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Tagline / Location Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4F7FB] border border-[#DCE7F3] text-xs font-semibold tracking-wider text-[#071B38] uppercase shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Bur Dubai, Dubai, UAE</span>
              <span className="text-[#75849A]">•</span>
              <span className="text-[#071B38] font-bold tracking-widest">{settings.tagline || 'RESTORE. REVIVE. RELIVE.'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#071B38] leading-tight font-serif">
              {settings.heroTitle || 'BRING YOUR FAVORITE ITEMS BACK TO LIFE.'}
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#556882] leading-relaxed max-w-2xl font-normal">
              {settings.heroDescription ||
                'Professional cleaning and restoration services for shoes, bags, jackets, belts, and caps. We restore the beauty, refresh the appearance, and help extend the life of your favorite items.'}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button
                onClick={onExploreClick}
                className="bg-[#071B38] hover:bg-[#102B50] text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-xl hover:translate-y-[-1px] flex items-center justify-center gap-2 group"
              >
                <span>EXPLORE OUR SERVICES</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => openWhatsApp(null, undefined, settings.whatsappNumber)}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white px-7 py-3.5 rounded-xl font-bold text-sm tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>CHAT WITH US ON WHATSAPP</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-[#DCE7F3] grid grid-cols-3 gap-4 text-xs text-[#556882]">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Deep Care &amp; Sanitization</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Color &amp; Shape Renewal</span>
              </div>
              <div className="flex items-center gap-2 font-medium">
                <Shield className="w-4 h-4 text-[#071B38] shrink-0" />
                <span>Dedicated Bur Dubai Studio</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card Showcase with 1:1 Aspect Ratio */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Subtle light glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#DCE7F3] via-blue-100 to-[#DCE7F3] opacity-60 blur-lg" />
              
              <div className="relative rounded-2xl overflow-hidden bg-white border border-[#DCE7F3] shadow-xl">
                {/* 1:1 Aspect Ratio Hero Feature Image */}
                <div className="aspect-square relative overflow-hidden bg-[#F4F7FB]">
                  <img
                    src="/assets/aistudio/05_Designer_Formal_Leather_Shoes_150_3f0c6a26.jpg"
                    alt="REVIORA Master Leather Craft Restoration"
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 right-3 bg-[#071B38] px-3 py-1 rounded-md text-xs font-semibold text-white shadow-md">
                    Bespoke Hand Finishing
                  </div>
                </div>

                {/* Card Caption / Info */}
                <div className="p-5 text-left space-y-3 bg-white border-t border-[#DCE7F3]">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest font-bold text-[#071B38]">
                      Craftsmanship In Action
                    </span>
                    <span className="text-xs bg-[#25D366]/15 text-emerald-800 px-2 py-0.5 rounded font-mono font-bold">
                      Direct WhatsApp Quote
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#071B38]">
                    Luxury Shoe &amp; Leather Restoration
                  </h3>
                  <p className="text-xs text-[#75849A] leading-relaxed">
                    From Christian Louboutin and Hermès to casual sneakers and vintage cowboy boots, we bring worn leather and stained fabrics back to life.
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-[#F4F7FB]">
                    <span className="text-xs font-semibold text-[#071B38] font-mono">Starting from AED 50</span>
                    <button
                      onClick={onExploreClick}
                      className="text-xs font-bold text-[#071B38] hover:text-[#102B50] flex items-center gap-1"
                    >
                      <span>View 20 Catalog Services</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
