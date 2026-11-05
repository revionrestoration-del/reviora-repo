import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, X, Image as ImageIcon } from 'lucide-react';
import { GalleryItem, ServiceCategory } from '../../types';
import { ImageUploader } from './ImageUploader';

interface AdminGalleryProps {
  galleryItems: GalleryItem[];
  categories: ServiceCategory[];
  onSaveGalleryItem: (item: GalleryItem) => Promise<void>;
  onDeleteGalleryItem: (itemId: string) => Promise<void>;
}

export const AdminGallery: React.FC<AdminGalleryProps> = ({
  galleryItems,
  categories,
  onSaveGalleryItem,
  onDeleteGalleryItem,
}) => {
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.title.trim()) return;

    setIsSaving(true);
    try {
      await onSaveGalleryItem(editingItem);
      setEditingItem(null);
    } catch (err) {
      console.error('Failed to save gallery item:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (item: GalleryItem) => {
    await onSaveGalleryItem({ ...item, isActive: !item.isActive });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-[#DCE7F3] shadow-sm">
        <div>
          <h3 className="text-base font-bold text-[#071B38]">Before &amp; After Restoration Showcase</h3>
          <p className="text-xs text-[#75849A]">
            Upload verified transformation results to display in the public Before &amp; After gallery.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingItem({
              id: `gallery-${Date.now()}`,
              title: '',
              category: 'shoes',
              beforeImageUrl: '/assets/aistudio/32_Bag_Restorations_ff360027.jpg',
              afterImageUrl: '/assets/aistudio/32_Bag_Restorations_ff360027.jpg',
              description: '',
              isActive: true,
              displayOrder: galleryItems.length + 1,
            })
          }
          className="bg-[#071B38] hover:bg-[#102B50] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Restoration Pair</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-[#DCE7F3] shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-[#071B38]">
              <img
                src={item.afterImageUrl || item.beforeImageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#071B38]/90 text-white text-[10px] font-mono px-2 py-0.5 rounded uppercase">
                {item.category}
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleToggleActive(item)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    item.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {item.isActive ? 'Active' : 'Hidden'}
                </button>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-bold text-base text-[#071B38]">{item.title}</h4>
                <p className="text-xs text-[#75849A] mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCE7F3] flex items-center justify-end gap-2">
                <button
                  onClick={() => setEditingItem(item)}
                  className="p-1.5 text-[#071B38] hover:bg-[#DCE7F3] rounded text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="p-1.5 text-red-600 hover:bg-red-50 rounded text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h4 className="text-base font-bold text-[#071B38]">Confirm Deletion</h4>
            <p className="text-xs text-[#75849A]">
              Delete this gallery pair from Firestore?
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
                  await onDeleteGalleryItem(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3 py-1.5 rounded text-xs font-semibold text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#DCE7F3]">
            <div className="flex items-center justify-between border-b border-[#DCE7F3] pb-3">
              <h3 className="text-lg font-bold text-[#071B38]">
                {galleryItems.some((g) => g.id === editingItem.id)
                  ? 'Edit Restoration Pair'
                  : 'Add Restoration Pair'}
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-[#75849A] hover:text-[#071B38]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-2">
                  Showcase Image (Comparison or After Result)
                </label>
                <ImageUploader
                  currentImageUrl={editingItem.afterImageUrl || editingItem.beforeImageUrl}
                  onImageSelected={(url) =>
                    setEditingItem({
                      ...editingItem,
                      beforeImageUrl: url,
                      afterImageUrl: url,
                    })
                  }
                  folderPath="gallery"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Luxury Handbag Leather Re-dyeing &amp; Edge Restoration"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                    Category *
                  </label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value })
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

                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingItem.displayOrder}
                    onChange={(e) =>
                      setEditingItem({
                        ...editingItem,
                        displayOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                  Description of Restoration Work
                </label>
                <textarea
                  rows={3}
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  placeholder="Describe the initial condition and the treatments applied..."
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="galleryActive"
                  checked={editingItem.isActive}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, isActive: e.target.checked })
                  }
                  className="rounded text-[#071B38]"
                />
                <label htmlFor="galleryActive" className="text-xs font-medium cursor-pointer">
                  Visible in public Before &amp; After gallery
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCE7F3]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#172B45] bg-[#F4F7FB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#071B38] hover:bg-[#102B50]"
                >
                  {isSaving ? 'Saving...' : 'Save Gallery Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
