import React from 'react';
import { Heart, Sparkles, ArrowUp, MapPin, Share2 } from 'lucide-react';
import { triggerOnamPetals } from '../utils/confetti';
import { getWhatsAppShareUrl } from '../utils/helpers';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-gradient-to-b from-amber-50 to-amber-100/80 border-t border-amber-200/80 pt-12 pb-8 text-center">
      <div className="max-w-4xl mx-auto px-4 space-y-6">
        
        {/* Festive Flower Garland */}
        <div className="flex items-center justify-center gap-3 text-2xl">
          <span>🌸</span>
          <span>🌼</span>
          <span>🌺</span>
          <span>🏵️</span>
          <span>🌺</span>
          <span>🌼</span>
          <span>🌸</span>
        </div>

        {/* Wishes Banner */}
        <div className="max-w-md mx-auto">
          <h3 className="text-xl sm:text-2xl font-extrabold text-amber-900 font-malayalam">
            ഏവർക്കും ഹൃദയം നിറഞ്ഞ ഓണാശംസകൾ!
          </h3>
          <p className="text-stone-600 text-xs sm:text-sm mt-1">
            കുരുന്നുകൾക്കായി ഒരുക്കുന്ന സന്തോഷവും ആഹ്ലാദവും നിറഞ്ഞ ഒരു ഓണദിനം
          </p>
        </div>

        {/* Quick Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-amber-800">
          <a href="#venue" className="hover:underline">വേദി</a>
          <span>•</span>
          <a href="#games" className="hover:underline">മത്സരങ്ങൾ</a>
          <span>•</span>
          <a href="#prizes" className="hover:underline">സമ്മാനങ്ങൾ</a>
          <span>•</span>
          <a href="#photos" className="hover:underline">ഫോട്ടോകൾ</a>
          <span>•</span>
          <button 
            onClick={() => triggerOnamPetals()} 
            className="hover:underline text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>പൂക്കൾ പൊഴിക്കൂ</span>
          </button>
        </div>

        {/* Main Footer Signature */}
        <div className="pt-4 border-t border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-600">
          <div className="flex items-center gap-1.5 font-medium font-malayalam text-stone-700">
            <span>സ്നേഹത്തോടെ, കൂട്ടുകാർ</span>
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500 inline" />
            <span>| ഓണം 2026</span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-900 font-medium hover:underline p-1"
          >
            <ArrowUp className="w-4 h-4" />
            <span>മുകളിലേക്ക് (Back to Top)</span>
          </button>
        </div>

      </div>
    </footer>
  );
};
