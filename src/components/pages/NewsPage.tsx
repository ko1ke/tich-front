import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import { fetchNews } from '../../api/news';
import NewsCard from '../molecules/NewsCard';
import GenericTemplate from '../templates/GenericTemplate';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

interface News {
  id: number;
  headline: string;
  body: string;
  fetchedFrom: string;
  symbol: string;
  linkUrl: string;
  imageUrl: string;
  originalCreatedAt: String;
}
const useStyles = makeStyles((theme) => ({
  title: {
    margin: '10px 0',
  },
}));

const NewsPage: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const [news, setNews] = useState<News[]>(null);

  useEffect(() => {
    if (user?.uid) {
      fetchNews({ uid: user.uid, token: user.idToken })
        .then((res) => {
          const data: News[] = res.data.map((d) => {
            return {
              id: d.id,
              headline: d.headline,
              body: d.body,
              fetchedFrom: d.fetchedFrom,
              symbol: d.symbol,
              linkUrl: d.linkUrl,
              imageUrl: d.imageUrl,
              originalCreatedAt: d.originalCreatedAt,
            };
          });
          setNews(data);
        })
        .catch((err) => {
          alert(err);
        });
    }
  }, [user]);

  return (
    <GenericTemplate title="News">
      <GridList cols={3} cellHeight="auto">
        {news &&
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
          })}
      </GridList>
    </GenericTemplate>
  );
};

export default NewsPage;
