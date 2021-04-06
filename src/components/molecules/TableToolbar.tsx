import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PostDialog from './PostDialog';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
}));

const TableToolbar: React.FC<Props> = ({
  addHandler,
  title,
  tickers,
}: Props) => {
  const classes = useToolbarStyles();
  return (
    <Toolbar>
      <PostDialog addHandler={addHandler} tickers={tickers} />
      <Typography className={classes.title} variant="h6">
        {title}
      </Typography>
    </Toolbar>
  );
};

type Props = {
  addHandler: (item: any) => void;
  title: string;
  tickers: any;
};

export default TableToolbar;
