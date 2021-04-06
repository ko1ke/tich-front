import React from 'react';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
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

const SelectInput: React.FC<Props> = ({
  input,
  meta,
  inputLabel,
  fullWidth,
  formHelperText,
  ...rest
}: Props) => {
  const classes = useStyles();

  return (
    <>
      <FormControl fullWidth>
        {inputLabel && <InputLabel>{inputLabel}</InputLabel>}
        <Select {...input} {...rest} />
        {formHelperText && <FormHelperText>{formHelperText}</FormHelperText>}
      </FormControl>
      <div className={classes.error}>
        {meta.error && meta.touched ? meta.error : ''}
      </div>
    </>
  );
};

export default SelectInput;
