export const getWhatsAppShareUrl = (url: string) => {
  const text = `🌸 *പിള്ളേരുടെ ഓണം | Onam Games & Celebration* 🌸\n\nകുട്ടികളുടെ കലാകായിക മത്സരങ്ങളും സമ്മാനങ്ങളും!\n📅 സമയം: നാളെ ഉച്ചയ്ക്ക് 2:00 PM മുതൽ\n📍 വേദി: കോട്ടയം\n\nവിശദവിവരങ്ങൾക്കും ലൊക്കേഷനും ഈ വെബ്സൈറ്റ് സന്ദർശിക്കുക:\n${url}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
};

export const downloadCalendarEvent = () => {
  const title = 'പിള്ളേരുടെ ഓണം - Onam Games & Celebration';
  const description = "കുട്ടികളുടെ കലാകായിക മത്സരങ്ങളും സമ്മാനങ്ങളും - വേദി: കോട്ടയം";
  const location = 'Kottayam, Kerala, India';
  
  // Calculate tomorrow 2:00 PM to 6:00 PM
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  tomorrow.setHours(14, 0, 0, 0);

  const endTime = new Date(tomorrow);
  endTime.setHours(18, 0, 0, 0);

  const formatICSDate = (d: Date) => {
    return d.toISOString().replace(/-|:|\.\d+/g, '');
  };

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Pillarede Onam//EN',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    `DTSTART:${formatICSDate(tomorrow)}`,
    `DTEND:${formatICSDate(endTime)}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'Pillarede-Onam-Event.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
