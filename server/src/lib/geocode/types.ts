export interface GeocodeArea {
  latitude: number | null;
  longitude: number | null;
  label: string | null;
  name: string | null;
  type: string | null;
  number: number | null;
  street: string | null;
  locality: string | null;
  postal_code: number | null;
  region: string | null;
  administrative_area: string | null;
  country: string | null;
}

export interface ReturnGeocode {
  data: GeocodeArea[];
}
