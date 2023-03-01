import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';

type Props = {
  text?: string;
};

const Loader: React.FC<Props> = ({ text = 'Loading...' }) => {
  const theme = useTheme();
  const Wrapper = styled('div')({
    width: '95%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    textAlign: 'center',
    margin: '35vh auto 0',
    transform: 'translateY(-50%)',
  });

  return (
    <Wrapper>
      <Typography>{text}</Typography>
      <LinearProgress />
    </Wrapper>
  );
};

export default Loader;
