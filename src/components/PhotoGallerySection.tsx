import React, { useState, useEffect, useRef } from 'react';
import { PhotoItem } from '../types';
import { INITIAL_PHOTOS } from '../data/onamData';
import { Camera, Upload, Trash2, Maximize2, X, Download, Plus, Image as ImageIcon } from 'lucide-react';
import { triggerOnamPetals } from '../utils/confetti';

const STORAGE_KEY = 'onam_celebration_photos_2026';

export const PhotoGallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PHOTOS;
  });

  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch (e) {
      console.warn('Storage limit reached, keeping in memory', e);
    }
  }, [photos]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newItems: PhotoItem[] = [];

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const item: PhotoItem = {
            id: 'upload-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            url: event.target.result as string,
            caption: file.name.replace(/\.[^/.]+$/, ''),
            timestamp: new Date().toLocaleDateString('ml-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }),
            gameTag: 'ആഘോഷം'
          };
          newItems.push(item);

          if (newItems.length === files.length) {
            setPhotos((prev) => [...newItems, ...prev]);
            setIsUploading(false);
            triggerOnamPetals();
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeletePhoto = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('ഈ ഫോട്ടോ നീക്കം ചെയ്യണോ? (Delete this photo?)')) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      if (selectedPhoto?.id === id) {
        setSelectedPhoto(null);
      }
    }
  };

  return (
    <section id="photos" className="scroll-mt-20">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 transition hover:shadow-md">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📸</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-malayalam tracking-tight">
                ആഘോഷ നിമിഷങ്ങൾ (Photos)
              </h2>
            </div>
            <p className="text-stone-500 text-sm mt-1">
              പരിപാടിക്ക് ശേഷമുള്ള ചിത്രങ്ങൾ ഇവിടെ അപ്‌ലോഡ് ചെയ്യാം & കാണാം
            </p>
          </div>

          {/* Upload Button Trigger */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              multiple
              className="hidden"
              id="photo-upload-input"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-xl shadow-xs transition active:scale-95 text-xs sm:text-sm cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>{isUploading ? 'അപ്‌ലോഡ് ചെയ്യുന്നു...' : 'ഫോട്ടോ ചേർക്കുക (Upload)'}</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          
          {/* Quick Drop/Upload Card */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square bg-amber-50/70 hover:bg-amber-100/60 rounded-2xl flex flex-col items-center justify-center text-amber-700 font-bold border-2 border-dashed border-amber-300 transition-all cursor-pointer group hover:scale-[1.01] p-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-amber-200/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-amber-800" />
            </div>
            <span className="text-sm font-malayalam">പുതിയ ഫോട്ടോ ചേർക്കൂ</span>
            <span className="text-[11px] text-stone-400 mt-0.5 font-normal">Click or drop here</span>
          </div>

          {/* Photos Cards */}
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="aspect-square bg-amber-100 rounded-2xl overflow-hidden border border-amber-200/80 relative group cursor-pointer shadow-2xs hover:shadow-md transition-all hover:scale-[1.01]"
            >
              <img
                src={photo.url}
                alt={photo.caption || 'Onam Photo'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <div className="flex justify-end gap-1">
                  <button
                    onClick={(e) => handleDeletePhoto(e, photo.id)}
                    className="p-1.5 bg-rose-600/80 hover:bg-rose-600 rounded-lg text-white transition active:scale-95"
                    title="ഡിലീറ്റ് ചെയ്യുക"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <span className="text-[10px] bg-amber-500/80 px-2 py-0.5 rounded-full font-medium mb-1 inline-block">
                    {photo.gameTag || 'ഓണം 2026'}
                  </span>
                  <p className="text-xs font-semibold truncate drop-shadow-sm font-malayalam">
                    {photo.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Empty state fallback if all deleted */}
        {photos.length === 0 && (
          <div className="text-center py-10 bg-amber-50/40 rounded-2xl border border-dashed border-amber-200 mt-4">
            <ImageIcon className="w-10 h-10 text-amber-400 mx-auto mb-2" />
            <p className="text-stone-600 font-medium font-malayalam">ഫോട്ടോകൾ ഒന്നും ചേർത്തിട്ടില്ല</p>
            <p className="text-stone-400 text-xs mt-1">മുകളിലെ ബട്ടൺ വഴി ഫോട്ടോകൾ ചേർക്കാം</p>
          </div>
        )}

      </div>

      {/* Lightbox Fullscreen Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-stone-900 rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header controls */}
            <div className="flex items-center justify-between p-4 bg-stone-950/80 text-white border-b border-stone-800">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌸</span>
                <div>
                  <h3 className="font-bold text-sm font-malayalam text-amber-300">
                    {selectedPhoto.caption}
                  </h3>
                  <span className="text-xs text-stone-400">{selectedPhoto.timestamp}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedPhoto.url}
                  download={`onam-photo-${selectedPhoto.id}.jpg`}
                  className="p-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-amber-200 transition"
                  title="ഡൗൺലോഡ് ചെയ്യുക"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 bg-stone-800 hover:bg-stone-700 rounded-lg text-stone-300 hover:text-white transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image */}
            <div className="max-h-[75vh] flex items-center justify-center bg-black p-2">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
