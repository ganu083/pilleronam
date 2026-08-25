export interface Game {
  id: string;
  malayalamName: string;
  englishName: string;
  icon: string;
  description: string;
  rules: string[];
  ageGroup: string;
  badgeColor: string;
}

export interface Prize {
  id: string;
  malayalamTitle: string;
  englishTitle: string;
  icon: string;
  category: string;
  description: string;
}

export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  uploader?: string;
  timestamp: string;
  createdAt?: number;
  gameTag?: string;
}

export interface EventInfo {
  title: string;
  subtitle: string;
  dateString: string;
  timeString: string;
  locationName: string;
  locationDetails: string;
  googleMapsUrl: string;
  googleMapsEmbedQuery: string;
  coordinatorContact?: string;
}
