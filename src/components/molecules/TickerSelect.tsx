import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export interface TickerSelectProps {
  tickers: string[];
  value: string;
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
}) => {
  return (
    <FormControl>
      <InputLabel id="select-helper-label">Ticker Symbol</InputLabel>
      <Select
        labelId="select-helper-label"
        id="simple-select-helper"
        value={value}
        onChange={handler}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {tickers.map((ticker) => (
          <MenuItem key={ticker} value={ticker}>
            {ticker}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>
        Select a symbol to show the articles related
      </FormHelperText>
    </FormControl>
  );
};

export default TickerSelect;
