import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TickerSelect from '../molecules/TickerSelect';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import NewsCard from '../molecules/NewsCard';
import GenericTemplate from '../templates/GenericTemplate';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Loader from '../molecules/Loader';
import Pagination from '@material-ui/lab/Pagination';
import useCompanyNews from '../../hooks/useCompanyNews';

const useStyles = makeStyles((theme) => ({
  title: {
    margin: '10px 0',
  },
}));

const NewsPage: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const {
    news,
    tickers,
    page,
    scrollRef,
    queryParams,
    handleChangeSymbol,
    handleChangePage,
  } = useCompanyNews();

  return (
    <GenericTemplate title="Company News" ref={scrollRef}>
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
                  id={n.id}
                  headline={n.headline}
                  body={n.body}
                  fetchedFrom={n.fetchedFrom}
                  symbol={n.symbol}
                  linkUrl={n.linkUrl}
                  imageUrl={n.imageUrl}
                  originalCreatedAt={n.originalCreatedAt}
                  favoredByCurrentUser={n.favoredByCurrentUser}
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
