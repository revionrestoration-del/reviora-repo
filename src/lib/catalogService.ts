import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { ServiceItem, ServiceCategory, SiteSettings, GalleryItem } from '../types';
import { INITIAL_SERVICES, INITIAL_CATEGORIES, INITIAL_SETTINGS, INITIAL_GALLERY } from './initialData';

// Firestore Collection Names
const SERVICES_COLLECTION = 'services';
const CATEGORIES_COLLECTION = 'categories';
const SETTINGS_COLLECTION = 'siteSettings';
const GALLERY_COLLECTION = 'gallery';
const STATS_COLLECTION = 'analytics';

// Auto-seed Firestore on initial boot so the database is populated directly
let isSeeding = false;
export async function seedInitialDataIfEmpty(): Promise<void> {
  if (isSeeding) return;
  isSeeding = true;
  try {
    const servicesSnap = await getDocs(collection(db, SERVICES_COLLECTION));
    if (servicesSnap.empty) {
      console.log('Seeding initial 20 services to Cloud Firestore...');
      for (const service of INITIAL_SERVICES) {
        await setDoc(doc(db, SERVICES_COLLECTION, service.id), {
          ...service,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
    }

    const categoriesSnap = await getDocs(collection(db, CATEGORIES_COLLECTION));
    if (categoriesSnap.empty) {
      console.log('Seeding categories to Cloud Firestore...');
      for (const category of INITIAL_CATEGORIES) {
        await setDoc(doc(db, CATEGORIES_COLLECTION, category.id), category);
      }
    }

    const settingsDoc = await getDoc(doc(db, SETTINGS_COLLECTION, 'general'));
    if (!settingsDoc.exists()) {
      console.log('Seeding site settings to Cloud Firestore...');
      await setDoc(doc(db, SETTINGS_COLLECTION, 'general'), {
        ...INITIAL_SETTINGS,
        updatedAt: serverTimestamp(),
      });
    }

    const gallerySnap = await getDocs(collection(db, GALLERY_COLLECTION));
    if (gallerySnap.empty) {
      for (const item of INITIAL_GALLERY) {
        await setDoc(doc(db, GALLERY_COLLECTION, item.id), {
          ...item,
          createdAt: serverTimestamp(),
        });
      }
    }
  } catch (error) {
    console.warn('Initial seeding note (e.g. unauthenticated or rules in effect):', error);
  } finally {
    isSeeding = false;
  }
}

// Subscribe to public active services
export function subscribeToServices(
  callback: (services: ServiceItem[]) => void,
  isAdmin: boolean = false
): () => void {
  const colRef = collection(db, SERVICES_COLLECTION);
  const q = query(colRef, orderBy('displayOrder', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: ServiceItem[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as ServiceItem;
        if (isAdmin || data.isActive) {
          items.push({ ...data, id: d.id });
        }
      });
      // Fallback if empty and not yet seeded
      if (items.length === 0 && !isAdmin) {
        callback(INITIAL_SERVICES.filter((s) => s.isActive));
      } else {
        callback(items);
      }
    },
    (error) => {
      console.warn('Services snapshot note, using initial fallback:', error.message);
      callback(INITIAL_SERVICES.filter((s) => isAdmin || s.isActive));
    }
  );
}

// Subscribe to categories
export function subscribeToCategories(
  callback: (categories: ServiceCategory[]) => void,
  isAdmin: boolean = false
): () => void {
  const colRef = collection(db, CATEGORIES_COLLECTION);
  const q = query(colRef, orderBy('displayOrder', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: ServiceCategory[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as ServiceCategory;
        if (isAdmin || data.isActive) {
          items.push({ ...data, id: d.id });
        }
      });
      if (items.length === 0 && !isAdmin) {
        callback(INITIAL_CATEGORIES);
      } else {
        callback(items);
      }
    },
    (error) => {
      console.warn('Categories snapshot note, using initial fallback:', error.message);
      callback(INITIAL_CATEGORIES);
    }
  );
}

// Subscribe to site settings
export function subscribeToSettings(callback: (settings: SiteSettings) => void): () => void {
  const docRef = doc(db, SETTINGS_COLLECTION, 'general');

  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback(snap.data() as SiteSettings);
      } else {
        callback(INITIAL_SETTINGS);
      }
    },
    (error) => {
      console.warn('Settings snapshot note, using default settings:', error.message);
      callback(INITIAL_SETTINGS);
    }
  );
}

// Subscribe to gallery items
export function subscribeToGallery(
  callback: (items: GalleryItem[]) => void,
  isAdmin: boolean = false
): () => void {
  const colRef = collection(db, GALLERY_COLLECTION);
  const q = query(colRef, orderBy('displayOrder', 'asc'));

  return onSnapshot(
    q,
    (snapshot) => {
      const items: GalleryItem[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as GalleryItem;
        if (isAdmin || data.isActive) {
          items.push({ ...data, id: d.id });
        }
      });
      if (items.length === 0 && !isAdmin) {
        callback(INITIAL_GALLERY);
      } else {
        callback(items);
      }
    },
    (error) => {
      console.warn('Gallery snapshot note, using default items:', error.message);
      callback(INITIAL_GALLERY);
    }
  );
}

// --- ADMIN MUTATIONS ---

export async function saveService(service: ServiceItem): Promise<void> {
  const path = `${SERVICES_COLLECTION}/${service.id}`;
  try {
    await setDoc(
      doc(db, SERVICES_COLLECTION, service.id),
      {
        ...service,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteService(serviceId: string): Promise<void> {
  const path = `${SERVICES_COLLECTION}/${serviceId}`;
  try {
    await deleteDoc(doc(db, SERVICES_COLLECTION, serviceId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveCategory(category: ServiceCategory): Promise<void> {
  const path = `${CATEGORIES_COLLECTION}/${category.id}`;
  try {
    await setDoc(doc(db, CATEGORIES_COLLECTION, category.id), category, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteCategory(categoryId: string): Promise<void> {
  const path = `${CATEGORIES_COLLECTION}/${categoryId}`;
  try {
    await deleteDoc(doc(db, CATEGORIES_COLLECTION, categoryId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const path = `${SETTINGS_COLLECTION}/general`;
  try {
    await setDoc(
      doc(db, SETTINGS_COLLECTION, 'general'),
      {
        ...settings,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  const path = `${GALLERY_COLLECTION}/${item.id}`;
  try {
    await setDoc(
      doc(db, GALLERY_COLLECTION, item.id),
      {
        ...item,
        createdAt: item.createdAt || serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export async function deleteGalleryItem(itemId: string): Promise<void> {
  const path = `${GALLERY_COLLECTION}/${itemId}`;
  try {
    await deleteDoc(doc(db, GALLERY_COLLECTION, itemId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

// Track WhatsApp enquiry clicks
export function trackWhatsAppClick(serviceName?: string): void {
  try {
    const current = parseInt(localStorage.getItem('reviora_whatsapp_clicks') || '0', 10);
    localStorage.setItem('reviora_whatsapp_clicks', String(current + 1));
  } catch {
    // Ignore localStorage errors
  }
}

export function getWhatsAppClicksCount(): number {
  try {
    return parseInt(localStorage.getItem('reviora_whatsapp_clicks') || '0', 10);
  } catch {
    return 0;
  }
}
