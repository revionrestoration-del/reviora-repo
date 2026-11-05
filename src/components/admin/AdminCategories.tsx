import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { ServiceCategory } from '../../types';
import { ImageUploader } from './ImageUploader';

interface AdminCategoriesProps {
  categories: ServiceCategory[];
  onSaveCategory: (category: ServiceCategory) => Promise<void>;
  onDeleteCategory: (categoryId: string) => Promise<void>;
}

export const AdminCategories: React.FC<AdminCategoriesProps> = ({
  categories,
  onSaveCategory,
  onDeleteCategory,
}) => {
  const [editingCategory, setEditingCategory] = useState<ServiceCategory | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory || !editingCategory.name.trim()) return;

    setIsSaving(true);
    try {
      await onSaveCategory(editingCategory);
      setEditingCategory(null);
    } catch (err) {
      console.error('Failed to save category:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleToggleActive = async (category: ServiceCategory) => {
    await onSaveCategory({ ...category, isActive: !category.isActive });
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-[#DCE7F3] shadow-sm">
        <div>
          <h3 className="text-base font-bold text-[#071B38]">Category Disciplines</h3>
          <p className="text-xs text-[#75849A]">
            Manage service categories displayed on the website and catalog filters.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingCategory({
              id: `cat-${Date.now()}`,
              name: '',
              description: '',
              imageUrl: '/assets/aistudio/03_Designer_Shoes_150_185d1123.jpg',
              displayOrder: categories.length + 1,
              isActive: true,
            })
          }
          className="bg-[#071B38] hover:bg-[#102B50] text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Category</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-xl border border-[#DCE7F3] shadow-sm overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-[#071B38]">
              <img
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#071B38]/90 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                Order: #{category.displayOrder}
              </div>
              <div className="absolute top-3 right-3">
                <button
                  onClick={() => handleToggleActive(category)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    category.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {category.isActive ? 'Active' : 'Hidden'}
                </button>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h4 className="font-bold text-base text-[#071B38]">{category.name}</h4>
                <p className="text-xs text-[#75849A] mt-1 line-clamp-2 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#DCE7F3] flex items-center justify-end gap-2">
                <button
                  onClick={() => setEditingCategory(category)}
                  className="p-1.5 text-[#071B38] hover:bg-[#DCE7F3] rounded text-xs font-semibold flex items-center gap-1"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setDeleteConfirmId(category.id)}
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
              Delete this category? Services belonging to this category will still exist but should be reassigned.
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
                  await onDeleteCategory(deleteConfirmId);
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
      {editingCategory && (
        <div className="fixed inset-0 z-50 bg-black/70 overflow-y-auto flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl border border-[#DCE7F3]">
            <div className="flex items-center justify-between border-b border-[#DCE7F3] pb-3">
              <h3 className="text-lg font-bold text-[#071B38]">
                {categories.some((c) => c.id === editingCategory.id)
                  ? 'Edit Category'
                  : 'Add Category'}
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-[#75849A] hover:text-[#071B38]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-2">
                  Category Image
                </label>
                <ImageUploader
                  currentImageUrl={editingCategory.imageUrl}
                  onImageSelected={(url) =>
                    setEditingCategory({ ...editingCategory, imageUrl: url })
                  }
                  folderPath="categories"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, name: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({ ...editingCategory, description: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#071B38] uppercase tracking-wider mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingCategory.displayOrder}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        displayOrder: parseInt(e.target.value, 10) || 1,
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-[#DCE7F3] text-xs focus:ring-2 focus:ring-[#071B38] focus:outline-none"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingCategory.isActive}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          isActive: e.target.checked,
                        })
                      }
                      className="rounded text-[#071B38]"
                    />
                    <span>Active on site</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#DCE7F3]">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-[#172B45] bg-[#F4F7FB]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider text-white bg-[#071B38] hover:bg-[#102B50]"
                >
                  {isSaving ? 'Saving...' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
