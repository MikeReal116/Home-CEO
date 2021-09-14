import axios from 'axios';
import { ReturnGeocode } from './types';

export const Geocode = {
  geocode: async (location: string): Promise<ReturnGeocode | undefined> => {
    try {
      const { data } = await axios.get(
        `http://api.positionstack.com/v1/forward?access_key=${
          process.env.POSTITION_STACK as string
        }&query=${location}&limit=1`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
};
