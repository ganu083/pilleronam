import React, { useState } from 'react';
import { Sparkles, MapPin, Trophy, Gift, Camera, Share2, Globe, Check, Copy } from 'lucide-react';
import { triggerOnamPetals } from '../utils/confetti';
import { getWhatsAppShareUrl } from '../utils/helpers';

interface NavbarProps {
  onOpenHostingGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHostingGuide }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const currentUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'പിള്ളേരുടെ ഓണം | Onam Celebration',
          text: 'കുട്ടികളുടെ കലാകായിക മത്സരങ്ങളും സമ്മാനങ്ങളും - കോട്ടയം!',
          url: currentUrl,
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }
    
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openWhatsApp = () => {
    window.open(getWhatsAppShareUrl(window.location.href), '_blank');
  };

  return (
    <nav className="sticky top-0 z-40 bg-amber-500/95 backdrop-blur-md text-white border-b border-amber-400 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo / Brand Title */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <span className="text-2xl animate-bounce">🌸</span>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white drop-shadow-sm font-malayalam">
                പിള്ളേരുടെ ഓണം
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-medium px-2 py-0.5 bg-amber-600/60 rounded-full border border-amber-300/30">
                കോട്ടയം 2026
              </span>
            </div>
          </a>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 font-medium text-sm">
            <a 
              href="#venue" 
              className="px-3 py-1.5 rounded-lg hover:bg-amber-600/80 transition-colors flex items-center gap-1.5"
            >
              <MapPin className="w-4 h-4 text-amber-200" />
              <span>വേദി (Venue)</span>
            </a>
            <a 
              href="#games" 
              className="px-3 py-1.5 rounded-lg hover:bg-amber-600/80 transition-colors flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-200" />
              <span>മത്സരങ്ങൾ (Games)</span>
            </a>
            <a 
              href="#prizes" 
              className="px-3 py-1.5 rounded-lg hover:bg-amber-600/80 transition-colors flex items-center gap-1.5"
            >
              <Gift className="w-4 h-4 text-amber-200" />
              <span>സമ്മാനങ്ങൾ (Prizes)</span>
            </a>
            <a 
              href="#photos" 
              className="px-3 py-1.5 rounded-lg hover:bg-amber-600/80 transition-colors flex items-center gap-1.5"
            >
              <Camera className="w-4 h-4 text-amber-200" />
              <span>ഫോട്ടോകൾ (Photos)</span>
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            
            {/* Flower Shower / Celebrate Trigger */}
            <button
              onClick={() => triggerOnamPetals()}
              className="bg-amber-600 hover:bg-amber-700 active:scale-95 text-yellow-100 border border-amber-300/40 px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              title="പൂക്കൾ വിതറുക / Shower Flower Petals"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span className="hidden sm:inline">പൂക്കൾ പൊഴിക്കൂ</span>
              <span className="sm:hidden">🌸</span>
            </button>

            {/* Hosting Details button */}
            <button
              onClick={onOpenHostingGuide}
              className="bg-stone-900/80 hover:bg-stone-900 text-white border border-amber-300/30 px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
              title="ഹോസ്റ്റിംഗ് വിവരങ്ങൾ (Live Link & Hosting Info)"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">ഹോസ്റ്റിംഗ് ലിങ്ക്</span>
            </button>

            {/* Quick Share Button */}
            <button
              onClick={handleShare}
              className="bg-white text-stone-800 hover:bg-yellow-50 active:scale-95 px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 shadow"
              title="ലിങ്ക് കോപ്പി ചെയ്യുക"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-amber-600" />
                  <span className="hidden xs:inline">Share</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </nav>
  );
};
