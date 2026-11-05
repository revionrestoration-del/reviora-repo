import React, { useState } from 'react';
import {
  LayoutDashboard,
  Tag,
  FolderTree,
  Image as ImageIcon,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { User, signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { AdminTab, ServiceItem, ServiceCategory, GalleryItem, SiteSettings } from '../../types';
import { AdminDashboard } from './AdminDashboard';
import { AdminCatalog } from './AdminCatalog';
import { AdminCategories } from './AdminCategories';
import { AdminGallery } from './AdminGallery';
import { AdminSettings } from './AdminSettings';

interface AdminLayoutProps {
  currentUser: User | null;
  onExitAdmin: () => void;
  services: ServiceItem[];
  categories: ServiceCategory[];
  galleryItems: GalleryItem[];
  settings: SiteSettings;
  onSaveService: (service: ServiceItem) => Promise<void>;
  onDeleteService: (serviceId: string) => Promise<void>;
  onSaveCategory: (category: ServiceCategory) => Promise<void>;
  onDeleteCategory: (categoryId: string) => Promise<void>;
  onSaveGalleryItem: (item: GalleryItem) => Promise<void>;
  onDeleteGalleryItem: (itemId: string) => Promise<void>;
  onSaveSettings: (settings: SiteSettings) => Promise<void>;
  onSeedData: () => Promise<void>;
  isSeeding: boolean;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentUser,
  onExitAdmin,
  services,
  categories,
  galleryItems,
  settings,
  onSaveService,
  onDeleteService,
  onSaveCategory,
  onDeleteCategory,
  onSaveGalleryItem,
  onDeleteGalleryItem,
  onSaveSettings,
  onSeedData,
  isSeeding,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAddingNewService, setIsAddingNewService] = useState(false);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('reviora_admin_session');
      localStorage.removeItem('reviora_admin_username');
      await signOut(auth).catch(() => {});
      onExitAdmin();
    } catch (err) {
      console.error('Logout error:', err);
      onExitAdmin();
    }
  };

  const navItems = [
    { id: 'dashboard' as AdminTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'catalog' as AdminTab, label: 'Catalog Manager', icon: Tag, badge: services.length },
    { id: 'categories' as AdminTab, label: 'Categories', icon: FolderTree, badge: categories.length },
    { id: 'gallery' as AdminTab, label: 'Before & After', icon: ImageIcon, badge: galleryItems.length },
    { id: 'settings' as AdminTab, label: 'Website Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col lg:flex-row text-[#172B45]">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col justify-between w-64 bg-[#071B38] text-white border-r border-[#102B50] p-5 shrink-0 min-h-screen">
        <div className="space-y-6">
          {/* Logo badge */}
          <div className="space-y-2">
            <div className="bg-white/95 px-3 py-1.5 rounded-md shadow-sm border border-white/20 inline-block">
              <img
                src={settings.logoUrl || '/assets/aistudio/Reviora_Logo__Dark__82b47f73.png'}
                alt="REVIORA"
                className="h-7 w-auto object-contain"
              />
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#DCE7F3] uppercase tracking-wider pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Admin Control Panel</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5 text-left">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? 'bg-[#102B50] text-white shadow-sm'
                      : 'text-[#DCE7F3] hover:bg-[#102B50]/50 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                        isActive ? 'bg-[#071B38] text-white' : 'bg-[#102B50] text-[#DCE7F3]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin User & Controls */}
        <div className="pt-6 border-t border-[#102B50] space-y-3 text-left">
          <div className="p-2.5 rounded-lg bg-[#102B50]/60 border border-[#DCE7F3]/10">
            <span className="text-[10px] text-[#75849A] uppercase tracking-widest block font-medium">
              Access Level
            </span>
            <span className="text-xs font-semibold text-white truncate block mt-0.5">
              Authorized Administrator
            </span>
          </div>

          <button
            onClick={onExitAdmin}
            className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-[#DCE7F3] hover:text-white hover:bg-[#102B50]/40 rounded-md transition-colors"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-300 hover:text-red-100 hover:bg-red-950/40 rounded-md transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <header className="lg:hidden bg-[#071B38] text-white p-4 flex items-center justify-between border-b border-[#102B50]">
        <div className="bg-white/95 px-2.5 py-1 rounded inline-block">
          <img
            src={settings.logoUrl || '/assets/aistudio/Reviora_Logo__Dark__82b47f73.png'}
            alt="REVIORA"
            className="h-6 w-auto"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onExitAdmin}
            className="p-1.5 text-xs text-[#DCE7F3] border border-[#102B50] rounded"
            title="Public Website"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-[#DCE7F3] hover:text-white"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Dropdown */}
      {mobileSidebarOpen && (
        <div className="lg:hidden bg-[#071B38] text-white p-4 border-b border-[#102B50] space-y-2 text-left">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setMobileSidebarOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-semibold uppercase ${
                activeTab === item.id ? 'bg-[#102B50] text-white' : 'text-[#DCE7F3]'
              }`}
            >
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="text-[10px] bg-[#102B50] px-2 py-0.5 rounded font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-[#102B50] flex items-center justify-between">
            <span className="text-[11px] text-[#DCE7F3] font-medium">
              Administrator
            </span>
            <button
              onClick={handleLogout}
              className="text-xs text-red-300 font-semibold flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Admin Content Body */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        {activeTab === 'dashboard' && (
          <AdminDashboard
            services={services}
            categories={categories}
            galleryItems={galleryItems}
            onNavigateTab={(tab) => setActiveTab(tab)}
            onAddNewService={() => {
              setActiveTab('catalog');
              setIsAddingNewService(true);
            }}
            onSeedData={onSeedData}
            isSeeding={isSeeding}
          />
        )}

        {activeTab === 'catalog' && (
          <AdminCatalog
            services={services}
            categories={categories}
            onSaveService={onSaveService}
            onDeleteService={onDeleteService}
            isEditingNew={isAddingNewService}
            onCloseNewModal={() => setIsAddingNewService(false)}
          />
        )}

        {activeTab === 'categories' && (
          <AdminCategories
            categories={categories}
            onSaveCategory={onSaveCategory}
            onDeleteCategory={onDeleteCategory}
          />
        )}

        {activeTab === 'gallery' && (
          <AdminGallery
            galleryItems={galleryItems}
            categories={categories}
            onSaveGalleryItem={onSaveGalleryItem}
            onDeleteGalleryItem={onDeleteGalleryItem}
          />
        )}

        {activeTab === 'settings' && (
          <AdminSettings settings={settings} onSaveSettings={onSaveSettings} />
        )}
      </main>
    </div>
  );
};
