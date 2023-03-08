import React from 'react';
import GenericTemplate from '../templates/GenericTemplate';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import DisplayModeSection from '../organisms/DisplayModeSection';

const SettingPage: React.FC = () => {
  const theme = useTheme();

  return (
    <GenericTemplate title="Setting">
      <Box sx={{ padding: theme.spacing(1) }}>
        <DisplayModeSection />
      </Box>
    </GenericTemplate>
  );
};

export default SettingPage;
