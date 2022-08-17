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
import { News, Page, CompanyNewsQueryParams, Ticker } from '../typings';
import { fetchCompanyNews } from '../api/companyNews';
import { fetchTickers } from '../api/ticker';
import { createFavorite, deleteFavorite } from '../api/favorite';

const DEFAULT_PAGE = 1;
const DEFAULT_SYMBOL = '';
const SUPPORTED_PARAMS = ['page', 'symbol'];

const useCompanyNews = () => {
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
  const [tickers, setTickers] = useState<Ticker[]>([]);

  const getQueryParams = (
    urlParams: URLSearchParams
  ): CompanyNewsQueryParams => {
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

    if (!keys.includes('symbol')) {
      obj.symbol = DEFAULT_SYMBOL;
    }

    return obj as CompanyNewsQueryParams;
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
    // remove explicit symbol (if default) for cleaner url (getQueryParams() will default to limit DEFAULT_SYMBOL)
    if (urlParams.get('symbol') === `${DEFAULT_SYMBOL}`) {
      urlParams.delete('symbol');
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

  const handleChangeSymbol = (event: React.ChangeEvent<{ value: unknown }>) => {
    urlParams.set('symbol', event.target.value as string);
    // reset page param
    urlParams.set('page', '1');
    updateURL();
  };

  const handleChangeLike = (newsId: number, isLiked: boolean) => {
    if (isLiked) {
      deleteFavorite({
        uid: user.uid,
        token: user.idToken,
        newsId,
      })
        .then(() => {
          const index = news.findIndex((n) => n.id === newsId);
          const newNews = [...news];
          newNews[index] = { ...newNews[index], favoredByCurrentUser: false };
          setNews(newNews);
        })
        .catch((err) => {
          alert(err);
        });
    } else {
      createFavorite({
        uid: user.uid,
        token: user.idToken,
        newsId,
      })
        .then(() => {
          const index = news.findIndex((n) => n.id === newsId);
          const newNews = [...news];
          newNews[index] = { ...newNews[index], favoredByCurrentUser: true };
          setNews(newNews);
        })
        .catch((err) => {
          alert(err);
        });
    }
  };

  useEffect(() => {
    if (user) {
      fetchCompanyNews({
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

  useEffect(() => {
    fetchTickers()
      .then((res) => {
        setTickers(res.data as Ticker[]);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return {
    news,
    page,
    tickers,
    queryParams,
    scrollRef,
    handleChangePage,
    handleChangeSymbol,
    handleChangeLike,
  };
};

export default useCompanyNews;
