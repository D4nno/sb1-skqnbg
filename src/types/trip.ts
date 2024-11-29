export interface Location {
  latitude: number;
  longitude: number;
}

export interface Stop {
  name: string;
  location: Location | null;
  dwellTime: number;
}