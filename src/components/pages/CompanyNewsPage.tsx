import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { fetchCompanyNews } from '../../api/companyNews';
import { fetchTickers } from '../../api/ticker';
import TickerSelect from '../molecules/TickerSelect';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NewsCard from '../molecules/NewsCard';
import GenericTemplate from '../templates/GenericTemplate';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { parseISO } from 'date-fns';
import Loader from '../molecules/Loader';
import Pagination from '@material-ui/lab/Pagination';

interface News {
  id: number;
  headline: string;
  body: string;
  fetchedFrom: string;
  symbol: string;
  linkUrl: string;
  imageUrl: string;
  originalCreatedAt: Date;
}

interface Page {
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
}

interface Ticker {
  symbol: string;
  formalName: string;
}

interface DataQueryParams {
  page: number;
  symbol: string;
}

const DEFAULT_PAGE = 1;
const DEFAULT_SYMBOL = '';
const supportedParams = ['page', 'symbol'];

const getQueryParams = (urlParams: URLSearchParams): DataQueryParams => {
  const obj: any = Array.from(urlParams)
    .filter((param) => supportedParams.includes(param[0]))
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

  return obj as DataQueryParams;
};

const useStyles = makeStyles((theme) => ({
  title: {
    margin: '10px 0',
  },
}));

const NewsPage: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const history = useHistory();
  const location = useLocation();
  const mainRef = useRef(null);
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));

  const urlParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);

  const queryParams = useMemo(() => {
    return getQueryParams(urlParams);
  }, [urlParams]);

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
      mainRef.current.scrollTo({
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

  return (
    <GenericTemplate title="Company News" ref={mainRef}>
      {tickers && (
        <TickerSelect
          tickers={tickers}
          value={queryParams.symbol}
          helperText={'Select a symbol to show the related articles'}
          handler={handleChangeSymbol}
        />
      )}
      <GridList cols={downSm ? 1 : downMd ? 2 : 3} cellHeight="auto">
        {news ? (
          news.map((n) => {
            return (
              <GridListTile key={n.id} cols={1} className={classes.title}>
                <NewsCard
                  headline={n.headline}
                  body={n.body}
                  fetchedFrom={n.fetchedFrom}
                  symbol={n.symbol}
                  linkUrl={n.linkUrl}
                  imageUrl={n.imageUrl}
                  originalCreatedAt={n.originalCreatedAt}
                />
              </GridListTile>
            );
          })
        ) : (
          <Loader />
        )}
      </GridList>
      {news ? (
        <Pagination
          count={page.totalPages}
          page={+queryParams.page}
          onChange={handleChangePage}
        />
      ) : (
        page.totalPages === 0 && <>Articles not found.</>
      )}
    </GenericTemplate>
  );
};

export default NewsPage;
