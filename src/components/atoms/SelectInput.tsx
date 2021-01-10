import React from 'react';
import Select from '@material-ui/core/Select';
import { FieldRenderProps } from 'react-final-form';

type Props = FieldRenderProps<string, any>;

const SelectInput: React.FC<Props> = ({ input, meta, ...rest }: Props) => (
  <Select {...input} {...rest} />
);

export default SelectInput;
