import React, { useState } from 'react';
import { Save, Check, Phone, MapPin, Globe, Sparkles, Building2, Facebook, Instagram } from 'lucide-react';
import { SiteSettings } from '../../types';
import { ImageUploader } from './ImageUploader';

interface AdminSettingsProps {
  settings: SiteSettings;
  onSaveSettings: (settings: SiteSettings) => Promise<void>;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings, onSaveSettings }) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage(false);

    try {
      await onSaveSettings(formData);
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 3000);
    } catch (err) {
      console.error('Failed to update settings:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white p-5 rounded-xl border border-[#DCE7F3] shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-[#071B38]">Website &amp; Business Settings</h3>
          <p className="text-xs text-[#75849A]">
            Configure official business metadata, contact channels, and homepage copy.
          </p>
        </div>

        {successMessage && (
          <div className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Saved to Firebase Firestore!</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Brand & Identity Card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#DCE7F3] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#DCE7F3] pb-3">
            <Building2 className="w-4 h-4 text-[#071B38]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#071B38]">
              Brand Identity &amp; Logo
            </h4>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-2">
              Official Logo
            </label>
            <ImageUploader
              currentImageUrl={formData.logoUrl}
              onImageSelected={(url) => setFormData({ ...formData, logoUrl: url })}
              folderPath="logo"
            />
            <p className="text-[11px] text-[#75849A] mt-1">
              Preserve original dark logo typography and tagline. It is rendered in a dedicated light container across dark headers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                Official Business Name *
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                Brand Tagline *
              </label>
              <input
                type="text"
                required
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Contact Details Card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#DCE7F3] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#DCE7F3] pb-3">
            <Phone className="w-4 h-4 text-[#25D366]" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#071B38]">
              WhatsApp Direct Consultation &amp; Location
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                WhatsApp Phone Number *
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="+971559416729"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                WhatsApp Short Link
              </label>
              <input
                type="text"
                value={formData.whatsappLink}
                onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
                placeholder="https://wa.me/971559416729"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
              Business Studio Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Bur Dubai, Dubai, UAE"
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none"
            />
          </div>

          {/* Social Profiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Facebook className="w-3.5 h-3.5 text-blue-600" />
                <span>Facebook Profile URL</span>
              </label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                placeholder="Leave blank or enter https://facebook.com/reviorarestoration"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Instagram className="w-3.5 h-3.5 text-rose-600" />
                <span>Instagram Profile URL</span>
              </label>
              <input
                type="url"
                value={formData.instagramUrl}
                onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
                placeholder="Leave blank or enter https://instagram.com/reviora"
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Homepage Hero Settings Card */}
        <div className="bg-white p-6 sm:p-8 rounded-xl border border-[#DCE7F3] shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#DCE7F3] pb-3">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#071B38]">
              Homepage Headline &amp; Presentation
            </h4>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
              Homepage Headline *
            </label>
            <input
              type="text"
              required
              value={formData.heroTitle}
              onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
              Homepage Supporting Text *
            </label>
            <textarea
              rows={3}
              required
              value={formData.heroDescription}
              onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
              className="w-full px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] focus:ring-2 focus:ring-[#071B38] focus:outline-none leading-relaxed"
            />
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="bg-[#071B38] hover:bg-[#102B50] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg transition-all"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving Changes to Firestore...' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
