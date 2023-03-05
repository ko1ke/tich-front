import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

type Props = {
  handler: (value: string) => void;
  placeholder?: string;
};

const KeywordSearchForm: React.FC<Props> = ({
  handler,
  placeholder = 'Search by keywords',
}) => {
  const theme = useTheme();
  const location = useLocation();
  const [value, setValue] = useState('');

  useEffect(() => {
    // fill the value from searchParams 'keyword' when reloaded or accessed directly with url
    const searchParams = new URLSearchParams(location.search);
    setValue(searchParams.get('keyword') || '');
  }, [location.search]);

  const onSubmit = (event: React.FormEvent<unknown>) => {
    event.preventDefault();
    handler(value);
  };

  return (
    <Paper
      component="form"
      sx={{
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
      }}
      onSubmit={onSubmit}
    >
      <InputBase
        sx={{ marginLeft: theme.spacing(1), flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search by keywords' }}
        name="keyword"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <IconButton type="submit" sx={{ padding: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default KeywordSearchForm;
