import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TopBar from '../organisms/TopBar';
import SideBar from '../organisms/SideBar';
import UserSnack from '../molecules/UserSnack';
import Box from '@mui/material/Box';
import { useTheme, styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectDisplayMode } from '../../features/displayModeSlice';

type GenericTemplateProps = {
  children: React.ReactNode;
  title?: string;
};

const GenericTemplate = React.forwardRef(
  (props: GenericTemplateProps, ref?: React.LegacyRef<HTMLElement>) => {
    const theme = useTheme();
    const displayMode = useSelector(selectDisplayMode);

    const AppBarSpacer = styled(Box)({
      ...theme.mixins.toolbar,
    });
    const TemplateContent = styled('main')({
      backgroundColor: theme.palette.grey[100],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    });
    const customTheme = createTheme({
      palette: {
        primary: { main: blue[800] },
        mode: displayMode.type,
      },
    });

    return (
      <ThemeProvider theme={customTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <TopBar />
          <SideBar />
          <TemplateContent ref={ref}>
            <AppBarSpacer />
            <Container
              maxWidth="lg"
              sx={{
                paddingTop: theme.spacing(4),
                paddingBottom: theme.spacing(4),
              }}
            >
              {props.title && (
                <Typography
                  component="h2"
                  variant="h5"
                  color="inherit"
                  noWrap
                  sx={{ marginBottom: theme.spacing(1) }}
                >
                  {props.title}
                </Typography>
              )}
              {props.children}
            </Container>
          </TemplateContent>
          <UserSnack />
        </Box>
      </ThemeProvider>
    );
  }
);

export default GenericTemplate;
