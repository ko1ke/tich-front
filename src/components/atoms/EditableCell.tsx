import { useState, useEffect } from 'react';
import { styled } from '@mui/system';

const Input = styled('input')({
  border: '0.1px solid',
  borderRadius: '3px',
  backgroundColor: '#fff',
  resize: 'none',
  width: '100%',
});

const EditableCell = ({ getValue, row: { index }, column: { id }, table }) => {
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
    <Input type={inputType} value={value} onChange={onChange} onBlur={onBlur} />
  );
};

export default EditableCell;
