import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FieldRenderProps } from 'react-final-form';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

type Props = FieldRenderProps<string, any>;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: theme.palette.secondary.dark,
      height: theme.spacing(1.5),
    },
  })
);

const TextInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => {
  const classes = useStyles();

  return (
    <>
      <TextField {...input} {...rest} />
      <div className={classes.error}>
        {meta.error && meta.touched ? meta.error : ''}
      </div>
    </>
  );
};

export default TextInput;
