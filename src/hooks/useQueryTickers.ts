import { useQuery } from '@tanstack/react-query';
import { fetchTickers } from '../api/ticker';

const useQueryTickers = () => {
  const { data } = useQuery({
    queryKey: ['tickers'],
    queryFn: async () => {
      const { data } = await fetchTickers();
      return data;
    },
    onError: (err: any) => {
      alert(err);
    },
  });
  return { data };
};

export default useQueryTickers;
