import React, { useState } from 'react';
import { Upload, Image as ImageIcon, Check, AlertCircle, Loader2 } from 'lucide-react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../lib/firebase';

interface ImageUploaderProps {
  currentImageUrl: string;
  onImageSelected: (url: string, path?: string) => void;
  folderPath?: string;
}

// Preset assets that are already available in the applet
const PRESET_ASSETS = [
  { name: 'Sports Shoes (95)', path: '/assets/aistudio/01_Sports_Shoes_95_779a4c22.jpg' },
  { name: 'Sneakers Shoes (120)', path: '/assets/aistudio/02_Sneakers_Shoes_120_baa01641.jpg' },
  { name: 'Designer Shoes (150)', path: '/assets/aistudio/03_Designer_Shoes_150_185d1123.jpg' },
  { name: 'Formal Leather (95)', path: '/assets/aistudio/04_Formal_Leather_Shoes_95_a250cff2.jpg' },
  { name: 'Designer Formal (150)', path: '/assets/aistudio/05_Designer_Formal_Leather_Shoes_150_3f0c6a26.jpg' },
  { name: 'Casual Suede/Nubuk (120)', path: '/assets/aistudio/06_Casual_Suede_Nubuk_Shoes_120_94f8f364.jpg' },
  { name: 'Designer Suede/Nubuk (150)', path: '/assets/aistudio/07_Designer_Suede_Nubuk_Shoes_150_f45338c5.jpg' },
  { name: 'Cowboy Boots', path: '/assets/aistudio/08_Cowboy_Boots_ad6194e2.jpg' },
  { name: 'Boots', path: '/assets/aistudio/09_Boots_2783e126.jpg' },
  { name: 'Kids Sports Shoes (60)', path: '/assets/aistudio/10_Kids_Sports_Shoes_60_85b51c59.jpg' },
  { name: 'Pouch Bag Cleaning', path: '/assets/aistudio/31_Pouch_Bag_Cleaning_4c17c2b2.jpg' },
  { name: 'Handbag Cleaning', path: '/assets/aistudio/30_Handbag_Cleaning_84bcfcf5.jpg' },
  { name: 'Shoulder Bag Cleaning', path: '/assets/aistudio/29_Shoulder_Bag_Cleaning_7b023b2e.jpg' },
  { name: 'Bag Restoration', path: '/assets/aistudio/32_Bag_Restorations_ff360027.jpg' },
  { name: 'Leather Jacket Cleaning', path: '/assets/aistudio/34_Leather_Jacket_Dry_Cleaning_e17a3bb0.jpg' },
  { name: 'Suede/Nubuk Jacket', path: '/assets/aistudio/35_Suede_Nubuk_Jacket_Dry_Cleaning_d4911598.jpg' },
  { name: 'Belt Cleaning (50)', path: '/assets/aistudio/33_Belt_Cleaning_50_b1de0e61.jpg' },
  { name: 'Cowboy Hat (120)', path: '/assets/aistudio/36_Cowboy_Hat_120_2ba7a8cb.jpg' },
  { name: 'Casual Cap (50)', path: '/assets/aistudio/37_Casual_Cap_50_c5a54109.jpg' },
  { name: 'Designer Cap (120)', path: '/assets/aistudio/38_Designer_Cap_120_69028b8b.jpg' },
  { name: 'Reviora Official Logo', path: '/assets/aistudio/Reviora_Logo__Dark__82b47f73.png' },
];

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageUrl,
  onImageSelected,
  folderPath = 'catalog',
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (max 8MB) and type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP).');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('Image must be under 8MB.');
      return;
    }

    setError(null);
    setIsUploading(true);
    setProgress(10);

    try {
      const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const storagePath = `${folderPath}/${fileName}`;
      const storageRef = ref(storage, storagePath);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(pct);
        },
        (uploadError) => {
          console.warn('Firebase Storage upload error, falling back to local object URL:', uploadError);
          // Safe fallback to client reader if Storage rules or bucket require specific CORS
          const reader = new FileReader();
          reader.onload = (readEvent) => {
            const resultUrl = readEvent.target?.result as string;
            onImageSelected(resultUrl, storagePath);
            setIsUploading(false);
          };
          reader.readAsDataURL(file);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          onImageSelected(downloadUrl, storagePath);
          setIsUploading(false);
        }
      );
    } catch (err) {
      console.warn('Storage initialisation error, falling back to local base64:', err);
      const reader = new FileReader();
      reader.onload = (readEvent) => {
        const resultUrl = readEvent.target?.result as string;
        onImageSelected(resultUrl);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-4">
        {/* Preview Container */}
        <div className="w-20 h-20 rounded-lg overflow-hidden bg-[#071B38] border border-[#DCE7F3] shrink-0 relative flex items-center justify-center">
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-[#75849A]" />
          )}
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <label className="cursor-pointer bg-[#071B38] hover:bg-[#102B50] text-white px-3.5 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? `Uploading (${progress}%)` : 'Upload New File'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => setShowPresets(!showPresets)}
              className="bg-[#F4F7FB] hover:bg-[#DCE7F3] text-[#071B38] px-3.5 py-1.5 rounded-md text-xs font-semibold border border-[#DCE7F3] transition-colors"
            >
              {showPresets ? 'Hide Asset Library' : 'Choose From Asset Library'}
            </button>
          </div>

          <p className="text-[11px] text-[#75849A]">
            Supported formats: JPG, PNG, WebP up to 8MB.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      {isUploading && (
        <div className="space-y-1">
          <div className="w-full bg-[#F4F7FB] rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#25D366] h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex items-center gap-1 text-[11px] text-[#75849A]">
            <Loader2 className="w-3 h-3 animate-spin text-[#071B38]" />
            <span>Uploading to Firebase Storage...</span>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-2 bg-red-50 text-red-700 text-xs rounded border border-red-200 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Preset Asset Picker */}
      {showPresets && (
        <div className="mt-3 p-3 bg-[#F4F7FB] border border-[#DCE7F3] rounded-lg space-y-2">
          <span className="text-[11px] font-bold text-[#071B38] uppercase tracking-wider block">
            Select high-res studio asset:
          </span>
          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 max-h-48 overflow-y-auto p-1">
            {PRESET_ASSETS.map((asset, idx) => {
              const isSelected = currentImageUrl === asset.path;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    onImageSelected(asset.path);
                    setShowPresets(false);
                  }}
                  className={`group relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                    isSelected ? 'border-[#25D366] ring-2 ring-[#25D366]/40' : 'border-transparent hover:border-[#071B38]'
                  }`}
                  title={asset.name}
                >
                  <img
                    src={asset.path}
                    alt={asset.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-1 right-1 bg-[#25D366] text-white p-0.5 rounded-full shadow">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-black/70 text-white text-[8px] p-0.5 truncate text-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {asset.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
