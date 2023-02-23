import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

type Props = {
  backgroundUrl?: string;
};

const HeroSection: React.FC<Props> = ({
  backgroundUrl = 'https://source.unsplash.com/1024x768/?investing',
}) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: theme.spacing(4),
        backgroundImage: `url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      },
      overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
      },
      mainFeaturedPostContent: {
        position: 'relative',
        padding: theme.spacing(3),
        [theme.breakpoints.up('md')]: {
          padding: theme.spacing(6),
          paddingRight: 0,
        },
      },
      authLinkWrapper: {
        padding: theme.spacing(0.5),
        backgroundColor: 'rgba(255,255,255,.4)',
        color: 'rgba(255,255,255,.5)',
      },
    })
  );
  const classes = useStyles();

  return (
    <Paper className={classes.mainFeaturedPost}>
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: 'none' }}
          src={`url(${backgroundUrl})`}
          alt={'hero'}
        />
      }
      <div className={classes.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={classes.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              Fetch information to find high performers out from Nasdaq 100
              companies.
            </Typography>
            <span className={classes.authLinkWrapper}>
              <Link component={RouterLink} to="/login">
                Login
              </Link>
              <span> or </span>
              <Link component={RouterLink} to="/sign_up">
                Sign up
              </Link>
            </span>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default HeroSection;
