import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import Box from '@mui/material/Box';
import LikeButton from '../atoms/LikeButton';
import { News } from '../../typings';
import LazyLoad from 'react-lazyload';
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  RedditShareButton,
  RedditIcon,
} from 'react-share';

interface NewsCardProps extends News {
  handleChangeLike: Function;
}

const NewsCard: React.FC<NewsCardProps> = ({
  id,
  headline,
  body,
  fetchedFrom,
  symbol,
  linkUrl,
  imageUrl,
  originalCreatedAt,
  favoredByCurrentUser,
  handleChangeLike,
}) => {
  const user = useSelector(selectUser);

  const complementAsHtml = (text) => {
    const innerHTML = { __html: text };
    return <div dangerouslySetInnerHTML={innerHTML} />;
  };

  return (
    <Card sx={{ maxWidth: 345 }} onClick={() => window.open(linkUrl, '_blank')}>
      <CardActionArea>
        {imageUrl && (
          <LazyLoad>
            <CardMedia
              component="img"
              alt="Sorry, image not found"
              height="140"
              src={imageUrl}
            />
          </LazyLoad>
        )}

        <CardContent>
          {headline && (
            <Typography gutterBottom variant="h6" component="h2">
              {headline}
            </Typography>
          )}
          {body && fetchedFrom !== 'Hacker News' && (
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              gutterBottom
            >
              {body}
            </Typography>
          )}
          {body && fetchedFrom === 'Hacker News' && complementAsHtml(body)}
          <Typography variant="caption" display="block" align="right">
            Source: {fetchedFrom}
          </Typography>
          {symbol && (
            <Typography variant="caption" display="block" align="right">
              Target symbol: {symbol}
            </Typography>
          )}
          <Typography variant="caption" display="block" align="right">
            Created at: {originalCreatedAt}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <TwitterShareButton title={headline} url={linkUrl} via={'TiCh'}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <FacebookShareButton title={headline} url={linkUrl} quote={'TiCh'}>
          <FacebookIcon size={32} round={true} />
        </FacebookShareButton>
        <RedditShareButton title={headline} url={linkUrl}>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <Box style={{ marginLeft: 'auto' }}>
          {!user?.uid ? (
            <></>
          ) : (
            <LikeButton
              isFavorite={favoredByCurrentUser}
              handleChangeLike={() =>
                handleChangeLike({ newsId: id, isLiked: favoredByCurrentUser })
              }
            />
          )}
        </Box>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
