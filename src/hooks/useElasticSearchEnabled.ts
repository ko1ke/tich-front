import { useFlags } from 'flagsmith/react';
const isDevelopment = process.env.NODE_ENV === 'development';

const useElasticSearchEnabled = () => {
  const flags = useFlags(['elastic_search']);
  // activate always in development
  const elasticSearchEnabled = flags.elastic_search.enabled || isDevelopment;

  return { elasticSearchEnabled };
};

export default useElasticSearchEnabled;
