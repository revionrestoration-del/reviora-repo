import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, ShieldCheck } from 'lucide-react';
import { SiteSettings } from '../types';
import { openWhatsApp } from '../lib/whatsapp';

interface HeaderProps {
  settings: SiteSettings;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  activeSection,
  onNavigate,
  onOpenAdmin,
  isAdminLoggedIn,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Our Services' },
    { id: 'catalog', label: 'Catalog' },
    { id: 'gallery', label: 'Before & After' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-[#DCE7F3] py-3'
          : 'bg-white py-4 border-b border-[#DCE7F3]/70'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Light Theme: directly displays the dark logo cleanly and authentically */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center text-left focus:outline-none group transition-transform hover:opacity-95"
            aria-label="REVIORA RESTORATION - Home"
          >
            <img
              src={settings.logoUrl || '/assets/aistudio/Reviora_Logo__Dark__82b47f73.png'}
              alt="REVIORA RESTORATION"
              className="h-8 sm:h-9 w-auto object-contain"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 text-sm font-semibold tracking-wide transition-colors duration-200 rounded-lg ${
                    isActive
                      ? 'text-white bg-[#071B38] shadow-sm'
                      : 'text-[#172B45] hover:text-[#071B38] hover:bg-[#F4F7FB]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Admin Access Indicator */}
            <button
              onClick={onOpenAdmin}
              className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                isAdminLoggedIn
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                  : 'text-[#172B45] hover:text-[#071B38] border-[#DCE7F3] bg-[#F4F7FB] hover:bg-[#DCE7F3]'
              }`}
              title="Admin Control Panel"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#071B38]" />
              <span>{isAdminLoggedIn ? 'Admin Active' : 'Admin'}</span>
            </button>

            {/* Direct WhatsApp CTA Button */}
            <button
              onClick={() => openWhatsApp(null, undefined, settings.whatsappNumber)}
              className="bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-2 rounded-lg font-bold text-xs tracking-wider uppercase shadow-sm hover:shadow-md transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp Us</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-xs text-[#172B45] border border-[#DCE7F3] bg-[#F4F7FB] rounded-lg"
              title="Admin"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#172B45] hover:text-[#071B38] p-2 rounded-lg focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#DCE7F3] px-4 pt-3 pb-6 space-y-2 mt-3 animate-in slide-in-from-top-4 shadow-xl">
          <div className="border-b border-[#DCE7F3] pb-2 mb-3">
            <p className="text-xs uppercase tracking-widest text-[#75849A]">
              Bur Dubai, Dubai, UAE
            </p>
          </div>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`block w-full text-left px-3.5 py-2.5 rounded-lg text-base font-semibold ${
                activeSection === item.id
                  ? 'bg-[#071B38] text-white'
                  : 'text-[#172B45] hover:bg-[#F4F7FB]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-3 border-t border-[#DCE7F3] flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp(null, undefined, settings.whatsappNumber);
              }}
              className="w-full bg-[#25D366] text-white py-3 rounded-lg font-bold text-center flex items-center justify-center gap-2 shadow"
            >
              <MessageCircle className="w-5 h-5 fill-white" />
              <span>Chat on WhatsApp (+971 55 941 6729)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full bg-[#F4F7FB] text-[#071B38] border border-[#DCE7F3] py-2.5 rounded-lg text-sm text-center flex items-center justify-center gap-2 font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-[#071B38]" />
              <span>Admin Control Panel</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
