import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { PortfolioProps } from '../../typings';
import { Form, Field } from 'react-final-form';
import TextInput from '../atoms/TextInput';
import { required, composeValidators } from '../../utils/validator';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import type { Ticker } from '../../typings';

type Props = {
  addHandler?: (item: any) => void;
  tickers?: Ticker[];
};

const PostDialog: React.FC<Props> = ({ addHandler, tickers }: Props) => {
  const theme = useTheme();
  const FieldsWrapper = styled('div')({
    '& > *': {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  });
  const ButtonsWrapper = styled('div')({
    '& > *': {
      margin: theme.spacing(1),
    },
  });
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
                <FieldsWrapper>
                  <div>
                    <Field<string>
                      validate={composeValidators(required)}
                      name="symbol"
                      component={TextInput}
                      placeholder="Symbol"
                      label="Symbol"
                      fullWidth
                      select
                      variant="standard"
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
                      variant="standard"
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
                      variant="standard"
                    />
                  </div>
                </FieldsWrapper>
                <ButtonsWrapper>
                  <Button
                    type="submit"
                    color="primary"
                    disabled={submitting || pristine || !valid}
                  >
                    Submit
                  </Button>
                  <Button onClick={handleClose} color="secondary">
                    Cancel
                  </Button>
                </ButtonsWrapper>
              </form>
            )}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostDialog;
