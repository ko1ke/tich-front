import React from 'react';
import GenericTemplate from '../templates/GenericTemplate';
import HeadSection from '../organisms/HeroSection';
import FeatureSection from '../organisms/FeatureSection';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';

const HomePage: React.FC = () => {
  const theme = useTheme();

  return (
    <GenericTemplate>
      <Paper sx={{ padding: theme.spacing(4) }}>
        <HeadSection />
        <FeatureSection />
      </Paper>
    </GenericTemplate>
  );
};

export default HomePage;
