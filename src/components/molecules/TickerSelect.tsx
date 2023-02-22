import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import useQueryTickers from '../../hooks/useQueryTickers';

interface TickerSelectProps {
  selectValue: string;
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
  selectValue,
  handler,
  helperText,
}) => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const { data: tickers } = useQueryTickers();

  return (
    <FormControl fullWidth className={classes.root}>
      <NativeSelect value={selectValue} onChange={handler}>
        <option value="">All symbols</option>
        <option value="FAVORITES" disabled={!user?.isAuthenticated}>
          😊 Your Favorites (ticker symbols in your portfolio)
        </option>
        {tickers &&
          tickers.map((ticker) => (
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
