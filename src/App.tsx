/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, testConnection } from './lib/firebase';
import {
  subscribeToServices,
  subscribeToCategories,
  subscribeToSettings,
  subscribeToGallery,
  seedInitialDataIfEmpty,
  saveService,
  deleteService,
  saveCategory,
  deleteCategory,
  saveSiteSettings,
  saveGalleryItem,
  deleteGalleryItem,
} from './lib/catalogService';
import { ServiceItem, ServiceCategory, SiteSettings, GalleryItem } from './types';
import { INITIAL_SERVICES, INITIAL_CATEGORIES, INITIAL_SETTINGS, INITIAL_GALLERY } from './lib/initialData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { CatalogSection } from './components/CatalogSection';
import { ServiceModal } from './components/ServiceModal';
import { BeforeAfterGallery } from './components/BeforeAfterGallery';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLogin } from './components/admin/AdminLogin';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('reviora_admin_session') === 'true';
  });
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCatalogCategory, setSelectedCatalogCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isSeeding, setIsSeeding] = useState<boolean>(false);

  // Live Firestore State
  const [services, setServices] = useState<ServiceItem[]>(INITIAL_SERVICES);
  const [categories, setCategories] = useState<ServiceCategory[]>(INITIAL_CATEGORIES);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(INITIAL_GALLERY);

  // Check URL path or hash for /admin on initial load
  useEffect(() => {
    if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
      setIsAdminView(true);
    }

    const handlePopState = () => {
      if (window.location.pathname === '/admin' || window.location.hash === '#admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Initialize and verify connection to Firestore, then attach real-time subscriptions
  useEffect(() => {
    // 1. Verify connection
    testConnection();

    // 2. Auto-seed initial data to Firestore
    seedInitialDataIfEmpty();

    // 3. Subscribe to real-time collections
    const unsubServices = subscribeToServices((items) => {
      setServices(items);
    }, Boolean(currentUser));

    const unsubCategories = subscribeToCategories((items) => {
      setCategories(items);
    }, Boolean(currentUser));

    const unsubSettings = subscribeToSettings((data) => {
      setSettings(data);
    });

    const unsubGallery = subscribeToGallery((items) => {
      setGalleryItems(items);
    }, Boolean(currentUser));

    return () => {
      unsubServices();
      unsubCategories();
      unsubSettings();
      unsubGallery();
    };
  }, [currentUser]);

  // Track active section on scroll for header navigation
  useEffect(() => {
    if (isAdminView) return;

    const sectionIds = ['hero', 'services', 'catalog', 'gallery', 'about', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 150;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminView]);

  const handleNavigateSection = (sectionId: string) => {
    if (isAdminView) {
      setIsAdminView(false);
      window.history.pushState(null, '', '/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }
    const el = document.getElementById(sectionId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectCategoryFromServices = (categoryId: string) => {
    setSelectedCatalogCategory(categoryId);
    const catalogEl = document.getElementById('catalog');
    catalogEl?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenAdmin = () => {
    setIsAdminView(true);
    window.history.pushState(null, '', '#admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExitAdmin = () => {
    setIsAdminView(false);
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleManualReSeed = async () => {
    setIsSeeding(true);
    try {
      await seedInitialDataIfEmpty();
    } finally {
      setIsSeeding(false);
    }
  };

  const isAuthorizedAdmin = Boolean(currentUser) || isAdminAuthenticated;

  // ADMIN VIEW
  if (isAdminView) {
    if (!isAuthorizedAdmin) {
      return (
        <AdminLogin
          onSuccess={() => {
            setIsAdminAuthenticated(true);
          }}
          onCancel={handleExitAdmin}
        />
      );
    }

    return (
      <AdminLayout
        currentUser={currentUser}
        onExitAdmin={handleExitAdmin}
        services={services}
        categories={categories}
        galleryItems={galleryItems}
        settings={settings}
        onSaveService={saveService}
        onDeleteService={deleteService}
        onSaveCategory={saveCategory}
        onDeleteCategory={deleteCategory}
        onSaveGalleryItem={saveGalleryItem}
        onDeleteGalleryItem={deleteGalleryItem}
        onSaveSettings={saveSiteSettings}
        onSeedData={handleManualReSeed}
        isSeeding={isSeeding}
      />
    );
  }

  // CUSTOMER-FACING PUBLIC WEBSITE
  return (
    <div className="min-h-screen flex flex-col bg-[#F4F7FB] selection:bg-[#071B38] selection:text-white">
      {/* Header Navigation */}
      <Header
        settings={settings}
        activeSection={activeSection}
        onNavigate={handleNavigateSection}
        onOpenAdmin={handleOpenAdmin}
        isAdminLoggedIn={isAuthorizedAdmin}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          settings={settings}
          onExploreClick={() => handleNavigateSection('services')}
        />

        {/* Our 5 Core Categories Section */}
        <ServicesSection
          categories={categories}
          onSelectCategory={handleSelectCategoryFromServices}
        />

        {/* Dynamic Catalog Section (Firestore-connected) */}
        <CatalogSection
          services={services}
          categories={categories}
          selectedCategory={selectedCatalogCategory}
          onSelectCategory={setSelectedCatalogCategory}
          onViewDetails={(service) => setSelectedService(service)}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* Before & After Gallery */}
        <BeforeAfterGallery
          galleryItems={galleryItems}
          categories={categories}
          whatsappNumber={settings.whatsappNumber}
        />

        {/* About Section */}
        <AboutSection settings={settings} />

        {/* Contact Section */}
        <ContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onNavigate={handleNavigateSection}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Persistent Floating WhatsApp Consultation Widget */}
      <FloatingWhatsApp whatsappNumber={settings.whatsappNumber} />

      {/* Service Details Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        whatsappNumber={settings.whatsappNumber}
      />
    </div>
  );
}
