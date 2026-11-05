import React from 'react';
import { ShieldCheck, HeartHandshake, Award, Clock } from 'lucide-react';
import { SiteSettings } from '../types';

interface AboutSectionProps {
  settings: SiteSettings;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ settings }) => {
  return (
    <section id="about" className="py-20 bg-white text-[#071B38] relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DCE7F3]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#DCE7F3]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Side with 1:1 Aspect Ratio Image */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-[#DCE7F3] shadow-xl bg-[#F4F7FB]">
              {/* 1:1 Aspect Ratio About Image */}
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/assets/aistudio/30_Handbag_Cleaning_84bcfcf5.jpg"
                  alt="REVIORA Artisanal Restoration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071B38]/80 via-transparent to-transparent opacity-70" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 p-4 bg-white/95 backdrop-blur-md rounded-xl border border-[#DCE7F3] shadow-md">
                <div className="flex items-center gap-2 text-xs font-mono text-[#071B38] uppercase tracking-wider font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#25D366]" />
                  <span>Bur Dubai Workshop • Dubai, UAE</span>
                </div>
                <p className="text-sm font-bold text-[#071B38] mt-1">
                  Meticulous Attention to Every Stitch &amp; Hide
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-[#F4F7FB] rounded-xl border border-[#DCE7F3] text-left">
                <div className="text-2xl font-bold font-mono text-[#071B38]">5</div>
                <div className="text-xs text-[#75849A] uppercase tracking-wider mt-0.5 font-semibold">
                  Core Disciplines
                </div>
              </div>
              <div className="p-4 bg-[#F4F7FB] rounded-xl border border-[#DCE7F3] text-left">
                <div className="text-2xl font-bold font-mono text-[#071B38]">100%</div>
                <div className="text-xs text-[#75849A] uppercase tracking-wider mt-0.5 font-semibold">
                  Handcrafted Care
                </div>
              </div>
            </div>
          </div>

          {/* Editorial / Brand Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-block px-3.5 py-1 rounded-full bg-[#F4F7FB] text-[#071B38] text-xs font-bold uppercase tracking-widest border border-[#DCE7F3]">
              Our Heritage &amp; Philosophy
            </div>

            {/* Headline from prompt */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#071B38] font-serif">
              {settings.tagline || 'RESTORE. REVIVE. RELIVE.'}
            </h2>

            {/* Prompt exact text */}
            <div className="space-y-4 text-[#556882] text-base sm:text-lg leading-relaxed font-normal">
              <p>
                At <strong className="font-bold text-[#071B38]">REVIORA RESTORATION</strong>, we believe that your favorite items deserve a second life. We specialize in professional cleaning and restoration services for shoes, bags, jackets, belts, and caps.
              </p>
              <p>
                Our goal is to refresh, preserve, and restore the appearance of your valuable personal items through careful cleaning and professional treatment.
              </p>
            </div>

            {/* Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3] flex items-start gap-3">
                <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#071B38]">Material Integrity</h4>
                  <p className="text-xs text-[#75849A] mt-1 leading-relaxed">
                    Custom non-corrosive surfactants and pH-balanced natural conditioners tailored to luxury leathers.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3] flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#25D366] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#071B38]">Honest Guidance</h4>
                  <p className="text-xs text-[#75849A] mt-1 leading-relaxed">
                    Transparent expectations, clear notes on color limitations, and personal WhatsApp consultation.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3] flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#071B38] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#071B38]">Sustainable Luxury</h4>
                  <p className="text-xs text-[#75849A] mt-1 leading-relaxed">
                    Extending item longevity saves cherished wardrobe pieces from premature retirement.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#F4F7FB] border border-[#DCE7F3] flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#071B38]">Timely Turnaround</h4>
                  <p className="text-xs text-[#75849A] mt-1 leading-relaxed">
                    Swift assessment and courteous status updates through WhatsApp throughout every step.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
