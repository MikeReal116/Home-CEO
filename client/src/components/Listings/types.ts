export interface Listing {
  id: string;
  title: string;
  image: string;
  address: string;
  price: number;
  numOfBeds: number;
  numOfGuest: number;
  numOfBaths: number;
  rating: number;
}

export interface ListingsData {
  listings: Listing[];
}

export interface DeleteListing {
  listing: Listing;
}

export interface DeleteVariable {
  id: string;
}
