import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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

const TickerSelect: React.FC<TickerSelectProps> = ({
  tickers,
  value,
  handler,
  helperText,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="select-helper-label">Ticker Symbol</InputLabel>
      <Select
        labelId="select-helper-label"
        id="simple-select-helper"
        value={value}
        onChange={handler}
      >
        <MenuItem value="">
          <em>All symbols</em>
        </MenuItem>
        <MenuItem value="FAVORITES">
          <em>Your Favorites (ticker symbols in your portfolio)</em>
        </MenuItem>
        {tickers.map((ticker) => (
          <MenuItem key={ticker.symbol} value={ticker.symbol}>
            {`${ticker.symbol} (${ticker.formalName})`}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

export default TickerSelect;
