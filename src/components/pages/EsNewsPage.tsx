import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import NewsCard from '../molecules/NewsCard';
import GenericTemplate from '../templates/GenericTemplate';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Loader from '../molecules/Loader';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import KeywordSearchForm from '../molecules/KeywordSearchForm';
import useEsNews from '../../hooks/useEsNews';
import ErrorPage from './ErrorPage';
import EsMatchTypeToggleButton from '../molecules/EsMatchTypeToggleButton';
import EsOperatorToggleButton from '../molecules/EsOperatorToggleButton copy';
import { styled } from '@mui/system';

const NewsPage: React.FC = () => {
  const theme = useTheme();
  const downSm = useMediaQuery(theme.breakpoints.down('sm'));
  const downMd = useMediaQuery(theme.breakpoints.down('md'));
  const {
    data,
    isLoading,
    isError,
    scrollRef,
    queryParams,
    handleChangeSearchKey,
    handleChangePage,
    toggleLikeMutation,
  } = useEsNews();

  const FlexBox = styled(Box)({
    display: 'flex',
    gap: theme.spacing(2),
  });

  if (isError) return <ErrorPage />;

  return (
    <GenericTemplate title="News powered by elastic search" ref={scrollRef}>
      <KeywordSearchForm handler={handleChangeSearchKey} target="keyword" />
      <FlexBox>
        <EsMatchTypeToggleButton handler={handleChangeSearchKey} />
        <EsOperatorToggleButton handler={handleChangeSearchKey} />
      </FlexBox>

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
