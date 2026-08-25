import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroHeader } from './components/HeroHeader';
import { VenueSection } from './components/VenueSection';
import { GamesSection } from './components/GamesSection';
import { PrizesSection } from './components/PrizesSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { Footer } from './components/Footer';
import { GameDetailModal } from './components/GameDetailModal';
import { HostingGuideModal } from './components/HostingGuideModal';
import { Game } from './types';
import { Sparkles, Globe, Share2 } from 'lucide-react';
import { triggerOnamPetals } from './utils/confetti';
import { getWhatsAppShareUrl } from './utils/helpers';

export default function App() {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isHostingModalOpen, setIsHostingModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-amber-50/50 text-stone-800 flex flex-col font-malayalam selection:bg-amber-200 selection:text-amber-900">
      
      {/* Top Sticky Navigation */}
      <Navbar onOpenHostingGuide={() => setIsHostingModalOpen(true)} />

      {/* Hero Header with Malayalam Title, Date & Time, and Fireworks/Flowers */}
      <HeroHeader />

      {/* Main Content Layout */}
      <main className="max-w-4xl mx-auto px-4 py-10 space-y-10 w-full grow">
        
        {/* 📍 Venue & Map Section */}
        <VenueSection />

        {/* 🎈 Games & Competitions Section */}
        <GamesSection onSelectGame={(game) => setSelectedGame(game)} />

        {/* 🎁 Prizes Section */}
        <PrizesSection />

        {/* 📸 Photo Gallery with Live Uploading */}
        <PhotoGallerySection />

      </main>

      {/* Festive Footer */}
      <Footer />

      {/* Game Details Modal */}
      <GameDetailModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
      />

      {/* Live Hosting & Sharing Guide Modal */}
      <HostingGuideModal
        isOpen={isHostingModalOpen}
        onClose={() => setIsHostingModalOpen(false)}
      />

      {/* Floating Action Button for Celebratory Flower Petals */}
      <div className="fixed bottom-5 right-5 z-30 flex flex-col items-end gap-2">
        <button
          onClick={() => triggerOnamPetals()}
          className="w-13 h-13 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center justify-center border-2 border-white/60 group cursor-pointer"
          title="പൂക്കൾ വിതറുക / Flower Shower"
          aria-label="Shower Flower Petals"
        >
          <span className="text-2xl group-hover:rotate-45 transition-transform">🌸</span>
        </button>
      </div>

    </div>
  );
}
