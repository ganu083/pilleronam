import React, { useState, useEffect, useRef } from 'react';
import { Game, GameResult, PhotoItem } from '../types';
import { 
  X, 
  Trophy, 
  CheckCircle, 
  Sparkles, 
  Play, 
  Medal, 
  Camera, 
  Upload, 
  Edit3, 
  Save, 
  Trash2, 
  Download, 
  RefreshCw, 
  Award,
  Users,
  Image as ImageIcon,
  Check,
  Plus
} from 'lucide-react';
import { triggerOnamPetals } from '../utils/confetti';
import { db } from '../lib/firebase';
import { 
  doc, 
  onSnapshot, 
  setDoc, 
  collection, 
  query, 
  where, 
  orderBy, 
  addDoc, 
  deleteDoc 
} from 'firebase/firestore';
import { compressImage } from '../utils/imageCompressor';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, onClose }) => {
  const [activeTab, setActiveTab] = useState<'winners' | 'photos' | 'rules'>('winners');
  
  // Winner state from Firestore
  const [result, setResult] = useState<GameResult | null>(null);
  const [isEditingWinners, setIsEditingWinners] = useState(false);
  const [firstPrize, setFirstPrize] = useState('');
  const [secondPrize, setSecondPrize] = useState('');
  const [thirdPrize, setThirdPrize] = useState('');
  const [specialMention, setSpecialMention] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSavingWinners, setIsSavingWinners] = useState(false);

  // Prize Distribution Photos from Firestore
  const [prizePhotos, setPrizePhotos] = useState<PhotoItem[]>([]);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [selectedLightboxPhoto, setSelectedLightboxPhoto] = useState<PhotoItem | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Real-time Firestore sync for Game Winners
  useEffect(() => {
    if (!game) return;

    const resultDocRef = doc(db, 'game_results', game.id);
    const unsubscribeResult = onSnapshot(resultDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data() as GameResult;
        setResult(data);
        setFirstPrize(data.firstPrize || '');
        setSecondPrize(data.secondPrize || '');
        setThirdPrize(data.thirdPrize || '');
        setSpecialMention(data.specialMention || '');
      } else {
        setResult(null);
        setFirstPrize('');
        setSecondPrize('');
        setThirdPrize('');
        setSpecialMention('');
      }
    });

    // Real-time Firestore sync for this game's prize distribution photos
    const photosCollection = collection(db, 'photos');
    const qPhotos = query(photosCollection, orderBy('createdAt', 'desc'));

    const unsubscribePhotos = onSnapshot(qPhotos, (snapshot) => {
      const matchedPhotos: PhotoItem[] = [];
      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        // Match by gameId or gameTag
        if (data.gameId === game.id || data.gameTag === game.malayalamName) {
          matchedPhotos.push({
            id: docSnap.id,
            url: data.url,
            caption: data.caption || `${game.malayalamName} സമ്മാനദാനം`,
            uploader: data.uploader || 'ആഘോഷ സംഘം',
            timestamp: data.timestamp || 'ഓണം 2026',
            createdAt: data.createdAt?.toMillis ? data.createdAt.toMillis() : (data.createdAt || Date.now()),
            gameId: data.gameId || game.id,
            gameTag: data.gameTag || game.malayalamName,
            isPrizeDistribution: data.isPrizeDistribution ?? true
          });
        }
      });
      setPrizePhotos(matchedPhotos);
    });

    return () => {
      unsubscribeResult();
      unsubscribePhotos();
    };
  }, [game]);

  if (!game) return null;

  const handleSaveWinners = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!game) return;

    setIsSavingWinners(true);
    try {
      const uploader = localStorage.getItem('onam_uploader_name') || 'കമ്മിറ്റി';
      const resultDocRef = doc(db, 'game_results', game.id);
      
      await setDoc(resultDocRef, {
        gameId: game.id,
        firstPrize: firstPrize.trim(),
        secondPrize: secondPrize.trim(),
        thirdPrize: thirdPrize.trim(),
        specialMention: specialMention.trim(),
        updatedAt: Date.now(),
        updatedBy: uploader
      }, { merge: true });

      setSavedSuccess(true);
      setIsEditingWinners(false);
      triggerOnamPetals();
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err: any) {
      console.error('Error saving winners:', err);
      alert('വിജയികളുടെ വിവരങ്ങൾ സേവ് ചെയ്യാൻ കഴിഞ്ഞില്ല: ' + (err?.message || 'Error'));
    } finally {
      setIsSavingWinners(false);
    }
  };

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !game) return;

    setIsUploadingPhoto(true);
    const photosCollection = collection(db, 'photos');
    const uploader = localStorage.getItem('onam_uploader_name') || 'സമ്മാനദാന സമിതി';

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressedUrl = await compressImage(file, 1280, 1280, 0.8);
        const dateStr = new Date().toLocaleDateString('ml-IN', {
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit'
        });

        await addDoc(photosCollection, {
          url: compressedUrl,
          caption: `${game.malayalamName} - സമ്മാനദാനം 🎁`,
          uploader: uploader,
          timestamp: dateStr,
          createdAt: Date.now(),
          gameId: game.id,
          gameTag: game.malayalamName,
          isPrizeDistribution: true
        });
      }
      triggerOnamPetals();
    } catch (err: any) {
      console.error('Error uploading prize distribution photo:', err);
      alert('ഫോട്ടോ അപ്‌ലോഡ് ചെയ്യുന്നതിൽ തടസ്സം ഉണ്ടായി: ' + (err?.message || 'Error'));
    } finally {
      setIsUploadingPhoto(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeletePhoto = async (photoId: string) => {
    if (window.confirm('ഈ സമ്മാനദാന ഫോട്ടോ ഡിലീറ്റ് ചെയ്യണോ?')) {
      try {
        await deleteDoc(doc(db, 'photos', photoId));
        if (selectedLightboxPhoto?.id === photoId) {
          setSelectedLightboxPhoto(null);
        }
      } catch (err: any) {
        console.error('Error deleting photo:', err);
        alert('ഡിലീറ്റ് ചെയ്യാൻ സാധിച്ചില്ല: ' + err.message);
      }
    }
  };

  const hasWinners = result && (result.firstPrize || result.secondPrize || result.thirdPrize);

  return (
    <div 
      className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-yellow-600 p-5 sm:p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3.5 pr-8">
            <div className="w-14 h-14 rounded-2xl bg-white text-3xl flex items-center justify-center shadow-md shrink-0">
              {game.icon}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-900/50 px-2.5 py-0.5 rounded-full border border-amber-300/30 text-yellow-200">
                  {game.ageGroup}
                </span>
                {hasWinners && (
                  <span className="text-[11px] font-bold bg-yellow-400 text-amber-950 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-2xs">
                    <Trophy className="w-3 h-3" />
                    <span>വിജയികൾ പ്രഖ്യാപിച്ചു</span>
                  </span>
                )}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-malayalam mt-1 truncate">
                {game.malayalamName}
              </h3>
              <p className="text-xs text-yellow-100 font-medium truncate">
                {game.englishName}
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-amber-500/40 text-xs font-semibold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('winners')}
              className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'winners' 
                  ? 'bg-white text-amber-900 shadow-sm font-bold' 
                  : 'text-amber-100 hover:bg-amber-800/40 hover:text-white'
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>വിജയികൾ (Winners)</span>
              {hasWinners && <span className="w-2 h-2 rounded-full bg-emerald-400"></span>}
            </button>

            <button
              onClick={() => setActiveTab('photos')}
              className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'photos' 
                  ? 'bg-white text-amber-900 shadow-sm font-bold' 
                  : 'text-amber-100 hover:bg-amber-800/40 hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-amber-600" />
              <span>സമ്മാനദാന ചിത്രങ്ങൾ (Prize Photos)</span>
              <span className="bg-amber-800/60 px-1.5 py-0.2 rounded-full text-[10px] text-amber-200">
                {prizePhotos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('rules')}
              className={`px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'rules' 
                  ? 'bg-white text-amber-900 shadow-sm font-bold' 
                  : 'text-amber-100 hover:bg-amber-800/40 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-amber-600" />
              <span>വിവരണം & നിയമങ്ങൾ</span>
            </button>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: WINNERS (1st, 2nd, 3rd Prizes) */}
          {activeTab === 'winners' && (
            <div className="space-y-5">
              
              {/* Header inside tab */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-extrabold text-amber-900 font-malayalam flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-amber-600" />
                    <span>സമ്മാനാർഹർ (Prize Winners)</span>
                  </h4>
                  <p className="text-stone-500 text-xs mt-0.5">
                    മത്സരത്തിൽ വിജയികളായ കുട്ടിത്താരങ്ങളുടെ പേരുകൾ
                  </p>
                </div>

                {!isEditingWinners && (
                  <button
                    onClick={() => setIsEditingWinners(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-xl transition cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{hasWinners ? 'പേരുകൾ തിരുത്തുക' : 'പേരുകൾ ചേർക്കുക'}</span>
                  </button>
                )}
              </div>

              {/* Success Banner */}
              {savedSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>വിജയികളുടെ പേരുകൾ ലൈവായി സേവ് ചെയ്തു! 🌸</span>
                </div>
              )}

              {/* Editing Form */}
              {isEditingWinners ? (
                <form onSubmit={handleSaveWinners} className="bg-amber-50/60 p-4 sm:p-5 rounded-2xl border border-amber-200 space-y-4">
                  <div className="text-xs font-bold text-amber-900 border-b border-amber-200 pb-2 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>വിജയികളുടെ പേരുകൾ രേഖപ്പെടുത്തുക</span>
                  </div>

                  {/* 1st Prize Input */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                      <span className="text-base">🥇</span>
                      <span className="font-malayalam">ഒന്നാം സ്ഥാനം (1st Prize Winner):</span>
                    </label>
                    <input
                      type="text"
                      placeholder="വിജയിയുടെ പേര് (ഉദാ: അർജുൻ കൃഷ്ണ)"
                      value={firstPrize}
                      onChange={(e) => setFirstPrize(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 bg-white text-xs sm:text-sm"
                      autoFocus
                    />
                  </div>

                  {/* 2nd Prize Input */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                      <span className="text-base">🥈</span>
                      <span className="font-malayalam">രണ്ടാം സ്ഥാനം (2nd Prize Winner):</span>
                    </label>
                    <input
                      type="text"
                      placeholder="വിജയിയുടെ പേര് (ഉദാ: ദിയ മനോജ്)"
                      value={secondPrize}
                      onChange={(e) => setSecondPrize(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 bg-white text-xs sm:text-sm"
                    />
                  </div>

                  {/* 3rd Prize Input */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                      <span className="text-base">🥉</span>
                      <span className="font-malayalam">മൂന്നാം സ്ഥാനം (3rd Prize Winner):</span>
                    </label>
                    <input
                      type="text"
                      placeholder="വിജയിയുടെ പേര് (ഉദാ: സിദ്ധാർത്ഥ്)"
                      value={thirdPrize}
                      onChange={(e) => setThirdPrize(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 bg-white text-xs sm:text-sm"
                    />
                  </div>

                  {/* Special Mention / Consolation */}
                  <div>
                    <label className="block text-xs font-bold text-stone-700 mb-1 flex items-center gap-1.5">
                      <span className="text-base">🌟</span>
                      <span className="font-malayalam">പ്രോത്സാഹന സമ്മാനം (Special Mention / Consolation):</span>
                    </label>
                    <input
                      type="text"
                      placeholder="പ്രത്യേക പരാമർശം / പ്രോത്സാഹന സമ്മാനം നേടിയവർ"
                      value={specialMention}
                      onChange={(e) => setSpecialMention(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-amber-300 focus:ring-2 focus:ring-amber-500 bg-white text-xs sm:text-sm"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-200">
                    <button
                      type="button"
                      onClick={() => setIsEditingWinners(false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition cursor-pointer"
                    >
                      റദ്ദാക്കുക (Cancel)
                    </button>
                    <button
                      type="submit"
                      disabled={isSavingWinners}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition cursor-pointer disabled:opacity-50"
                    >
                      {isSavingWinners ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>സേവ് ചെയ്യുന്നു...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>വിജയികളെ രേഖപ്പെടുത്തുക (Save)</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                /* Display Podium View */
                <div className="space-y-3">
                  
                  {/* 1st Prize Card */}
                  <div className="bg-gradient-to-r from-amber-50 via-yellow-50/80 to-amber-100/50 p-4 rounded-2xl border-2 border-amber-300 shadow-2xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-amber-400 text-white flex items-center justify-center text-2xl shadow-sm shrink-0">
                        🥇
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                          ഒന്നാം സ്ഥാനം (1st Prize)
                        </span>
                        <h5 className="text-base sm:text-lg font-extrabold text-stone-900 font-malayalam mt-0.5">
                          {result?.firstPrize ? result.firstPrize : <span className="text-stone-400 font-normal text-xs italic">വിജയിയെ ചേർത്തിട്ടില്ല</span>}
                        </h5>
                      </div>
                    </div>
                    {result?.firstPrize && (
                      <span className="text-xs bg-amber-200 text-amber-900 font-bold px-2.5 py-1 rounded-full shrink-0">
                        വിജയി 👑
                      </span>
                    )}
                  </div>

                  {/* 2nd Prize Card */}
                  <div className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200 shadow-2xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-stone-300 text-stone-800 flex items-center justify-center text-xl shadow-xs shrink-0">
                        🥈
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600">
                          രണ്ടാം സ്ഥാനം (2nd Prize)
                        </span>
                        <h5 className="text-sm sm:text-base font-bold text-stone-900 font-malayalam mt-0.5">
                          {result?.secondPrize ? result.secondPrize : <span className="text-stone-400 font-normal text-xs italic">വിജയിയെ ചേർത്തിട്ടില്ല</span>}
                        </h5>
                      </div>
                    </div>
                  </div>

                  {/* 3rd Prize Card */}
                  <div className="bg-amber-50/40 p-3.5 rounded-2xl border border-amber-200/60 shadow-2xs flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-amber-700/80 text-amber-100 flex items-center justify-center text-xl shadow-xs shrink-0">
                        🥉
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                          മൂന്നാം സ്ഥാനം (3rd Prize)
                        </span>
                        <h5 className="text-sm sm:text-base font-bold text-stone-900 font-malayalam mt-0.5">
                          {result?.thirdPrize ? result.thirdPrize : <span className="text-stone-400 font-normal text-xs italic">വിജയിയെ ചേർത്തിട്ടില്ല</span>}
                        </h5>
                      </div>
                    </div>
                  </div>

                  {/* Special Mention if exists */}
                  {result?.specialMention && (
                    <div className="bg-yellow-50/60 p-3 rounded-2xl border border-yellow-200 text-xs flex items-start gap-2.5">
                      <span className="text-lg">🌟</span>
                      <div>
                        <span className="font-bold text-amber-900 font-malayalam">പ്രോത്സാഹന സമ്മാനം:</span>
                        <p className="text-stone-700 mt-0.5">{result.specialMention}</p>
                      </div>
                    </div>
                  )}

                  {/* Empty prompt */}
                  {!hasWinners && (
                    <div className="text-center py-6 bg-amber-50/30 rounded-2xl border border-dashed border-amber-200">
                      <Trophy className="w-8 h-8 text-amber-400 mx-auto mb-1.5" />
                      <p className="text-xs text-stone-600 font-medium">ഈ മത്സരത്തിലെ വിജയികളുടെ പേരുകൾ രേഖപ്പെടുത്തിയിട്ടില്ല.</p>
                      <button
                        onClick={() => setIsEditingWinners(true)}
                        className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-1.5 rounded-xl transition cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>വിജയികളുടെ പേര് നൽകുക</span>
                      </button>
                    </div>
                  )}

                </div>
              )}

            </div>
          )}

          {/* TAB 2: PRIZE DISTRIBUTION PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-4">
              
              {/* Header & Upload Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
                <div>
                  <h4 className="text-base font-extrabold text-amber-900 font-malayalam flex items-center gap-2">
                    <Camera className="w-5 h-5 text-amber-600" />
                    <span>സമ്മാനദാന ചിത്രങ്ങൾ (Prize Photos)</span>
                  </h4>
                  <p className="text-stone-500 text-xs mt-0.5">
                    {game.malayalamName} സമ്മാനവിതരണ ഫോട്ടോകൾ
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handlePhotoSelect}
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="game-prize-photo-input"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploadingPhoto}
                    className="inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs transition active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    {isUploadingPhoto ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>അപ്‌ലോഡ് ചെയ്യുന്നു...</span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-3.5 h-3.5" />
                        <span>സമ്മാനദാന ഫോട്ടോ ചേർക്കുക</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Photos Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                
                {/* Upload Card */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square bg-amber-50/70 hover:bg-amber-100/70 rounded-2xl flex flex-col items-center justify-center text-amber-800 font-bold border-2 border-dashed border-amber-300 transition cursor-pointer p-3 text-center group"
                >
                  <div className="w-10 h-10 rounded-full bg-amber-200/70 flex items-center justify-center mb-1.5 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-amber-800" />
                  </div>
                  <span className="text-xs font-malayalam">ഫോട്ടോ ചേർക്കൂ</span>
                  <span className="text-[10px] text-stone-400 font-normal">സമ്മാനദാനം</span>
                </div>

                {/* Photo List */}
                {prizePhotos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedLightboxPhoto(photo)}
                    className="aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-amber-200 relative group cursor-pointer shadow-2xs hover:shadow-md transition-all hover:scale-[1.01]"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2 text-white">
                      <div className="flex justify-end">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePhoto(photo.id);
                          }}
                          className="p-1 bg-rose-600/80 hover:bg-rose-600 rounded-md text-white transition"
                          title="ഡിലീറ്റ് ചെയ്യുക"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-[11px] font-semibold truncate font-malayalam">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}

              </div>

              {/* Empty state for photos */}
              {prizePhotos.length === 0 && (
                <div className="text-center py-8 bg-amber-50/30 rounded-2xl border border-dashed border-amber-200">
                  <ImageIcon className="w-10 h-10 text-amber-400 mx-auto mb-1.5" />
                  <p className="text-xs text-stone-700 font-bold font-malayalam">
                    സമ്മാനവിതരണ ചിത്രങ്ങൾ ഇതുവരെ ചേർത്തിട്ടില്ല
                  </p>
                  <p className="text-[11px] text-stone-500 mt-0.5">
                    കുട്ടികൾ സമ്മാനം വാങ്ങുന്ന സന്തോഷ നിമിഷങ്ങൾ ഇവിടെ പങ്കിടാം.
                  </p>
                </div>
              )}

            </div>
          )}

          {/* TAB 3: RULES & DETAILS */}
          {activeTab === 'rules' && (
            <div className="space-y-4">
              
              {/* Overview */}
              <div>
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5" />
                  <span>വിവരണം (Description)</span>
                </h4>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-malayalam bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
                  {game.description}
                </p>
              </div>

              {/* Rules */}
              <div>
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>മത്സര നിയമങ്ങൾ (Rules & Guidelines)</span>
                </h4>
                <ul className="space-y-2">
                  {game.rules.map((rule, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 font-malayalam"
                    >
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cheerful Tip */}
              <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200 text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>കുട്ടികളുടെ സന്തോഷത്തിനും ഒത്തൊരുമയ്ക്കുമാണ് മുൻഗണന!</span>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-amber-100 flex items-center justify-between shrink-0">
          <button
            onClick={() => triggerOnamPetals()}
            className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold hover:underline cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>വിജയാശംസകൾ നേരുന്നു 🌸</span>
          </button>
          
          <button
            onClick={onClose}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 px-5 rounded-xl transition shadow-xs cursor-pointer"
          >
            മനസ്സിലായി (Close)
          </button>
        </div>

      </div>

      {/* Lightbox for Prize Photos */}
      {selectedLightboxPhoto && (
        <div 
          className="fixed inset-0 z-60 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedLightboxPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 bg-stone-950 text-white border-b border-stone-800">
              <div>
                <h4 className="font-bold text-sm font-malayalam text-amber-300">
                  {selectedLightboxPhoto.caption}
                </h4>
                <p className="text-xs text-stone-400 mt-0.5">
                  {selectedLightboxPhoto.uploader} • {selectedLightboxPhoto.timestamp}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={selectedLightboxPhoto.url}
                  download={`prize-${selectedLightboxPhoto.id}.jpg`}
                  className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-amber-200 transition"
                  title="ഡൗൺലോഡ് ചെയ്യുക"
                >
                  <Download className="w-4 h-4" />
                </a>
                <button
                  onClick={() => setSelectedLightboxPhoto(null)}
                  className="p-2 bg-stone-800 hover:bg-stone-700 rounded-xl text-stone-300 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="max-h-[75vh] flex items-center justify-center bg-black p-2">
              <img
                src={selectedLightboxPhoto.url}
                alt={selectedLightboxPhoto.caption}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
