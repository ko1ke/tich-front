import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const NewsCard = ({
  headline,
  body,
  fetchedFrom,
  symbol,
  linkUrl,
  imageUrl,
  originalCreatedAt,
}) => {
  const classes = useStyles();

  const complementAsHtml = (text) => {
    const innerHTML = { __html: text };
    return <div dangerouslySetInnerHTML={innerHTML} />;
  };

  return (
    <Card
      className={classes.root}
      onClick={() => window.open(linkUrl, '_blank')}
    >
      <CardActionArea>
        {imageUrl && (
          <CardMedia
            component="img"
            alt="Sorry, image not found"
            height="140"
            src={imageUrl}
          />
        )}

        <CardContent>
          {headline && (
            <Typography gutterBottom variant="h5" component="h2">
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
          <Typography variant="caption" display="block" align="right">
            Target symbol: {symbol}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default NewsCard;
