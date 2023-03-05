import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

type Props = {
  backgroundUrl?: string;
};

const HeroSection: React.FC<Props> = ({
  backgroundUrl = 'https://source.unsplash.com/1024x768/?investing',
}) => {
  const theme = useTheme();
  const MainFeaturedPost = styled(Paper)({
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${backgroundUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  });

  const Overlay = styled('div')({
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  });

  const MainFeaturedPostContent = styled('div')({
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  });

  const LinksWrapper = styled('span')({
    padding: theme.spacing(0.5),
    backgroundColor: 'rgba(255,255,255,.4)',
    color: 'rgba(255,255,255,.5)',
  });

  return (
    <MainFeaturedPost>
      <Overlay />
      <Grid container>
        <Grid item md={6}>
          <MainFeaturedPostContent>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              Fetch information to find high performers out from Nasdaq 100
              companies.
            </Typography>
            <LinksWrapper>
              <Link component={RouterLink} to="/login">
                Login
              </Link>
              <span> or </span>
              <Link component={RouterLink} to="/sign_up">
                Sign up
              </Link>
            </LinksWrapper>
          </MainFeaturedPostContent>
        </Grid>
      </Grid>
    </MainFeaturedPost>
  );
};

export default HeroSection;
