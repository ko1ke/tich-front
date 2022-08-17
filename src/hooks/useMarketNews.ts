import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { parseISO } from 'date-fns';
import { selectUser } from '../features/userSlice';
import { fetchMarketNews } from '../api/marketNews';
import { News, Page, MarketNewsQueryParams } from '../typings';

const DEFAULT_PAGE = 1;
const DEFAULT_KEYWORD = '';
const SUPPORTED_PARAMS = ['page', 'keyword'];

const useMarketNews = () => {
  const user = useSelector(selectUser);
  const history = useHistory();
  const location = useLocation();
  const scrollRef = useRef<HTMLElement>(null);

  const [news, setNews] = useState<News[]>(null);
  const [page, setPage] = useState<Page>({
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    totalPages: null,
    isFirstPage: null,
    isLastPage: null,
  });

  const getQueryParams = (
    urlParams: URLSearchParams
  ): MarketNewsQueryParams => {
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

    return obj as MarketNewsQueryParams;
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

  const handleChangeKeyword = (value: string) => {
    urlParams.set('keyword', value);
    // reset page param
    urlParams.set('page', '1');
    updateURL();
  };

  useEffect(() => {
    if (user) {
      fetchMarketNews({
        uid: user.uid,
        token: user.idToken,
        params: queryParams,
      })
        .then((res) => {
          const contents: News[] = res.data.contents.map((d) => {
            return {
              id: d.id,
              headline: d.headline,
              body: d.body,
              fetchedFrom: d.fetchedFrom,
              symbol: d.symbol,
              linkUrl: d.linkUrl,
              imageUrl: d.imageUrl,
              originalCreatedAt: parseISO(d.originalCreatedAt),
              favoredByCurrentUser: d.favoredByCurrentUser,
            };
          });
          setNews(contents);
          setPage(res.data.page as Page);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [queryParams, user]);
  return {
    news,
    page,
    queryParams,
    scrollRef,
    handleChangePage,
    handleChangeKeyword,
  };
};

export default useMarketNews;
