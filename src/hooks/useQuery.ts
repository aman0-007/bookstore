import { useState, useEffect } from 'react';

interface QueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useQuery<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options?: { enabled?: boolean }
): QueryResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (options?.enabled === false) {
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const result = await fetchFn();
        setData(result);
        setError(null);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key, fetchFn, options?.enabled]);

  return { data, isLoading, error };
}