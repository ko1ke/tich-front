import React, { useState, useEffect } from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import type { EsMatchType } from '../../typings';
import useMatchTypeParam from '../../hooks/useMatchTypeParam';

type Props = {
  handler: (value: string, target: 'type') => void;
};

const EsMatchTypeToggleButton: React.FC<Props> = ({ handler }) => {
  const { getMatchTypeParam } = useMatchTypeParam();
  const [matchType, setMatchType] = useState<EsMatchType>(getMatchTypeParam());

  useEffect(() => {
    // switch the value from searchParams 'type' when reloaded or accessed directly with url
    setMatchType(getMatchTypeParam());
  }, [getMatchTypeParam]);

  const handleChange = (
    _event: React.MouseEvent<HTMLElement, MouseEvent>,
    newValue: EsMatchType
  ) => {
    if (newValue) {
      setMatchType(newValue);
      handler(newValue, 'type');
    }
  };

  return (
    <ToggleButtonGroup
      value={matchType}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="cross_fields">Cross</ToggleButton>
      <ToggleButton value="best_fields">Best</ToggleButton>
      <ToggleButton value="most_fields">MOST</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default EsMatchTypeToggleButton;
