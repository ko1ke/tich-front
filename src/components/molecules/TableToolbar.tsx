import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import TablePostDialog from './TablePostDialog';
import type { Ticker } from '../../typings';

type Props = {
  addHandler: (item: any) => void;
  title: string;
  tickers: Ticker[];
};

const TableToolbar: React.FC<Props> = ({
  addHandler,
  title,
  tickers,
}: Props) => {
  return (
    <Toolbar>
      <TablePostDialog addHandler={addHandler} tickers={tickers} />
      <Typography sx={{ flex: '1 1 100%' }} variant="h6">
        {title}
      </Typography>
    </Toolbar>
  );
};

export default TableToolbar;
