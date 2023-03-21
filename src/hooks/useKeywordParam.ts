import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const useKeywordParam = () => {
  const location = useLocation();

  const getKeywordParam = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('keyword') || '';
  }, [location.search]);

  return { getKeywordParam };
};

export default useKeywordParam;
