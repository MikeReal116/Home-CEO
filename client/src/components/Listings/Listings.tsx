import { useQuery, useMutation, gql } from '@apollo/client';

import { Listing, ListingsData } from './types';

const GET_LISTINGS = gql`
  query GetListings {
    listings {
      id
      title
      address
    }
  }
`;

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    listing: deleteListing(id: $id) {
      id
      title
      address
    }
  }
`;

interface DeleteVariable {
  id: string;
}

const Listings = () => {
  const { data, loading, error, refetch } =
    useQuery<ListingsData>(GET_LISTINGS);

  const [deleteMutation, { error: deleteError, loading: deleteLoading }] =
    useMutation<Listing, DeleteVariable>(DELETE_LISTING);

  const deleteListing = async (id: string) => {
    await deleteMutation({ variables: { id } });
    refetch();
  };
  if (loading) {
    return <h2>Loading..</h2>;
  }

  if (error) {
    return <h2>Something went Wrong</h2>;
  }

  const deleteListingProgress = deleteLoading ? <h6>Deleting</h6> : null;
  const deleteListingError = deleteError ? (
    <h6>Something went wrong! Try again later</h6>
  ) : null;
  const renderListings = data
    ? data.listings.map((listing) => {
        return (
          <ul key={listing.id}>
            <li>{listing.title}</li>
            <li>{listing.address}</li>
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
          </ul>
        );
      })
    : null;

  return (
    <div>
      {renderListings}
      {deleteListingProgress}
      {deleteListingError}
    </div>
  );
};

export default Listings;
