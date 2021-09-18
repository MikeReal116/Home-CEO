export interface CreateBookingArgs {
  input: {
    listing: string;
    checkIn: string;
    checkOut: string;
    source: string;
  };
}

interface BookingIndexDay {
  [key: string]: boolean;
}
interface BookingIndexMonth {
  [key: string]: BookingIndexDay;
}
export interface BookingIndexYear {
  [key: string]: BookingIndexMonth;
}
