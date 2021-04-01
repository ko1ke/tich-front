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

const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateData, // This is a custom function that we supplied to our table instance
}) => {
  const classes = useStyles();
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue);
  const inputType = id === 'ticker' ? 'text' : 'number';

  const onChange = (e) => {
    const input =
      inputType === 'text' ? e.target.value : Number(e.target.value);
    setValue(input);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateData(index, id, value);
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
