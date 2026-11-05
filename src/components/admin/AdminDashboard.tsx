import React from 'react';
import {
  Tag,
  CheckCircle,
  XCircle,
  FolderTree,
  Image as ImageIcon,
  MessageCircle,
  PlusCircle,
  Settings,
  Database,
  ArrowRight,
} from 'lucide-react';
import { ServiceItem, ServiceCategory, GalleryItem, AdminTab } from '../../types';
import { getWhatsAppClicksCount } from '../../lib/catalogService';

interface AdminDashboardProps {
  services: ServiceItem[];
  categories: ServiceCategory[];
  galleryItems: GalleryItem[];
  onNavigateTab: (tab: AdminTab) => void;
  onAddNewService: () => void;
  onSeedData: () => Promise<void>;
  isSeeding: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  services,
  categories,
  galleryItems,
  onNavigateTab,
  onAddNewService,
  onSeedData,
  isSeeding,
}) => {
  const activeServices = services.filter((s) => s.isActive).length;
  const inactiveServices = services.filter((s) => !s.isActive).length;
  const whatsappClicks = getWhatsAppClicksCount();

  const stats = [
    {
      title: 'Total Services',
      value: services.length,
      subtitle: `${activeServices} Active, ${inactiveServices} Inactive`,
      icon: Tag,
      color: 'bg-blue-500/10 text-blue-600',
      action: () => onNavigateTab('catalog'),
    },
    {
      title: 'Active Services',
      value: activeServices,
      subtitle: 'Visible to public visitors',
      icon: CheckCircle,
      color: 'bg-emerald-500/10 text-emerald-600',
      action: () => onNavigateTab('catalog'),
    },
    {
      title: 'Inactive Services',
      value: inactiveServices,
      subtitle: 'Hidden from public catalog',
      icon: XCircle,
      color: 'bg-amber-500/10 text-amber-600',
      action: () => onNavigateTab('catalog'),
    },
    {
      title: 'Categories',
      value: categories.length,
      subtitle: 'Shoe, Bag, Jacket, Belt, Cap',
      icon: FolderTree,
      color: 'bg-purple-500/10 text-purple-600',
      action: () => onNavigateTab('categories'),
    },
    {
      title: 'Gallery Showcases',
      value: galleryItems.length,
      subtitle: 'Before & After pairs',
      icon: ImageIcon,
      color: 'bg-indigo-500/10 text-indigo-600',
      action: () => onNavigateTab('gallery'),
    },
    {
      title: 'WhatsApp Clicks',
      value: whatsappClicks,
      subtitle: 'Customer enquiry attempts',
      icon: MessageCircle,
      color: 'bg-green-500/10 text-green-600',
      action: undefined,
    },
  ];

  return (
    <div className="space-y-8 text-left">
      {/* Header Banner */}
      <div className="bg-[#071B38] text-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#102B50] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs uppercase font-bold text-[#DCE7F3] tracking-widest">
            Overview &amp; Control
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif mt-1">
            REVIORA RESTORATION Management
          </h2>
          <p className="text-xs sm:text-sm text-[#75849A] mt-1 max-w-xl">
            Live synchronization with Cloud Firestore and Firebase Storage. Modifications update public catalog immediately.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={onAddNewService}
            className="bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Add New Service</span>
          </button>

          <button
            onClick={onSeedData}
            disabled={isSeeding}
            className="bg-[#102B50] hover:bg-[#1a3d6e] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#DCE7F3]/20 transition-all"
            title="Populate or reload standard 20 catalog services"
          >
            <Database className="w-4 h-4 text-amber-300" />
            <span>{isSeeding ? 'Syncing...' : 'Sync 20 Catalog Services'}</span>
          </button>
        </div>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              onClick={stat.action}
              className={`bg-white p-6 rounded-xl border border-[#DCE7F3] shadow-sm hover:shadow-md transition-all ${
                stat.action ? 'cursor-pointer hover:border-[#071B38]' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#75849A] uppercase tracking-wider">
                  {stat.title}
                </span>
                <div className={`p-2.5 rounded-lg ${stat.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl font-bold font-mono text-[#071B38] mt-3">
                {stat.value}
              </div>
              <p className="text-xs text-[#75849A] mt-1">{stat.subtitle}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Action Pathways */}
      <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#DCE7F3] shadow-sm space-y-4">
        <h3 className="text-base font-bold text-[#071B38] uppercase tracking-wider">
          Quick Management Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            onClick={() => onNavigateTab('catalog')}
            className="p-4 rounded-lg bg-[#F4F7FB] hover:bg-[#DCE7F3] text-left transition-colors border border-[#DCE7F3] flex flex-col justify-between group"
          >
            <div>
              <Tag className="w-5 h-5 text-[#071B38] mb-2" />
              <div className="font-bold text-sm text-[#071B38]">Catalog Manager</div>
              <div className="text-xs text-[#75849A] mt-1">
                Edit prices, descriptions, and feature lists.
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs font-semibold text-[#071B38] group-hover:translate-x-1 transition-transform">
              <span>Open Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('categories')}
            className="p-4 rounded-lg bg-[#F4F7FB] hover:bg-[#DCE7F3] text-left transition-colors border border-[#DCE7F3] flex flex-col justify-between group"
          >
            <div>
              <FolderTree className="w-5 h-5 text-[#071B38] mb-2" />
              <div className="font-bold text-sm text-[#071B38]">Categories</div>
              <div className="text-xs text-[#75849A] mt-1">
                Manage Shoes, Bags, Jackets, Belts, Caps.
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs font-semibold text-[#071B38] group-hover:translate-x-1 transition-transform">
              <span>Open Categories</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('gallery')}
            className="p-4 rounded-lg bg-[#F4F7FB] hover:bg-[#DCE7F3] text-left transition-colors border border-[#DCE7F3] flex flex-col justify-between group"
          >
            <div>
              <ImageIcon className="w-5 h-5 text-[#071B38] mb-2" />
              <div className="font-bold text-sm text-[#071B38]">Before &amp; After</div>
              <div className="text-xs text-[#75849A] mt-1">
                Upload customer restoration transformations.
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs font-semibold text-[#071B38] group-hover:translate-x-1 transition-transform">
              <span>Open Gallery</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </button>

          <button
            onClick={() => onNavigateTab('settings')}
            className="p-4 rounded-lg bg-[#F4F7FB] hover:bg-[#DCE7F3] text-left transition-colors border border-[#DCE7F3] flex flex-col justify-between group"
          >
            <div>
              <Settings className="w-5 h-5 text-[#071B38] mb-2" />
              <div className="font-bold text-sm text-[#071B38]">Website Settings</div>
              <div className="text-xs text-[#75849A] mt-1">
                Update phone, WhatsApp links, address, and socials.
              </div>
            </div>
            <div className="mt-3 flex items-center text-xs font-semibold text-[#071B38] group-hover:translate-x-1 transition-transform">
              <span>Open Settings</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
