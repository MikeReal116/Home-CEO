import { fakeData } from '../fake';

export const resolvers = {
  Query: {
    listings: () => fakeData,
    getListing: (_root: undefined, { id }: { id: string }) => {
      return fakeData.find((list) => list.id === id);
    }
  }
};
