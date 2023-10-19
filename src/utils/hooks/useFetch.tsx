import { useState, useEffect } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const initialState: FetchState<null> = {
  data: null,
  loading: false,
  error: null,
};

function useFetch<T>(url: string): [T | null, () => Promise<void>, boolean] {

  /**
   * Hooks.
   */


  const [fetchState, setFetchState] = useState<FetchState<T> | FetchState<null>>(initialState);

  const fetchData = async () => {
    setFetchState({ ...fetchState, loading: true, error: null });
    try {
      const response = await fetch(url);
      if (!response.ok) {
        setFetchState({ data: null, loading: false, error: new Error('Network error') });
        console.error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFetchState({ data, loading: false, error: null });
    } catch (error) {
      setFetchState({ ...fetchState, loading: false, error: error as Error });
      console.error(error);
      // Explicitly cast error to Error type
    }
  };

  return [fetchState.data, fetchData, fetchState.loading];
}

export default useFetch;
