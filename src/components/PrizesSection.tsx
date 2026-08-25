import React from 'react';
import { PRIZES_LIST } from '../data/onamData';
import { Gift, Sparkles, Award } from 'lucide-react';
import { triggerOnamPetals } from '../utils/confetti';

export const PrizesSection: React.FC = () => {
  return (
    <section id="prizes" className="scroll-mt-20">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 transition hover:shadow-md">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-amber-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-malayalam tracking-tight">
                സമ്മാനങ്ങൾ (Prizes)
              </h2>
            </div>
            <p className="text-stone-600 text-sm mt-1">
              വിജയികൾക്കും പങ്കെടുത്ത എല്ലാ കൂട്ടുകാർക്കുമുള്ള ആകർഷകമായ സമ്മാനങ്ങൾ
            </p>
          </div>
          <button
            onClick={() => triggerOnamPetals()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-100 hover:bg-yellow-200 text-amber-900 text-xs font-bold rounded-full border border-amber-300 transition active:scale-95 cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>സമ്മാനപ്പെരുമഴ 🌟</span>
          </button>
        </div>

        {/* Prizes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRIZES_LIST.map((prize, idx) => (
            <div
              key={prize.id}
              className="bg-amber-50/40 hover:bg-amber-50 rounded-2xl p-4 border border-amber-100 hover:border-amber-300 transition-all duration-200 flex flex-col justify-between group hover:shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-amber-200/80 flex items-center justify-center text-xl shadow-2xs group-hover:scale-110 transition-transform">
                    {prize.icon}
                  </div>
                  <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full border border-amber-200/60">
                    {prize.category}
                  </span>
                </div>

                <h3 className="font-bold text-stone-800 text-base font-malayalam group-hover:text-amber-800 transition-colors leading-snug">
                  {prize.malayalamTitle}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {prize.englishTitle}
                </p>
                <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                  {prize.description}
                </p>
              </div>

              <div className="mt-3 pt-2.5 border-t border-amber-100/80 flex items-center gap-1.5 text-[11px] font-medium text-amber-800">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>സമ്മാന കിറ്റ് #{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Special Consolation Message */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-amber-100/70 via-yellow-100/70 to-amber-100/70 border border-amber-200/80 text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <Award className="w-6 h-6 text-amber-700 shrink-0" />
          <p className="text-sm font-semibold text-amber-900 font-malayalam">
            🌟 മത്സരത്തിൽ പങ്കെടുക്കുന്ന ഓരോ കുരുന്നിനും പ്രോത്സാഹന സമ്മാനങ്ങളും സർട്ടിഫിക്കറ്റുകളും നൽകുന്നതാണ്!
          </p>
        </div>

      </div>
    </section>
  );
};
