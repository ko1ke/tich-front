import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

type Props = {
  isFavorite: boolean;
  handleChangeLike: () => void;
};

const useStyles = makeStyles((theme) => ({
  button: {
    border: 'none',
    outline: 'none',
    background: 'transparent',
  },
}));

const FavButton: React.FC<Props> = ({ isFavorite, handleChangeLike }) => {
  const classes = useStyles();
  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleChangeLike();
  };

  if (isFavorite)
    return (
      <button className={classes.button} type="button" onClick={onClickButton}>
        <FavoriteIcon color="error" />
      </button>
    );
  return (
    <button className={classes.button} type="button" onClick={onClickButton}>
      <FavoriteBorderIcon />
    </button>
  );
};

export default FavButton;
