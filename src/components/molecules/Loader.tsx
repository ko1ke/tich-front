import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    textAlign: 'center',
    margin: '35vh auto 0',
    transform: 'translateY(-50%)',
  },
}));

type Props = {
  text?: string;
};

const Loader: React.FC<Props> = ({ text = 'Loading...' }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>{text}</Typography>
      <LinearProgress />
    </div>
  );
};

export default Loader;
