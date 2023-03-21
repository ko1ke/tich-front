import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { EsOperator } from '../../typings';
import useOperatorParam from '../../hooks/useOperatorParam';

type Props = {
  handler: (value: string, target: 'operator') => void;
};

const EsOperatorToggleButton: React.FC<Props> = ({ handler }) => {
  const { getOperatorParam } = useOperatorParam();

  const [operator, setOperator] = useState<EsOperator>(getOperatorParam());

  useEffect(() => {
    // switch the value from searchParams 'operator' when reloaded or accessed directly with url
    setOperator(getOperatorParam());
  }, [getOperatorParam]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: EsOperator
  ) => {
    if (newValue) {
      setOperator(newValue);
      handler(newValue, 'operator');
    }
  };

  return (
    <ToggleButtonGroup
      value={operator}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="and">AND</ToggleButton>
      <ToggleButton value="or">OR</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default EsOperatorToggleButton;
