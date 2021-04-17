import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(2),
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

const KeywordSearchForm = ({ handler }) => {
  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = useState('');

  useEffect(() => {
    // fill the value from searchParams 'keyword' when reloaded or accessed directly with url
    const searchParams = new URLSearchParams(location.search);
    setValue(searchParams.get('keyword') || '');
  }, []);

  const onSubmit = (event: React.FormEvent<unknown>) => {
    event.preventDefault();
    handler(value);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={onSubmit}>
      <InputBase
        className={classes.input}
        placeholder="Search by keywords"
        inputProps={{ 'aria-label': 'search by keywords' }}
        name="keyword"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default KeywordSearchForm;
