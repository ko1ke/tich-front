import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toDarkMode, toLightMode } from '../../features/displayModeSlice';
import { selectDisplayMode } from '../../features/displayModeSlice';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { PaletteMode, useTheme } from '@mui/material';
import Typography from '@mui/material/Typography';

const DisplayModeSection: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const displayMode = useSelector(selectDisplayMode);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: PaletteMode
  ) => {
    if (['light', 'dark'].includes(value)) {
      value === 'light' ? dispatch(toLightMode()) : dispatch(toDarkMode());
    }
  };

  return (
    <>
      <Typography
        component="h3"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ marginBottom: theme.spacing(1) }}
      >
        Display Mode
      </Typography>
      <ToggleButtonGroup
        color="primary"
        value={displayMode.type}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="light">Light</ToggleButton>
        <ToggleButton value="dark">Dark</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default DisplayModeSection;
