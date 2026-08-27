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
    id: 'musical-chairs-kids',
    malayalamName: 'കസേരകളി (കുട്ടികൾ)',
    englishName: 'Musical Chairs (Kids)',
    icon: '🪑',
    description: 'പാട്ട് നിലയ്ക്കുമ്പോൾ ഇരിപ്പിടം പിടിച്ചെടുക്കുന്ന കുട്ടിത്താരങ്ങളുടെ ഏറ്റവും പ്രിയപ്പെട്ട കസേരകളി മത്സരം!',
    rules: [
      'പാട്ട് ഉള്ളപ്പോൾ മാത്രമേ കസേരയ്ക്ക് ചുറ്റും നടക്കാവൂ.',
      'പാട്ട് നിലച്ചാൽ ഉടൻ അടുത്തുള്ള കസേരയിൽ ഇരിക്കണം.',
      'തള്ളിയിടാൻ പാടില്ല, മാന്യമായി കളിക്കുക.'
    ],
    ageGroup: 'കുട്ടികൾ (Kids)',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    id: 'musical-chairs-men',
    malayalamName: 'കസേരകളി (പുരുഷന്മാർ)',
    englishName: 'Musical Chairs (Adults Male)',
    icon: '🪑',
    description: 'മുതിർന്ന പുരുഷന്മാർക്കായുള്ള ആവേശോജ്ജ്വലവും ചിരിയുണർത്തുന്നതുമായ കസേരകളി മത്സരം.',
    rules: [
      'പാട്ട് ഉള്ളപ്പോൾ നിരയായി കസേരയ്ക്ക് ചുറ്റും വലംവെക്കുക.',
      'പാട്ട് നിന്നയുടൻ അടുത്തുള്ള കസേര കണ്ടെത്തുക.',
      'കായികമായ തള്ളലുകൾ ഒഴിവാക്കി ആവേശത്തോടെ കളിക്കുക.'
    ],
    ageGroup: 'പുരുഷന്മാർ (Adults Male)',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200'
  },
  {
    id: 'musical-chairs-women',
    malayalamName: 'കസേരകളി (വനിതകൾ)',
    englishName: 'Musical Chairs (Adults Female)',
    icon: '🪑',
    description: 'വനിതകൾക്കായുള്ള ആവേശവും ചിരിയും നിറഞ്ഞ ഓണക്കാല കസേരകളി മത്സരം.',
    rules: [
      'പാട്ടിന്റെ താളത്തിനൊത്ത് കസേരകൾക്ക് ചുറ്റും നടക്കുക.',
      'പാട്ട് നിലച്ചാൽ ഇരിപ്പിടം സ്വന്തമാക്കുക.',
      'സൗഹൃദത്തോടെയും സന്തോഷത്തോടെയും കളിക്കുക.'
    ],
    ageGroup: 'വനിതകൾ (Adults Female)',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
  },
  {
    id: 'pin-bindi-kids',
    malayalamName: 'സുന്ദരിക്ക് പൊട്ട് കുത്തൽ (കുട്ടികൾ)',
    englishName: 'Sundarikku Pottu Kuthal (Kids)',
    icon: '🎯',
    description: 'കുട്ടികൾ കണ്ണുകെട്ടി വട്ടം ചുറ്റി ബോർഡിലെ ചിത്രത്തിലെ കൃത്യമായ നെറ്റിയിൽ പൊട്ട് തൊടുന്ന രസകരമായ ഓണം കളി.',
    rules: [
      'കണ്ണുകൾ തുണികൊണ്ട് ഭദ്രമായി മൂടിക്കെട്ടും.',
      'ചിത്രത്തിന് മുന്നിലേക്ക് നടന്ന് കൃത്യസ്ഥാനത്ത് തൊടണം.',
      'ഏറ്റവും കൃത്യമായ സ്ഥാനത്ത് പൊട്ട് വെക്കുന്നവർക്ക് സമ്മാനം.'
    ],
    ageGroup: 'കുട്ടികൾ (Kids)',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  {
    id: 'pin-bindi-women',
    malayalamName: 'സുന്ദരിക്ക് പൊട്ട് കുത്തൽ (വനിതകൾ)',
    englishName: 'Sundarikku Pottu Kuthal (Women)',
    icon: '🎯',
    description: 'വനിതകൾക്കായുള്ള ചിരിയും കൈയ്യടിയും നിറഞ്ഞ പരമ്പരാഗത പൊട്ടുകുത്തൽ മത്സരം.',
    rules: [
      'കണ്ണുകൾ തുണികൊണ്ട് ഭദ്രമായി മൂടിക്കെട്ടി മുന്നോട്ട് നയിക്കും.',
      'ചിത്രത്തിന് മുന്നിലേക്ക് നടന്ന് കൃത്യസ്ഥാനത്ത് പൊട്ട് തൊടണം.',
      'ഏറ്റവും കൃത്യമായ സ്ഥാനത്ത് പൊട്ട് വെക്കുന്നവർ വിജയിക്കും.'
    ],
    ageGroup: 'വനിതകൾ (Women)',
    badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200'
  }
];

export const PRIZES_LIST: Prize[] = [
  {
    id: 'rubiks-cube',
    malayalamTitle: 'റൂബിക്സ് ക്യൂബ് (Rubik\'s Cube)',
    englishTitle: 'Speed Rubik\'s Cube',
    icon: '🧩',
    category: 'ബുദ്ധി & വേഗത',
    description: 'ചിന്താശേഷിയും കൈവേഗവും വർദ്ധിപ്പിക്കാൻ സഹായിക്കുന്ന ഹൈ-സ്പീഡ് റൂബിക്സ് ക്യൂബ്.'
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
    malayalamTitle: 'സ്കെച്ച് പെൻ, ക്രയോൺസ് & കളർ പെൻസിലുകൾ',
    englishTitle: 'Sketch Pens, Crayons & Colour Pencils',
    icon: '🖍️',
    category: 'വർണ്ണലോകം',
    description: 'പ്രീമിയം ബ്രാൻഡ് കളർ പെൻസിലുകൾ, ഓയിൽ പാസ്റ്റലുകൾ, വാട്ടർ കളർ സ്കെച്ച് പെൻ സെറ്റുകൾ.'
  },
  {
    id: 'trophy-medals',
    malayalamTitle: 'വിജയികൾക്കുള്ള ട്രോഫികളും മെഡലുകളും',
    englishTitle: 'Winner Trophies & Medals',
    icon: '🏆',
    category: 'വിജയാദരം',
    description: '1, 2, 3 സ്ഥാനം നേടിയ പ്രതിഭകൾക്കുള്ള മനോഹരമായ ഓണം ട്രോഫികളും മെഡലുകളും.'
  }
];

export const INITIAL_PHOTOS: PhotoItem[] = [];
