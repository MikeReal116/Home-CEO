import React from 'react';
import fetchData from '../../lib/api';
import { DeleteListing, DeleteVariable, ListingsData } from './types';

const Listings = () => {
  const GET_LISTINGS = `
        query GetListings{
            listings {
                id
                title
                address
            }
        }    

    `;

  const DELETE_LISTING = `
        mutation DeleteListing($id: ID!) {
           listing :deleteListing(id: $id){
                id
                title
                address
            }
        }
    `;

  const handleClick = async () => {
    const {
      data: { listings }
    } = await fetchData<ListingsData>({ query: GET_LISTINGS });
    console.log(listings);
  };

  const deleteListing = async () => {
    const {
      data: { listing }
    } = await fetchData<DeleteListing, DeleteVariable>({
      query: DELETE_LISTING,
      variables: { id: '612587bd18b46d700e924a1c' }
    });
    console.log(listing);
  };

  return (
    <div>
      <button onClick={handleClick}>Fetch data</button>
      <button onClick={deleteListing}>Delete</button>
    </div>
  );
};

export default Listings;
