import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Clock, MapPin, Share2, Download, Check } from 'lucide-react';
import { triggerOnamPetals } from '../utils/confetti';
import { downloadCalendarEvent, getWhatsAppShareUrl } from '../utils/helpers';

export const HeroHeader: React.FC = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  // Trigger celebratory floral confetti on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      triggerOnamPetals();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <header className="relative overflow-hidden bg-gradient-to-b from-amber-500 via-amber-600 to-yellow-600 text-white pt-12 pb-16 px-4 shadow-lg">
      
      {/* Decorative Traditional Kerala Kasavu Gold & Floral Patterns */}
      <div className="absolute inset-0 opacity-15 pointer-events-none onam-pattern"></div>
      
      {/* Floating decorative flower emojis */}
      <div className="absolute top-4 left-6 text-2xl opacity-75 animate-pulse hidden sm:block">🌼</div>
      <div className="absolute top-10 right-10 text-3xl opacity-75 animate-bounce hidden sm:block">🌸</div>
      <div className="absolute bottom-6 left-12 text-2xl opacity-75 hidden sm:block">🌺</div>
      <div className="absolute bottom-8 right-16 text-3xl opacity-75 hidden sm:block">🏵️</div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Flower garland header motif */}
        <div className="inline-flex items-center gap-2 bg-amber-700/50 backdrop-blur-sm px-4 py-1.5 rounded-full border border-amber-300/40 text-yellow-200 text-sm md:text-base font-semibold mb-4 shadow-inner">
          <span className="text-xl">🌸 🌼 🌺</span>
          <span>ഓണാഘോഷം 2026</span>
          <span className="text-xl">🌺 🌼 🌸</span>
        </div>

        {/* Main Malayalam Display Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-md font-malayalam leading-tight mb-3">
          പിള്ളേരുടെ ഓണം
        </h1>

        {/* Subtitle */}
        <p className="text-xl sm:text-2xl md:text-3xl text-yellow-100 font-medium font-malayalam max-w-2xl mx-auto mb-6 drop-shadow-sm">
          കുട്ടികളുടെ കലാകായിക മത്സരങ്ങൾ
        </p>

        {/* Date & Time Highlight Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white text-stone-800 font-bold px-6 py-3 rounded-full shadow-lg border-2 border-amber-300 text-base sm:text-lg mb-8">
          <span className="flex items-center gap-2 text-amber-800">
            <Calendar className="w-5 h-5 text-amber-600" />
            <span>നാളെ (Tomorrow)</span>
          </span>
          <span className="text-amber-400 font-normal">|</span>
          <span className="flex items-center gap-2 text-amber-800">
            <Clock className="w-5 h-5 text-amber-600" />
            <span>ഉച്ചയ്ക്ക് 2:00 PM മുതൽ</span>
          </span>
        </div>

        {/* Quick Highlights Bar */}
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto mb-8 text-xs sm:text-sm font-semibold">
          <div className="bg-amber-700/60 backdrop-blur-sm rounded-xl p-3 border border-amber-300/30">
            <div className="text-2xl mb-0.5">🎈</div>
            <div className="text-yellow-200">9 മത്സരങ്ങൾ</div>
            <div className="text-[10px] text-yellow-100/80">Fun Games</div>
          </div>
          <div className="bg-amber-700/60 backdrop-blur-sm rounded-xl p-3 border border-amber-300/30">
            <div className="text-2xl mb-0.5">🎁</div>
            <div className="text-yellow-200">സമ്മാനങ്ങൾ</div>
            <div className="text-[10px] text-yellow-100/80">Exciting Prizes</div>
          </div>
          <div className="bg-amber-700/60 backdrop-blur-sm rounded-xl p-3 border border-amber-300/30">
            <div className="text-2xl mb-0.5">📍</div>
            <div className="text-yellow-200">കോട്ടയം</div>
            <div className="text-[10px] text-yellow-100/80">Venue Kottayam</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          
          <a
            href="https://maps.app.goo.gl/GCmHbKa8QT73hL9P9?g_st=ic"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <MapPin className="w-5 h-5 text-amber-400" />
            <span>വേദിയിലേക്ക് വഴി (Map)</span>
          </a>

          <button
            onClick={() => triggerOnamPetals()}
            className="inline-flex items-center gap-2 bg-amber-700/80 hover:bg-amber-800 text-yellow-100 font-bold py-3 px-5 rounded-xl border border-amber-300/50 shadow-md transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>പൂക്കൾ പൊഴിക്കൂ 🌸</span>
          </button>

          <button
            onClick={downloadCalendarEvent}
            className="inline-flex items-center gap-2 bg-amber-400/30 hover:bg-amber-400/40 text-white font-bold py-3 px-5 rounded-xl border border-white/30 backdrop-blur-sm shadow-md transition-all hover:scale-105 active:scale-95"
            title="കലണ്ടറിൽ ചേർക്കുക"
          >
            <Download className="w-5 h-5 text-yellow-200" />
            <span>Add to Calendar</span>
          </button>

          <button
            onClick={() => window.open(getWhatsAppShareUrl(window.location.href), '_blank')}
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-5 rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"
            title="വാട്സാപ്പിൽ പങ്കിടുക"
          >
            <Share2 className="w-5 h-5 text-white" />
            <span>WhatsApp Invite</span>
          </button>

        </div>

      </div>

      {/* Decorative Bottom Wave / Gold Trim */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 opacity-90"></div>
    </header>
  );
};
