import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServicesSectionProps {
  categories: ServiceCategory[];
  onSelectCategory: (categoryId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  categories,
  onSelectCategory,
}) => {
  return (
    <section id="services" className="py-20 bg-[#071B38] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102B50] text-[#DCE7F3] text-xs font-semibold uppercase tracking-wider border border-[#DCE7F3]/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Core Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            OUR SPECIALIZED RESTORATION SERVICES
          </h2>
          <p className="text-base text-[#DCE7F3]/80 leading-relaxed font-light">
            Every material requires dedicated chemistry and artisanal precision. Select a specialty below to view our comprehensive catalog of tailored restoration treatments.
          </p>
        </div>

        {/* Categories Grid (5 categories) with 1:1 Aspect Ratio Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => {
            return (
              <div
                key={category.id}
                className="group bg-[#102B50]/90 rounded-2xl overflow-hidden border border-[#DCE7F3]/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:border-[#DCE7F3]/40"
              >
                {/* 1:1 Aspect Ratio Category Image */}
                <div className="relative aspect-square overflow-hidden bg-[#071B38]">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071B38]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-3 left-4 text-xs font-mono font-medium text-white/90 uppercase tracking-widest bg-[#071B38]/80 px-2.5 py-1 rounded-md backdrop-blur-sm border border-white/10">
                    Category 0{category.displayOrder}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4 text-left">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#DCE7F3] transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-[#DCE7F3]/80 leading-relaxed font-light">
                      {category.description}
                    </p>
                  </div>

                  {/* Explore Button */}
                  <button
                    onClick={() => onSelectCategory(category.id)}
                    className="w-full mt-4 bg-white hover:bg-[#F4F7FB] text-[#071B38] py-3 px-4 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-sm group-hover:shadow-md"
                  >
                    <span>EXPLORE SERVICES</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
