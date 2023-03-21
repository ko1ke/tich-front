import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { EsMatchType } from '../typings';

const DEFAULT_MATCH_TYPE = 'cross_fields';

const useMatchTypeParam = () => {
  const location = useLocation();

  const getMatchTypeParam = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const matchTypeParam = searchParams.get('type') as EsMatchType;
    if (
      [DEFAULT_MATCH_TYPE, 'best_fields', 'most_fields'].includes(
        matchTypeParam
      )
    ) {
      return matchTypeParam;
    } else {
      return DEFAULT_MATCH_TYPE;
    }
  }, [location.search]);

  return { getMatchTypeParam };
};

export default useMatchTypeParam;
