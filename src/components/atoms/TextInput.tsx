import React from 'react';
import TextField from '@material-ui/core/TextField';
import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<string, any>;

const TextInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <TextField {...input} {...rest} />
);

export default TextInput;
