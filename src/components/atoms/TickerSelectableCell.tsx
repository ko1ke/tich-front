import React, { useState, useEffect } from 'react';

const TickerSelectableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  tickers,
  updateData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    updateData(index, id, e.target.value);
  };

  // If the initialValue is changed externall, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <select value={value} onChange={onChange}>
      <option value=""> &nbsp;</option>
      {tickers.map((ticker) => (
        <option key={ticker.symbol} value={ticker.symbol}>
          {ticker.symbol}
        </option>
      ))}
    </select>
  );
};

export default TickerSelectableCell;
