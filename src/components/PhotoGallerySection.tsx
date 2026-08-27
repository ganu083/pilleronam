import React, { useState, useEffect, useRef } from 'react';
import { PhotoItem } from '../types';
import { 
  Upload, 
  Trash2, 
  X, 
  Download, 
  Plus, 
  Image as ImageIcon, 
  RefreshCw, 
  Sparkles,
  Camera
} from 'lucide-react';
import { triggerOnamPetals } from '../utils/confetti';
import { db } from '../lib/firebase';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc
} from 'firebase/firestore';
import { compressImage } from '../utils/imageCompressor';

export const PhotoGallerySection: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string>('');
  const [uploaderName, setUploaderName] = useState<string>(() => {
    return localStorage.getItem('onam_uploader_name') || '';
  });
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [pendingFiles, setPendingFiles] = useState<FileList | null>(null);
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'live' | 'error'>('syncing');
  const [syncError, setSyncError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time Firestore sync listener
  useEffect(() => {
    const photosCollection = collection(db, 'photos');
    const q = query(photosCollection, orderBy('createdAt', 'desc'));

    setSyncStatus('syncing');

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const userPhotos: PhotoItem[] = [];
        
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          
          // Clean up and discard any legacy sample/mock photos from Firestore
          const isSample = 
            (data.url && (data.url.includes('images.unsplash.com') || data.url.includes('photo-sample'))) ||
            data.uploader === 'ഓണം കമ്മിറ്റി' ||
            data.caption === 'കുട്ടികളുടെ ഓണപ്പൂക്കള നിർമ്മാണം 🌸' ||
            data.caption === 'കസേരകളി മത്സരത്തിലെ ആവേശം 🪑' ||
            data.caption === 'സമ്മാനങ്ങൾ സ്വീകരിക്കുന്ന കുട്ടിത്താരങ്ങൾ 🎁';

          if (isSample) {
            // Delete legacy sample doc asynchronously
            deleteDoc(doc(db, 'photos', docSnap.id)).catch(() => {});
            return;
          }

          userPhotos.push({
            id: docSnap.id,
            url: data.url,
            caption: data.caption || 'ഓണം ആഘോഷം',
            uploader: data.uploader || 'ആഘോഷ സംഘം',
            timestamp: data.timestamp || 'ഓണം 2026',
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (data.createdAt || Date.now()),
            gameTag: data.gameTag || 'ആഘോഷം'
          });
        });

        setPhotos(userPhotos);
        setSyncStatus('live');
        setSyncError(null);
      },
      (error) => {
        console.error('Firestore snapshot error:', error);
        setSyncStatus('error');
        setSyncError(error.message);
        setPhotos([]);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    if (!uploaderName.trim()) {
      setPendingFiles(files);
      setShowNamePrompt(true);
    } else {
      processAndUploadFiles(files, uploaderName);
    }
  };

  const confirmUploadWithName = (name: string) => {
    const finalName = name.trim() || 'ഓണം സുഹൃത്ത്';
    setUploaderName(finalName);
    localStorage.setItem('onam_uploader_name', finalName);
    setShowNamePrompt(false);
    
    if (pendingFiles) {
      processAndUploadFiles(pendingFiles, finalName);
      setPendingFiles(null);
    }
  };

  const processAndUploadFiles = async (files: FileList, author: string) => {
    setIsUploading(true);
    setUploadProgress(`0 / ${files.length} ഫോട്ടോകൾ അപ്‌ലോഡ് ചെയ്യുന്നു...`);

    const photosCollection = collection(db, 'photos');

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setUploadProgress(`${i + 1} / ${files.length} കംപ്രസ്സ് & അപ്‌ലോഡ് ചെയ്യുന്നു...`);

        // Compress to keep size optimal for instant cloud syncing
        const compressedDataUrl = await compressImage(file, 1200, 1200, 0.78);
        
        const dateStr = new Date().toLocaleDateString('ml-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });

        await addDoc(photosCollection, {
          url: compressedDataUrl,
          caption: file.name.replace(/\.[^/.]+$/, '').substring(0, 40) || 'ആഘോഷ ചിത്രം',
          uploader: author,
          timestamp: dateStr,
          createdAt: Date.now(),
          gameTag: 'ആഘോഷം'
        });
      }

      triggerOnamPetals();
    } catch (err: any) {
      console.error('Failed to upload photo to Firestore:', err);
      alert('ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുന്നതിൽ തടസ്സം ഉണ്ടായി: ' + (err?.message || 'Please try again'));
    } finally {
      setIsUploading(false);
      setUploadProgress('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeletePhoto = async (e: React.MouseEvent, photoId: string) => {
    e.stopPropagation();
    if (window.confirm('ഈ ഫോട്ടോ എല്ലാവരുടെയും ഗാലറിയിൽ നിന്നും നീക്കം ചെയ്യണോ? (Delete for everyone?)')) {
      try {
        await deleteDoc(doc(db, 'photos', photoId));
        if (selectedPhoto?.id === photoId) {
          setSelectedPhoto(null);
        }
      } catch (err: any) {
        console.error('Error deleting photo:', err);
        alert('ഡിലീറ്റ് ചെയ്യാൻ സാധിച്ചില്ല: ' + err.message);
      }
    }
  };

  return (
    <section id="photos" className="scroll-mt-20">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 transition hover:shadow-md">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-2xl">📸</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-malayalam tracking-tight">
                ആഘോഷ നിമിഷങ്ങൾ (Live Cloud Gallery)
              </h2>
              
              {/* Cloud Sync Status Badge */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>ക്ലൗഡ് സിങ്ക് ആക്റ്റീവ് (Live DB)</span>
              </div>
            </div>
            <p className="text-stone-500 text-xs sm:text-sm mt-1">
              നിങ്ങൾ അപ്‌ലോഡ് ചെയ്യുന്ന യഥാർത്ഥ ഫോട്ടോകൾ എല്ലാവർക്കും തത്സമയം ഇവിടെ കാണാം.
            </p>
          </div>

          {/* Upload Button Trigger */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
              id="photo-upload-input"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-2.5 px-4 rounded-xl shadow-xs transition active:scale-95 text-xs sm:text-sm cursor-pointer disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{uploadProgress || 'അപ്‌ലോഡ് ചെയ്യുന്നു...'}</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>ഫോട്ടോ ചേർക്കുക (Upload Photo)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {/* Quick Drop/Upload Card */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="aspect-square bg-amber-50/70 hover:bg-amber-100/60 rounded-2xl flex flex-col items-center justify-center text-amber-700 font-bold border-2 border-dashed border-amber-300 transition-all cursor-pointer group hover:scale-[1.01] p-4 text-center"
          >
            <div className="w-12 h-12 rounded-full bg-amber-200/60 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <Plus className="w-6 h-6 text-amber-800" />
            </div>
            <span className="text-sm font-malayalam">പുതിയ ഫോട്ടോ ചേർക്കൂ</span>
            <span className="text-[11px] text-stone-400 mt-0.5 font-normal">തത്സമയം എല്ലാവരും കാണും</span>
          </div>

          {/* Real User Photos Cards from Firestore */}
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-amber-200/80 relative group cursor-pointer shadow-2xs hover:shadow-md transition-all hover:scale-[1.01]"
            >
              <img
                src={photo.url}
                alt={photo.caption || 'Onam Photo'}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
                <div className="flex justify-between items-start gap-1">
                  <span className="text-[10px] bg-amber-500/90 text-stone-950 font-bold px-2 py-0.5 rounded-full">
                    {photo.gameTag || 'ഓണം 2026'}
                  </span>
                  <button
                    onClick={(e) => handleDeletePhoto(e, photo.id)}
                    className="p-1.5 bg-rose-600/80 hover:bg-rose-600 rounded-lg text-white transition active:scale-95"
                    title="എല്ലാവർക്കും വേണ്ടി ഡിലീറ്റ് ചെയ്യുക"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div>
                  <p className="text-xs font-semibold truncate drop-shadow-sm font-malayalam">
                    {photo.caption}
                  </p>
                  {photo.uploader && (
                    <p className="text-[10px] text-stone-300 flex items-center gap-1 mt-0.5">
                      <span>👤 {photo.uploader}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}

        </div>

        {/* Empty state when no user photos are uploaded yet */}
        {photos.length === 0 && (
          <div className="text-center py-10 px-4 bg-amber-50/50 rounded-2xl border border-dashed border-amber-200 mt-4">
            <div className="w-14 h-14 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
              <Camera className="w-7 h-7" />
            </div>
            <h4 className="text-stone-800 font-bold font-malayalam text-base sm:text-lg">
              ഫോട്ടോകൾ ഒന്നും ഇതുവരെ ചേർത്തിട്ടില്ല
            </h4>
            <p className="text-stone-500 text-xs sm:text-sm mt-1 max-w-md mx-auto">
              ആഘോഷ പരിപാടിയുടെ ഫോട്ടോകൾ ക്യാമറയിൽ നിന്നോ ഗാലറിയിൽ നിന്നോ നേരിട്ട് അപ്‌ലോഡ് ചെയ്യാം.
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2.5 px-5 rounded-xl transition shadow-xs cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>ആദ്യത്തെ ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യൂ</span>
            </button>
          </div>
        )}

      </div>

      {/* Name Prompt Modal for first time uploaders */}
      {showNamePrompt && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowNamePrompt(false)}
        >
          <div 
            className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✍️</span>
                <h3 className="text-lg font-bold text-stone-900 font-malayalam">
                  നിങ്ങളുടെ പേര് നൽകുക
                </h3>
              </div>
              <button 
                onClick={() => setShowNamePrompt(false)}
                className="p-1 rounded-full text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600 mt-3 leading-relaxed">
              ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുന്ന ആളുടെ പേര് ഗാലറിയിൽ എല്ലാവർക്കും കാണാൻ കഴിയും.
            </p>

            <div className="mt-4">
              <input
                type="text"
                placeholder="ഉദാഹരണത്തിന്: രാഹുൽ / അഞ്ജലി"
                defaultValue={uploaderName}
                id="uploader-name-input"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    confirmUploadWithName((e.target as HTMLInputElement).value);
                  }
                }}
                className="w-full px-4 py-2.5 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 focus:outline-hidden text-sm"
              />
            </div>

            <div className="mt-5 flex gap-2 justify-end">
              <button
                onClick={() => confirmUploadWithName('ഓണം സുഹൃത്ത്')}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition"
              >
                പേരില്ലാതെ തുടരുക
              </button>
              <button
                onClick={() => {
                  const input = document.getElementById('uploader-name-input') as HTMLInputElement;
                  confirmUploadWithName(input ? input.value : '');
                }}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition shadow-xs"
              >
                തുടങ്ങാം (Upload)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl"
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
                  <div className="flex items-center gap-2 text-xs text-stone-400">
                    {selectedPhoto.uploader && <span>👤 {selectedPhoto.uploader}</span>}
                    <span>•</span>
                    <span>{selectedPhoto.timestamp}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedPhoto.url}
                  download={`onam-photo-${selectedPhoto.id}.jpg`}
                  className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-amber-200 transition"
                  title="ഡൗൺലോഡ് ചെയ്യുക"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-stone-300 hover:text-white transition cursor-pointer"
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
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
