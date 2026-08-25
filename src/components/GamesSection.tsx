import React, { useState } from 'react';
import { Game } from '../types';
import { GAMES_LIST } from '../data/onamData';
import { Sparkles, Trophy, Info, ChevronRight, CheckCircle2 } from 'lucide-react';

interface GamesSectionProps {
  onSelectGame: (game: Game) => void;
}

export const GamesSection: React.FC<GamesSectionProps> = ({ onSelectGame }) => {
  const [completedGames, setCompletedGames] = useState<Record<string, boolean>>({});

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
                മത്സരങ്ങൾ (Games)
              </h2>
            </div>
            <p className="text-stone-600 text-sm mt-1">
              ആകെ 9 ആവേശകരമായ മത്സരങ്ങൾ | കൂടുതൽ വിവരങ്ങൾക്ക് ക്ലിക്ക് ചെയ്യുക
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>9 മത്സരങ്ങൾ</span>
          </span>
        </div>

        {/* Games List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {GAMES_LIST.map((game, index) => {
            const isDone = completedGames[game.id];
            return (
              <div
                key={game.id}
                onClick={() => onSelectGame(game)}
                className={`group cursor-pointer rounded-2xl p-4 transition-all duration-200 border flex items-center justify-between gap-3 text-left ${
                  isDone 
                    ? 'bg-emerald-50/70 border-emerald-200 opacity-90' 
                    : 'bg-amber-50/40 hover:bg-amber-50 border-amber-100/80 hover:border-amber-300 hover:shadow-xs'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Game Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white border border-amber-200/80 flex items-center justify-center text-2xl shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                    {game.icon}
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
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-stone-500">
                      <span className="truncate">{game.englishName}</span>
                      <span>•</span>
                      <span className="text-amber-700 font-medium whitespace-nowrap">{game.ageGroup}</span>
                    </div>
                  </div>
                </div>

                {/* Status / Detail Indicator */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => toggleCompleted(e, game.id)}
                    className={`p-1.5 rounded-lg transition text-xs font-semibold ${
                      isDone 
                        ? 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200' 
                        : 'text-stone-400 hover:text-amber-700 hover:bg-amber-100/60'
                    }`}
                    title={isDone ? 'പൂർത്തിയായി' : 'പൂർത്തിയായതായി അടയാളപ്പെടുത്തുക'}
                  >
                    <CheckCircle2 className={`w-5 h-5 ${isDone ? 'fill-emerald-500 text-white' : ''}`} />
                  </button>
                  <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote */}
        <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-xs text-stone-500">
          <span>* എല്ലാ മത്സരങ്ങളിലും പങ്കെടുക്കുന്ന എല്ലാ കുട്ടികൾക്കും പ്രോത്സാഹന സമ്മാനങ്ങൾ ഉണ്ടാകും.</span>
          <span className="font-semibold text-amber-700">ഓണം ആശംസകൾ 🌸</span>
        </div>

      </div>
    </section>
  );
};
