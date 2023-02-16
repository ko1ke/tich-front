import React, { useState, useEffect } from 'react';

const TickerSelectableCell = ({
  getValue,
  row: { index },
  column: { id },
  table,
}) => {
  const initialValue = getValue();

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);

  const onChange = (e) => {
    table.options.meta?.updateData(index, id, e.target.value);
  };

  // If the initialValue is changed externall, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <select value={value} onChange={onChange}>
      {table.options.meta?.tickers.map((ticker) => (
        <option key={ticker.symbol} value={ticker.symbol}>
          {ticker.symbol}
        </option>
      ))}
    </select>
  );
};

export default TickerSelectableCell;
