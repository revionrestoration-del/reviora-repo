import { ServiceItem } from '../types';
import { trackWhatsAppClick } from './catalogService';

export const DEFAULT_WHATSAPP_NUMBER = '971559416729';

export function formatPriceDisplay(price: number, priceType: 'fixed' | 'starting'): string {
  if (priceType === 'starting') {
    return `Starting from AED ${price}`;
  }
  return `AED ${price}`;
}

export function generateWhatsAppUrl(
  service?: ServiceItem | null,
  customMessage?: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): string {
  // Strip any non-digit characters from the phone number
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, '');

  let message = '';
  if (customMessage) {
    message = customMessage;
  } else if (service) {
    const formattedPrice = formatPriceDisplay(service.price, service.priceType);
    message = `Hello REVIORA RESTORATION, I am interested in your ${service.name} service (${service.category.toUpperCase()}) priced at ${formattedPrice}. I would like to know more about this service.`;
  } else {
    message = 'Hello REVIORA RESTORATION, I am interested in your professional cleaning and restoration services in Bur Dubai. I would like to enquire about restoring my items.';
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(
  service?: ServiceItem | null,
  customMessage?: string,
  phoneNumber: string = DEFAULT_WHATSAPP_NUMBER
): void {
  trackWhatsAppClick(service?.name);
  const url = generateWhatsAppUrl(service, customMessage, phoneNumber);
  window.open(url, '_blank', 'noopener,noreferrer');
}
