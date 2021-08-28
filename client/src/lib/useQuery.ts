import { useState, useEffect, useCallback } from 'react';
import fetchData from './api';

interface State<T> {
  loading: boolean;
  error: boolean;
  data: T | null;
}

interface QueryResults<T> extends State<T> {
  fetch: () => void;
}

const useQuery = <T = any>(query: string): QueryResults<T> => {
  const [state, setState] = useState<State<T>>({
    loading: false,
    error: false,
    data: null
  });

  const fetch = useCallback(() => {
    const getListings = async () => {
      try {
        setState({ loading: true, error: false, data: null });
        const { errors, data } = await fetchData<T>({ query });
        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }
        setState({ loading: false, error: false, data });
      } catch (error) {
        setState({ loading: false, error: true, data: null });
        throw console.error(error);
      }
    };
    getListings();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, fetch };
};

export default useQuery;
