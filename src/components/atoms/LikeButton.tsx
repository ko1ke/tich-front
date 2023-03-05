import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { styled } from '@mui/system';

type Props = {
  isFavorite: boolean;
  handleChangeLike: () => void;
};

const Button = styled('button')({
  border: 'none',
  outline: 'none',
  background: 'transparent',
  cursor: 'pointer',
});

const LikeButton: React.FC<Props> = ({ isFavorite, handleChangeLike }) => {
  const onClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    handleChangeLike();
  };

  return (
    <Button type="button" onClick={onClickButton}>
      {isFavorite ? <FavoriteIcon color={'error'} /> : <FavoriteBorderIcon />}
    </Button>
  );
};

export default LikeButton;
