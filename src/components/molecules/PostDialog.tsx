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
// import Select from '@material-ui/core/Select';
// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';

const initialItem: Item = {
  ticker: '',
  note: '',
  targetPrice: 0,
};

const PostDialog: React.FC<Props> = ({
  addHandler,
  itemOfRow,
  selectedRowId,
}: Props) => {
  const [item, setItem] = useState({ ...initialItem, ...itemOfRow });
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
          <TextField
            margin="dense"
            label="Ticker"
            type="text"
            fullWidth
            value={item.ticker}
            onChange={handleChange('ticker')}
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
  itemOfRow?: object;
  selectedRowId?: number;
};

type Item = {
  ticker: string;
  note: string;
  targetPrice: number | null;
};

export default PostDialog;
