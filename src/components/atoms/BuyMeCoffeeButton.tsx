import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import LocalCafeIcon from '@material-ui/icons/LocalCafe';
import Tooltip from '@material-ui/core/Tooltip';
import type { PropTypes } from '@material-ui/core';

type Props = {
  handleChip: () => void;
  tip?: string;
  color?: PropTypes.Color;
};

const BuyMeCoffeeButton: React.FC<Props> = ({
  handleChip,
  tip = 'Buy me a coffee!',
  color = 'inherit',
}) => {
  const onClickButton = () => {
    handleChip();
  };

  return (
    <IconButton
      aria-label="buy-me-a-coffee"
      color={color}
      onClick={onClickButton}
    >
      <Tooltip title={tip}>
        <LocalCafeIcon />
      </Tooltip>
    </IconButton>
  );
};

export default BuyMeCoffeeButton;
