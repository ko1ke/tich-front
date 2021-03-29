import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import * as colors from '@material-ui/core/colors';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import TopBar from '../molecules/TopBar';
import SideBar from '../molecules/SideBar';
import UserSnack from '../molecules/UserSnack';

const theme = createMuiTheme({
  palette: {
    primary: { main: colors.blue[800] }, // theme color
  },
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    pageTitle: {
      marginBottom: theme.spacing(1),
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
  })
);

export interface GenericTemplateProps {
  children: React.ReactNode;
  title: string;
}

const GenericTemplate = React.forwardRef(
  (props: GenericTemplateProps, ref?: React.LegacyRef<HTMLElement>) => {
    const classes = useStyles();

    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <CssBaseline />
          <TopBar />
          <SideBar />
          <main className={classes.content} ref={ref}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth="lg" className={classes.container}>
              <Typography
                component="h2"
                variant="h5"
                color="inherit"
                noWrap
                className={classes.pageTitle}
              >
                {props.title}
              </Typography>
              {props.children}
            </Container>
          </main>
          <UserSnack />
        </div>
      </ThemeProvider>
    );
  }
);

export default GenericTemplate;
