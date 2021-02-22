import React from 'react';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 50,
    bottom: 50,
    left: 'auto',
    position: 'fixed',
  },
}));

const SaveButton = ({ buttonText, saveFunc }) => {
  const classes = useStyles();

  const handleOnClick = () => {
    saveFunc();
  };

  return (
    <Fab onClick={handleOnClick} className={classes.fab}>
      {buttonText}
    </Fab>
  );
};
export default SaveButton;
