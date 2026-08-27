import React, { useState, useEffect } from 'react';
import { Game, GameResult } from '../types';
import { GAMES_LIST } from '../data/onamData';
import { Sparkles, Trophy, ChevronRight, CheckCircle2, Award, Camera } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

interface GamesSectionProps {
  onSelectGame: (game: Game) => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onSelectGame }) => {
  const [completedGames, setCompletedGames] = useState<Record<string, boolean>>({});
  const [gameResults, setGameResults] = useState<Record<string, GameResult>>({});
  const [prizePhotoCounts, setPrizePhotoCounts] = useState<Record<string, number>>({});

  // Real-time listener for all game results
  useEffect(() => {
    const resultsCollection = collection(db, 'game_results');
    const unsubscribeResults = onSnapshot(resultsCollection, (snapshot) => {
      const resultsMap: Record<string, GameResult> = {};
      snapshot.docs.forEach((docSnap) => {
        resultsMap[docSnap.id] = docSnap.data() as GameResult;
      });
      setGameResults(resultsMap);
    });

    // Real-time listener for photos count per game
    const photosCollection = collection(db, 'photos');
    const unsubscribePhotos = onSnapshot(photosCollection, (snapshot) => {
      const counts: Record<string, number> = {};
      snapshot.docs.forEach((docSnap) => {
        const data = docSnap.data();
        if (data.gameId) {
          counts[data.gameId] = (counts[data.gameId] || 0) + 1;
        }
      });
      setPrizePhotoCounts(counts);
    });

    return () => {
      unsubscribeResults();
      unsubscribePhotos();
    };
  }, []);

  const toggleCompleted = (e: React.MouseEvent, gameId: string) => {
    e.stopPropagation();
    setCompletedGames(prev => ({
      ...prev,
      [gameId]: !prev[gameId]
    }));
  };

  return (
    <section id="games" className="scroll-mt-20">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 transition hover:shadow-md">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎈</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-malayalam tracking-tight">
                മത്സരങ്ങളും സമ്മാനാർഹരും (Games & Winners)
              </h2>
            </div>
            <p className="text-stone-600 text-xs sm:text-sm mt-1 font-malayalam">
              ഏതൊരു മത്സരത്തിലും ക്ലിക്ക് ചെയ്ത് 1st, 2nd, 3rd വിജയികളുടെ പേരുകളും സമ്മാനദാന ചിത്രങ്ങളും കാണാം / ചേർക്കാം.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>{GAMES_LIST.length} മത്സരങ്ങൾ</span>
          </span>
        </div>

        {/* Games List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {GAMES_LIST.map((game, index) => {
            const isDone = completedGames[game.id];
            const result = gameResults[game.id];
            const hasWinners = result && (result.firstPrize || result.secondPrize || result.thirdPrize);
            const photoCount = prizePhotoCounts[game.id] || 0;

            return (
              <div
                key={game.id}
                onClick={() => onSelectGame(game)}
                className={`group cursor-pointer rounded-2xl p-4 transition-all duration-200 border flex items-center justify-between gap-3 text-left ${
                  hasWinners
                    ? 'bg-gradient-to-r from-amber-50/90 via-yellow-50/50 to-white border-amber-300 hover:border-amber-400 hover:shadow-sm'
                    : isDone 
                    ? 'bg-emerald-50/70 border-emerald-200 opacity-90' 
                    : 'bg-amber-50/40 hover:bg-amber-50 border-amber-100/80 hover:border-amber-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Game Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-amber-200/80 flex items-center justify-center text-2xl shrink-0 shadow-2xs group-hover:scale-110 transition-transform relative">
                    {game.icon}
                    {hasWinners && (
                      <span className="absolute -top-1 -right-1 text-xs">🥇</span>
                    )}
                  </div>

                  {/* Title & Info */}
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-amber-600 w-5">
                        {String(index + 1).padStart(2, '0')}.
                      </span>
                      <h3 className="font-bold text-base sm:text-lg text-stone-800 font-malayalam group-hover:text-amber-800 transition-colors truncate">
                        {game.malayalamName}
                      </h3>
                    </div>
                    
                    {/* Winner or Subtitle preview */}
                    {hasWinners ? (
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-amber-900 font-bold flex items-center gap-1 bg-amber-200/80 px-2 py-0.5 rounded-md truncate font-malayalam">
                          <span>🥇 {result.firstPrize || 'വിജയി'}</span>
                        </span>
                        {photoCount > 0 && (
                          <span className="text-[11px] text-amber-700 font-semibold flex items-center gap-1 bg-amber-100/60 px-1.5 py-0.5 rounded-md">
                            <Camera className="w-3 h-3" />
                            <span>{photoCount}</span>
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                        <span className="truncate">{game.englishName}</span>
                        <span>•</span>
                        <span className="text-amber-700 font-medium whitespace-nowrap">{game.ageGroup}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status / Action Indicator */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-100 group-hover:bg-amber-200 px-2.5 py-1 rounded-xl transition hidden sm:inline-block">
                    {hasWinners ? 'വിജയികൾ & ഫോട്ടോകൾ 🏆' : 'വിവരങ്ങൾ 🔍'}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500">
          <span>* എല്ലാ മത്സരങ്ങളിലും പങ്കെടുത്ത എല്ലാ കുട്ടികൾക്കും പ്രോത്സാഹന സമ്മാനങ്ങൾ വിതരണം ചെയ്തു.</span>
          <span className="font-semibold text-amber-700">ഓണം ആശംസകൾ 🌸</span>
        </div>

      </div>
    </section>
  );
};
