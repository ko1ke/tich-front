import React from 'react';
import IconButton from '@mui/material/IconButton';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import Tooltip from '@mui/material/Tooltip';
import type { PropTypes } from '@mui/material';

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
