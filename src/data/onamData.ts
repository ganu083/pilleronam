import { Game, Prize, EventInfo, PhotoItem } from '../types';

export const EVENT_DATA: EventInfo = {
  title: 'പിള്ളേരുടെ ഓണം',
  subtitle: 'കുട്ടികളുടെ കലാകായിക മത്സരങ്ങൾ',
  dateString: '2026 ആഗസ്റ്റ് 26, ബുധൻ (26th August 2026)',
  timeString: 'ഉച്ചയ്ക്ക് 2:00 PM മുതൽ',
  locationName: 'കോട്ടയം',
  locationDetails: 'പ്രധാന വേദി, കോട്ടയം, കേരളം',
  googleMapsUrl: 'https://maps.app.goo.gl/GCmHbKa8QT73hL9P9?g_st=ic',
  googleMapsEmbedQuery: 'Kottayam, Kerala',
  coordinatorContact: '+91 98765 43210',
};

export const GAMES_LIST: Game[] = [
  {
    id: 'candy-pick',
    malayalamName: 'മിഠായി പെറുക്കൽ',
    englishName: 'Candy Picking',
    icon: '🍬',
    description: 'നിശ്ചിത സമയത്തിനുള്ളിൽ ഏറ്റവും കൂടുതൽ മിഠായികൾ പെറുക്കിക്കൂട്ടുന്ന കുട്ടി വിജയിക്കും!',
    rules: [
      'വിസിലടിക്കുമ്പോൾ മാത്രമേ പെറുക്കാൻ തുടങ്ങാവൂ.',
      'കൈകൾ മാത്രം ഉപയോഗിച്ച് പെറുക്കണം.',
      'സമയപരിധി കഴിഞ്ഞാൽ പെറുക്കാൻ പാടില്ല.'
    ],
    ageGroup: '3 - 6 വയസ്സ്',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200'
  },
  {
    id: 'lemon-spoon',
    malayalamName: 'നാരങ്ങ സ്പൂൺ',
    englishName: 'Lemon & Spoon Race',
    icon: '🍋',
    description: 'വായയിൽ വെച്ച സ്പൂണിൽ നാരങ്ങ തുളുമ്പാതെ താഴെ വീഴാതെ ഫിനിഷ് ലൈനിൽ എത്തുന്ന ആവേശ മത്സരം.',
    rules: [
      'സ്പൂൺ കൈകൊണ്ട് തൊടാൻ പാടില്ല.',
      'നാരങ്ങ താഴെ വീണാൽ തുടക്കത്തിൽ നിന്ന് വീണ്ടും തുടങ്ങണം.',
      'ആദ്യം ലൈൻ ക്രോസ് ചെയ്യുന്നവർ വിജയിക്കും.'
    ],
    ageGroup: 'എല്ലാ പ്രായക്കാർക്കും',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    id: 'bottle-fill',
    malayalamName: 'കുപ്പിയിൽ വെള്ളം നിറയ്ക്കൽ',
    englishName: 'Bottle Water Filling',
    icon: '🍾',
    description: 'സ്പോഞ്ചോ ചെറിയ ഗ്ലാസോ ഉപയോഗിച്ച് വെള്ളം പാത്രത്തിൽ നിന്ന് കുപ്പിയിലേക്ക് വേഗത്തിൽ നിറയ്ക്കുക.',
    rules: [
      'നിശ്ചിത അകലത്തിൽ നിന്ന് ഓടിവന്ന് നിറയ്ക്കണം.',
      'കുപ്പി വീഴാതെ സൂക്ഷിക്കണം.',
      'ആദ്യം വെള്ളം നിറഞ്ഞു കവിയുന്നവർ വിജയി.'
    ],
    ageGroup: '5 - 12 വയസ്സ്',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200'
  },
  {
    id: 'musical-chairs',
    malayalamName: 'കസേരകളി',
    englishName: 'Musical Chairs',
    icon: '🪑',
    description: 'പാട്ട് നിലയ്ക്കുമ്പോൾ ഇരിപ്പിടം പിടിച്ചെടുക്കുന്ന കുട്ടികളുടെ ഏറ്റവും പ്രിയപ്പെട്ട ഗെയിം!',
    rules: [
      'പാട്ട് ഉള്ളപ്പോൾ മാത്രമേ കസേരയ്ക്ക് ചുറ്റും നടക്കാവൂ.',
      'പാട്ട് നിലച്ചാൽ ഉടൻ അടുത്തുള്ള കസേരയിൽ ഇരിക്കണം.',
      'തള്ളിയിടാൻ പാടില്ല, മാന്യമായി കളിക്കുക.'
    ],
    ageGroup: 'എല്ലാ പ്രായക്കാർക്കും',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    id: 'frog-jump',
    malayalamName: 'തവളച്ചാട്ടം',
    englishName: 'Frog Jump Race',
    icon: '🐸',
    description: 'തവളയെപ്പോലെ ചാടിച്ചാടി നിശ്ചിത ദൂരം അതിവേഗം താണ്ടുന്ന കുട്ടികളുടെ ഊർജ്ജസ്വലമായ മത്സരം.',
    rules: [
      'ഇരു കൈകളും കാലുകളും കൃത്യമായ തവള പൊസിഷനിൽ ആയിരിക്കണം.',
      'എഴുന്നേറ്റു നടക്കാൻ പാടില്ല.',
      'നേരെ ലക്ഷ്യത്തിലേക്ക് ചാടുക.'
    ],
    ageGroup: '4 - 10 വയസ്സ്',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    id: 'kulam-kara',
    malayalamName: 'കുളം കര',
    englishName: 'Kulam Kara (Pond & Bank)',
    icon: '🌊',
    description: 'കുളം എന്ന് പറയുമ്പോൾ ഉള്ളിലേക്കും കര എന്ന് പറയുമ്പോൾ പുറത്തേക്കും അതിവേഗം ചാടുന്ന ശ്രദ്ധാ പരീക്ഷണം.',
    rules: [
      'വിളിച്ചു പറയുന്ന നിർദ്ദേശം കൃത്യമായി കേൾക്കുക.',
      'തെറ്റായ ദിശയിലേക്ക് ചാടിയാൽ പുറത്താകും.',
      'അവസാനം വരെ പിടിച്ചുനിൽക്കുന്ന ആൾ വിജയി.'
    ],
    ageGroup: 'എല്ലാ പ്രായക്കാർക്കും',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: 'bun-eating',
    malayalamName: 'റൊട്ടി കടി',
    englishName: 'Bun / Roti Eating',
    icon: '🍞',
    description: 'ചരടിൽ കെട്ടിത്തൂക്കിയ ബണ്ണോ റൊട്ടിയോ കൈ തൊടാതെ കടിച്ചെടുത്ത് തീർക്കുന്ന രസകരമായ മത്സരം.',
    rules: [
      'കൈകൾ പിന്നിൽ കെട്ടിയിരിക്കണം.',
      'കൈ ഉപയോഗിച്ച് തൊടാൻ കർശനമായി പാടില്ല.',
      'ആദ്യം മുഴുവൻ തിന്നുതീർക്കുന്ന കുട്ടി വിജയിക്കും.'
    ],
    ageGroup: '6 - 14 വയസ്സ്',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    id: 'memory-test',
    malayalamName: 'മെമ്മറി ടെസ്റ്റ്',
    englishName: 'Memory Test Challenge',
    icon: '🧠',
    description: 'ട്രേയിൽ പ്രദർശിപ്പിച്ച വിവിധ വസ്തുക്കൾ ഒരു മിനിറ്റ് കണ്ട് മനസ്സിൽ ഓർത്ത് എഴുതിക്കാണിക്കുക.',
    rules: [
      'ഒരു മിനിറ്റ് സമയം കൊണ്ട് വസ്തുക്കൾ നിരീക്ഷിക്കുക.',
      'തുടർന്ന് ഓർത്തെടുത്ത് ലിസ്റ്റ് ചെയ്യുക.',
      'ഏറ്റവും കൂടുതൽ ശരിയായി ഓർത്തെടുക്കുന്നവർ വിജയി.'
    ],
    ageGroup: '7 - 15 വയസ്സ്',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    id: 'pin-bindi',
    malayalamName: 'സുന്ദരിക്ക് പൊട്ട് കുത്തൽ',
    englishName: 'Sundarikku Pottu Kuthal',
    icon: '🎯',
    description: 'കണ്ണുകെട്ടി വട്ടം ചുറ്റി ബോർഡിലെ ചിത്രത്തിലെ കൃത്യമായ നെറ്റിയിൽ പൊട്ട് തൊടുന്ന ക്ലാസിക് ഓണം കളി.',
    rules: [
      'കണ്ണുകൾ തുണികൊണ്ട് ഭദ്രമായി മൂടിക്കെട്ടും.',
      'ചിത്രത്തിന് മുന്നിലേക്ക് നടന്ന് കൃത്യസ്ഥാനത്ത് തൊടണം.',
      'ഏറ്റവും കൃത്യമായ സ്ഥാനത്ത് പൊട്ട് വെക്കുന്നവർക്ക് സമ്മാനം.'
    ],
    ageGroup: 'എല്ലാ പ്രായക്കാർക്കും',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
  }
];

