interface Listing {
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
  data: {
    listings: Listing[];
  };
}

export interface DeleteListing {
  data: {
    listing: Listing;
  };
}

export interface DeleteVariable {
  id: string;
}
