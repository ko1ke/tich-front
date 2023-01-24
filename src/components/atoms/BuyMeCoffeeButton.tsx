import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Tooltip from '@material-ui/core/Tooltip';

type Props = {
  handleTip: () => void;
};

const BuyMeCoffeeButton: React.FC<Props> = ({ handleTip }) => {
  const onClickButton = () => {
    handleTip();
  };

  return (
    <IconButton
      aria-label="buy-me-a-coffee"
      color="inherit"
      onClick={onClickButton}
    >
      <Tooltip title="Buy me a coffee!">
        <LocalCafeIcon />
      </Tooltip>
    </IconButton>
  );
};

export default BuyMeCoffeeButton;
