import React, { useMemo, useCallback, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { fetchEsNews } from '../api/esNews';
import { EsNewsQueryParams, NewsPage } from '../typings';
import { createFavorite, deleteFavorite } from '../api/favorite';

const DEFAULT_PAGE = 1;
const DEFAULT_KEYWORD = '';
const DEFAULT_MATCH_TYPE = 'cross_fields';
const DEFAULT_OPERATOR = 'and';
const SUPPORTED_PARAMS = ['page', 'keyword', 'type', 'operator'];

const useEsNews = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const location = useLocation();
  const scrollRef = useRef<HTMLElement>(null);
  const queryClient = useQueryClient();

  const getQueryParams = (urlParams: URLSearchParams): EsNewsQueryParams => {
    const obj: any = Array.from(urlParams)
      .filter((param) => SUPPORTED_PARAMS.includes(param[0]))
      .map((param) => {
        return {
          [param[0]]: param[1],
        };
      })
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});

    const keys = Object.keys(obj);

    if (!keys.includes('page')) {
      obj.page = DEFAULT_PAGE;
    }

    if (!keys.includes('keyword')) {
      obj.keyword = DEFAULT_KEYWORD;
    }

    if (!keys.includes('type')) {
      obj.type = DEFAULT_MATCH_TYPE;
    }

    if (!keys.includes('operator')) {
      obj.operator = DEFAULT_OPERATOR;
    }

    return obj as EsNewsQueryParams;
  };

  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const queryParams = useMemo(() => {
    return getQueryParams(urlParams);
  }, [urlParams]);

  const updateURL = useCallback(() => {
    if (urlParams.get('page') === `${DEFAULT_PAGE}`) {
      urlParams.delete('page');
    }
    if (urlParams.get('keyword') === `${DEFAULT_KEYWORD}`) {
      urlParams.delete('keyword');
    }
    if (urlParams.get('type') === `${DEFAULT_MATCH_TYPE}`) {
      urlParams.delete('type');
    }
    if (urlParams.get('operator') === `${DEFAULT_OPERATOR}`) {
      urlParams.delete('operator');
    }
    history.push({
      pathname: location.pathname,
      search: `?${urlParams}`,
    });
  }, [urlParams, history, location]);

  const handleChangePage = useCallback(
    (_event: React.ChangeEvent<unknown>, newPage: number) => {
      urlParams.set('page', newPage.toString());
      updateURL();
      scrollRef.current.scrollTo({
        top: 0,
        left: 0,
      });
    },
    [updateURL, urlParams]
  );

  const handleChangeSearchKey = useCallback(
    (value: string, target: 'keyword' | 'type' | 'operator') => {
      urlParams.set(target, value);
      // reset page param
      urlParams.set('page', '1');
      updateURL();
    },
    [urlParams, updateURL]
  );

  const toggleLikeMutation = useMutation(
    async ({ newsId, isLiked }: { newsId: number; isLiked: boolean }) => {
      const toggleFn = isLiked ? deleteFavorite : createFavorite;

      await toggleFn({
        uid: user.uid,
        token: user.idToken,
        newsId,
      });
    },
    {
      onSuccess: (_res, variables) => {
        const previousNews = queryClient.getQueryData<NewsPage>([
          'es_news',
          queryParams,
        ]);
        const index = previousNews.contents.findIndex(
          (n) => n.id === variables.newsId
        );
        const newNews = { ...previousNews };
        newNews.contents[index].favoredByCurrentUser = !variables.isLiked;
        queryClient.setQueryData(['es_news', queryParams], newNews);
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: ['es_news', queryParams],
    cacheTime: 0,
    enabled: !!user && user.isAuthenticated !== null,
    queryFn: async () => {
      const { data } = await fetchEsNews({
        uid: user.uid,
        token: user.idToken,
        params: queryParams,
      });
      return data;
    },
    onError: (err: any) => {
      console.log(err);
    },
  });

  return {
    data,
    isLoading,
    isError,
    queryParams,
    scrollRef,
    handleChangePage,
    handleChangeSearchKey,
    toggleLikeMutation,
  };
};

export default useEsNews;
