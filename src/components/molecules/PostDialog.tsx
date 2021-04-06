import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { PortfolioProps } from '../../typings';
import { Form, Field } from 'react-final-form';
import TextInput from '../atoms/TextInput';
import SelectInput from '../atoms/SelectInput';
import { required, composeValidators } from '../../utils/validator';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  fields: {
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  buttons: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

interface Ticker {
  symbol: string;
  formalName: string;
}

const PostDialog: React.FC<Props> = ({ addHandler, tickers }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (values: PortfolioProps) => {
    addHandler(values);
    setOpen(false);
  };

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        <Tooltip title="Add">
          <AddIcon />
        </Tooltip>
      </IconButton>
      <Dialog
        key={'add'}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add</DialogTitle>
        <DialogContent>
          <Form
            onSubmit={onSubmit}
            keepDirtyOnReinitialize={true}
            initialValues={{ symbol: '', note: '', targetPrice: '' }}
            render={({
              handleSubmit,
              form,
              submitting,
              pristine,
              valid,
              values,
            }) => (
              <form onSubmit={handleSubmit}>
                <div className={classes.fields}>
                  <div>
                    <Field<string>
                      validate={composeValidators(required)}
                      name="symbol"
                      component={SelectInput}
                      placeholder="Symbol"
                      inputLabel="Symbol"
                      fullWidth
                    >
                      {tickers.map((ticker) => (
                        <MenuItem key={ticker.symbol} value={ticker.symbol}>
                          {`${ticker.symbol} (${ticker.formalName})`}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div>
                    <Field<string>
                      name="targetPrice"
                      type="number"
                      component={TextInput}
                      placeholder="Target price"
                      label="Target price"
                      fullWidth
                    />
                  </div>
                  <div>
                    <Field<string>
                      name="note"
                      label="Note"
                      parse={(x) => x}
                      component={TextInput}
                      placeholder="Note"
                      fullWidth
                    />
                  </div>
                </div>
                <div className={classes.buttons}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={submitting || pristine || !valid}
                  >
                    Submit
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClose}
                    color="secondary"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={form.reset as () => void}
                    disabled={submitting || pristine}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

type Props = {
  addHandler?: (item: any) => void;
  tickers?: Ticker[];
};

export default PostDialog;
