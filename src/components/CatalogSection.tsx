import React, { useState, useMemo } from 'react';
import { Search, Filter, MessageCircle, Eye, Tag, Sparkles } from 'lucide-react';
import { ServiceItem, ServiceCategory } from '../types';
import { formatPriceDisplay, openWhatsApp } from '../lib/whatsapp';

interface CatalogSectionProps {
  services: ServiceItem[];
  categories: ServiceCategory[];
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onViewDetails: (service: ServiceItem) => void;
  whatsappNumber: string;
}

export const CatalogSection: React.FC<CatalogSectionProps> = ({
  services,
  categories,
  selectedCategory,
  onSelectCategory,
  onViewDetails,
  whatsappNumber,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceTypeFilter, setPriceTypeFilter] = useState<'all' | 'fixed' | 'starting'>('all');

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      // Must be active for public catalog
      if (!service.isActive) return false;

      // Category filter
      if (selectedCategory !== 'all' && service.category !== selectedCategory) {
        return false;
      }

      // Price type filter
      if (priceTypeFilter !== 'all' && service.priceType !== priceTypeFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(query);
        const matchesDesc = service.description.toLowerCase().includes(query);
        const matchesCategory = service.category.toLowerCase().includes(query);
        const matchesFeatures = service.features?.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesDesc && !matchesCategory && !matchesFeatures) {
          return false;
        }
      }

      return true;
    });
  }, [services, selectedCategory, priceTypeFilter, searchQuery]);

  return (
    <section id="catalog" className="py-20 bg-[#F4F7FB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#102B50] text-[#DCE7F3] text-xs font-semibold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Complete Restoration Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#071B38]">
            SERVICE CATALOG &amp; PRICING (AED)
          </h2>
          <p className="text-base text-[#75849A] leading-relaxed">
            Transparent pricing, authentic artisan techniques, and zero hidden charges. Direct WhatsApp consultation for every service.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-[#DCE7F3] mb-10 space-y-4">
          {/* Search & Filter Row */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75849A]" />
              <input
                type="text"
                placeholder="Search services (e.g., Sneakers, Handbag, Suede)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#DCE7F3] bg-[#F4F7FB]/50 text-sm text-[#172B45] focus:outline-none focus:ring-2 focus:ring-[#071B38] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#75849A] hover:text-[#172B45]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Price Type Filter Buttons */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-[#75849A] mr-2 font-medium flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Pricing:
              </span>
              <button
                onClick={() => setPriceTypeFilter('all')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  priceTypeFilter === 'all'
                    ? 'bg-[#071B38] text-white'
                    : 'bg-[#F4F7FB] text-[#172B45] hover:bg-[#DCE7F3]'
                }`}
              >
                All Prices
              </button>
              <button
                onClick={() => setPriceTypeFilter('fixed')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  priceTypeFilter === 'fixed'
                    ? 'bg-[#071B38] text-white'
                    : 'bg-[#F4F7FB] text-[#172B45] hover:bg-[#DCE7F3]'
                }`}
              >
                Fixed Price
              </button>
              <button
                onClick={() => setPriceTypeFilter('starting')}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                  priceTypeFilter === 'starting'
                    ? 'bg-[#071B38] text-white'
                    : 'bg-[#F4F7FB] text-[#172B45] hover:bg-[#DCE7F3]'
                }`}
              >
                Starting From
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-2 border-t border-[#F4F7FB] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#071B38] text-white shadow-sm'
                  : 'bg-[#F4F7FB] text-[#172B45] hover:bg-[#DCE7F3]'
              }`}
            >
              All Services ({services.filter((s) => s.isActive).length})
            </button>
            {categories.map((cat) => {
              const count = services.filter((s) => s.isActive && s.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#071B38] text-white shadow-sm'
                      : 'bg-[#F4F7FB] text-[#172B45] hover:bg-[#DCE7F3]'
                  }`}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Catalog Items Grid */}
        {filteredServices.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center border border-[#DCE7F3] max-w-lg mx-auto space-y-4">
            <Tag className="w-10 h-10 text-[#75849A] mx-auto opacity-50" />
            <h3 className="text-lg font-bold text-[#071B38]">No Services Found</h3>
            <p className="text-sm text-[#75849A]">
              We couldn't find any services matching your filter criteria. Try clearing search or selecting a different category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
                setPriceTypeFilter('all');
              }}
              className="bg-[#071B38] text-white px-5 py-2 rounded-md text-xs font-semibold uppercase tracking-wider"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredServices.map((service) => {
              const displayPrice = formatPriceDisplay(service.price, service.priceType);

              return (
                <div
                  key={service.id}
                  className="bg-white rounded-xl overflow-hidden border border-[#DCE7F3] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-[#102B50]/40"
                >
                  {/* Image Container with Badges */}
                  <div className="relative aspect-square overflow-hidden bg-[#071B38]/5">
                    <img
                      src={service.imageUrl}
                      alt={service.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Featured Badge */}
                    {service.isFeatured && (
                      <div className="absolute top-3 left-3 bg-[#071B38] text-white text-[11px] font-semibold px-2.5 py-1 rounded-md shadow flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Popular</span>
                      </div>
                    )}

                    {/* Category Label */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[#071B38] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                      {service.category}
                    </div>

                    {/* Quick View Overlay on Hover */}
                    <div className="absolute inset-0 bg-[#071B38]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => onViewDetails(service)}
                        className="bg-white text-[#071B38] hover:bg-[#F4F7FB] px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between text-left space-y-3">
                    <div className="space-y-1.5">
                      <h3 className="font-bold text-base text-[#071B38] group-hover:text-[#102B50] transition-colors leading-snug line-clamp-1">
                        {service.name}
                      </h3>
                      <p className="text-xs text-[#75849A] line-clamp-2 leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Price in AED */}
                    <div className="pt-2 border-t border-[#F4F7FB] flex items-baseline justify-between">
                      <span className="text-xs uppercase tracking-wider text-[#75849A] font-medium">
                        Standard Fee
                      </span>
                      <span className="text-sm font-bold text-[#071B38] font-mono">
                        {displayPrice}
                      </span>
                    </div>

                    {/* Action Buttons: View Details & WhatsApp Enquire */}
                    <div className="pt-2 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onViewDetails(service)}
                        className="w-full bg-[#F4F7FB] hover:bg-[#DCE7F3] text-[#071B38] py-2 px-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors text-center"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => openWhatsApp(service, undefined, whatsappNumber)}
                        className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white py-2 px-3 rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Enquire</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
