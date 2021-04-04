import React, { useState } from 'react';

import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import TickerSelect from './TickerSelect';

const initialItem: Item = {
  symbol: '',
  note: '',
  targetPrice: 0,
};

interface Ticker {
  symbol: string;
  formalName: string;
}

const PostDialog: React.FC<Props> = ({ addHandler, tickers }: Props) => {
  const [item, setItem] = useState({ ...initialItem });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (event) => {
    addHandler(item);
    setItem(initialItem);
    setOpen(false);
  };

  const handleChange = (name) => ({ target: { value } }) => {
    setItem({ ...item, [name]: value });
  };

  let icon: JSX.Element;
  let title: string;
  let key: string;
  let handler: (event: any) => void;

  icon = (
    <Tooltip title="Add">
      <AddIcon />
    </Tooltip>
  );
  title = 'Add';
  key = `add`;
  handler = handleAdd;

  return (
    <>
      <IconButton onClick={handleClickOpen}>{icon}</IconButton>
      <Dialog
        key={key}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TickerSelect
            tickers={tickers}
            value={item.symbol}
            helperText={'Select a symbol'}
            handler={handleChange('symbol')}
          />
          <TextField
            margin="dense"
            label="Target price"
            type="number"
            fullWidth
            value={item.targetPrice}
            onChange={handleChange('targetPrice')}
          />
          <TextField
            margin="dense"
            label="Note"
            type="text"
            fullWidth
            value={item.note}
            onChange={handleChange('note')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handler} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

type Props = {
  addHandler?: Function;
  tickers?: Ticker[];
};

type Item = {
  symbol: string;
  note: string;
  targetPrice: number | null;
};

export default PostDialog;
