import React, { useState, useEffect } from 'react';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  cell: {
    border: 0,
    lineHeight: '1.2rem',
    backgroundColor: '#fafafa',
    background: 'transparent',
    resize: 'none',
    width: '100%',
  },
}));

const EditableCell = ({ getValue, row: { index }, column: { id }, table }) => {
  const classes = useStyles();
  const initialValue = getValue();

  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const inputType = id === 'targetPrice' ? 'number' : 'text';

  const onChange = (e) => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    table.options.meta?.updateData(index, id, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      className={classes.cell}
      type={inputType}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default EditableCell;
