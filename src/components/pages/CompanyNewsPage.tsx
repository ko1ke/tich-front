import React from 'react';
import TickerSelect from '../molecules/TickerSelect';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NewsCard from '../molecules/NewsCard';
import GenericTemplate from '../templates/GenericTemplate';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Loader from '../molecules/Loader';
import Pagination from '@mui/material/Pagination';
import useCompanyNews from '../../hooks/useCompanyNews';
import ErrorPage from './ErrorPage';

const NewsPage: React.FC = () => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const {
    data,
    isLoading,
    isError,
    queryParams,
    scrollRef,
    handleChangeSymbol,
    handleChangePage,
    toggleLikeMutation,
  } = useCompanyNews();

  if (isError) return <ErrorPage />;

  return (
    <GenericTemplate title="Company News" ref={scrollRef}>
      <TickerSelect
        selectValue={queryParams.symbol}
        helperText={'Select a symbol to show the related articles'}
        handler={handleChangeSymbol}
      />
      <ImageList
        cols={downSm ? 1 : downMd ? 2 : 3}
        rowHeight="auto"
        variant="masonry"
        gap={8}
      >
        {data ? (
          data.contents.map((n) => {
            return (
              <ImageListItem key={n.id} cols={1}>
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
                  handleChangeLike={toggleLikeMutation.mutate}
                />
              </ImageListItem>
            );
          })
        ) : (
          <></>
        )}
      </ImageList>
      {isLoading && <Loader />}
      {data && (
        <Pagination
          count={data.page.totalPages}
          page={+queryParams.page}
          onChange={handleChangePage}
        />
      )}
      {data && data.page.totalPages === 0 && <>Articles not found.</>}
    </GenericTemplate>
  );
};

export default NewsPage;
