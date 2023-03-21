import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { EsOperator } from '../typings';

const DEFAULT_OPERATOR = 'and';

const useOperatorParam = () => {
  const location = useLocation();

  const getOperatorParam = useCallback(() => {
    const searchParams = new URLSearchParams(location.search);
    const operatorParam = searchParams.get('operator') as EsOperator;
    if ([DEFAULT_OPERATOR, 'or'].includes(operatorParam)) {
      return operatorParam;
    } else {
      return DEFAULT_OPERATOR;
    }
  }, [location.search]);

  return { getOperatorParam };
};

export default useOperatorParam;
