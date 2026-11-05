export type PriceType = 'fixed' | 'starting';

export interface ServiceItem {
  id: string;
  name: string;
  category: string; // 'shoes' | 'bags' | 'jackets' | 'belts' | 'caps'
  description: string;
  features: string[];
  notes?: string;
  price: number;
  priceType: PriceType;
  imageUrl: string;
  imagePath?: string;
  isActive: boolean;
  isFeatured: boolean;
  displayOrder: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  displayOrder: number;
  isActive: boolean;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  whatsappNumber: string;
  whatsappLink: string;
  address: string;
  facebookUrl: string;
  instagramUrl: string;
  logoUrl: string;
  heroTitle: string;
  heroDescription: string;
  heroBannerUrl?: string;
  updatedAt?: any;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  description: string;
  isActive: boolean;
  displayOrder: number;
  createdAt?: any;
}

export interface AdminUser {
  uid: string;
  email: string;
  role: 'admin';
  createdAt?: any;
}

export type AdminTab = 'dashboard' | 'catalog' | 'categories' | 'gallery' | 'settings';
