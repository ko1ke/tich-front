import React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/userSlice';
import useQueryTickers from '../../hooks/useQueryTickers';
import { useTheme } from '@mui/material/styles';

interface TickerSelectProps {
  selectValue: string;
  helperText: string;
  handler: (
    event: React.ChangeEvent<{
      value: unknown;
    }>
  ) => void;
}

const TickerSelect: React.FC<TickerSelectProps> = ({
  selectValue,
  handler,
  helperText,
}) => {
  const theme = useTheme();
  const user = useSelector(selectUser);
  const { data: tickers } = useQueryTickers();

  return (
    <FormControl
      fullWidth
      sx={{
        backgroundColor: theme.palette.background.paper,
        padding: '4px 8px',
        marginBottom: theme.spacing(2),
      }}
    >
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
