import React from 'react';
import { Game } from '../types';
import { X, Trophy, CheckCircle, Sparkles, Clock, Users, Play } from 'lucide-react';
import { triggerOnamPetals } from '../utils/confetti';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({ game, onClose }) => {
  if (!game) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-500 to-yellow-600 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-white text-3xl flex items-center justify-center shadow-md">
              {game.icon}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider bg-amber-700/50 px-2.5 py-0.5 rounded-full border border-amber-300/30 text-yellow-200">
                {game.ageGroup}
              </span>
              <h3 className="text-2xl font-extrabold font-malayalam mt-1">
                {game.malayalamName}
              </h3>
              <p className="text-xs text-yellow-100 font-medium">
                {game.englishName}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
          
          {/* Overview */}
          <div>
            <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5" />
              <span>വിവരണം (Description)</span>
            </h4>
            <p className="text-stone-700 text-sm leading-relaxed font-malayalam bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
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

        {/* Modal Footer */}
        <div className="p-4 bg-stone-50 border-t border-amber-100 flex items-center justify-between">
          <button
            onClick={() => {
              triggerOnamPetals();
            }}
            className="inline-flex items-center gap-1.5 text-amber-700 text-xs font-bold hover:underline cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>വിജയാശംസകൾ നേരുന്നു 🌸</span>
          </button>
          
          <button
            onClick={onClose}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 px-5 rounded-xl transition shadow-xs"
          >
            മനസ്സിലായി (Close)
          </button>
        </div>

      </div>
    </div>
  );
};
