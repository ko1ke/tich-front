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
    cursor: 'pointer',
  },
}));

const LikeButton: React.FC<Props> = ({ isFavorite, handleChangeLike }) => {
  const classes = useStyles();
  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleChangeLike();
  };

  return (
    <button className={classes.button} type="button" onClick={onClickButton}>
      {isFavorite ? <FavoriteIcon color="secondary" /> : <FavoriteBorderIcon />}
    </button>
  );
};

export default LikeButton;
