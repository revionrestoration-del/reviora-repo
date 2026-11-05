import React, { useState } from 'react';
import { Eye, Sparkles, X, MessageCircle } from 'lucide-react';
import { GalleryItem, ServiceCategory } from '../types';
import { openWhatsApp } from '../lib/whatsapp';

interface BeforeAfterGalleryProps {
  galleryItems: GalleryItem[];
  categories: ServiceCategory[];
  whatsappNumber: string;
}

export const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({
  galleryItems,
  categories,
  whatsappNumber,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const filteredItems = galleryItems.filter((item) => {
    if (!item.isActive) return false;
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <section id="gallery" className="py-20 bg-[#071B38] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102B50] text-[#DCE7F3] text-xs font-semibold uppercase tracking-wider border border-[#DCE7F3]/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Demonstrated Excellence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
            BEFORE &amp; AFTER RESTORATION SHOWCASE
          </h2>
          <p className="text-base text-[#DCE7F3]/80 leading-relaxed font-light">
            Authentic transformations straight from our Bur Dubai restoration workshop. Witness the revival of worn leather, faded dyes, and strained components.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
              activeCategory === 'all'
                ? 'bg-white text-[#071B38] shadow-md font-bold'
                : 'bg-[#102B50] text-[#DCE7F3] hover:bg-[#1a3d6e] hover:text-white'
            }`}
          >
            All Work ({galleryItems.filter((i) => i.isActive).length})
          </button>
          {categories.map((cat) => {
            const count = galleryItems.filter((i) => i.isActive && i.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  activeCategory === cat.id
                    ? 'bg-white text-[#071B38] shadow-md font-bold'
                    : 'bg-[#102B50] text-[#DCE7F3] hover:bg-[#1a3d6e] hover:text-white'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Gallery Grid with 1:1 Aspect Ratio Images */}
        {filteredItems.length === 0 ? (
          <div className="bg-[#102B50]/60 rounded-2xl p-12 text-center border border-[#DCE7F3]/20 max-w-md mx-auto space-y-3">
            <Sparkles className="w-8 h-8 text-[#DCE7F3] mx-auto opacity-40" />
            <h4 className="text-base font-bold text-white">No Gallery Items Added Yet</h4>
            <p className="text-xs text-[#DCE7F3]/70">
              Our administrators upload documented customer restoration results directly through the admin control panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-[#102B50]/90 rounded-2xl overflow-hidden border border-[#DCE7F3]/20 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:border-[#DCE7F3]/40"
              >
                {/* 1:1 Aspect Ratio Visual Showcase */}
                <div
                  className="relative aspect-square overflow-hidden bg-[#071B38] cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <img
                    src={item.afterImageUrl || item.beforeImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#071B38]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-[#071B38] px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect Restoration</span>
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 bg-[#071B38]/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded backdrop-blur-sm border border-white/10">
                    {item.category}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-[#25D366] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded shadow">
                    Verified Result
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3 text-left">
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#DCE7F3]/80 leading-relaxed line-clamp-2 font-light">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#DCE7F3]/15 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-xs font-bold text-white hover:text-[#DCE7F3] flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Compare Details</span>
                    </button>

                    <button
                      onClick={() =>
                        openWhatsApp(
                          null,
                          `Hello REVIORA RESTORATION, I saw your restoration result "${item.title}" in your gallery and I would like to enquire about similar restoration for my item.`,
                          whatsappNumber
                        )
                      }
                      className="bg-[#25D366] hover:bg-[#20ba59] text-white p-2.5 rounded-lg shadow-sm transition-colors"
                      title="Enquire on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 fill-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Comparison Modal with 1:1 Aspect Ratio Image */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative bg-white text-[#071B38] rounded-2xl max-w-2xl w-full shadow-2xl border border-white/20 overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-[#172B45] p-2 rounded-full shadow-lg transition-transform hover:scale-110"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <span className="text-[11px] font-bold text-[#75849A] uppercase tracking-widest">
                  Restoration Case Study
                </span>
                <h3 className="text-2xl font-bold text-[#071B38] mt-1 font-serif">
                  {selectedItem.title}
                </h3>
                <p className="text-xs text-[#75849A] mt-1 capitalize font-medium">
                  Discipline: {selectedItem.category} • Bur Dubai Studio
                </p>
              </div>

              {/* 1:1 Aspect Ratio Modal Showcase */}
              <div className="rounded-xl overflow-hidden bg-[#F4F7FB] border border-[#DCE7F3] aspect-square relative flex items-center justify-center">
                <img
                  src={selectedItem.afterImageUrl || selectedItem.beforeImageUrl}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <p className="text-sm text-[#172B45] leading-relaxed">
                {selectedItem.description}
              </p>

              {/* CTA */}
              <div className="pt-2 border-t border-[#DCE7F3] flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-[#75849A]">
                  Have a similar piece requiring restoration?
                </span>
                <button
                  onClick={() => {
                    openWhatsApp(
                      null,
                      `Hello REVIORA RESTORATION, I am interested in getting restoration work similar to "${selectedItem.title}". Could you please provide guidance and a quote?`,
                      whatsappNumber
                    );
                  }}
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba59] text-white py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Enquire About Similar Restoration</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
