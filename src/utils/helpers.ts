export const getWhatsAppShareUrl = (url: string) => {
  const text = `🌸 *പിള്ളേരുടെ ഓണം | Onam Games & Celebration* 🌸\n\nകുട്ടികളുടെ കലാകായിക മത്സരങ്ങളും സമ്മാനങ്ങളും!\n📅 തീയതി: 2026 ആഗസ്റ്റ് 26, ബുധൻ (26th August 2026)\n⏰ സമയം: ഉച്ചയ്ക്ക് 2:00 PM മുതൽ\n📍 വേദി: കോട്ടയം\n\nവിശദവിവരങ്ങൾക്കും ലൊക്കേഷനും ഈ വെബ്സൈറ്റ് സന്ദർശിക്കുക:\n${url}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
};

export const getGoogleCalendarUrl = () => {
  const title = encodeURIComponent('പിള്ളേരുടെ ഓണം - Onam Games & Celebration');
  const description = encodeURIComponent('കുട്ടികളുടെ കലാകായിക മത്സരങ്ങളും സമ്മാനങ്ങളും - വേദി: കോട്ടയം');
  const location = encodeURIComponent('Kottayam, Kerala, India');
  // 26th August 2026, 2:00 PM to 6:00 PM IST (UTC 08:30 to 12:30)
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260826T083000Z/20260826T123000Z&details=${description}&location=${location}`;
};

export const downloadCalendarEvent = () => {
  const title = 'പിള്ളേരുടെ ഓണം - Onam Games & Celebration';
  const description = "കുട്ടികളുടെ കലാകായിക മത്സരങ്ങളും സമ്മാനങ്ങളും - വേദി: കോട്ടയം";
  const location = 'Kottayam, Kerala, India';
  
  // Exact date: 26th August 2026, 2:00 PM to 6:00 PM IST (UTC 08:30 to 12:30)
  const dtStart = '20260826T083000Z';
  const dtEnd = '20260826T123000Z';

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pillarede Onam//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Pillarede-Onam-26-Aug-2026.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
