import React from 'react';
import TextField from '@mui/material/TextField';
import { FieldRenderProps } from 'react-final-form';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

type Props = FieldRenderProps<string, any> & {
  children?: React.ReactNode;
};

const TextInput: React.FC<Props> = ({
  input,
  meta,
  children,
  ...rest
}: Props) => {
  const theme = useTheme();
  const ErrorMessage = styled('div')({
    color: theme.palette.error.dark,
    height: theme.spacing(1.5),
  });

  return (
    <>
      <TextField {...input} {...rest}>
        {rest.select && children}
      </TextField>
      <ErrorMessage>
        {meta.error && meta.touched ? meta.error : ''}
      </ErrorMessage>
    </>
  );
};

export default TextInput;
