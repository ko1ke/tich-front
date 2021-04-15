import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';

interface Ticker {
  symbol: string;
  formalName: string;
}

interface TickerSelectProps {
  tickers: Ticker[];
  value: string;
  helperText: string;
  handler: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.background.paper,
      padding: '4px 8px',
      marginBottom: theme.spacing(2),
    },
  })
);

const TickerSelect: React.FC<TickerSelectProps> = ({
  tickers,
  value,
  handler,
  helperText,
}) => {
  const classes = useStyles();
  const user = useSelector(selectUser);

  return (
    <FormControl fullWidth className={classes.root}>
      <NativeSelect value={value} onChange={handler}>
        <option value="">All symbols</option>
        <option value="FAVORITES" disabled={!user?.isAuthenticated}>
          😊 Your Favorites (ticker symbols in your portfolio)
        </option>
        {tickers.map((ticker) => (
          <option key={ticker.symbol} value={ticker.symbol}>
            {`${ticker.symbol} (${ticker.formalName})`}
          </option>
        ))}
      </NativeSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TickerSelect;
