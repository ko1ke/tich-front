import React from 'react';
import GenericTemplate from '../templates/GenericTemplate';
import HeadSection from '../organisms/HeroSection';
import FeatureSection from '../organisms/FeatureSection';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const HomePage: React.FC = () => {
  const classes = useStyles();

  return (
    <GenericTemplate>
      <Paper className={classes.root}>
        <HeadSection />
        <FeatureSection />
      </Paper>
    </GenericTemplate>
  );
};

export default HomePage;