export const PRIZES_LIST: Prize[] = [
  {
    id: 'atlas',
    malayalamTitle: 'അറ്റ്‌ലസ് (Atlas)',
    englishTitle: 'Illustrated World Atlas',
    icon: '🌍',
    category: 'വിജ്ഞാനം & അറിവ്',
    description: 'ലോകരാജ്യങ്ങളെയും സംസ്കാരങ്ങളെയും കുറിച്ച് പഠിക്കാൻ മനോഹരമായ കളർ അറ്റ്‌ലസ് പുസ്തകം.'
  },
  {
    id: 'rubiks-cube',
    malayalamTitle: 'റൂബിക്സ് ക്യൂബ് (Rubik\'s Cube)',
    englishTitle: 'Speed Rubik\'s Cube',
    icon: '🧩',
    category: 'ബുദ്ധി & വേഗത',
    description: 'ചിന്താശേഷിയും കൈവേഗവും വർദ്ധിപ്പിക്കാൻ സഹായിക്കുന്ന ഹൈ-സ്പീഡ് റൂബിക്സ് ക്യൂബ്.'
  },
  {
    id: 'jigsaw-puzzle',
    malayalamTitle: 'ജിഗ്‌സോ പസിൽ (Jigsaw Puzzle)',
    englishTitle: 'Jigsaw Puzzle Set',
    icon: '🖼️',
    category: 'വിനോദം & ഏകാഗ്രത',
    description: 'കുട്ടികൾക്ക് ഒത്തൊരുമയോടെ പൂർത്തിയാക്കാൻ കഴിയുന്ന വർണ്ണാഭമായ ജിഗ്‌സോ പസിൽ ബോർഡ്.'
  },
  {
    id: 'board-games',
    malayalamTitle: 'ക്ലാസിക് ബോർഡ് ഗെയിമുകൾ',
    englishTitle: 'Classic Board Games',
    icon: '🎲',
    category: 'കുടുംബ വിനോദം',
    description: 'ലുഡോ, പാമ്പും കോണിയും, ചെസ്സ് തുടങ്ങിയ കുടുംബത്തോടൊപ്പം കളിക്കാവുന്ന ബോർഡ് ഗെയിം കിറ്റുകൾ.'
  },
  {
    id: 'writing-tablet',
    malayalamTitle: 'റൈറ്റിംഗ് / ടാബ്‌ലെറ്റ് പാഡ്',
    englishTitle: 'LCD Writing & Drawing Tablet',
    icon: '📱',
    category: 'ഡിജിറ്റൽ സർഗ്ഗാത്മകത',
    description: 'പേപ്പർ പാഴാക്കാതെ വരയ്ക്കാനും എഴുതാനും പറ്റിയ പരിസ്ഥിതി സൗഹൃദ LCD ഡ്രോയിംഗ് ടാബ്‌ലെറ്റ്.'
  },
  {
    id: 'drawing-books',
    malayalamTitle: 'ഡ്രോയിംഗ് ബുക്ക് & കളറിംഗ് ബുക്കുകൾ',
    englishTitle: 'Drawing & Colouring Books',
    icon: '🎨',
    category: 'ചിത്രരചന',
    description: 'കുട്ടികളുടെ ഭാവനയെ തൊട്ടുണർത്തുന്ന മികച്ച ചിത്രരചന, കളറിംഗ് ബുക്കുകൾ.'
  },
  {
    id: 'sketch-crayons',
    malayalamTitle: 'സ്കെച്ച് പെൻ, ക്രയോൺസ്, കളർ പെൻസിലുകൾ',
    englishTitle: 'Sketch Pens, Crayons & Colour Pencils',
    icon: '🖍️',
    category: 'വർണ്ണലോകം',
    description: 'പ്രീമിയം ബ്രാൻഡ് കളർ പെൻസിലുകൾ, ഓയിൽ പാസ്റ്റലുകൾ, വാട്ടർ കളർ സ്കെച്ച് പെൻ സെറ്റുകൾ.'
  },
  {
    id: 'pencil-box-stencils',
    malayalamTitle: 'പെൻസിൽ ബോക്സ് & സ്റ്റെൻസിൽസ്',
    englishTitle: 'Pencil Box & Geometry Stencils',
    icon: '📐',
    category: 'സ്കൂൾ കിറ്റ്',
    description: 'മൾട്ടി-ലെയർ പെൻസിൽ ബോക്സുകൾ, അളവുപകരണങ്ങൾ, വിവിധ ഷേപ്പുകളിലുള്ള സ്റ്റെൻസിലുകൾ.'
  }
];

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-sample-1',
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    caption: 'കുട്ടികളുടെ ഓണപ്പൂക്കള നിർമ്മാണം 🌸',
    timestamp: 'ഓണം 2026',
    gameTag: 'പൂക്കളം'
  },
  {
    id: 'photo-sample-2',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
    caption: 'കസേരകളി മത്സരത്തിലെ ആവേശം 🪑',
    timestamp: 'ഓണം 2026',
    gameTag: 'കസേരകളി'
  },
  {
    id: 'photo-sample-3',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
    caption: 'സമ്മാനങ്ങൾ സ്വീകരിക്കുന്ന കുട്ടിത്താരങ്ങൾ 🎁',
    timestamp: 'ഓണം 2026',
    gameTag: 'സമ്മാനവിതരണം'
  }
];
