import React, { useEffect, useState } from 'react';
import GenericTemplate from '../templates/GenericTemplate';
import { useLocation } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const [paymentResult, setPaymentResult] = useState(undefined);

  useEffect(() => {
    if (location.search === '?success=true') {
      setPaymentResult('succeeded');
    }
    if (location.search === '?canceled=true') {
      setPaymentResult('canceled');
    }
    if (location.search === '') {
      setPaymentResult('');
    }
  }, [location]);

  if (paymentResult === '') return <Redirect to="/" />;

  return (
    <GenericTemplate title={`Payment ${paymentResult}`}>
      <>{`The payment ${paymentResult}.`}</>
    </GenericTemplate>
  );
};

export default PaymentPage;
