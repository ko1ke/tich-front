import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

type Props = {
  isFavorite: boolean;
};

const useStyles = makeStyles((theme) => ({
  button: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
  },
}));

const FavButton: React.FC<Props> = ({ isFavorite }) => {
  const classes = useStyles();

  if (isFavorite)
    return (
      <button className={classes.button}>
        <FavoriteIcon color="error" />
      </button>
    );
  return (
    <button className={classes.button}>
      <FavoriteBorderIcon />
    </button>
  );
};

export default FavButton;
