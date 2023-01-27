import React, { useMemo, useCallback, useRef } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { fetchFavoriteNews } from '../api/favoriteNews';
import { FavoriteNewsQueryParams, NewsResponse } from '../typings';
import { createFavorite, deleteFavorite } from '../api/favorite';

const DEFAULT_PAGE = 1;
const DEFAULT_KEYWORD = '';
const SUPPORTED_PARAMS = ['page', 'keyword'];

const useFavoriteNews = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const location = useLocation();
  const scrollRef = useRef<HTMLElement>(null);
  const queryClient = useQueryClient();

  const getQueryParams = (
    urlParams: URLSearchParams
  ): FavoriteNewsQueryParams => {
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

    return obj as FavoriteNewsQueryParams;
  };

  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const queryParams = useMemo(() => {
    return getQueryParams(urlParams);
  }, [urlParams]);

  const updateURL = useCallback(() => {
    // remove explicit page (if default) for cleaner url (getQueryParams() will default to page DEFAULT_PAGE)
    if (urlParams.get('page') === `${DEFAULT_PAGE}`) {
      urlParams.delete('page');
    }
    // remove explicit keyword (if default) for cleaner url (getQueryParams() will default to limit DEFAULT_KEYWORD)
    if (urlParams.get('keyword') === `${DEFAULT_KEYWORD}`) {
      urlParams.delete('keyword');
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

  const handleChangeKeyword = useCallback(
    (value: string) => {
      urlParams.set('keyword', value);
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
        const previousNews = queryClient.getQueryData<NewsResponse>([
          'favorite_news',
          queryParams,
        ]);
        const index = previousNews.contents.findIndex(
          (n) => n.id === variables.newsId
        );
        const newNews = { ...previousNews };
        newNews.contents[index].favoredByCurrentUser = !variables.isLiked;
        queryClient.setQueryData(['favorite_news', queryParams], newNews);
      },
      onError: (err: any) => {
        console.log(err);
      },
    }
  );

  const { data, isError, isLoading } = useQuery({
    queryKey: ['favorite_news', queryParams],
    cacheTime: 0,
    enabled: !!user && user.isAuthenticated !== null,
    queryFn: async () => {
      const { data } = await fetchFavoriteNews({
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
    handleChangeKeyword,
    toggleLikeMutation,
  };
};

export default useFavoriteNews;
