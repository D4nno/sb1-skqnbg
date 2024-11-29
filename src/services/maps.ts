import { GoogleMaps } from '@nativescript/google-maps';

interface Place {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export const searchPlaces = async (query: string): Promise<Place[]> => {
  try {
    // Implementation will be added when Google Maps API key is configured
    // For now, return mock data
    return [
      { name: query + " Place 1", location: { latitude: 0, longitude: 0 } },
      { name: query + " Place 2", location: { latitude: 0, longitude: 0 } },
      { name: query + " Place 3", location: { latitude: 0, longitude: 0 } },
    ];
  } catch (error) {
    console.error("Failed to search places:", error);
    throw error;
  }
};