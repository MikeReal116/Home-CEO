import { useState } from 'react';
import fetchData from './api';

interface State<T> {
  mutationLoading: boolean;
  mutationError: boolean;
  mutationData: T | null;
}

type ReturnTuple<T, TVariable> = [
  State<T>,
  (variables?: TVariable) => Promise<void>
];

const useMutaion = <T = any, TVariable = any>(
  query: string
): ReturnTuple<T, TVariable> => {
  const [state, setState] = useState<State<T>>({
    mutationLoading: false,
    mutationError: false,
    mutationData: null
  });

  const fetch = async (variables?: TVariable) => {
    try {
      setState({
        mutationLoading: true,
        mutationError: false,
        mutationData: null
      });

      const { errors, data } = await fetchData<T, TVariable>({
        query,
        variables
      });
      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      setState({
        mutationLoading: false,
        mutationError: false,
        mutationData: data
      });
    } catch (error) {
      setState({
        mutationLoading: false,
        mutationError: true,
        mutationData: null
      });
    }
  };

  return [state, fetch];
};

export default useMutaion;
