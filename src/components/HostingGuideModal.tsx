import React, { useState } from 'react';
import { X, Globe, Copy, Check, ExternalLink, Share2, Download, ShieldCheck, Zap, ArrowRight, Server, Terminal, Settings } from 'lucide-react';
import { getWhatsAppShareUrl } from '../utils/helpers';

interface HostingGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HostingGuideModal: React.FC<HostingGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'vercel' | 'live' | 'html'>('vercel');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const currentUrl = window.location.href;

  if (!isOpen) return null;

  const handleCopyUrl = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
  };

  const handleCopyCli = async () => {
    await navigator.clipboard.writeText('npm i -g vercel && vercel --prod');
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  const handleDownloadHtml = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="ml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>പിള്ളേരുടെ ഓണം | Onam Games & Celebration</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Manjari:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Manjari', sans-serif; }
  </style>
</head>
<body class="bg-amber-50 text-stone-800">
  <header class="bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-12 px-4 text-center shadow-md">
    <span class="text-4xl">🌸 🌼 🌺</span>
    <h1 class="text-3xl md:text-5xl font-bold mt-2">പിള്ളേരുടെ ഓണം</h1>
    <p class="text-lg md:text-xl mt-2 text-yellow-100 font-medium">കുട്ടികളുടെ കലാകായിക മത്സരങ്ങൾ</p>
    <div class="mt-4 inline-block bg-white text-stone-800 font-bold px-4 py-2 rounded-full shadow">
      📅 2026 ആഗസ്റ്റ് 26, ബുധൻ | ഉച്ചയ്ക്ക് 2:00 PM മുതൽ
    </div>
  </header>

  <main class="max-w-4xl mx-auto px-4 py-8 space-y-10">
    <section class="bg-white rounded-2xl p-6 shadow-sm border border-amber-100 text-center">
      <h2 class="text-2xl font-bold text-amber-700 mb-2">📍 മത്സര വേദി</h2>
      <p class="text-stone-600 mb-4">കോട്ടയം</p>
      <a href="https://maps.app.goo.gl/GCmHbKa8QT73hL9P9?g_st=ic" target="_blank" 
         class="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 px-6 rounded-lg transition duration-200">
        🗺️ ഗൂഗിൾ മാപ്പിൽ വഴി കാണുക
      </a>
    </section>

    <section class="grid md:grid-cols-2 gap-6">
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
        <h2 class="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2">
          🎈 മത്സരങ്ങൾ (Games)
        </h2>
        <ul class="space-y-2 text-stone-700">
          <li class="flex items-center gap-2">🍬 <span>മിഠായി പെറുക്കൽ</span></li>
          <li class="flex items-center gap-2">🍋 <span>നാരങ്ങ സ്പൂൺ</span></li>
          <li class="flex items-center gap-2">🍾 <span>കുപ്പിയിൽ വെള്ളം നിറയ്ക്കൽ</span></li>
          <li class="flex items-center gap-2">🪑 <span>കസേരകളി</span></li>
          <li class="flex items-center gap-2">🐸 <span>തവളച്ചാട്ടം</span></li>
          <li class="flex items-center gap-2">🌊 <span>കുളം കര</span></li>
          <li class="flex items-center gap-2">🍞 <span>റൊട്ടി കടി</span></li>
          <li class="flex items-center gap-2">🧠 <span>മെമ്മറി ടെസ്റ്റ്</span></li>
          <li class="flex items-center gap-2">🎯 <span>സുന്ദരിക്ക് പൊട്ട് കുത്തൽ</span></li>
        </ul>
      </div>

      <div class="bg-white rounded-2xl p-6 shadow-sm border border-amber-100">
        <h2 class="text-xl font-bold text-amber-700 mb-4 flex items-center gap-2">
          🎁 സമ്മാനങ്ങൾ (Prizes)
        </h2>
        <ul class="space-y-2 text-stone-700">
          <li>✨ അറ്റ്‌ലസ് (Atlas)</li>
          <li>✨ റൂബിക്സ് ക്യൂബ് (Rubik's Cube)</li>
          <li>✨ ജിഗ്‌സോ പസിൽ (Jigsaw Puzzle)</li>
          <li>✨ ക്ലാസിക് ബോർഡ് ഗെയിമുകൾ</li>
          <li>✨ റൈറ്റിംഗ് / ടാബ്‌ലെറ്റ് പാഡ്</li>
          <li>✨ ഡ്രോയിംഗ് ബുക്ക് & കളറിംഗ് ബുക്കുകൾ</li>
          <li>✨ സ്കെച്ച് പെൻ, ക്രയോൺസ്, കളർ പെൻസിലുകൾ</li>
          <li>✨ പെൻസിൽ ബോക്സ്, സ്റ്റെൻസിൽസ്</li>
        </ul>
      </div>
    </section>
  </main>

  <footer class="text-center py-6 text-stone-500 text-sm">
    സ്നേഹത്തോടെ, കൂട്ടുകാർ ❤️ | ഓണം 2026
  </footer>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'onam-celebration.html');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-stone-900/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-amber-200 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-amber-950 p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md">
              ▲
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  VERCEL READY
                </span>
              </div>
              <h3 className="text-xl font-bold font-malayalam mt-1">
                Vercel ഡിപ്ലോയ്മെന്റ് & ലൈവ് ഹോസ്റ്റിംഗ്
              </h3>
              <p className="text-xs text-stone-300">
                Deploy to Vercel with automatic updates and custom domain
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-stone-700/60 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('vercel')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'vercel' 
                  ? 'bg-white text-stone-900 shadow-xs' 
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Vercel ഡിപ്ലോയ്മെന്റ്</span>
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'live' 
                  ? 'bg-white text-stone-900 shadow-xs' 
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>ക്ലൗഡ് റൺ ലിങ്ക്</span>
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                activeTab === 'html' 
                  ? 'bg-white text-stone-900 shadow-xs' 
                  : 'text-stone-300 hover:text-white hover:bg-stone-800'
              }`}
            >
              <Download className="w-3.5 h-3.5 text-blue-500" />
              <span>Standalone HTML</span>
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* TAB 1: VERCEL DEPLOYMENT GUIDE */}
          {activeTab === 'vercel' && (
            <div className="space-y-5 text-stone-800 text-xs sm:text-sm">
              
              {/* Step 1: Export */}
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2">
                <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs shrink-0">1</span>
                  <span>കോഡ് GitHub-ലേക്ക് എക്സ്പോർട്ട് ചെയ്യുക (Export to GitHub)</span>
                </div>
                <p className="text-stone-600 pl-8 leading-relaxed text-xs">
                  AI Studio-യുടെ മുകളിൽ വലതുവശത്തുള്ള <b>Settings മെനു</b> &gt; <b>Export to GitHub</b> (അല്ലെങ്കിൽ <b>Download ZIP</b>) ക്ലിക്ക് ചെയ്ത് കോഡ് നിങ്ങളുടെ GitHub-ലേക്ക് നൽകുക.
                </p>
              </div>

              {/* Step 2: Import on Vercel */}
              <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-stone-900 text-sm">
                  <span className="w-6 h-6 rounded-full bg-stone-800 text-white flex items-center justify-center text-xs shrink-0">2</span>
                  <span>Vercel-ൽ പ്രൊജക്റ്റ് ഇമ്പോർട്ട് ചെയ്യുക (Import on Vercel)</span>
                </div>
                <div className="pl-8 space-y-2 text-stone-600 text-xs">
                  <p>1. <a href="https://vercel.com/new" target="_blank" rel="noopener noreferrer" className="text-amber-700 font-bold underline inline-flex items-center gap-1">vercel.com/new <ExternalLink className="w-3 h-3" /></a> സന്ദർശിച്ച് GitHub ഉപയോഗിച്ച് ലോഗിൻ ചെയ്യുക.</p>
                  <p>2. നിങ്ങളുടെ GitHub റിപ്പോസിറ്ററി തിരഞ്ഞെടുത്ത് <b>Import</b> ക്ലിക്ക് ചെയ്യുക.</p>
                  <p>3. <b>Framework Preset: Vite</b> തനിയെ ഡിറ്റക്റ്റ് ചെയ്യും (Build Command: <code className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-800">npm run build</code>, Output: <code className="bg-stone-200 px-1.5 py-0.5 rounded text-stone-800">dist</code>).</p>
                  <p>4. <b>Deploy</b> ബട്ടൺ ക്ലിക്ക് ചെയ്യുക. 15 സെക്കൻഡിൽ സൈറ്റ് ലൈവ് ആകും!</p>
                </div>
              </div>

              {/* Step 3: Automatic Continuous Deployments */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs shrink-0">3</span>
                  <span>ഓട്ടോമാറ്റിക് ഡിപ്ലോയ്മെന്റ് (Automatic CI/CD)</span>
                </div>
                <p className="text-stone-600 pl-8 leading-relaxed text-xs">
                  GitHub-ൽ നിങ്ങൾ മാറ്റങ്ങൾ വരുത്തുമ്പോഴെല്ലാം Vercel യാതൊരു കോൺഫിഗറേഷനും ഇല്ലാതെ തനിയെ സൈറ്റ് റീബിൽഡ് ചെയ്യുകയും അപ്‌ഡേറ്റ് ചെയ്യുകയും ചെയ്യും.
                </p>
              </div>

              {/* Step 4: Custom Domain */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-900 text-sm">
                  <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-xs shrink-0">4</span>
                  <span>സ്വന്തം ഡൊമൈൻ കണക്ട് ചെയ്യുക (Custom Domain)</span>
                </div>
                <div className="pl-8 space-y-1.5 text-stone-600 text-xs">
                  <p>Vercel Dashboard &gt; <b>Settings &gt; Domains</b> തുറന്ന് നിങ്ങളുടെ ഡൊമൈൻ നൽകുക.</p>
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200 font-mono text-[11px] space-y-1 text-stone-700">
                    <div><b>A Record:</b> @ &rarr; 76.76.21.21</div>
                    <div><b>CNAME Record:</b> www &rarr; cname.vercel-dns.com</div>
                  </div>
                  <p className="text-[11px] text-stone-500">Vercel സൗജന്യമായി യാന്ത്രിക SSL/HTTPS സെറ്റ് ചെയ്തു തരും.</p>
                </div>
              </div>

              {/* CLI Shortcut */}
              <div className="p-3 bg-stone-900 text-white rounded-2xl flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono truncate">
                  <Terminal className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-stone-300 truncate">npm i -g vercel && vercel --prod</span>
                </div>
                <button
                  onClick={handleCopyCli}
                  className="bg-stone-800 hover:bg-stone-700 text-amber-300 text-xs font-bold py-1.5 px-3 rounded-lg shrink-0 flex items-center gap-1"
                >
                  {copiedCli ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCli ? 'Copied!' : 'Copy CLI'}</span>
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: INSTANT GOOGLE CLOUD RUN LINK */}
          {activeTab === 'live' && (
            <div className="space-y-4">
              <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-amber-700" />
                    <span>നിങ്ങളുടെ നിലവിലെ ലൈവ് വെബ്സൈറ്റ് ലിങ്ക്:</span>
                  </span>
                  <span className="text-emerald-700 text-[11px]">Ready to share</span>
                </div>

                <div className="flex items-center gap-2 bg-white p-2.5 rounded-xl border border-amber-200 shadow-2xs">
                  <input
                    type="text"
                    readOnly
                    value={currentUrl}
                    className="w-full text-xs sm:text-sm font-mono text-stone-800 bg-transparent outline-hidden truncate"
                  />
                  <button
                    onClick={handleCopyUrl}
                    className="shrink-0 inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-1.5 px-3 rounded-lg transition active:scale-95"
                  >
                    {copiedUrl ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUrl ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => window.open(getWhatsAppShareUrl(currentUrl), '_blank')}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-2xs transition"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>വാട്സാപ്പിൽ ഇൻവിറ്റേഷൻ അയക്കുക</span>
                  </button>

                  <a
                    href={currentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold py-2 px-3 rounded-lg border border-stone-300 transition"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-stone-600" />
                    <span>പുതിയ ടാബിൽ തുറക്കുക</span>
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STANDALONE HTML */}
          {activeTab === 'html' && (
            <div className="p-4 bg-amber-50/50 rounded-2xl border border-dashed border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <h5 className="font-bold text-xs text-amber-900 font-malayalam">
                  സ്റ്റാൻഡ്എലോൺ HTML ഫയൽ (Single File .html)
                </h5>
                <p className="text-[11px] text-stone-500 mt-1">
                  ഒരു സെർവറും കോഡിംഗും ഇല്ലാതെ ഏതൊരു വെബ് ഹോസ്റ്റിലേക്കും നേരിട്ട് അപ്‌ലോഡ് ചെയ്യാവുന്ന സിംഗിൾ HTML ഫയൽ.
                </p>
              </div>
              <button
                onClick={handleDownloadHtml}
                className="shrink-0 inline-flex items-center gap-1.5 bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-2xs transition"
              >
                <Download className="w-3.5 h-3.5 text-amber-300" />
                <span>Download .HTML</span>
              </button>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-between items-center shrink-0">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-900 hover:text-amber-700"
          >
            <span>Go to Vercel Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold py-2 px-6 rounded-xl transition shadow-xs cursor-pointer"
          >
            മനസ്സിലായി (Done)
          </button>
        </div>

      </div>
    </div>
  );
};

