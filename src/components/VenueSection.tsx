import React, { useState } from 'react';
import { MapPin, Navigation, Share2, Copy, Check, ExternalLink, Info, Compass } from 'lucide-react';
import { EVENT_DATA } from '../data/onamData';
import { getWhatsAppShareUrl } from '../utils/helpers';

export const VenueSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(`പിള്ളേരുടെ ഓണം മത്സര വേദി - ${EVENT_DATA.locationName} (${EVENT_DATA.googleMapsUrl})`);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <section id="venue" className="scroll-mt-20">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-100/80 transition hover:shadow-md">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl mb-3 text-2xl">
            📍
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-800 font-malayalam tracking-tight">
            മത്സര വേദി (Venue)
          </h2>
          <p className="text-stone-600 mt-1 text-lg font-medium font-malayalam">
            {EVENT_DATA.locationName}
          </p>
        </div>

        {/* Location Card Details */}
        <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-200/70 mb-6 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-900 font-bold text-lg">
                <Compass className="w-5 h-5 text-amber-600 shrink-0" />
                <span>സ്ഥലം: {EVENT_DATA.locationName}</span>
              </div>
              <p className="text-stone-600 text-sm">
                ഗൂഗിൾ മാപ്പ് വഴി വേദി കൃത്യമായി കണ്ടെത്താം
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={handleCopyAddress}
                className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 text-stone-700 text-xs font-semibold py-2 px-3.5 rounded-lg border border-amber-200 shadow-xs transition active:scale-95"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">വിലാസം കോപ്പി ചെയ്തു</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-amber-600" />
                    <span>വിലാസം കോപ്പി ചെയ്യുക</span>
                  </>
                )}
              </button>

              <button
                onClick={() => window.open(getWhatsAppShareUrl(EVENT_DATA.googleMapsUrl), '_blank')}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2 px-3.5 rounded-lg shadow-xs transition active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>സ്ഥലം അയക്കാം</span>
              </button>
            </div>
          </div>
        </div>

        {/* Big Interactive Google Maps Route Button */}
        <div className="text-center">
          <a
            href={EVENT_DATA.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-bold py-3.5 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-base sm:text-lg group hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="text-xl">🗺️</span>
            <span>ഗൂഗിൾ മാപ്പിൽ വഴി കാണുക (Google Maps Directions)</span>
            <ExternalLink className="w-5 h-5 text-amber-200 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Helpful Tips / Guidelines */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-amber-100 text-xs text-stone-600">
          <div className="flex items-center gap-2 p-2.5 bg-amber-50/40 rounded-xl">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>കുട്ടികൾ 1:45 PM-ന് തന്നെ വേദിയിലെത്താൻ ശ്രദ്ധിക്കുക</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-amber-50/40 rounded-xl">
            <span className="text-sm">🥤</span>
            <span>കുടിവെള്ളവും ലഘുഭക്ഷണവും വേദിയിൽ ലഭ്യമായിരിക്കും</span>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-amber-50/40 rounded-xl">
            <span className="text-sm">🚗</span>
            <span>വാഹന പാർക്കിംഗ് സൗകര്യം ഉണ്ടായിരിക്കുന്നതാണ്</span>
          </div>
        </div>

      </div>
    </section>
  );
};
