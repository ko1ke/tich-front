import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<string, any>;

const TextAreaInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <TextField multiline {...input} {...rest} />
);

export default TextAreaInput;
