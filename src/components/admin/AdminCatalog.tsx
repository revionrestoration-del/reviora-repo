import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Check,
  X,
  Sparkles,
  ArrowUpDown,
  PlusCircle,
  MinusCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import { ServiceItem, ServiceCategory, PriceType } from '../../types';
import { formatPriceDisplay } from '../../lib/whatsapp';
import { ImageUploader } from './ImageUploader';

interface AdminCatalogProps {
  services: ServiceItem[];
  categories: ServiceCategory[];
  onSaveService: (service: ServiceItem) => Promise<void>;
  onDeleteService: (serviceId: string) => Promise<void>;
  isEditingNew: boolean;
  onCloseNewModal: () => void;
}

export const AdminCatalog: React.FC<AdminCatalogProps> = ({
  services,
  categories,
  onSaveService,
  onDeleteService,
  isEditingNew,
  onCloseNewModal,
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // If parent triggered new service modal
  React.useEffect(() => {
    if (isEditingNew && !editingService) {
      setEditingService({
        id: `service-${Date.now()}`,
        name: '',
        category: 'shoes',
        price: 100,
        priceType: 'fixed',
        description: '',
        features: ['Deep Cleaning – Thorough grime and dirt lifting.'],
        notes: 'Note: Color Restoration & Repair is not included.',
        imageUrl: '/assets/aistudio/01_Sports_Shoes_95_779a4c22.jpg',
        isActive: true,
        isFeatured: false,
        displayOrder: services.length + 1,
      });
    }
  }, [isEditingNew, services.length, editingService]);

  const handleStartEdit = (service: ServiceItem) => {
    setEditingService({ ...service, features: [...(service.features || [])] });
  };

  const handleFeatureChange = (index: number, val: string) => {
    if (!editingService) return;
    const newFeatures = [...editingService.features];
    newFeatures[index] = val;
    setEditingService({ ...editingService, features: newFeatures });
  };

  const handleAddFeature = () => {
    if (!editingService) return;
    setEditingService({
      ...editingService,
      features: [...editingService.features, ''],
    });
  };

  const handleRemoveFeature = (index: number) => {
    if (!editingService) return;
    const newFeatures = editingService.features.filter((_, i) => i !== index);
    setEditingService({ ...editingService, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.name.trim()) return;

    setIsSaving(true);
    try {
      await onSaveService(editingService);
      setEditingService(null);
      onCloseNewModal();
    } catch (err) {
      console.error('Failed to save service:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (service: ServiceItem) => {
    await onSaveService({ ...service, isActive: !service.isActive });
  };

  const handleToggleFeatured = async (service: ServiceItem) => {
    await onSaveService({ ...service, isFeatured: !service.isFeatured });
  };

  const filtered = services.filter((s) => {
    if (categoryFilter !== 'all' && s.category !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 text-left">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-[#DCE7F3] shadow-sm">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#75849A]" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#DCE7F3] bg-[#F4F7FB] focus:outline-none focus:ring-2 focus:ring-[#071B38]"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-[#DCE7F3] bg-[#F4F7FB] focus:outline-none focus:ring-2 focus:ring-[#071B38]"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() =>
            setEditingService({
              id: `service-${Date.now()}`,
              name: '',
              category: 'shoes',
              price: 100,
              priceType: 'fixed',
              description: '',
              features: ['Deep Cleaning – Thorough grime and dirt lifting.'],
              notes: 'Note: Color Restoration & Repair is not included.',
              imageUrl: '/assets/aistudio/01_Sports_Shoes_95_779a4c22.jpg',
              isActive: true,
              isFeatured: false,
              displayOrder: services.length + 1,
            })
          }
          className="bg-[#071B38] hover:bg-[#102B50] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-xl border border-[#DCE7F3] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071B38] text-white font-semibold uppercase tracking-wider">
              <tr>
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (AED)</th>
                <th className="py-3 px-4 text-center">Featured</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE7F3]">
              {filtered.map((service) => (
                <tr key={service.id} className="hover:bg-[#F4F7FB]/70 transition-colors">
                  {/* Item Image + Title */}
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={service.imageUrl}
                        alt={service.name}
                        className="w-10 h-10 rounded-md object-cover bg-[#071B38] shrink-0 border border-[#DCE7F3]"
                      />
                      <div>
                        <div className="font-bold text-[#071B38]">{service.name}</div>
                        <div className="text-[11px] text-[#75849A] line-clamp-1 max-w-xs">
                          {service.description}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3 px-4 capitalize font-medium text-[#172B45]">
                    {service.category}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-4 font-mono font-bold text-[#071B38]">
                    {formatPriceDisplay(service.price, service.priceType)}
                  </td>

                  {/* Featured */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(service)}
                      className={`p-1 rounded transition-colors ${
                        service.isFeatured
                          ? 'text-amber-500 bg-amber-50 hover:bg-amber-100'
                          : 'text-[#75849A] hover:bg-gray-100'
                      }`}
                      title={service.isFeatured ? 'Featured on website' : 'Not featured'}
                    >
                      <Sparkles className="w-4 h-4 fill-current" />
                    </button>
                  </td>

                  {/* Status Toggle */}
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleToggleActive(service)}
                      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider inline-flex items-center gap-1 ${
                        service.isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {service.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{service.isActive ? 'Active' : 'Hidden'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleStartEdit(service)}
                        className="p-1.5 text-[#071B38] hover:bg-[#DCE7F3] rounded transition-colors"
                        title="Edit service"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteConfirmId(service.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h4 className="text-base font-bold text-[#071B38]">Confirm Deletion</h4>
            <p className="text-xs text-[#75849A]">
              Are you sure you want to permanently remove this service from the catalog? This action will remove it from Firebase Firestore.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 rounded text-xs font-semibold text-[#172B45] bg-[#F4F7FB]"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await onDeleteService(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-red-600 hover:bg-red-700"
              >
                Delete Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-[#DCE7F3]">
            <div className="flex items-center justify-between border-b border-[#DCE7F3] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#071B38]">
                  {services.some((s) => s.id === editingService.id)
                    ? 'Edit Service'
                    : 'Create New Service'}
                </h3>
                <p className="text-xs text-[#75849A]">
                  Configure item pricing in AED, category assignment, and included features.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingService(null);
                  onCloseNewModal();
                }}
                className="text-[#75849A] hover:text-[#071B38]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Uploader Component */}
              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-2">
                  Service Image
                </label>
                <ImageUploader
                  currentImageUrl={editingService.imageUrl}
                  onImageSelected={(url, path) =>
                    setEditingService({
                      ...editingService,
                      imageUrl: url,
                      imagePath: path || editingService.imagePath,
                    })
                  }
                  folderPath={`catalog/${editingService.category}`}
                />
              </div>

              {/* Service Name & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingService.name}
                    onChange={(e) =>
                      setEditingService({ ...editingService, name: e.target.value })
                    }
                    placeholder="e.g. Sports Shoes"
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={editingService.category}
                    onChange={(e) =>
                      setEditingService({ ...editingService, category: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Price & Price Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                    Price (AED) *
                  </label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={editingService.price}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                    Price Type *
                  </label>
                  <select
                    value={editingService.priceType}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        priceType: e.target.value as PriceType,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                  >
                    <option value="fixed">Fixed Price (e.g., AED 95)</option>
                    <option value="starting">Starting From (e.g., Starting from AED 120)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingService.displayOrder}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        displayOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingService.description}
                  onChange={(e) =>
                    setEditingService({ ...editingService, description: e.target.value })
                  }
                  placeholder="Summary of service benefits..."
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                />
              </div>

              {/* Included Features Bullet Points */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-[#071B38] uppercase tracking-wider">
                    Included Services (Bullet Points)
                  </label>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="text-xs text-[#071B38] hover:text-[#102B50] font-bold flex items-center gap-1"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {editingService.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={feat}
                        onChange={(e) => handleFeatureChange(idx, e.target.value)}
                        placeholder="e.g. Deep Cleaning – Removes dirt thoroughly."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Remove"
                      >
                        <MinusCircle className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                  Notes / Exclusions
                </label>
                <input
                  type="text"
                  value={editingService.notes || ''}
                  onChange={(e) =>
                    setEditingService({ ...editingService, notes: e.target.value })
                  }
                  placeholder="e.g. Note: Color Restoration & Repair is not included."
                  className="w-full px-3 py-1.5 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                />
              </div>

              {/* Visibility and Featured Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.isActive}
                    onChange={(e) =>
                      setEditingService({ ...editingService, isActive: e.target.checked })
                    }
                    className="rounded text-[#071B38] focus:ring-[#071B38]"
                  />
                  <span>Active (Visible on public website)</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingService.isFeatured}
                    onChange={(e) =>
                      setEditingService({ ...editingService, isFeatured: e.target.checked })
                    }
                    className="rounded text-[#071B38] focus:ring-[#071B38]"
                  />
                  <span>Featured (Popular Badge)</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCE7F3]">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    onCloseNewModal();
                  }}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#172B45] bg-[#F4F7FB] hover:bg-[#DCE7F3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#071B38] hover:bg-[#102B50] shadow"
                >
                  {isSaving ? 'Saving to Firestore...' : 'Save Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
